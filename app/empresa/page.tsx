"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import logoHeader from "../../workcerca-logo-header.png";

type Business = {
  id: string;
  nombre: string | null;
  categoria: string | null;
  ciudad: string | null;
  zona: string | null;
  activo: boolean | null;
};

type Job = {
  id: string;
  title: string;
  location: string;
  status: "draft" | "active" | "paused" | "closed" | string;
  created_at: string;
  applications?: number;
};

type Promotion = {
  id: string;
  titulo: string;
  tipo_promocion: string;
  porcentaje_descuento: number | null;
  precio_promocional: number | null;
  moneda: string;
  inicia_en: string;
  finaliza_en: string;
  activo: boolean;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const statusLabel = (status: string) => ({
  draft: "Borrador",
  active: "Activa",
  paused: "Pausada",
  closed: "Cerrada",
}[status] || status);

const promoLabel = (promo: Promotion) => {
  if (promo.tipo_promocion === "PORCENTAJE" && promo.porcentaje_descuento != null) {
    return `${promo.porcentaje_descuento}% OFF`;
  }
  if (promo.tipo_promocion === "PRECIO_PROMOCIONAL" && promo.precio_promocional != null) {
    return `$ ${Number(promo.precio_promocional).toLocaleString("es-AR")} ${promo.moneda}`;
  }
  return "Beneficio especial";
};

export default function EmpresaPage() {
  const router = useRouter();
  const [navigating, setNavigating] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [businessId, setBusinessId] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [freshProductCount, setFreshProductCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  const selectedBusiness = useMemo(
    () => businesses.find((business) => business.id === businessId) || null,
    [businesses, businessId]
  );

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  useEffect(() => {
    let alive = true;

    const boot = async () => {
      try {
        if (!supabaseUrl || !supabaseAnonKey) {
          if (alive) notify("WorkCerca no pudo conectar los datos de Empresa en este momento.");
          return;
        }

        const { data: authData } = await supabase.auth.getUser();
        const userId = authData.user?.id || "";
        if (!userId) {
          if (alive) setSignedIn(false);
          return;
        }

        if (alive) setSignedIn(true);
        const { data, error } = await supabase
          .from("businesses")
          .select("id,nombre,categoria,ciudad,zona,activo")
          .eq("user_id", userId)
          .eq("activo", true)
          .order("created_at", { ascending: true });

        if (error) throw error;
        const rows = (data || []) as Business[];
        if (!alive) return;
        setBusinesses(rows);
        setBusinessId((current) => current || rows[0]?.id || "");
      } catch (error) {
        console.error(error);
        if (alive) notify("No pudimos cargar tu Empresa. Intentá nuevamente.");
      } finally {
        if (alive) setLoading(false);
      }
    };

    boot();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!businessId) {
      setJobs([]);
      setPromotions([]);
      setProductCount(0);
      setFreshProductCount(0);
      setApplicationCount(0);
      return;
    }

    let alive = true;

    const loadBusinessData = async () => {
      try {
        setLoading(true);
        const [jobsResult, promosResult, productsResult] = await Promise.all([
          supabase
            .from("jobs")
            .select("id,title,location,status,created_at")
            .eq("business_id", businessId)
            .order("created_at", { ascending: false }),
          supabase
            .from("workcerca_promotions")
            .select("id,titulo,tipo_promocion,porcentaje_descuento,precio_promocional,moneda,inicia_en,finaliza_en,activo")
            .eq("business_id", businessId)
            .order("created_at", { ascending: false }),
          supabase
            .from("workcerca_products")
            .select("id,activo")
            .eq("business_id", businessId),
        ]);

        if (jobsResult.error) throw jobsResult.error;
        if (promosResult.error) throw promosResult.error;
        if (productsResult.error) throw productsResult.error;

        const jobRows = (jobsResult.data || []) as Job[];
        const jobIds = jobRows.map((job) => job.id);
        let applications: any[] = [];
        if (jobIds.length) {
          const applicationsResult = await supabase
            .from("applications")
            .select("id,job_id,status")
            .in("job_id", jobIds);
          if (applicationsResult.error) throw applicationsResult.error;
          applications = applicationsResult.data || [];
        }

        const productIds = (productsResult.data || []).map((row: any) => row.id);
        let freshCount = 0;
        if (productIds.length) {
          const freshnessResult = await supabase
            .from("workcerca_entity_freshness")
            .select("entity_id,dato_tipo,estado,confirmado_en,vigencia_minutos")
            .eq("entity_type", "product")
            .in("entity_id", productIds)
            .in("dato_tipo", ["precio", "stock", "publicacion"])
            .eq("activo", true);
          if (freshnessResult.error) throw freshnessResult.error;
          const now = Date.now();
          const freshProducts = new Set<string>();
          for (const row of freshnessResult.data || []) {
            if (!row.confirmado_en || !row.vigencia_minutos) continue;
            const expires = new Date(row.confirmado_en).getTime() + Number(row.vigencia_minutos) * 60_000;
            if (row.estado === "CONFIRMADO" && expires > now) freshProducts.add(row.entity_id);
          }
          freshCount = freshProducts.size;
        }

        if (!alive) return;
        setJobs(jobRows.map((job) => ({
          ...job,
          applications: applications.filter((app) => app.job_id === job.id).length,
        })));
        setPromotions((promosResult.data || []) as Promotion[]);
        setProductCount((productsResult.data || []).length);
        setFreshProductCount(freshCount);
        setApplicationCount(applications.length);
      } catch (error) {
        console.error(error);
        if (alive) notify("No pudimos actualizar el panel de Empresa.");
      } finally {
        if (alive) setLoading(false);
      }
    };

    loadBusinessData();
    return () => { alive = false; };
  }, [businessId]);

  const activeJobs = jobs.filter((job) => job.status === "active").length;
  const now = Date.now();
  const activePromotions = promotions.filter((promo) =>
    promo.activo && new Date(promo.inicia_en).getTime() <= now && new Date(promo.finaliza_en).getTime() > now
  );

  useEffect(() => {
    [
      "/",
      "/empresa/publicar-empleo",
      "/empresa/postulantes",
      "/empresa/candidatos",
      "/empresa/entrevistas",
      "/mensajes",
      "/agenda",
      "/videollamadas",
      "/empresa/productos-servicios",
      "/empresa/promociones",
      "/empresa/proveedores",
      "/empresa/publicidad",
      "/empresa/estadisticas",
      "/empresa/configuracion",
    ].forEach((path) => router.prefetch(path));
  }, [router]);

  const go = (path: string) => {
    if (navigating) return;
    setNavigating(true);
    router.push(path);
  };

  return (
    <main className={`companyPage ${navigating ? "isNavigating" : ""}`}>
      {navigating && <div className="routeTransition" aria-hidden="true" />}
      {notice && <div className="companyToast">{notice}</div>}

      <aside className="companySidebar">
        <button className="companyLogo" onClick={() => go("/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="companyProfile">
          <div className="companyAvatar">E</div>
          <div>
            <strong>{selectedBusiness?.nombre || "Mi Empresa WorkCerca"}</strong>
            <span>{selectedBusiness ? "Empresa vinculada a tu cuenta" : "Seleccioná una empresa"}</span>
          </div>
        </div>

        <nav className="companyNav">
          <div className="navGroup">
            <span className="navLabel">EMPRESA</span>
            <button onClick={() => go("/")}>⌂ <span>Inicio WorkCerca</span></button>
            <button className="active">▦ <span>Mi Empresa</span></button>
          </div>

          <div className="navGroup">
            <span className="navLabel">TALENTO Y EMPLEO</span>
            <button onClick={() => go("/empresa/publicar-empleo")}>＋ <span>Publicar empleo</span></button>
            <button onClick={() => go("/empresa/postulantes")}>◫ <span>Postulantes</span>{applicationCount > 0 && <b>{applicationCount}</b>}</button>
            <button onClick={() => go("/empresa/candidatos")}>⌕ <span>Buscar candidatos</span></button>
            <button onClick={() => go("/empresa/entrevistas")}>◈ <span>Entrevistas</span></button>
          </div>

          <div className="navGroup">
            <span className="navLabel">COMUNICACIÓN</span>
            <button onClick={() => go("/mensajes")}>▱ <span>Mensajes</span></button>
            <button onClick={() => go("/agenda")}>□ <span>Agenda</span></button>
            <button onClick={() => go("/videollamadas")}>▣ <span>Videollamadas</span></button>
          </div>

          <div className="navGroup">
            <span className="navLabel">NEGOCIO</span>
            <button onClick={() => go("/empresa/productos-servicios")}>▤ <span>Productos / Servicios</span></button>
            <button onClick={() => go("/empresa/promociones")}>★ <span>Promociones</span></button>
            <button onClick={() => go("/empresa/proveedores")}>⌘ <span>Proveedores</span></button>
            <button onClick={() => go("/empresa/publicidad")}>◎ <span>Publicidad</span></button>
          </div>

          <div className="navGroup">
            <span className="navLabel">GESTIÓN</span>
            <button onClick={() => go("/empresa/estadisticas")}>◉ <span>Estadísticas</span></button>
            <button onClick={() => go("/empresa/configuracion")}>⚙ <span>Configuración</span></button>
          </div>
        </nav>

        <div className="companyTrust">
          <strong>WorkCerca Confianza</strong>
          <p>La visibilidad puede promocionarse; la confianza, la verificación y los datos reales no se compran.</p>
        </div>
      </aside>

      <section className="companyMain">
        <header className="companyTop">
          <div>
            <strong>Panel Empresa</strong>
            <span>Empleo, productos, promociones y conexiones de tu empresa en un solo lugar.</span>
          </div>
          <div className="companyTopActions">
            {businesses.length > 1 && (
              <select value={businessId} onChange={(e) => setBusinessId(e.target.value)}>
                {businesses.map((business) => <option key={business.id} value={business.id}>{business.nombre || "Empresa sin nombre"}</option>)}
              </select>
            )}
            <button onClick={() => go("/")}>Inicio WorkCerca</button>
          </div>
        </header>

        <div className="companyContent">
          {!loading && !signedIn ? (
            <section className="stateCard"><h1>Ingresá para administrar tu Empresa</h1><p>WorkCerca necesita identificar la cuenta responsable antes de mostrar o modificar información empresarial.</p><button onClick={() => go("/")}>Ir a iniciar sesión</button></section>
          ) : !loading && signedIn && businesses.length === 0 ? (
            <section className="stateCard"><h1>Todavía no hay una empresa activa vinculada</h1><p>Cuando tu empresa esté vinculada a la cuenta, este panel mostrará solamente información real de esa empresa.</p></section>
          ) : (
            <>
              <section className="companyHero">
                <div>
                  <span className="eyebrow">EMPRESA · WORKCERCA</span>
                  <h1>{selectedBusiness?.nombre || "Tu empresa, conectada con WorkCerca"}</h1>
                  <p>{[selectedBusiness?.categoria, selectedBusiness?.ciudad, selectedBusiness?.zona].filter(Boolean).join(" · ") || "Gestioná empleo, catálogo, promociones y oportunidades sin mezclar datos demostrativos con actividad real."}</p>
                </div>
                <div className="companyAiBox">
                  <span>✦ Motor WorkCerca</span>
                  <strong>Primero datos reales; después recomendaciones.</strong>
                  <p>Las coincidencias con candidatos y oportunidades solo deben aparecer cuando exista evidencia real y permisos de visibilidad.</p>
                  <button onClick={() => go("/empresa/candidatos")}>Ver candidatos</button>
                </div>
              </section>

              <section className="companyQuick">
                <button onClick={() => go("/empresa/publicar-empleo")}><span>＋</span><strong>Publicar empleo</strong><small>Publicación o borrador persistente</small></button>
                <button onClick={() => go("/empresa/postulantes")}><span>◫</span><strong>Postulantes</strong><small>Seguimiento por estado</small></button>
                <button onClick={() => go("/empresa/productos-servicios")}><span>▤</span><strong>Productos / Servicios</strong><small>Precio, stock y frescura</small></button>
                <button onClick={() => go("/empresa/promociones")}><span>★</span><strong>Promociones</strong><small>Vigencia automática</small></button>
                <button onClick={() => go("/empresa/proveedores")}><span>⌘</span><strong>Proveedores</strong><small>Conexiones para tu empresa</small></button>
                <button onClick={() => go("/empresa/estadisticas")}><span>◉</span><strong>Estadísticas</strong><small>Solo sobre datos reales</small></button>
              </section>

              <section className="companyKpis">
                <article><span>▣</span><strong>{activeJobs}</strong><b>Empleos activos</b><small>{jobs.length - activeJobs} en borrador, pausa o cierre</small></article>
                <article><span>◫</span><strong>{applicationCount}</strong><b>Postulaciones</b><small>De búsquedas de esta empresa</small></article>
                <article><span>▤</span><strong>{productCount}</strong><b>Productos cargados</b><small>{freshProductCount} con datos frescos confirmados</small></article>
                <article><span>★</span><strong>{activePromotions.length}</strong><b>Promociones vigentes</b><small>{promotions.length} cargadas en total</small></article>
                <article><span>✦</span><strong>—</strong><b>Candidatos sugeridos</b><small>No mostramos coincidencias sin motor certificado</small></article>
              </section>

              <div className="companyTwoCol">
                <section className="companyPanel">
                  <div className="panelHead"><div><span className="eyebrow dark">EMPLEO</span><h2>Búsquedas laborales</h2></div><button onClick={() => go("/empresa/publicar-empleo")}>＋ Nueva búsqueda</button></div>
                  {jobs.length === 0 ? <p className="empty">Todavía no hay búsquedas laborales para esta empresa.</p> : (
                    <div className="jobTable">{jobs.slice(0, 5).map((job) => <article key={job.id}><div><strong>{job.title}</strong><span>⌖ {job.location}</span></div><b>{job.applications || 0} postulantes</b><span className={`status ${job.status}`}>{statusLabel(job.status)}</span><button onClick={() => go("/empresa/postulantes")}>Ver →</button></article>)}</div>
                  )}
                </section>

                <section className="companyPanel">
                  <div className="panelHead"><div><span className="eyebrow dark">PROMOCIONES</span><h2>Vigencia real</h2></div><button onClick={() => go("/empresa/promociones")}>Administrar</button></div>
                  {promotions.length === 0 ? <p className="empty">Todavía no hay promociones cargadas para esta empresa.</p> : (
                    <div className="promoGrid">{promotions.slice(0, 4).map((promo) => {
                      const active = promo.activo && new Date(promo.inicia_en).getTime() <= now && new Date(promo.finaliza_en).getTime() > now;
                      return <article key={promo.id}><span>{active ? "VIGENTE" : "NO VIGENTE"}</span><h3>{promo.titulo}</h3><strong>{promoLabel(promo)}</strong><small>Hasta {new Date(promo.finaliza_en).toLocaleDateString("es-AR")}</small></article>;
                    })}</div>
                  )}
                </section>
              </div>

              <section className="companyPanel candidateHonesty">
                <div><span className="eyebrow dark">TALENTO Y RR. HH.</span><h2>Candidatos y coincidencias</h2><p>Esta pantalla ya no muestra personas inventadas ni porcentajes demostrativos. Cuando el motor de matching empresarial esté certificado, acá aparecerán perfiles reales que hayan autorizado visibilidad, con explicación de por qué coinciden.</p></div>
                <button onClick={() => go("/empresa/candidatos")}>Abrir módulo de candidatos</button>
              </section>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .companyPage{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.companyPage *{box-sizing:border-box}.companyPage button,.companyPage input,.companyPage select{font:inherit}.companySidebar{width:250px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;position:sticky;top:0;height:100vh;overflow:auto;flex:none}.companyLogo{border:0;background:transparent;padding:0 4px 22px;cursor:pointer}.companyLogo img{width:190px}.companyProfile{display:flex;gap:11px;align-items:center;padding:8px 5px 22px}.companyAvatar{width:48px;height:48px;border-radius:50%;background:#0a97ad;display:grid;place-items:center;font-size:20px;font-weight:900}.companyProfile strong,.companyProfile span{display:block}.companyProfile strong{font-size:13px}.companyProfile span{font-size:9px;color:#41ded9;margin-top:5px}.companyNav{display:grid;gap:15px}.navGroup{display:grid;gap:4px}.navLabel{display:block;padding:0 10px 4px;color:#7fb4c9;font-size:8px;font-weight:900;letter-spacing:.12em}.companyNav button{display:flex;align-items:center;gap:10px;border:0;background:transparent;color:#fff;border-radius:9px;padding:11px;text-align:left;cursor:pointer;font-size:11px}.companyNav button span{flex:1}.companyNav button b{background:#1d3551;border-radius:20px;padding:3px 7px;font-size:8px}.companyNav button:hover,.companyNav button.active{background:linear-gradient(90deg,#088fa9,#08718a)}.companyTrust{margin-top:20px;border:1px solid #2e5876;border-radius:12px;padding:14px}.companyTrust strong{color:#38d6d1;font-size:11px}.companyTrust p{font-size:9px;line-height:1.5;color:#d4e1eb}.companyMain{flex:1;min-width:0}.companyTop{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;display:flex;justify-content:space-between;align-items:center;padding:12px 28px;position:sticky;top:0;z-index:20}.companyTop strong,.companyTop span{display:block}.companyTop span{font-size:10px;color:#718096;margin-top:3px}.companyTopActions{display:flex;gap:8px;align-items:center}.companyTopActions button,.companyTopActions select{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;color:#17314e;font-size:10px}.companyContent{max-width:1220px;margin:auto;padding:28px}.stateCard{background:#fff;border:1px solid #e1e7ed;border-radius:14px;padding:28px}.stateCard button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:10px 14px}.companyHero{display:grid;grid-template-columns:1.4fr .7fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.12em;font-weight:900;color:#38dcd7}.eyebrow.dark{color:#078da8}.companyHero h1{font-size:36px;line-height:1.07;margin:9px 0}.companyHero p{font-size:12px;line-height:1.6;color:#dce8f2}.companyAiBox{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.companyAiBox>span{font-size:9px;color:#078da8;font-weight:900}.companyAiBox strong{display:block;margin:8px 0;font-size:15px}.companyAiBox p{color:#607185;font-size:10px}.companyAiBox button,.panelHead button,.candidateHonesty button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:9px 11px;font-size:9px;cursor:pointer}.companyQuick{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin:16px 0}.companyQuick button{border:1px solid #dfe6ed;background:#fff;border-radius:11px;padding:15px;text-align:left;color:#071a3d;cursor:pointer}.companyQuick button>span{display:grid;place-items:center;width:34px;height:34px;border-radius:8px;background:#eaf5fb;color:#087d9b;font-size:17px}.companyQuick strong,.companyQuick small{display:block}.companyQuick strong{font-size:11px;margin:8px 0 3px}.companyQuick small{font-size:8px;color:#718096}.companyKpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px}.companyKpis article{background:#fff;border:1px solid #e1e7ed;border-radius:10px;padding:13px;position:relative}.companyKpis article>span{position:absolute;right:10px;top:10px}.companyKpis strong,.companyKpis b,.companyKpis small{display:block}.companyKpis strong{font-size:23px}.companyKpis b{font-size:9px}.companyKpis small{font-size:8px;color:#798698;margin-top:3px}.companyTwoCol{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}.companyPanel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:16px}.panelHead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:12px}.panelHead h2{font-size:18px;margin:4px 0}.jobTable article{display:grid;grid-template-columns:1fr auto auto auto;gap:9px;align-items:center;padding:11px 0;border-bottom:1px solid #edf1f4}.jobTable strong,.jobTable span{display:block}.jobTable strong{font-size:10px}.jobTable span{font-size:8px;color:#718096}.jobTable b{font-size:8px}.jobTable .status{border-radius:20px;padding:4px 7px;background:#edf2f6}.jobTable .status.active{background:#e6f7f0;color:#16735a}.jobTable .status.draft{background:#fff6df;color:#8b6500}.jobTable .status.paused{background:#edf2f6;color:#53677b}.jobTable .status.closed{background:#fbe9e9;color:#9b3b3b}.jobTable button{border:0;background:transparent;color:#078da8;font-size:8px;cursor:pointer}.promoGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.promoGrid article{border:1px solid #e2e8ee;border-radius:9px;padding:11px}.promoGrid article>span{font-size:7px;color:#078da8;font-weight:900}.promoGrid h3{font-size:10px;margin:5px 0}.promoGrid strong{display:block;font-size:12px;margin-bottom:6px}.promoGrid small{font-size:8px;color:#67778a}.empty{font-size:10px;color:#718096}.candidateHonesty{display:flex;align-items:center;justify-content:space-between;gap:20px}.candidateHonesty h2{margin:4px 0}.candidateHonesty p{font-size:10px;color:#607185;line-height:1.6;max-width:800px}.companyToast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px;box-shadow:0 12px 30px #0003}@media(max-width:1100px){.companySidebar{width:215px}.companyQuick{grid-template-columns:repeat(3,1fr)}.companyKpis{grid-template-columns:repeat(3,1fr)}.companyTwoCol{grid-template-columns:1fr}}@media(max-width:760px){.companyPage{display:block}.companySidebar{position:relative;width:100%;height:auto;min-height:0}.companyNav{grid-template-columns:1fr 1fr}.companyTop{position:relative}.companyTopActions{flex-wrap:wrap}.companyContent{padding:14px}.companyHero{grid-template-columns:1fr}.companyHero h1{font-size:29px}.companyQuick{grid-template-columns:1fr 1fr}.companyKpis{grid-template-columns:1fr 1fr}.candidateHonesty{display:block}.candidateHonesty button{margin-top:12px}}
.routeTransition{position:fixed;inset:0;z-index:9999;pointer-events:none;background:rgba(246,248,251,.22);backdrop-filter:blur(.8px);opacity:1;transition:opacity .12s ease}.companyPage.isNavigating{cursor:progress}.companyPage.isNavigating .companyMain{opacity:.985;transition:opacity .12s ease}.companySidebar{contain:paint}
      `}</style>
    </main>
  );
}
