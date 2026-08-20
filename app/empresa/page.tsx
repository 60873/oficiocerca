"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";

type Candidate = {
  name: string;
  role: string;
  match: number;
  location: string;
  verified: boolean;
  cv: string;
};

type Job = {
  title: string;
  applicants: number;
  status: string;
  location: string;
};

type Promo = {
  title: string;
  detail: string;
  until: string;
};

const candidates: Candidate[] = [
  { name: "María López", role: "Administración / Atención al cliente", match: 92, location: "Reconquista", verified: true, cv: "CV WorkCerca" },
  { name: "Lucas Benítez", role: "Ventas / Comercio", match: 88, location: "Avellaneda", verified: true, cv: "CV WorkCerca" },
  { name: "Sofía Gómez", role: "Asistente de oficina", match: 84, location: "Reconquista", verified: false, cv: "Perfil completo" },
];

const candidateIds: Record<string, string> = {
  "María López": "1",
  "Lucas Benítez": "2",
  "Sofía Gómez": "3",
};

const jobs: Job[] = [
  { title: "Auxiliar administrativo/a", applicants: 18, status: "Activa", location: "Reconquista" },
  { title: "Vendedor/a", applicants: 12, status: "Activa", location: "Avellaneda" },
  { title: "Operario/a de depósito", applicants: 9, status: "En revisión", location: "Reconquista" },
];

const promos: Promo[] = [
  { title: "15% OFF en herramientas seleccionadas", detail: "Promoción para usuarios WorkCerca", until: "31/08/2026" },
  { title: "Instalación bonificada", detail: "Comprando equipo seleccionado", until: "05/09/2026" },
  { title: "Diagnóstico sin cargo", detail: "Servicio técnico adherido", until: "30/08/2026" },
];

export default function EmpresaPage() {
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [companyName] = useState("Empresa Demo WorkCerca");

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const filteredCandidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter((c) =>
      `${c.name} ${c.role} ${c.location}`.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <main className="companyPage">
      {notice && <div className="companyToast">{notice}</div>}

      <aside className="companySidebar">
        <button className="companyLogo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="companyProfile">
          <div className="companyAvatar">E</div>
          <div>
            <strong>{companyName}</strong>
            <span>Empresa verificada ✓</span>
          </div>
        </div>

        <nav className="companyNav">
          <button onClick={() => (window.location.href = "/")}>⌂ <span>Inicio</span></button>
          <button onClick={() => (window.location.href = "/mi-workcerca")}>▣ <span>Mi WorkCerca</span></button>
          <button onClick={() => (window.location.href = "/solicitudes")}>▤ <span>Solicitudes</span></button>
          <button onClick={() => (window.location.href = "/busco-trabajo")}>💼 <span>Busco trabajo / CV</span></button>
          <button className="active">▦ <span>Mi Empresa</span></button>
          <button onClick={() => (window.location.href = "/empresa/publicar-empleo")}>＋ <span>Publicar empleo</span></button>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}>⌕ <span>Buscar candidatos</span></button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>◫ <span>Postulantes</span><b>•</b></button>
          <button onClick={() => (window.location.href = "/mensajes")}>▱ <span>Mensajes</span><b>7</b></button>
          <button onClick={() => (window.location.href = "/videollamadas")}>▣ <span>Videollamadas</span><b>3</b></button>
          <button onClick={() => (window.location.href = "/agenda")}>□ <span>Agenda</span></button>
          <button onClick={() => (window.location.href = "/empresa/entrevistas")}>🎙 <span>Entrevistas</span></button>
          <button onClick={() => (window.location.href = "/empresa/proveedores")}>⌘ <span>Proveedores</span></button>
          <button onClick={() => (window.location.href = "/empresa/productos-servicios")}>▤ <span>Productos / Servicios</span></button>
          <button onClick={() => (window.location.href = "/empresa/promociones")}>★ <span>Promociones</span></button>
          <button onClick={() => (window.location.href = "/empresa/publicidad")}>◎ <span>Publicidad</span></button>
          <button onClick={() => (window.location.href = "/empresa/estadisticas")}>◉ <span>Estadísticas</span></button>
          <button onClick={() => (window.location.href = "/empresa/configuracion")}>⚙ <span>Configuración</span></button>
        </nav>

        <div className="companyTrust">
          <strong>WorkCerca Confianza</strong>
          <p>Empleos, productos, servicios y promociones deben identificarse con información clara y verificable.</p>
        </div>
      </aside>

      <section className="companyMain">
        <header className="companyTop">
          <div>
            <strong>Panel Empresa</strong>
            <span>Contratá, ofrecé, conectá y hacé crecer tu empresa dentro de WorkCerca.</span>
          </div>
          <div className="companyTopActions">
            <button onClick={() => (window.location.href = "/")}>Inicio</button>
            <button onClick={() => (window.location.href = "/mi-workcerca")}>Mi WorkCerca</button>
            <button onClick={() => (window.location.href = "/busco-trabajo")}>CV / Empleo</button>
            <button onClick={() => notify("Notificaciones")}>🔔</button>
            <button onClick={() => (window.location.href = "/mensajes")}>💬</button>
            <button onClick={() => (window.location.href = "/videollamadas")}>📹</button>
          </div>
        </header>

        <div className="companyContent">
          <section className="companyHero">
            <div>
              <span className="eyebrow">EMPRESA · WORKCERCA</span>
              <h1>Encontrá personas, proveedores y oportunidades para crecer.</h1>
              <p>Publicá empleos, descubrí candidatos compatibles, ofrecé productos y servicios, cargá promociones y conectá con profesionales, instituciones y municipios.</p>
            </div>
            <div className="companyAiBox">
              <span>✦ Motor IA WorkCerca</span>
              <strong>Tu empresa también alimenta el ecosistema.</strong>
              <p>Una vacante, una promoción o un servicio puede emerger justo cuando una persona lo necesita.</p>
              <button onClick={() => notify("Motor de oportunidades Empresa")}>Ver oportunidades detectadas</button>
            </div>
          </section>

          <section className="companyQuick">
            <button onClick={() => (window.location.href = "/empresa/publicar-empleo")}><span>＋</span><strong>Publicar empleo</strong><small>Creá una búsqueda laboral</small></button>
            <button onClick={() => (window.location.href = "/empresa/candidatos")}><span>⌕</span><strong>Buscar candidatos</strong><small>Perfiles y CV compatibles</small></button>
            <button onClick={() => (window.location.href = "/empresa/postulantes")}><span>◫</span><strong>Ver postulantes</strong><small>Revisá CV y postulaciones</small></button>
            <button onClick={() => (window.location.href = "/empresa/entrevistas")}><span>▣</span><strong>Entrevistas</strong><small>Agenda y videollamadas</small></button>
            <button onClick={() => (window.location.href = "/empresa/productos-servicios")}><span>▤</span><strong>Productos / Servicios</strong><small>Mostrá lo que ofrecés</small></button>
            <button onClick={() => (window.location.href = "/empresa/promociones")}><span>★</span><strong>Crear promoción</strong><small>Visibilizá una oferta</small></button>
          </section>

          <section className="companyKpis">
            <article><span>💼</span><strong>3</strong><b>Empleos activos</b><small>39 postulaciones</small></article>
            <article><span>👥</span><strong>12</strong><b>Candidatos sugeridos</b><small>Coincidencias altas</small></article>
            <article><span>📹</span><strong>3</strong><b>Entrevistas</b><small>Esta semana</small></article>
            <article><span>★</span><strong>5</strong><b>Promociones activas</b><small>Visibles en WorkCerca</small></article>
            <article><span>🛠</span><strong>8</strong><b>Proveedores guardados</b><small>Profesionales y empresas</small></article>
          </section>

          <div className="companyTwoCol">
            <section className="companyPanel">
              <div className="panelHead"><div><span className="eyebrow dark">EMPLEO</span><h2>Búsquedas laborales activas</h2></div><button onClick={() => (window.location.href = "/empresa/publicar-empleo")}>＋ Nueva búsqueda</button></div>
              <div className="jobTable">
                {jobs.map((job) => (
                  <article key={job.title}>
                    <div><strong>{job.title}</strong><span>⌖ {job.location}</span></div>
                    <b>{job.applicants} postulantes</b><span className="status">{job.status}</span>
                    <button onClick={() => (window.location.href = "/empresa/postulantes")}>Ver →</button>
                  </article>
                ))}
              </div>
            </section>

            <section className="companyPanel">
              <div className="panelHead"><div><span className="eyebrow dark">MOTOR DE COINCIDENCIAS</span><h2>Candidatos recomendados</h2></div></div>
              <input className="candidateSearch" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar candidato, perfil o localidad..." />
              <div className="candidateList">
                {filteredCandidates.map((candidate) => (
                  <article key={candidate.name}>
                    <div className="candidateAvatar">{candidate.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</div>
                    <div><strong>{candidate.name} {candidate.verified && <i>✓</i>}</strong><span>{candidate.role}</span><small>⌖ {candidate.location} · {candidate.cv}</small></div>
                    <div className="candidateMatch"><b>{candidate.match}%</b><span>coincidencia</span></div>
                    <div className="candidateActions"><button onClick={() => (window.location.href = `/empresa/candidatos/${candidateIds[candidate.name] || "1"}`)}>Ver CV</button><button onClick={() => (window.location.href = `/mensajes?candidato=${encodeURIComponent(candidate.name)}&empleo=${encodeURIComponent(candidate.role)}`)}>💬</button><button onClick={() => (window.location.href = `/videollamadas?candidato=${encodeURIComponent(candidate.name)}&empleo=${encodeURIComponent(candidate.role)}`)}>📹</button></div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="companyTwoCol">
            <section className="companyPanel">
              <div className="panelHead"><div><span className="eyebrow dark">VISIBILIDAD COMERCIAL</span><h2>Promociones y ofertas</h2></div><button onClick={() => (window.location.href = "/empresa/promociones")}>＋ Crear promoción</button></div>
              <div className="promoGrid">
                {promos.map((promo) => (
                  <article key={promo.title}><span>Promoción</span><h3>{promo.title}</h3><p>{promo.detail}</p><small>Vigente hasta {promo.until}</small><div><button onClick={() => (window.location.href = "/empresa/promociones")}>Editar</button><button onClick={() => (window.location.href = "/empresa/estadisticas")}>Estadísticas</button></div></article>
                ))}
              </div>
              <div className="aiCommerce"><strong>✦ Cómo participa la IA</strong><p>Si una persona busca “el cosito del baño”, WorkCerca puede interpretar la necesidad y mostrar productos, comercios cercanos, promociones activas y profesionales relacionados.</p></div>
            </section>

            <section className="companyPanel">
              <div className="panelHead"><div><span className="eyebrow dark">PROVEEDORES Y SERVICIOS</span><h2>Conectá con quien tu empresa necesita</h2></div></div>
              <div className="providerActions"><button onClick={() => notify("Buscar profesionales cercanos")}>⌖ Profesionales cercanos</button><button onClick={() => notify("Solicitar presupuesto")}>▧ Solicitar presupuesto</button><button onClick={() => (window.location.href = "/empresa/proveedores")}>⌘ Buscar proveedores</button><button onClick={() => notify("Publicar necesidad")}>＋ Publicar necesidad</button></div>
              <div className="institutionLinks">
                <article><span>🏛</span><div><strong>Municipios</strong><p>Programas, capacitaciones, empleo local y oportunidades territoriales.</p></div><button onClick={() => notify("Conectar con municipios")}>Ver →</button></article>
                <article><span>🎓</span><div><strong>Instituciones</strong><p>Cursos, formación, carreras y capacitación para perfiles que tu empresa necesita.</p></div><button onClick={() => notify("Conectar con instituciones")}>Ver →</button></article>
              </div>
            </section>
          </div>

          <section className="companyActionsBar">
            <button onClick={() => (window.location.href = "/empresa/postulantes")}>◫ Postulantes</button><button onClick={() => (window.location.href = "/mensajes")}>💬 Mensajes</button><button onClick={() => (window.location.href = "/videollamadas")}>📹 Videollamadas</button><button onClick={() => (window.location.href = "/agenda")}>📅 Agenda</button><button onClick={() => (window.location.href = "/empresa/promociones")}>★ Promociones</button><button onClick={() => (window.location.href = "/empresa/publicidad")}>◎ Publicidad</button><button onClick={() => (window.location.href = "/empresa/estadisticas")}>◉ Estadísticas</button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .companyPage{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.companyPage *{box-sizing:border-box}.companyPage button,.companyPage input{font:inherit}.companySidebar{width:250px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;position:sticky;top:0;height:100vh;overflow:auto;flex:none}.companyLogo{border:0;background:transparent;padding:0 4px 22px;cursor:pointer}.companyLogo img{width:190px;height:auto}.companyProfile{display:flex;gap:11px;align-items:center;padding:8px 5px 22px}.companyAvatar{width:48px;height:48px;border-radius:50%;background:#0a97ad;display:grid;place-items:center;font-size:20px;font-weight:900}.companyProfile strong,.companyProfile span{display:block}.companyProfile strong{font-size:13px}.companyProfile span{font-size:9px;color:#41ded9;margin-top:5px}.companyNav{display:grid;gap:4px}.companyNav button{display:flex;align-items:center;gap:10px;border:0;background:transparent;color:#fff;border-radius:9px;padding:11px;text-align:left;cursor:pointer;font-size:11px}.companyNav button span{flex:1}.companyNav button b{background:#1d3551;border-radius:20px;padding:3px 7px;font-size:8px}.companyNav button:hover,.companyNav button.active{background:linear-gradient(90deg,#088fa9,#08718a)}.companyTrust{margin-top:20px;border:1px solid #2e5876;border-radius:12px;padding:14px}.companyTrust strong{color:#38d6d1;font-size:11px}.companyTrust p{font-size:9px;line-height:1.5;color:#d4e1eb}.companyMain{flex:1;min-width:0}.companyTop{height:68px;background:#fff;border-bottom:1px solid #e2e8ef;display:flex;justify-content:space-between;align-items:center;padding:0 28px;position:sticky;top:0;z-index:20}.companyTop strong,.companyTop span{display:block}.companyTop span{font-size:10px;color:#718096;margin-top:3px}.companyTopActions{display:flex;gap:8px;align-items:center}.companyTopActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;color:#17314e;font-size:10px;cursor:pointer}.companyContent{max-width:1220px;margin:auto;padding:28px}.companyHero{display:grid;grid-template-columns:1.4fr .7fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.12em;font-weight:900;color:#38dcd7}.eyebrow.dark{color:#078da8}.companyHero h1{font-size:36px;line-height:1.07;margin:9px 0}.companyHero p{font-size:12px;line-height:1.6;color:#dce8f2;max-width:720px}.companyAiBox{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.companyAiBox>span{font-size:9px;color:#078da8;font-weight:900}.companyAiBox strong{display:block;margin:8px 0;font-size:15px}.companyAiBox p{color:#607185;font-size:10px}.companyAiBox button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:9px 11px;font-size:9px;cursor:pointer}.companyQuick{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin:16px 0}.companyQuick button{border:1px solid #dfe6ed;background:#fff;border-radius:11px;padding:15px;text-align:left;color:#071a3d;cursor:pointer}.companyQuick button>span{display:grid;place-items:center;width:34px;height:34px;border-radius:8px;background:#eaf5fb;color:#087d9b;font-size:17px}.companyQuick strong,.companyQuick small{display:block}.companyQuick strong{font-size:11px;margin:8px 0 3px}.companyQuick small{font-size:8px;color:#718096;line-height:1.3}.companyKpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px}.companyKpis article{background:#fff;border:1px solid #e1e7ed;border-radius:10px;padding:13px;position:relative}.companyKpis article>span{position:absolute;right:10px;top:10px}.companyKpis strong,.companyKpis b,.companyKpis small{display:block}.companyKpis strong{font-size:23px}.companyKpis b{font-size:9px}.companyKpis small{font-size:8px;color:#798698;margin-top:3px}.companyTwoCol{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}.companyPanel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:16px}.panelHead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:12px}.panelHead h2{font-size:18px;margin:4px 0}.panelHead button{border:0;background:#071a3d;color:#fff;border-radius:7px;padding:8px 10px;font-size:8px;cursor:pointer}.jobTable article{display:grid;grid-template-columns:1fr auto auto auto;gap:9px;align-items:center;padding:11px 0;border-bottom:1px solid #edf1f4}.jobTable strong,.jobTable span{display:block}.jobTable strong{font-size:10px}.jobTable span{font-size:8px;color:#718096;margin-top:2px}.jobTable b{font-size:8px}.jobTable .status{background:#e6f7f0;color:#16735a;border-radius:20px;padding:4px 7px}.jobTable button{border:0;background:transparent;color:#078da8;font-size:8px;cursor:pointer}.candidateSearch{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:9px;margin-bottom:7px;outline:0;font-size:9px}.candidateList article{display:grid;grid-template-columns:40px 1fr auto auto;gap:8px;align-items:center;padding:10px 0;border-bottom:1px solid #edf1f4}.candidateAvatar{width:38px;height:38px;border-radius:50%;background:#e8f5f8;color:#087f93;display:grid;place-items:center;font-size:10px;font-weight:900}.candidateList strong,.candidateList span,.candidateList small{display:block}.candidateList strong{font-size:10px}.candidateList strong i{color:#078da8;font-style:normal}.candidateList span{font-size:8px;color:#51657a}.candidateList small{font-size:7px;color:#8290a0}.candidateMatch b,.candidateMatch span{display:block;text-align:center}.candidateMatch b{font-size:11px;color:#16815d}.candidateMatch span{font-size:7px}.candidateActions{display:flex;gap:4px}.candidateActions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px;font-size:8px;cursor:pointer}.promoGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.promoGrid article{border:1px solid #e2e8ee;border-radius:9px;padding:11px}.promoGrid article>span{font-size:7px;color:#078da8;font-weight:900}.promoGrid h3{font-size:10px;margin:5px 0}.promoGrid p,.promoGrid small{font-size:8px;color:#67778a;line-height:1.4}.promoGrid article>div{display:flex;gap:5px;margin-top:8px}.promoGrid button{border:1px solid #dce3ea;background:#fff;border-radius:5px;padding:5px;font-size:7px}.aiCommerce{background:#eefafd;border:1px solid #cde8ec;border-radius:9px;padding:11px;margin-top:10px}.aiCommerce strong{font-size:10px;color:#087f93}.aiCommerce p{font-size:9px;line-height:1.5;color:#53677b}.providerActions{display:grid;grid-template-columns:1fr 1fr;gap:8px}.providerActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:11px;text-align:left;font-size:9px;color:#17314e;cursor:pointer}.institutionLinks{display:grid;gap:8px;margin-top:12px}.institutionLinks article{display:grid;grid-template-columns:34px 1fr auto;gap:9px;align-items:center;border:1px solid #e3e8ee;border-radius:9px;padding:10px}.institutionLinks strong{font-size:10px}.institutionLinks p{font-size:8px;color:#69798c;margin:2px 0}.institutionLinks button{border:0;background:transparent;color:#078da8;font-size:8px;cursor:pointer}.companyActionsBar{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.companyActionsBar button{border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px 8px;font-size:8px;color:#071a3d;cursor:pointer}.companyToast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px;box-shadow:0 12px 30px #0003}@media(max-width:1100px){.companySidebar{width:215px}.companyQuick{grid-template-columns:repeat(3,1fr)}.companyKpis{grid-template-columns:repeat(3,1fr)}.companyTwoCol{grid-template-columns:1fr}.companyActionsBar{grid-template-columns:repeat(4,1fr)}}@media(max-width:760px){.companyPage{display:block}.companySidebar{position:relative;width:100%;height:auto;min-height:0}.companyNav{grid-template-columns:1fr 1fr}.companyTop{position:relative;height:auto;padding:12px}.companyTopActions{flex-wrap:wrap}.companyContent{padding:14px}.companyHero{grid-template-columns:1fr}.companyHero h1{font-size:29px}.companyQuick{grid-template-columns:1fr 1fr}.companyKpis{grid-template-columns:1fr 1fr}.candidateList article{grid-template-columns:38px 1fr}.candidateMatch,.candidateActions{grid-column:2}.promoGrid{grid-template-columns:1fr}.companyActionsBar{grid-template-columns:1fr 1fr}}
      `}</style>
    </main>
  );
}
