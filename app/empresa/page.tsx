"use client";

import { useEffect, useMemo, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";

type Candidate = {
  name: string;
  role: string;
  match: number;
  location: string;
  photo: string;
};

const candidates: Candidate[] = [
  {
    name: "Sofía López",
    role: "Diseñadora UX/UI",
    match: 95,
    location: "Reconquista, Santa Fe",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Lucas Martínez",
    role: "Desarrollador Frontend",
    match: 90,
    location: "Santa Fe, Argentina",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "Camila Gómez",
    role: "Community Manager",
    match: 88,
    location: "Rosario, Santa Fe",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
  },
];

const activity = [
  ["Nueva postulación", "Agustina Pérez a Diseñador UX", "Hace 15 min", "👤"],
  ["Mensaje recibido", "Lucas Martínez te escribió", "Hace 1 hora", "✉"],
  ["Entrevista confirmada", "Entrevista con Sofía López · Mañana 10:00", "Hace 2 horas", "▣"],
  ["Nueva inscripción a pasantía", "Tomás R. · Pasantía de Diseño", "Hace 3 horas", "🎓"],
];

const events = [
  ["09", "MAY", "Entrevista con Sofía López", "10:00 hs", "Online"],
  ["11", "MAY", "Entrevista con Juan Cruz", "15:00 hs", "Presencial"],
  ["13", "MAY", "Reunión con Universidad", "09:30 hs", "Convenio de pasantías"],
];

export default function EmpresaPage() {
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [screen, setScreen] = useState<"panel" | "talento" | "capacitaciones" | "ia">("panel");
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const notify = (text:string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const go = (path:string) => {
    window.location.href = path;
  };

  const filteredCandidates = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return candidates;
    return candidates.filter(c =>
      `${c.name} ${c.role} ${c.location}`.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <main
      className="companyPage"
      style={{
        minHeight: "100vh",
        background: "#f5f8fc",
        opacity: pageReady ? 1 : 0,
        visibility: pageReady ? "visible" : "hidden",
        transition: "opacity 220ms ease-out",
      }}
    >
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => go("/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="sideGroup">
          <span className="groupTitle">EMPRESA</span>
          <button className={screen==="panel" ? "active" : ""} onClick={() => setScreen("panel")}>
            <i>⌂</i><span>Panel / Mi Empresa</span>
          </button>
          <button onClick={() => go("/")}><i>⌂</i><span>Inicio WorkCerca</span></button>
        </div>

        <div className="sideGroup">
          <span className="groupTitle">TALENTO Y RR. HH.</span>
          <button onClick={() => go("/empresa/publicar-empleo")}><i>▣</i><span>Publicar empleo</span></button>
          <button className={screen==="talento" ? "active" : ""} onClick={() => setScreen("talento")}><i>✦</i><span>Talento y RR. HH. con IA</span></button>
          <button onClick={() => go("/empresa/candidatos")}><i>⌕</i><span>Buscar candidatos</span></button>
          <button onClick={() => go("/empresa/postulantes")}><i>♙</i><span>Postulantes</span><b>36</b></button>
          <button onClick={() => go("/empresa/entrevistas")}><i>▦</i><span>Entrevistas</span></button>
          <button onClick={() => go("/empresa/candidatos")}><i>▤</i><span>CV / perfiles profesionales</span></button>
        </div>

        <div className="sideGroup">
          <span className="groupTitle">COMUNICACIÓN</span>
          <button onClick={() => go("/mensajes")}><i>▱</i><span>Mensajes</span><b>8</b></button>
          <button onClick={() => go("/videollamadas")}><i>▣</i><span>Videollamadas</span></button>
          <button onClick={() => go("/agenda")}><i>□</i><span>Agenda</span></button>
        </div>

        <div className="sideGroup">
          <span className="groupTitle">NEGOCIOS</span>
          <button onClick={() => go("/empresa/proveedores")}><i>⌘</i><span>Proveedores</span></button>
          <button onClick={() => go("/empresa/productos-servicios")}><i>▤</i><span>Productos / Servicios</span></button>
          <button onClick={() => go("/empresa/promociones")}><i>★</i><span>Promociones</span></button>
          <button onClick={() => go("/empresa/publicidad")}><i>◎</i><span>Publicidad</span></button>
        </div>

        <div className="sideGroup">
          <span className="groupTitle">DESARROLLO</span>
          <button onClick={() => go("/oportunidades")}><i>🎓</i><span>Pasantías</span></button>
          <button className={screen==="capacitaciones" ? "active" : ""} onClick={() => setScreen("capacitaciones")}><i>▥</i><span>Capacitaciones</span></button>
          <button onClick={() => go("/instituciones")}><i>🏛</i><span>Instituciones / convenios</span></button>
          <button onClick={() => go("/oportunidades")}><i>☆</i><span>Mi Primer Empleo</span></button>
        </div>

        <div className="sideGroup">
          <span className="groupTitle">GESTIÓN</span>
          <button onClick={() => go("/empresa/estadisticas")}><i>◉</i><span>Estadísticas</span></button>
          <button onClick={() => notify("Facturación y planes") }><i>▧</i><span>Facturación y planes</span></button>
          <button onClick={() => go("/empresa/configuracion")}><i>⚙</i><span>Configuración</span></button>
        </div>

        <div className="companyMini">
          <span>DC</span>
          <div><strong>Diseño & Comunicación SRL</strong><small>Empresa verificada ✓</small></div>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div className="identity">
            <span className="companyAvatar">DC</span>
            <div>
              <strong>Diseño & Comunicación SRL <em>✓</em></strong>
              <small>Empresa verificada</small>
            </div>
          </div>
          <div className="topActions">
            <button onClick={() => notify("3 notificaciones nuevas")}>🔔<b>3</b></button>
            <button onClick={() => go("/mensajes")}>✉</button>
            <div className="admin">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Administradora"/>
              <span><strong>Mariana R.</strong><small>Administrador</small></span>
            </div>
          </div>
        </header>

        <div className="content">
          {screen==="panel" && (
            <>
              <section className="welcome">
                <div>
                  <h1>¡Bienvenida, Mariana! 👋</h1>
                  <p>Gestioná tu empresa, encontrá talento y hacé crecer tu equipo.</p>
                </div>
                <button className="editBtn" onClick={() => notify("Editar perfil empresa")}>✎ Editar perfil empresa</button>
              </section>

              <section className="kpis">
                <article><span className="kpiIcon cyan">▣</span><div><strong>12</strong><b>Vacantes activas</b><small>2 nuevas hoy ↗</small></div></article>
                <article><span className="kpiIcon purple">♙</span><div><strong>48</strong><b>Candidatos</b><small>esta semana</small></div></article>
                <article><span className="kpiIcon mint">▦</span><div><strong>7</strong><b>Entrevistas</b><small>próximos 7 días</small></div></article>
                <article><span className="kpiIcon peach">▤</span><div><strong>36</strong><b>Postulaciones</b><small>sin leer</small></div></article>
              </section>

              <section className="aiBanner">
                <span className="aiOrb">✦</span>
                <div>
                  <h2><b>IA WorkCerca</b> te sugiere <em>NUEVO</em></h2>
                  <p>Detectamos <strong>8 candidatos altamente compatibles</strong> con tus vacantes activas y <strong>2 capacitaciones</strong> relacionadas con necesidades de tu equipo.</p>
                </div>
                <button onClick={() => setScreen("ia")}>Ver sugerencias →</button>
              </section>

              <section className="threeCol">
                <article className="card panel">
                  <div className="panelHead"><h3>Actividad reciente</h3><button onClick={() => notify("Actividad completa")}>Ver todo</button></div>
                  {activity.map(([title,detail,time,icon]) => (
                    <div className="activity" key={title}>
                      <span>{icon}</span>
                      <div><strong>{title}</strong><p>{detail}</p></div>
                      <small>{time}</small>
                    </div>
                  ))}
                  <button className="bottomLink" onClick={() => go("/empresa/postulantes")}>Ver toda la actividad →</button>
                </article>

                <article className="card panel">
                  <div className="panelHead"><h3>Candidatos sugeridos por IA</h3><button onClick={() => go("/empresa/candidatos")}>Ver todos</button></div>
                  <input className="candidateSearch" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar candidato..." />
                  {filteredCandidates.map(c => (
                    <div className="candidate" key={c.name}>
                      <img src={c.photo} alt={`Foto de ${c.name}`}/>
                      <div><strong>{c.name}</strong><p>{c.role}</p><small>{c.location}</small></div>
                      <span className="match">{c.match}%<small>match</small></span>
                    </div>
                  ))}
                  <button className="bottomLink" onClick={() => go("/empresa/candidatos")}>Ir a buscar candidatos →</button>
                </article>

                <article className="card panel">
                  <div className="panelHead"><h3>Próximos eventos</h3><button onClick={() => go("/agenda")}>Ver agenda</button></div>
                  {events.map(([day,month,title,time,mode]) => (
                    <div className="event" key={`${day}-${title}`}>
                      <span className="eventDate"><b>{day}</b><small>{month}</small></span>
                      <div><strong>{title}</strong><p>{time}</p><small>{mode}</small></div>
                    </div>
                  ))}
                  <button className="bottomLink" onClick={() => go("/agenda")}>Ir a agenda →</button>
                </article>
              </section>

              <section className="card summary">
                <div className="panelHead"><h3>Resumen de tu empresa</h3><span>Últimos 30 días</span></div>
                <div className="summaryGrid">
                  <article><span className="summaryIcon cyan">♟</span><div><small>Visualizaciones</small><strong>1.248 <em>+16%</em></strong><div className="spark blueLine">╱╲╱╱╲╱╲╱╱╲</div></div></article>
                  <article><span className="summaryIcon purple">♙</span><div><small>Postulaciones</small><strong>256 <em>+27%</em></strong><div className="spark purpleLine">╲╱╲╱╱╲╱╲╱╱</div></div></article>
                  <article><span className="summaryIcon mint">◉</span><div><small>Entrevistas realizadas</small><strong>34 <em>+9%</em></strong><div className="spark greenLine">╱╲╱╲╱╱╲╱╲╱</div></div></article>
                  <article><span className="summaryIcon peach">♟</span><div><small>Contrataciones</small><strong>8 <em>+14%</em></strong><div className="spark orangeLine">╱╱╲╱╲╱╱╲╱╱</div></div></article>
                  <article className="plan"><small>♛ Tu plan actual</small><strong>Empresarial Plus</strong><span>Gestión y herramientas avanzadas</span><button onClick={() => notify("Gestionar plan")}>Gestionar plan</button></article>
                </div>
              </section>

              <section className="rrhhCallout">
                <div>
                  <span className="eyebrow">NUEVA HERRAMIENTA EMPRESA</span>
                  <h2>Talento y RR. HH. con IA</h2>
                  <p>Describí el puesto que necesitás. WorkCerca puede relacionarlo con perfiles laborales compatibles que autorizaron visibilidad, explicarte coincidencias y permitirte invitar a esas personas a conocer la propuesta.</p>
                </div>
                <button onClick={() => setScreen("talento")}>Abrir Talento y RR. HH. →</button>
              </section>
            </>
          )}

          {screen==="talento" && (
            <section className="internal">
              <div className="internalHero">
                <span>✦</span>
                <div>
                  <small>TALENTO Y RR. HH. · IA WORKCERCA</small>
                  <h1>Decinos qué puesto necesitás cubrir.</h1>
                  <p>La IA organiza requisitos, busca coincidencias en perfiles con visibilidad autorizada y te ayuda a invitar candidatos. Nunca contrata automáticamente ni expone datos privados innecesarios.</p>
                </div>
                <button onClick={() => setScreen("panel")}>Volver al Panel</button>
              </div>
              <div className="formGrid">
                <article className="card formCard">
                  <h3>Describir necesidad</h3>
                  <label>Puesto</label><input placeholder="Ej. Administrativo/a"/>
                  <label>Requisitos principales</label><textarea placeholder="Ej. Excel intermedio, atención al público, disponibilidad por la tarde..."/>
                  <label>Ubicación / modalidad</label><input placeholder="Reconquista · Presencial / Híbrido / Remoto"/>
                  <button onClick={() => notify("La IA preparó los requisitos del puesto")}>✦ Analizar con IA</button>
                </article>
                <article className="card matchCard">
                  <h3>Cómo funciona</h3>
                  <div><b>1. Necesidad real</b><p>RR. HH. describe el puesto y lo que realmente necesita.</p></div>
                  <div><b>2. Coincidencias explicables</b><p>WorkCerca muestra qué requisitos cumple cada perfil.</p></div>
                  <div><b>3. Invitación</b><p>La empresa puede invitar a la persona a conocer/postularse al puesto.</p></div>
                  <div><b>4. Brechas</b><p>Si faltan competencias, la IA puede sugerir capacitación relacionada.</p></div>
                </article>
              </div>
              <section className="card panel candidatesWide">
                <div className="panelHead"><h3>Perfiles compatibles de ejemplo</h3><button onClick={() => go("/empresa/candidatos")}>Abrir búsqueda completa</button></div>
                <div className="candidateGrid">
                  {candidates.map(c => <div className="candidate big" key={c.name}><img src={c.photo} alt=""/><div><strong>{c.name}</strong><p>{c.role}</p><small>{c.location}</small></div><span className="match">{c.match}%<small>match</small></span></div>)}
                </div>
              </section>
            </section>
          )}

          {screen==="capacitaciones" && (
            <section className="internal">
              <div className="internalHero blueHero">
                <span>▥</span>
                <div><small>DESARROLLO DE EQUIPO</small><h1>Capacitaciones para tu empresa</h1><p>Conectá necesidades reales del equipo con formación de instituciones, municipios y propuestas online.</p></div>
                <button onClick={() => setScreen("panel")}>Volver al Panel</button>
              </div>
              <div className="internalCards">
                <article className="card"><h3>Formación sugerida por IA</h3><p>Marketing Digital · Gestión de proyectos · Herramientas colaborativas.</p><button onClick={() => go("/capacitaciones")}>Ver Capacitaciones</button></article>
                <article className="card"><h3>Instituciones</h3><p>Encontrá instituciones y convenios relacionados con las necesidades de tu equipo.</p><button onClick={() => go("/instituciones")}>Ver instituciones</button></article>
                <article className="card"><h3>Brechas de habilidades</h3><p>La IA puede detectar habilidades faltantes de manera agregada y sugerir formación, sin inventar capacidades.</p><button onClick={() => notify("Analizando necesidades de capacitación")}>Analizar</button></article>
              </div>
            </section>
          )}

          {screen==="ia" && (
            <section className="internal">
              <div className="internalHero aiHero">
                <span>✦</span>
                <div><small>MOTOR TRANSVERSAL</small><h1>IA WorkCerca para Empresa</h1><p>Talento, RR. HH., capacitación, proveedores, oportunidades y análisis conectados en un mismo motor.</p></div>
                <button onClick={() => setScreen("panel")}>Volver al Panel</button>
              </div>
              <div className="internalCards">
                <article className="card"><h3>8 candidatos compatibles</h3><p>Coincidencias basadas en requisitos y datos visibles autorizados.</p><button onClick={() => setScreen("talento")}>Ver Talento y RR. HH.</button></article>
                <article className="card"><h3>2 capacitaciones relacionadas</h3><p>Formación vinculada con necesidades detectadas en vacantes activas.</p><button onClick={() => setScreen("capacitaciones")}>Ver formación</button></article>
                <article className="card"><h3>Oportunidades del ecosistema</h3><p>Instituciones, municipios, profesionales, proveedores y emprendedores pueden conectarse con necesidades reales de la empresa.</p><button onClick={() => go("/oportunidades")}>Ver oportunidades</button></article>
              </div>
            </section>
          )}
        </div>
      </section>

      <style jsx>{`
        .companyPage{min-height:100vh;background:#f5f8fc;color:#10203a;font-family:Inter,Arial,sans-serif;display:flex}.companyPage *{box-sizing:border-box}.companyPage button,.companyPage input,.companyPage textarea{font:inherit}.sidebar{width:285px;min-height:100vh;height:100vh;overflow:auto;position:sticky;top:0;background:linear-gradient(180deg,#071b35,#082742);color:#fff;padding:20px 14px;flex:none}.logo{border:0;background:transparent;padding:0 8px 18px;cursor:pointer}.logo img{width:205px;height:auto}.sideGroup{display:grid;gap:3px;margin-bottom:16px}.groupTitle{font-size:9px;letter-spacing:.09em;color:#aebed0;padding:0 10px 7px;border-bottom:1px solid rgba(255,255,255,.13);margin-bottom:2px}.sideGroup button{border:0;background:transparent;color:#eef5ff;min-height:38px;border-radius:8px;padding:0 10px;display:grid;grid-template-columns:24px 1fr auto;gap:7px;align-items:center;text-align:left;font-size:10px}.sideGroup button i{font-style:normal;font-size:14px}.sideGroup button b{font-size:7px;background:#0f7bef;border-radius:99px;padding:4px 7px}.sideGroup button:hover,.sideGroup button.active{background:linear-gradient(90deg,#0d78ee,#13bfd1);color:#fff}.companyMini{margin-top:13px;background:rgba(3,19,38,.55);border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px;display:grid;grid-template-columns:40px 1fr;gap:9px;align-items:center}.companyMini>span{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#4157e5,#18b5ce);display:grid;place-items:center;font-size:10px;font-weight:900}.companyMini strong,.companyMini small{display:block}.companyMini strong{font-size:9px}.companyMini small{font-size:7px;color:#45c3ee;margin-top:3px}.main{flex:1;min-width:0}.topbar{height:82px;background:#fff;border-bottom:1px solid #e3e9f1;display:flex;align-items:center;justify-content:space-between;padding:0 26px;position:sticky;top:0;z-index:30}.identity{display:flex;align-items:center;gap:12px}.companyAvatar{width:48px;height:48px;border-radius:50%;background:#081a32;color:#fff;display:grid;place-items:center;font-weight:900}.identity strong,.identity small{display:block}.identity strong{font-size:15px}.identity strong em{font-style:normal;color:#0872eb}.identity small{font-size:9px;color:#67788c;margin-top:4px}.topActions{display:flex;gap:13px;align-items:center}.topActions>button{border:0;background:transparent;position:relative;font-size:16px}.topActions>button b{position:absolute;top:-8px;right:-7px;width:16px;height:16px;border-radius:50%;background:#ef3434;color:#fff;display:grid;place-items:center;font-size:7px}.admin{display:flex;align-items:center;gap:8px}.admin img{width:38px;height:38px;border-radius:50%;object-fit:cover}.admin strong,.admin small{display:block}.admin strong{font-size:9px}.admin small{font-size:7px;color:#68798e}.content{max-width:1260px;margin:auto;padding:26px}.welcome{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.welcome h1{margin:0;font-size:28px}.welcome p{font-size:11px;color:#65778d}.editBtn{border:1px solid #dae4ef;background:#fff;color:#0866d1;border-radius:8px;padding:9px 13px;font-size:8px;font-weight:900}.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.kpis article{background:#fff;border:1px solid #e0e7f0;border-radius:14px;min-height:125px;padding:18px;display:grid;grid-template-columns:58px 1fr;gap:15px;align-items:center;box-shadow:0 8px 24px rgba(20,49,88,.045)}.kpiIcon{width:54px;height:54px;border-radius:14px;display:grid;place-items:center;font-size:23px}.cyan{background:#dff6fb;color:#0798c5}.purple{background:#efe7ff;color:#7545e8}.mint{background:#e3fbf3;color:#18a978}.peach{background:#fff0df;color:#ef9015}.kpis strong,.kpis b,.kpis small{display:block}.kpis strong{font-size:26px}.kpis b{font-size:10px;margin-top:5px}.kpis small{font-size:8px;color:#52708f;margin-top:5px}.aiBanner{margin:17px 0;background:#fff;border:1px solid #e0e6ef;border-radius:14px;padding:20px;display:grid;grid-template-columns:65px 1fr auto;align-items:center;gap:16px}.aiOrb{width:58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#1289ff,#6352f5);color:#fff;display:grid;place-items:center;font-size:26px}.aiBanner h2{font-size:17px;margin:0}.aiBanner h2 b{color:#0871e8}.aiBanner h2 em{font-style:normal;font-size:7px;color:#fff;background:#7854e9;border-radius:99px;padding:4px 7px;margin-left:7px}.aiBanner p{font-size:9px;color:#516982;line-height:1.5}.aiBanner button{border:0;background:linear-gradient(90deg,#0875ed,#7749ed);color:#fff;border-radius:8px;padding:10px 14px;font-size:8px;font-weight:900}.threeCol{display:grid;grid-template-columns:1fr 1.05fr .8fr;gap:14px}.card{background:#fff;border:1px solid #e0e7f0;border-radius:14px;box-shadow:0 8px 24px rgba(20,49,88,.04)}.panel{padding:16px}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}.panelHead h3{font-size:13px;margin:0}.panelHead button{border:0;background:transparent;color:#0872e9;font-size:8px;font-weight:900}.panelHead>span{font-size:8px;color:#718198}.activity{display:grid;grid-template-columns:38px 1fr auto;gap:9px;align-items:center;padding:9px 0;border-bottom:1px solid #edf1f6}.activity>span{width:34px;height:34px;border-radius:9px;background:#f0f5fb;display:grid;place-items:center}.activity strong,.activity p,.activity small{display:block}.activity strong{font-size:9px}.activity p{font-size:7px;color:#57708a;margin:3px 0}.activity small{font-size:7px;color:#8190a0}.bottomLink{width:100%;border:0;background:transparent;color:#0870e6;font-size:8px;font-weight:900;padding-top:11px}.candidateSearch{width:100%;border:1px solid #dde5ef;border-radius:7px;padding:8px;font-size:8px}.candidate{display:grid;grid-template-columns:42px 1fr auto;gap:9px;align-items:center;padding:10px 0;border-bottom:1px solid #edf1f6}.candidate img{width:40px;height:40px;border-radius:50%;object-fit:cover}.candidate strong,.candidate p,.candidate small{display:block}.candidate strong{font-size:8px}.candidate p{font-size:7px;color:#506982;margin:3px 0}.candidate small{font-size:6px;color:#7d8da0}.match{width:45px;height:45px;border:2px solid #56d4a5;border-radius:50%;display:grid;place-items:center;color:#159664;font-size:9px;font-weight:900}.match small{font-size:5px;color:#159664}.event{display:grid;grid-template-columns:52px 1fr;gap:9px;padding:11px 0;border-bottom:1px solid #edf1f6}.eventDate{background:#f1f5fa;border-radius:8px;padding:7px;text-align:center}.eventDate b,.eventDate small{display:block}.eventDate b{font-size:16px}.eventDate small{font-size:6px}.event strong,.event p,.event small{display:block}.event strong{font-size:8px}.event p{font-size:7px;color:#4f6c88;margin:3px 0}.event small{font-size:6px;color:#7b899a}.summary{margin-top:14px;padding:16px}.summaryGrid{display:grid;grid-template-columns:repeat(4,1fr) 1.05fr}.summaryGrid article{padding:8px 14px;border-right:1px solid #e8edf3;display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:start}.summaryGrid article:last-child{border-right:0}.summaryIcon{width:34px;height:34px;border-radius:9px;display:grid;place-items:center}.summaryGrid small,.summaryGrid strong{display:block}.summaryGrid small{font-size:7px;color:#677c91}.summaryGrid strong{font-size:18px;margin-top:5px}.summaryGrid strong em{font-size:7px;font-style:normal;color:#19a267}.spark{font-size:13px;letter-spacing:-4px;margin-top:9px}.blueLine{color:#1280f5}.purpleLine{color:#8151ec}.greenLine{color:#17af83}.orangeLine{color:#f09517}.plan{display:block!important}.plan strong{font-size:12px!important}.plan span{display:block;font-size:7px;color:#6d7d8e;margin:5px 0 8px}.plan button{width:100%;border:1px solid #dbe3ec;background:#fff;color:#0870df;border-radius:7px;padding:7px;font-size:7px;font-weight:900}.rrhhCallout{margin-top:14px;background:linear-gradient(135deg,#071c36,#0e4e8c);color:#fff;border-radius:14px;padding:22px;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}.eyebrow{font-size:7px;letter-spacing:.08em;color:#77cfff}.rrhhCallout h2{margin:4px 0;font-size:20px}.rrhhCallout p{font-size:9px;line-height:1.55;color:#d6e5f4;max-width:780px}.rrhhCallout button{border:0;background:#fff;color:#0864c8;border-radius:8px;padding:10px 13px;font-size:8px;font-weight:900}.internalHero{background:linear-gradient(135deg,#071c36,#135a9c);color:#fff;border-radius:15px;padding:22px;display:grid;grid-template-columns:58px 1fr auto;gap:14px;align-items:center}.internalHero>span{width:54px;height:54px;border-radius:15px;background:#ffffff22;display:grid;place-items:center;font-size:25px}.internalHero small{font-size:7px;color:#7fd6ff}.internalHero h1{margin:4px 0;font-size:23px}.internalHero p{font-size:9px;line-height:1.55;color:#e1ecf7}.internalHero button{border:0;background:#fff;color:#0b62c6;border-radius:8px;padding:9px 12px;font-size:8px;font-weight:900}.blueHero{background:linear-gradient(135deg,#0d5eaf,#1385df)}.aiHero{background:linear-gradient(135deg,#26195f,#0c5fab)}.formGrid{display:grid;grid-template-columns:1.2fr .8fr;gap:14px;margin-top:14px}.formCard,.matchCard{padding:18px}.formCard h3,.matchCard h3{margin:0 0 12px;font-size:14px}.formCard label{display:block;font-size:8px;font-weight:900;margin:10px 0 5px}.formCard input,.formCard textarea{width:100%;border:1px solid #dce4ed;border-radius:8px;padding:9px;font-size:8px}.formCard textarea{min-height:105px;resize:vertical}.formCard button,.matchCard button,.internalCards button{border:0;background:#0c73e8;color:#fff;border-radius:7px;padding:8px 10px;font-size:8px;font-weight:900;margin-top:10px}.matchCard>div{padding:10px 0;border-bottom:1px solid #edf1f5}.matchCard b{font-size:9px}.matchCard p{font-size:8px;color:#61758a}.candidatesWide{margin-top:14px}.candidateGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.candidate.big{border:1px solid #e4e9ef;border-radius:9px;padding:10px}.internalCards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}.internalCards article{padding:18px}.internalCards h3{font-size:13px;margin:0 0 7px}.internalCards p{font-size:8px;color:#607387;line-height:1.5}.toast{position:fixed;right:22px;top:95px;z-index:100;background:#071c36;color:#fff;border-radius:9px;padding:12px 16px;font-size:9px;box-shadow:0 12px 30px rgba(0,0,0,.22)}
        @media(max-width:1100px){.sidebar{width:230px}.kpis{grid-template-columns:1fr 1fr}.threeCol{grid-template-columns:1fr 1fr}.threeCol article:last-child{grid-column:1/-1}.summaryGrid{grid-template-columns:1fr 1fr}.summaryGrid article{border-bottom:1px solid #e8edf3}.formGrid{grid-template-columns:1fr}.candidateGrid,.internalCards{grid-template-columns:1fr 1fr}}
        @media(max-width:760px){.companyPage{display:block}.sidebar{position:relative;width:100%;height:auto;min-height:0}.topbar{position:relative}.content{padding:14px}.welcome{align-items:flex-start;gap:10px}.kpis,.threeCol,.summaryGrid,.candidateGrid,.internalCards{grid-template-columns:1fr}.threeCol article:last-child{grid-column:auto}.aiBanner,.internalHero{grid-template-columns:48px 1fr}.aiBanner button,.internalHero button{grid-column:1/-1}.rrhhCallout{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
