"use client";

import { useMemo, useState } from "react";
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
  ["Nueva postulación", "Agustina Pérez se postuló a Diseñador UX", "Hace 15 min", "👤"],
  ["Mensaje recibido", "Lucas Martínez te envió un mensaje", "Hace 1 hora", "✉"],
  ["Entrevista confirmada", "Entrevista con Sofía López · Mañana 10:00", "Hace 2 horas", "▣"],
  ["Nueva inscripción a pasantía", "Tomás R. se inscribió a Pasantía de Diseño", "Hace 3 horas", "🎓"],
];

const events = [
  ["09", "AGO", "Entrevista con Sofía López", "10:00 hs", "Virtual"],
  ["11", "AGO", "Entrevista con Juan Cruz", "15:30 hs", "Presencial"],
  ["13", "AGO", "Reunión con Universidad", "09:00 hs", "Convenio de pasantías"],
];

export default function EmpresaPage() {
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [internalScreen, setInternalScreen] = useState<"panel" | "capacitaciones" | "ia">("panel");

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const go = (path: string) => {
    window.location.href = path;
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
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => go("/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="sidebarGroup">
          <span className="groupTitle">EMPRESA</span>
          <button className={internalScreen === "panel" ? "active" : ""} onClick={() => setInternalScreen("panel")}>
            <i>⌂</i><span>Panel / Mi Empresa</span>
          </button>
          <button onClick={() => go("/")}>
            <i>⌂</i><span>Inicio WorkCerca</span>
          </button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">TALENTO Y EMPLEO</span>
          <button onClick={() => go("/empresa/publicar-empleo")}><i>▣</i><span>Publicar empleo</span></button>
          <button onClick={() => go("/empresa/candidatos")}><i>⌕</i><span>Buscar candidatos</span></button>
          <button onClick={() => go("/empresa/postulantes")}><i>👥</i><span>Postulantes</span><b>36</b></button>
          <button onClick={() => go("/empresa/entrevistas")}><i>▦</i><span>Entrevistas</span></button>
          <button onClick={() => go("/empresa/candidatos")}><i>▤</i><span>CV / perfiles profesionales</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">COMUNICACIÓN</span>
          <button onClick={() => go("/mensajes")}><i>💬</i><span>Mensajes</span><b>5</b></button>
          <button onClick={() => go("/videollamadas")}><i>▣</i><span>Videollamadas</span></button>
          <button onClick={() => go("/agenda")}><i>□</i><span>Agenda</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">NEGOCIOS</span>
          <button onClick={() => go("/empresa/proveedores")}><i>⌘</i><span>Proveedores</span></button>
          <button onClick={() => go("/empresa/productos-servicios")}><i>▤</i><span>Productos / Servicios</span></button>
          <button onClick={() => go("/empresa/promociones")}><i>★</i><span>Promociones</span></button>
          <button onClick={() => go("/empresa/publicidad")}><i>◎</i><span>Publicidad</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">DESARROLLO</span>
          <button onClick={() => go("/oportunidades")}><i>🎓</i><span>Pasantías</span></button>
          <button className={internalScreen === "capacitaciones" ? "active" : ""} onClick={() => setInternalScreen("capacitaciones")}>
            <i>▥</i><span>Capacitaciones</span>
          </button>
          <button onClick={() => go("/instituciones")}><i>🏛</i><span>Instituciones / convenios</span></button>
          <button onClick={() => go("/oportunidades")}><i>☆</i><span>Mi Primer Empleo</span></button>
        </div>

        <div className="sidebarGroup">
          <span className="groupTitle">GESTIÓN</span>
          <button onClick={() => go("/empresa/estadisticas")}><i>◉</i><span>Estadísticas</span></button>
          <button onClick={() => go("/empresa/configuracion")}><i>⚙</i><span>Configuración</span></button>
        </div>

        <div className="aiSidebar">
          <strong>✦ IA WorkCerca</strong>
          <p>Tu asistente contextual para talento, formación, proveedores y oportunidades.</p>
          <button onClick={() => setInternalScreen("ia")}>✦ Abrir asistente</button>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div className="companyIdentity">
            <span className="companyMark">DC</span>
            <div>
              <strong>Diseño & Comunicación SRL <em>✓</em></strong>
              <small>Empresa verificada</small>
            </div>
          </div>
          <div className="topActions">
            <button onClick={() => notify("3 notificaciones nuevas")}>🔔 <b>3</b></button>
            <button onClick={() => go("/mensajes")}>✉</button>
            <div className="admin">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Administradora de empresa"
              />
              <span><strong>Mariana R.</strong><small>Administradora</small></span>
            </div>
          </div>
        </header>

        <div className="content">
          {internalScreen === "panel" && (
            <>
              <section className="welcome">
                <div>
                  <h1>¡Bienvenida, Mariana! 👋</h1>
                  <p>Gestioná tu empresa, encontrá talento y hacé crecer tu equipo.</p>
                </div>
                <div className="dateCard">▦ <span>Panel Empresa · WorkCerca</span></div>
              </section>

              <section className="kpis">
                <article><span className="kpiIcon blue">▣</span><strong>12</strong><b>Vacantes activas</b><small>2 nuevas hoy ↑</small></article>
                <article><span className="kpiIcon green">👥</span><strong>48</strong><b>Candidatos</b><small>esta semana ↑</small></article>
                <article><span className="kpiIcon violet">▦</span><strong>7</strong><b>Entrevistas</b><small>próximos 7 días</small></article>
                <article><span className="kpiIcon orange">▤</span><strong>36</strong><b>Postulaciones</b><small>sin leer ●</small></article>
              </section>

              <section className="aiSuggestion">
                <span className="aiOrb">✦</span>
                <div>
                  <h2><b>IA WorkCerca</b> te sugiere <em>NUEVO</em></h2>
                  <p>Detectamos <strong>8 candidatos altamente compatibles</strong> con tus vacantes activas y <strong>2 capacitaciones</strong> relacionadas con necesidades de tu equipo.</p>
                </div>
                <button onClick={() => setInternalScreen("ia")}>Ver sugerencias →</button>
              </section>

              <section className="dashboardGrid">
                <article className="panel">
                  <div className="panelHead"><h3>Actividad reciente</h3><button onClick={() => notify("Actividad completa")}>Ver todo</button></div>
                  {activity.map(([title,detail,time,icon]) => (
                    <div className="activity" key={title}>
                      <span>{icon}</span><div><strong>{title}</strong><p>{detail}</p><small>{time}</small></div>
                    </div>
                  ))}
                  <button className="panelLink" onClick={() => go("/empresa/postulantes")}>Ver toda la actividad →</button>
                </article>

                <article className="panel">
                  <div className="panelHead"><h3>Candidatos sugeridos por IA</h3><button onClick={() => go("/empresa/candidatos")}>Ver todos</button></div>
                  <input className="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar candidato..." />
                  {filteredCandidates.map((c) => (
                    <div className="candidate" key={c.name}>
                      <img src={c.photo} alt={`Foto de ${c.name}`} />
                      <div><strong>{c.name}</strong><p>{c.role}</p><small>{c.location}</small></div>
                      <span className="match">{c.match}%<small>Match</small></span>
                    </div>
                  ))}
                  <button className="panelLink" onClick={() => go("/empresa/candidatos")}>Ir a buscar candidatos →</button>
                </article>

                <article className="panel">
                  <div className="panelHead"><h3>Próximos eventos</h3><button onClick={() => go("/agenda")}>Ver agenda</button></div>
                  {events.map(([day,month,title,time,mode]) => (
                    <div className="event" key={`${day}-${title}`}>
                      <span className="eventDate"><b>{day}</b><small>{month}</small></span>
                      <div><strong>{title}</strong><p>{time}</p><small>{mode}</small></div>
                    </div>
                  ))}
                  <button className="panelLink" onClick={() => go("/agenda")}>Ir a agenda →</button>
                </article>
              </section>

              <section className="summary panel">
                <div className="panelHead"><h3>Resumen de tu empresa</h3><span>Últimos 30 días</span></div>
                <div className="summaryGrid">
                  <article><small>Visitas a vacantes</small><strong>1.248 <em>+18%</em></strong><div className="spark blueLine">╱╲╱╱╲╱╲╱╱╲</div></article>
                  <article><small>Postulaciones</small><strong>256 <em>+22%</em></strong><div className="spark greenLine">╲╱╲╱╱╲╱╲╱╱</div></article>
                  <article><small>Entrevistas realizadas</small><strong>34 <em>+13%</em></strong><div className="spark violetLine">╱╲╱╲╱╱╲╱╲╱</div></article>
                  <article><small>Contrataciones</small><strong>8 <em>+14%</em></strong><div className="spark orangeLine">╱╱╲╱╲╱╱╲╱╱</div></article>
                </div>
              </section>

              <section className="ecosystem panel">
                <div className="panelHead"><h3>Conectate con el ecosistema WorkCerca</h3><button onClick={() => go("/")}>Ver todo el ecosistema</button></div>
                <div className="ecoGrid">
                  <article>
                    <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=450&q=80" alt="Equipo profesional reunido" />
                    <strong>Instituciones</strong><p>Generá convenios y pasantías.</p><button onClick={() => go("/instituciones")}>Ir</button>
                  </article>
                  <article>
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=450&q=80" alt="Personas capacitándose" />
                    <strong>Capacitaciones</strong><p>Formá tu equipo con nuevas habilidades.</p><button onClick={() => setInternalScreen("capacitaciones")}>Ir</button>
                  </article>
                  <article>
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=450&q=80" alt="Jóvenes profesionales trabajando" />
                    <strong>Mi Primer Empleo</strong><p>Dale una primera oportunidad a nuevos talentos.</p><button onClick={() => go("/oportunidades")}>Ir</button>
                  </article>
                  <article>
                    <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=450&q=80" alt="Estudiantes universitarios" />
                    <strong>Feria de Carreras</strong><p>Conocé futuros profesionales e instituciones.</p><button onClick={() => go("/feria-de-carreras")}>Ir</button>
                  </article>
                </div>
              </section>

              <section className="quote panel">
                <div>
                  <span>“</span>
                  <p>El talento gana partidos, pero el trabajo en equipo y la inteligencia ganan campeonatos.</p>
                  <small>— Michael Jordan</small>
                </div>
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80" alt="Equipo de personas trabajando juntas" />
              </section>
            </>
          )}

          {internalScreen === "capacitaciones" && (
            <section className="internalPage">
              <div className="internalHero">
                <span>▥</span>
                <div><h1>Capacitaciones para tu empresa</h1><p>Detectá habilidades que tu equipo puede fortalecer y conectate con instituciones y programas de formación.</p></div>
                <button onClick={() => setInternalScreen("panel")}>Volver al Panel</button>
              </div>
              <div className="internalGrid">
                <article className="panel"><h3>Formación recomendada por IA</h3><p>Marketing Digital · Gestión de proyectos · Herramientas colaborativas.</p><b>Basado en necesidades declaradas, nunca en capacidades inventadas.</b></article>
                <article className="panel"><h3>Instituciones cercanas</h3><p>Explorá propuestas de instituciones dentro del ecosistema WorkCerca.</p><button onClick={() => go("/instituciones")}>Ver instituciones</button></article>
                <article className="panel"><h3>Capacitación interna</h3><p>Prepará una necesidad de formación para tu equipo. El módulo Capacitaciones completo se integrará sin romper este panel.</p><button onClick={() => notify("Necesidad de capacitación preparada")}>Crear necesidad</button></article>
              </div>
            </section>
          )}

          {internalScreen === "ia" && (
            <section className="internalPage">
              <div className="internalHero aiHero">
                <span>✦</span>
                <div><h1>IA WorkCerca para Empresa</h1><p>Un asistente contextual que conecta talento, formación, proveedores y oportunidades con información verificable.</p></div>
                <button onClick={() => setInternalScreen("panel")}>Volver al Panel</button>
              </div>
              <div className="internalGrid">
                <article className="panel"><h3>8 candidatos compatibles</h3><p>Coincidencias calculadas sobre datos disponibles del perfil y CV.</p><button onClick={() => go("/empresa/candidatos")}>Ver candidatos</button></article>
                <article className="panel"><h3>2 necesidades de capacitación</h3><p>La IA puede sugerir formación cuando detecta una brecha, no inventar una habilidad.</p><button onClick={() => setInternalScreen("capacitaciones")}>Ver formación</button></article>
                <article className="panel"><h3>Conexiones del ecosistema</h3><p>Instituciones, municipios, profesionales y emprendedores pueden aportar soluciones a necesidades reales de la empresa.</p><button onClick={() => go("/")}>Ver WorkCerca</button></article>
              </div>
            </section>
          )}
        </div>
      </section>

      <style jsx>{`
        .companyPage{min-height:100vh;background:#f7f9fc;color:#0b1738;font-family:Inter,Arial,sans-serif;display:flex}.companyPage *{box-sizing:border-box}.companyPage button,.companyPage input{font:inherit}
        .sidebar{width:255px;min-height:100vh;height:100vh;overflow:auto;position:sticky;top:0;flex:none;background:linear-gradient(180deg,#061a35,#062b50);padding:20px 14px;color:#fff}.logo{border:0;background:transparent;padding:0 4px 20px;cursor:pointer}.logo img{width:195px;height:auto}
        .sidebarGroup{display:grid;gap:3px;margin-bottom:17px}.groupTitle{font-size:9px;letter-spacing:.08em;color:#c7d5e7;padding:0 9px 7px;border-bottom:1px solid rgba(255,255,255,.15);margin-bottom:3px}.sidebarGroup button{border:0;background:transparent;color:#fff;border-radius:8px;min-height:37px;padding:0 9px;display:grid;grid-template-columns:24px 1fr auto;gap:7px;align-items:center;text-align:left;font-size:10px;cursor:pointer}.sidebarGroup button i{font-style:normal;font-size:14px}.sidebarGroup button b{font-size:8px;background:#1171ef;border-radius:99px;padding:3px 6px}.sidebarGroup button:hover,.sidebarGroup button.active{background:linear-gradient(90deg,#1374ed,#0b63cc)}
        .aiSidebar{border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:14px;margin-top:12px;background:rgba(8,30,60,.62)}.aiSidebar strong{font-size:13px}.aiSidebar p{font-size:10px;line-height:1.55;color:#d2deeb}.aiSidebar button{width:100%;border:0;background:#1171ef;color:#fff;border-radius:8px;padding:9px;font-size:9px;font-weight:900}
        .main{flex:1;min-width:0}.topbar{height:75px;background:#fff;border-bottom:1px solid #e4e8ef;display:flex;justify-content:space-between;align-items:center;padding:0 28px;position:sticky;top:0;z-index:20}.companyIdentity{display:flex;align-items:center;gap:10px}.companyMark{width:43px;height:43px;border-radius:50%;background:#071a36;color:#fff;display:grid;place-items:center;font-weight:1000}.companyIdentity strong,.companyIdentity small{display:block}.companyIdentity strong{font-size:15px}.companyIdentity strong em{font-style:normal;color:#0b72ef}.companyIdentity small{font-size:9px;color:#607188;margin-top:3px}.topActions{display:flex;align-items:center;gap:11px}.topActions>button{border:0;background:transparent;font-size:16px;position:relative}.topActions>button b{position:absolute;right:-5px;top:-7px;background:#ef3f3f;color:#fff;border-radius:50%;font-size:7px;width:16px;height:16px;display:grid;place-items:center}.admin{display:flex;align-items:center;gap:8px}.admin img{width:38px;height:38px;border-radius:50%;object-fit:cover}.admin strong,.admin small{display:block}.admin strong{font-size:10px}.admin small{font-size:8px;color:#69788a}
        .content{max-width:1200px;margin:auto;padding:30px 28px}.welcome{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.welcome h1{font-size:27px;margin:0}.welcome p{font-size:12px;color:#607087;margin:5px 0}.dateCard{border:1px solid #dce3ec;background:#fff;border-radius:9px;padding:10px 13px;font-size:9px;color:#415570}
        .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.kpis article{background:#fff;border:1px solid #e0e6ee;border-radius:14px;padding:17px;min-height:145px;position:relative;box-shadow:0 8px 20px rgba(21,47,83,.04)}.kpiIcon{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;font-size:22px}.kpiIcon.blue{background:#e6f0ff;color:#0870ec}.kpiIcon.green{background:#e8f7ef;color:#15a05a}.kpiIcon.violet{background:#f0e8ff;color:#7644e7}.kpiIcon.orange{background:#fff3df;color:#ed930e}.kpis strong{position:absolute;left:77px;top:30px;font-size:26px}.kpis b,.kpis small{display:block}.kpis b{font-size:10px;margin-top:13px}.kpis small{font-size:9px;color:#66778b;margin-top:10px}
        .aiSuggestion{display:grid;grid-template-columns:58px 1fr auto;gap:15px;align-items:center;margin:18px 0;background:linear-gradient(90deg,#eef5ff,#f7faff);border:1px solid #dbe8fa;border-radius:14px;padding:20px}.aiOrb{width:54px;height:54px;border-radius:50%;background:#1473ef;color:#fff;display:grid;place-items:center;font-size:25px}.aiSuggestion h2{font-size:17px;margin:0}.aiSuggestion h2 b{color:#116ce1}.aiSuggestion h2 em{font-size:7px;font-style:normal;background:#1473ef;color:#fff;border-radius:99px;padding:4px 7px;margin-left:6px}.aiSuggestion p{font-size:10px;color:#4f6379;line-height:1.55}.aiSuggestion button{border:0;background:#1171ef;color:#fff;border-radius:9px;padding:11px 16px;font-size:9px;font-weight:900}
        .dashboardGrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:13px}.panel{background:#fff;border:1px solid #e0e6ee;border-radius:14px;padding:16px;box-shadow:0 8px 20px rgba(21,47,83,.04)}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px}.panelHead h3{font-size:13px;margin:0}.panelHead button{border:0;background:transparent;color:#086eed;font-size:8px;font-weight:900}.panelHead>span{font-size:8px;color:#65768c}
        .activity{display:grid;grid-template-columns:34px 1fr;gap:9px;padding:10px 0;border-bottom:1px solid #edf1f5}.activity>span{width:31px;height:31px;border-radius:50%;background:#eaf2ff;display:grid;place-items:center}.activity strong,.activity p,.activity small{display:block}.activity strong{font-size:9px}.activity p{font-size:8px;color:#52677d;margin:3px 0}.activity small{font-size:7px;color:#8190a0;text-align:right}.panelLink{width:100%;border:0;background:transparent;color:#0870ed;font-size:8px;font-weight:900;padding-top:11px}.search{width:100%;border:1px solid #dce4ec;border-radius:8px;padding:8px;margin-bottom:4px;font-size:8px}
        .candidate{display:grid;grid-template-columns:43px 1fr auto;gap:9px;align-items:center;padding:10px 0;border-bottom:1px solid #edf1f5}.candidate img{width:40px;height:40px;border-radius:50%;object-fit:cover}.candidate strong,.candidate p,.candidate small{display:block}.candidate strong{font-size:9px}.candidate p{font-size:8px;color:#425973;margin:3px 0}.candidate small{font-size:7px;color:#78899a}.match{width:44px;height:44px;border-radius:50%;border:2px solid #a8dec1;display:grid;place-items:center;color:#168653;font-size:10px;font-weight:900}.match small{display:block;color:#168653;font-size:6px}
        .event{display:grid;grid-template-columns:51px 1fr;gap:10px;padding:12px 0;border-bottom:1px solid #edf1f5}.eventDate{background:#f1f5fa;border-radius:8px;padding:7px;text-align:center}.eventDate b,.eventDate small{display:block}.eventDate b{font-size:17px}.eventDate small{font-size:7px}.event strong,.event p,.event small{display:block}.event strong{font-size:9px}.event p{font-size:8px;color:#45617d;margin:4px 0}.event small{font-size:7px;color:#798a9c}
        .summary{margin-top:14px}.summaryGrid{display:grid;grid-template-columns:repeat(4,1fr)}.summaryGrid article{padding:8px 15px;border-right:1px solid #e8edf2}.summaryGrid article:last-child{border-right:0}.summaryGrid small,.summaryGrid strong{display:block}.summaryGrid small{font-size:8px;color:#64768a}.summaryGrid strong{font-size:19px;margin-top:5px}.summaryGrid strong em{font-size:8px;font-style:normal;color:#19a15d}.spark{font-size:16px;letter-spacing:-5px;margin-top:14px}.blueLine{color:#1171ef}.greenLine{color:#19a15d}.violetLine{color:#7d45ea}.orangeLine{color:#eb950f}
        .ecosystem{margin-top:14px}.ecoGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.ecoGrid article{text-align:left;border-right:1px solid #e8edf2;padding:0 10px}.ecoGrid article:last-child{border-right:0}.ecoGrid img{width:100%;height:95px;border-radius:9px;object-fit:cover;margin-bottom:9px}.ecoGrid strong,.ecoGrid p{display:block}.ecoGrid strong{font-size:10px}.ecoGrid p{font-size:8px;color:#5c7085;line-height:1.45;min-height:30px}.ecoGrid button{border:1px solid #dce4ec;background:#fff;color:#0d62c8;border-radius:7px;padding:6px 12px;font-size:7px}
        .quote{margin-top:14px;padding:0;overflow:hidden;display:grid;grid-template-columns:1.3fr .7fr;align-items:stretch;background:linear-gradient(90deg,#edf5ff,#fff)}.quote>div{padding:20px;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center}.quote>div>span{font-size:40px;color:#1171ef}.quote p{font-size:11px;color:#1764bf;line-height:1.45}.quote small{font-size:8px;color:#1764bf}.quote>img{width:100%;height:100%;min-height:125px;object-fit:cover}
        .internalHero{display:grid;grid-template-columns:60px 1fr auto;gap:14px;align-items:center;background:linear-gradient(135deg,#0a4d96,#1171ef);color:#fff;border-radius:15px;padding:22px}.internalHero>span{width:56px;height:56px;border-radius:16px;background:#ffffff22;display:grid;place-items:center;font-size:26px}.internalHero h1{margin:0;font-size:24px}.internalHero p{font-size:10px;color:#e6effa;line-height:1.5}.internalHero button{border:0;background:#fff;color:#0b5ebd;border-radius:8px;padding:9px 12px;font-size:8px;font-weight:900}.aiHero{background:linear-gradient(135deg,#071a36,#144a84)}.internalGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-top:14px}.internalGrid h3{font-size:13px}.internalGrid p{font-size:9px;color:#5f7184;line-height:1.5}.internalGrid b{font-size:8px;color:#1472d9}.internalGrid button{border:1px solid #cfdbe8;background:#fff;color:#0b64c9;border-radius:7px;padding:7px 9px;font-size:8px;font-weight:900}
        .toast{position:fixed;right:20px;top:88px;z-index:100;background:#071a36;color:#fff;border-radius:9px;padding:12px 17px;font-size:9px;box-shadow:0 12px 30px #0003}
        @media(max-width:1100px){.sidebar{width:220px}.dashboardGrid{grid-template-columns:1fr 1fr}.dashboardGrid .panel:last-child{grid-column:1/-1}.kpis{grid-template-columns:1fr 1fr}.ecoGrid{grid-template-columns:1fr 1fr}.summaryGrid{grid-template-columns:1fr 1fr}.internalGrid{grid-template-columns:1fr}}
        @media(max-width:760px){.companyPage{display:block}.sidebar{position:relative;width:100%;height:auto;min-height:0}.topbar{position:relative;padding:12px;height:auto}.content{padding:16px}.welcome{align-items:flex-start;gap:12px}.kpis,.dashboardGrid,.ecoGrid,.summaryGrid{grid-template-columns:1fr}.dashboardGrid .panel:last-child{grid-column:auto}.aiSuggestion{grid-template-columns:48px 1fr}.aiSuggestion button{grid-column:1/-1}.quote{grid-template-columns:1fr}.quote>div{grid-template-columns:auto 1fr}.quote small{grid-column:2}.internalHero{grid-template-columns:50px 1fr}.internalHero button{grid-column:1/-1}}
      `}</style>
    </main>
  );
}
