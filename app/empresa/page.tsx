"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoHeader from "../../../workcerca-logo-header.png";

type ApplicationRow = {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  applicant_city: string | null;
  cv_source: string;
  status: string;
  created_at: string;
  jobs?: {
    id: string;
    title: string;
    company_name: string;
    location: string;
    modality: string;
    schedule: string;
  } | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const STATUS_OPTIONS = ["enviada", "vista", "preseleccionado", "entrevista", "descartado"];

export default function EmpresaPostulantesPage() {
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [filter, setFilter] = useState("todas");
  const [search, setSearch] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const loadApplications = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          job_id,
          applicant_name,
          applicant_email,
          applicant_phone,
          applicant_city,
          cv_source,
          status,
          created_at,
          jobs (
            id,
            title,
            company_name,
            location,
            modality,
            schedule
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications((data || []) as unknown as ApplicationRow[]);
    } catch (error: any) {
      console.error(error);
      notify(error?.message || "No pudimos cargar las postulaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((item) => {
      const statusOk = filter === "todas" || item.status === filter;
      const text = `${item.applicant_name} ${item.applicant_email} ${item.applicant_city || ""} ${item.jobs?.title || ""}`.toLowerCase();
      return statusOk && (!q || text.includes(q));
    });
  }, [applications, filter, search]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (error) {
      notify(error.message);
      return;
    }
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    notify(`Estado actualizado a ${status}.`);
  };

  return (
    <main
      className="page"
      style={{
        opacity: pageReady ? 1 : 0,
        visibility: pageReady ? "visible" : "hidden",
        transition: "opacity 220ms ease-out",
      }}
    >
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="sidebarGroup">
          <span className="groupTitle">EMPRESA</span>
          <button onClick={() => (window.location.href = "/empresa")}><i>⌂</i><span>Panel / Mi Empresa</span></button>
          <button onClick={() => (window.location.href = "/")}><i>⌂</i><span>Inicio WorkCerca</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">TALENTO Y RR. HH.</span>
          <button onClick={() => (window.location.href = "/empresa/publicar-empleo")}><i>▣</i><span>Publicar empleo</span></button>
          <button onClick={() => (window.location.href = "/empresa")}><i>✦</i><span>Talento y RR. HH. con IA</span></button>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}><i>⌕</i><span>Buscar candidatos</span></button>
          <button className="active"><i>♙</i><span>Postulantes</span><b>{applications.length}</b></button>
          <button onClick={() => (window.location.href = "/empresa/entrevistas")}><i>▦</i><span>Entrevistas</span></button>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}><i>▤</i><span>CV / perfiles profesionales</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">COMUNICACIÓN</span>
          <button onClick={() => (window.location.href = "/mensajes")}><i>▱</i><span>Mensajes</span></button>
          <button onClick={() => (window.location.href = "/videollamadas")}><i>▣</i><span>Videollamadas</span></button>
          <button onClick={() => (window.location.href = "/agenda")}><i>□</i><span>Agenda</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">NEGOCIOS</span>
          <button onClick={() => (window.location.href = "/empresa/proveedores")}><i>⌘</i><span>Proveedores</span></button>
          <button onClick={() => (window.location.href = "/empresa/productos-servicios")}><i>▤</i><span>Productos / Servicios</span></button>
          <button onClick={() => (window.location.href = "/empresa/promociones")}><i>★</i><span>Promociones</span></button>
          <button onClick={() => (window.location.href = "/empresa/publicidad")}><i>◎</i><span>Publicidad</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">DESARROLLO</span>
          <button onClick={() => (window.location.href = "/oportunidades")}><i>🎓</i><span>Pasantías</span></button>
          <button onClick={() => (window.location.href = "/capacitaciones")}><i>▥</i><span>Capacitaciones</span></button>
          <button onClick={() => (window.location.href = "/instituciones")}><i>🏛</i><span>Instituciones / convenios</span></button>
          <button onClick={() => (window.location.href = "/oportunidades")}><i>☆</i><span>Mi Primer Empleo</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">GESTIÓN</span>
          <button onClick={() => (window.location.href = "/empresa/estadisticas")}><i>◉</i><span>Estadísticas</span></button>
          <button onClick={() => notify("Facturación y planes")}><i>▧</i><span>Facturación y planes</span></button>
          <button onClick={() => (window.location.href = "/empresa/configuracion")}><i>⚙</i><span>Configuración</span></button>
        </div>

        <div className="companyMini">
          <span>DC</span>
          <div><strong>Diseño & Comunicación SRL</strong><small>Empresa verificada ✓</small></div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Postulantes</strong>
            <span>Personas que se postularon a búsquedas laborales de tu empresa.</span>
          </div>
          <div className="topActions">
            <button onClick={() => (window.location.href = "/empresa")}>Volver a Mi Empresa</button>
            <button onClick={loadApplications}>Actualizar</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · POSTULACIONES REALES</span>
              <h1>Revisá candidatos y seguí cada proceso desde WorkCerca.</h1>
              <p>
                Cada postulación está asociada al empleo correspondiente y puede avanzar
                por distintas etapas: enviada, vista, preselección, entrevista o descarte.
              </p>
            </div>
            <div className="heroCard">
              <span>✦ Motor WorkCerca</span>
              <strong>{applications.length} postulaciones recibidas</strong>
              <p>Más adelante la IA explicará coincidencias reales entre CV y búsqueda.</p>
            </div>
          </section>

          <section className="summaryGrid">
            <article><strong>{applications.length}</strong><span>Total</span></article>
            <article><strong>{applications.filter(a => a.status === "enviada").length}</strong><span>Nuevas</span></article>
            <article><strong>{applications.filter(a => a.status === "preseleccionado").length}</strong><span>Preseleccionadas</span></article>
            <article><strong>{applications.filter(a => a.status === "entrevista").length}</strong><span>Entrevistas</span></article>
          </section>

          <section className="panel">
            <div className="sectionHead">
              <div>
                <span className="eyebrow dark">CANDIDATOS</span>
                <h2>Postulaciones recibidas</h2>
              </div>
              <div className="filters">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar persona, empleo o ciudad..." />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="todas">Todos los estados</option>
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="state">Cargando postulaciones desde Supabase...</div>
            ) : filtered.length === 0 ? (
              <div className="state">
                <strong>No hay postulaciones con estos filtros.</strong>
                <span>Cuando alguien se postule, aparecerá automáticamente acá.</span>
              </div>
            ) : (
              <div className="applications">
                {filtered.map((item) => (
                  <article key={item.id}>
                    <div className="candidateAvatar">
                      {item.applicant_name.split(" ").map(p => p[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <div className="candidateInfo">
                      <span className="jobTag">{item.jobs?.title || "Empleo"}</span>
                      <h3>{item.applicant_name}</h3>
                      <p>{item.applicant_email}</p>
                      <small>{item.applicant_city || "Ciudad no informada"}{item.applicant_phone ? ` · ${item.applicant_phone}` : ""}</small>
                      <small>CV: {item.cv_source}</small>
                    </div>
                    <div className="jobInfo">
                      <b>{item.jobs?.company_name || "Empresa"}</b>
                      <span>{item.jobs?.location || ""}</span>
                      <span>{item.jobs?.modality || ""} · {item.jobs?.schedule || ""}</span>
                      <small>{new Date(item.created_at).toLocaleDateString("es-AR")}</small>
                    </div>
                    <div className="statusControl">
                      <label>Estado</label>
                      <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value)}>
                        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="actions">
                      <button onClick={() => notify(`Abrir CV de ${item.applicant_name}`)}>Ver perfil / CV</button>
                      <button onClick={() => (window.location.href = `/mensajes?candidato=${encodeURIComponent(item.applicant_name)}&empleo=${encodeURIComponent(item.jobs?.title || "")}`)}>Mensaje</button>
                      <button onClick={() => { updateStatus(item.id, "entrevista"); window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(item.applicant_name)}&empleo=${encodeURIComponent(item.jobs?.title || "")}`; }}>Agendar entrevista</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="interviewAi">
            <div>
              <span className="eyebrow dark">PRÓXIMA CAPA IA</span>
              <h2>Preparar entrevistas sin sumar otra barrera.</h2>
              <p>
                WorkCerca podrá ayudar a la empresa a ordenar preguntas y al candidato a practicar.
                La práctica del candidato será privada.
              </p>
            </div>
            <button onClick={() => notify("Entrenador de entrevistas IA: próximo módulo.")}>Preparar entrevista</button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f5f8fc;color:#10203a;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:285px;min-height:100vh;height:100vh;overflow:auto;position:sticky;top:0;background:linear-gradient(180deg,#071b35,#082742);color:#fff;padding:20px 14px;flex:none}.logo{border:0;background:transparent;padding:0 8px 18px;cursor:pointer}.logo img{width:205px;height:auto}.sidebarGroup{display:grid;gap:3px;margin-bottom:16px}.groupTitle{font-size:9px;letter-spacing:.09em;color:#aebed0;padding:0 10px 7px;border-bottom:1px solid rgba(255,255,255,.13);margin-bottom:2px}.sidebarGroup button{border:0;background:transparent;color:#eef5ff;min-height:38px;border-radius:8px;padding:0 10px;display:grid;grid-template-columns:24px 1fr auto;gap:7px;align-items:center;text-align:left;font-size:10px}.sidebarGroup button i{font-style:normal;font-size:14px}.sidebarGroup button b{font-size:7px;background:#0f7bef;border-radius:99px;padding:4px 7px}.sidebarGroup button:hover,.sidebarGroup button.active{background:linear-gradient(90deg,#0d78ee,#13bfd1);color:#fff}.companyMini{margin-top:13px;background:rgba(3,19,38,.55);border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px;display:grid;grid-template-columns:40px 1fr;gap:9px;align-items:center}.companyMini>span{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#4157e5,#18b5ce);display:grid;place-items:center;font-size:10px;font-weight:900}.companyMini strong,.companyMini small{display:block}.companyMini strong{font-size:9px}.companyMini small{font-size:7px;color:#45c3ee;margin-top:3px}.main{flex:1;min-width:0}.topbar{height:82px;background:#fff;border-bottom:1px solid #e1e7ed;display:flex;justify-content:space-between;align-items:center;padding:0 28px;position:sticky;top:0;z-index:30}.topbar span{display:block;font-size:10px;color:#718096}.topActions{display:flex;gap:8px}.topActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 11px}.content{max-width:1150px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.4fr .7fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;font-weight:900;color:#36dad5}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.heroCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.heroCard span{font-size:9px;color:#078da8;font-weight:900}.heroCard strong{display:block;font-size:18px;margin:8px 0}.heroCard p{font-size:9px;color:#617287}.summaryGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}.summaryGrid article{background:#fff;border:1px solid #e1e7ed;border-radius:10px;padding:15px}.summaryGrid strong,.summaryGrid span{display:block}.summaryGrid strong{font-size:24px}.summaryGrid span{font-size:9px;color:#708095}.panel,.interviewAi{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-bottom:14px}.sectionHead{display:flex;justify-content:space-between;gap:15px;margin-bottom:12px}.sectionHead h2{font-size:20px;margin:4px 0}.filters{display:flex;gap:8px}.filters input,.filters select{border:1px solid #dce3ea;border-radius:8px;padding:8px 10px}.applications{display:grid;gap:9px}.applications article{display:grid;grid-template-columns:46px 1.2fr 1fr .7fr auto;gap:11px;align-items:center;border:1px solid #e5eaf0;border-radius:11px;padding:13px}.candidateAvatar{width:42px;height:42px;border-radius:50%;background:#e7f5f8;color:#087e92;display:grid;place-items:center;font-weight:900}.candidateInfo h3{font-size:12px;margin:4px 0}.candidateInfo p,.candidateInfo small,.jobInfo span,.jobInfo small{display:block;font-size:8px;color:#68798d;margin:2px 0}.jobTag{display:inline-block;background:#edf8fa;color:#087f93;border-radius:999px;padding:4px 7px;font-size:7px;font-weight:900}.jobInfo b{font-size:9px}.statusControl label{display:block;font-size:7px;color:#728296}.statusControl select{border:1px solid #dce3ea;border-radius:7px;padding:7px}.actions{display:grid;gap:4px}.actions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px 8px;font-size:7px}.state{border:1px dashed #ccd7e1;border-radius:10px;background:#f8fbfd;padding:18px;display:grid;gap:6px;font-size:10px;color:#607185}.interviewAi{display:flex;justify-content:space-between;gap:18px;align-items:center;background:linear-gradient(135deg,#eefbfd,#f6f3ff)}.interviewAi h2{font-size:20px;margin:5px 0}.interviewAi p{font-size:9px;color:#5d6f83;max-width:760px}.interviewAi button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:10px 12px}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px}
        @media(max-width:900px){.applications article{grid-template-columns:42px 1fr}.jobInfo,.statusControl,.actions{grid-column:2}.summaryGrid{grid-template-columns:1fr 1fr}}
        @media(max-width:760px){.page{display:block}.sidebar{position:relative;width:100%;height:auto}.hero{grid-template-columns:1fr}.filters{flex-direction:column}.interviewAi{flex-direction:column;align-items:flex-start}}
      `}</style>
    </main>
  );
}
