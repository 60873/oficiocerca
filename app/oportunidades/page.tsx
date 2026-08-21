"use client";

import { useMemo, useState } from "react";

const sidebar: readonly (readonly [string, string, string, string?])[] = [
  ["⌂","Inicio","panel"],
  ["💼","Oportunidades","oportunidades"],
  ["🎯","Para vos con IA","ia"],
  ["🧰","Empleos","empleos"],
  ["🔧","Trabajos por servicio","servicios"],
  ["🎓","Pasantías","pasantias"],
  ["🧪","Prácticas","practicas"],
  ["⭐","Mi Primer Empleo","primer-empleo"],
  ["📣","Convocatorias","convocatorias"],
  ["📍","Cerca de vos","cerca"],
  ["🔖","Guardados","guardados"],
  ["📝","Postulaciones","postulaciones"],
  ["✉️","Mensajes","mensajes"],
  ["📅","Agenda","agenda"],
  ["📚","Capacitaciones","capacitaciones"],
  ["🎓","Feria de Carreras","feria"],
  ["🤟","Accesibilidad / LSA","accesibilidad"],
  ["⚙️","Configuración","configuracion"],
] as const;

const screenData: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  primary: string;
  items: { title: string; text: string; badge?: string }[];
}> = {
  oportunidades: {
    title: "Todas las oportunidades",
    subtitle: "Empleos, servicios, pasantías, prácticas, primer empleo y convocatorias.",
    icon: "💼",
    primary: "Explorar oportunidades",
    items: [
      { title: "Empleos", text: "Vacantes publicadas por empresas y organizaciones." },
      { title: "Servicios", text: "Trabajos puntuales para profesionales y oficios." },
      { title: "Pasantías y prácticas", text: "Experiencias para aprender y ganar experiencia." },
    ],
  },
  ia: {
    title: "Para vos con IA",
    subtitle: "La IA conecta tu perfil con oportunidades reales sin inventar experiencia ni habilidades.",
    icon: "🎯",
    primary: "Actualizar sugerencias IA",
    items: [
      { title: "Coincidencias", text: "Según perfil, CV, ubicación, disponibilidad e intereses.", badge: "IA" },
      { title: "Brechas detectadas", text: "Si falta una habilidad, puede sugerir capacitación." },
      { title: "Vos decidís", text: "La IA recomienda; nunca decide ni postula por vos." },
    ],
  },
  empleos: {
    title: "Empleos",
    subtitle: "Buscá oportunidades laborales en empresas y organizaciones.",
    icon: "🧰",
    primary: "Buscar empleos",
    items: [
      { title: "Tiempo completo", text: "Puestos de jornada completa." },
      { title: "Medio tiempo", text: "Opciones compatibles con otras actividades." },
      { title: "Remoto e híbrido", text: "Oportunidades con modalidades flexibles." },
    ],
  },
  servicios: {
    title: "Trabajos por servicio",
    subtitle: "Necesidades concretas que pueden conectarse con profesionales cercanos.",
    icon: "🔧",
    primary: "Buscar servicios",
    items: [
      { title: "Oficios", text: "Electricidad, plomería, pintura, refrigeración y más." },
      { title: "Servicios profesionales", text: "Diseño, administración, tecnología y otras especialidades." },
      { title: "Cercanía", text: "Priorizá oportunidades dentro del radio que elijas." },
    ],
  },
  pasantias: {
    title: "Pasantías",
    subtitle: "Conectá formación, experiencia y oportunidades reales.",
    icon: "🎓",
    primary: "Ver pasantías",
    items: [
      { title: "Empresas", text: "Pasantías vinculadas con necesidades reales." },
      { title: "Instituciones", text: "Articulación con formación y prácticas." },
      { title: "Municipios", text: "Programas y convenios locales o regionales." },
    ],
  },
  practicas: {
    title: "Prácticas",
    subtitle: "Encontrá prácticas profesionales y experiencias formativas.",
    icon: "🧪",
    primary: "Ver prácticas",
    items: [
      { title: "Educativas", text: "Vinculadas a instituciones y trayectos formativos." },
      { title: "Profesionales", text: "Experiencia supervisada según la propuesta." },
      { title: "Seguimiento", text: "Estado, agenda y comunicaciones dentro de WorkCerca." },
    ],
  },
  "primer-empleo": {
    title: "Mi Primer Empleo",
    subtitle: "Un espacio para quienes buscan su primera experiencia laboral.",
    icon: "⭐",
    primary: "Explorar primer empleo",
    items: [
      { title: "Sin experiencia previa", text: "Tu perfil puede mostrar formación, habilidades y proyectos reales." },
      { title: "CV WorkCerca", text: "Usá tu CV dentro del ecosistema." },
      { title: "IA WorkCerca", text: "Puede detectar oportunidades y formación compatibles." },
    ],
  },
  convocatorias: {
    title: "Convocatorias",
    subtitle: "Programas, llamados, ferias y oportunidades especiales.",
    icon: "📣",
    primary: "Ver convocatorias",
    items: [
      { title: "Municipales", text: "Programas y llamados locales." },
      { title: "Empresas e instituciones", text: "Convocatorias del ecosistema." },
      { title: "Alertas", text: "Recibí avisos cuando aparece algo relevante." },
    ],
  },
  cerca: {
    title: "Cerca de vos",
    subtitle: "Explorá oportunidades según ubicación y radio de búsqueda.",
    icon: "📍",
    primary: "Usar mi ubicación",
    items: [
      { title: "Radio configurable", text: "Elegí qué tan lejos querés buscar." },
      { title: "Trabajo local", text: "Acercá personas y oportunidades de la zona." },
      { title: "Privacidad", text: "La ubicación se usa según permisos del usuario." },
    ],
  },
  guardados: {
    title: "Guardados",
    subtitle: "Tus oportunidades favoritas para revisar después.",
    icon: "🔖",
    primary: "Ver todos",
    items: [
      { title: "Asistente de Marketing", text: "Agencia Creativa." },
      { title: "Técnico en Electricidad", text: "Servicios Integrales." },
      { title: "Pasantía en Diseño", text: "Estudio 3D." },
    ],
  },
  postulaciones: {
    title: "Postulaciones",
    subtitle: "Seguí cada proceso sin perderte entre plataformas.",
    icon: "📝",
    primary: "Ver procesos activos",
    items: [
      { title: "Asistente Administrativo", text: "Estado: En revisión.", badge: "En revisión" },
      { title: "Vendedor/a", text: "Estado: Entrevista.", badge: "Entrevista" },
      { title: "Frontend", text: "Estado: En revisión.", badge: "En revisión" },
    ],
  },
  mensajes: {
    title: "Mensajes",
    subtitle: "Comunicación con actores vinculados a tus oportunidades.",
    icon: "✉️",
    primary: "Nuevo mensaje",
    items: [
      { title: "Empresa", text: "Consulta sobre una búsqueda laboral." },
      { title: "Municipio", text: "Información sobre una convocatoria." },
      { title: "Institución", text: "Consulta sobre una pasantía o práctica." },
    ],
  },
  agenda: {
    title: "Agenda",
    subtitle: "Organizá entrevistas, reuniones y videollamadas.",
    icon: "📅",
    primary: "Agregar evento",
    items: [
      { title: "Entrevista", text: "Empresa local · Hoy 15:00." },
      { title: "Videollamada", text: "Institución · Mañana 10:30." },
      { title: "Recordatorio", text: "Enviar documentación pendiente." },
    ],
  },
  capacitaciones: {
    title: "Capacitaciones",
    subtitle: "Conectá oportunidades con formación útil para avanzar.",
    icon: "📚",
    primary: "Ir a Capacitaciones",
    items: [
      { title: "Según tu objetivo", text: "Formación relacionada con oportunidades reales." },
      { title: "Local y online", text: "Propuestas de instituciones, municipios y otros actores." },
      { title: "Brechas", text: "La IA puede sugerir capacitación cuando falta una habilidad." },
    ],
  },
  accesibilidad: {
    title: "Accesibilidad / LSA",
    subtitle: "Configurá apoyos de accesibilidad según tus preferencias.",
    icon: "🤟",
    primary: "Configurar LSA",
    items: [
      { title: "Lengua de Señas Argentina", text: "Preferencia opcional del usuario.", badge: "LSA" },
      { title: "Contenido accesible", text: "WorkCerca podrá identificar apoyos disponibles." },
      { title: "Avatar futuro", text: "Arquitectura preparada para lengua de señas según país.", badge: "Futuro" },
    ],
  },
  configuracion: {
    title: "Configuración",
    subtitle: "Preferencias de búsqueda, privacidad, alertas y accesibilidad.",
    icon: "⚙️",
    primary: "Guardar preferencias",
    items: [
      { title: "Búsqueda", text: "Radio, modalidad y áreas de interés." },
      { title: "Alertas", text: "Frecuencia y tipos de oportunidades." },
      { title: "Accesibilidad", text: "Preferencias como LSA y futuras herramientas." },
    ],
  },
};

const sampleOpps = [
  ["Asistente Administrativo","Nexus Soluciones","Reconquista, Santa Fe","Presencial","94%"],
  ["Vendedor/a","VerdeVida","Avellaneda, Santa Fe","Híbrido","88%"],
  ["Pasantía en Comunicación","Municipalidad de Reconquista","Reconquista, Santa Fe","Presencial","86%"],
  ["Desarrollador/a Frontend","TechSoft SRL","Remoto · Argentina","Remoto","91%"],
];

export default function OportunidadesPage() {
  const [active,setActive] = useState("panel");
  const [query,setQuery] = useState("");
  const [notice,setNotice] = useState("");
  const [lsa,setLsa] = useState(false);

  const currentTitle = useMemo(() => {
    const found = sidebar.find((item) => item[2] === active);
    return found?.[1] || "Oportunidades";
  }, [active]);

  const toast = (m:string) => {
    setNotice(m);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const go = (path:string) => {
    window.location.href = path;
  };

  return (
    <main className="app">
      <style>{`
        :root{--navy:#071a37;--blue:#1b6ceb;--violet:#6b38e8;--text:#14213f;--muted:#6d778c;--line:#e2e7ef;--bg:#f7f9fd}
        *{box-sizing:border-box}
        html,body{margin:0;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input{font:inherit} button{cursor:pointer}
        .top{height:76px;background:#fff;border-bottom:1px solid var(--line);display:grid;grid-template-columns:235px 1fr auto;align-items:center;gap:18px;padding:0 20px;position:sticky;top:0;z-index:50}
        .brand{border:0;background:transparent;display:flex;align-items:center;gap:9px;color:#14204d;text-align:left}
        .mark{width:42px;height:42px;border-radius:14px;background:linear-gradient(145deg,var(--blue),var(--violet));color:#fff;display:grid;place-items:center;font-weight:1000}
        .brand strong{font-size:25px}.brand small{display:block;font-size:9px;color:#758096}
        .topSearch{display:flex;gap:8px}.topSearch input{flex:1;min-height:40px;border:1px solid #dce3ee;border-radius:9px;padding:0 12px}
        .topSearch button{border:0;border-radius:9px;background:#f0ebff;color:var(--violet);font-weight:900;padding:0 13px}
        .topActions{display:flex;gap:8px}.iconBtn,.user{min-height:39px;border:1px solid #dfe5ef;background:#fff;border-radius:10px}.iconBtn{width:39px}.user{padding:0 11px;font-weight:900}
        .shell{display:grid;grid-template-columns:235px minmax(0,1fr);min-height:calc(100vh - 76px)}
        .side{background:linear-gradient(180deg,#071a37,#0b294f);padding:12px 9px;color:#fff;position:sticky;top:76px;height:calc(100vh - 76px);overflow:auto}
        .side button{width:100%;min-height:40px;border:0;border-radius:8px;background:transparent;color:#f5f7ff;display:grid;grid-template-columns:27px 1fr auto;align-items:center;gap:7px;text-align:left;padding:0 9px;font-size:11px}
        .side button:hover{background:rgba(255,255,255,.06)} .side button.active{background:linear-gradient(90deg,#286ee9,var(--violet));font-weight:1000}
        .sideBadge{background:#7045e8;border-radius:99px;padding:3px 6px;font-size:7px}
        .content{padding:14px}
        .hero{min-height:250px;border-radius:15px;background:radial-gradient(circle at 75% 30%,rgba(85,111,255,.28),transparent 28%),linear-gradient(135deg,#071a3a,#09375b 58%,#172456);color:#fff;padding:24px;position:relative;overflow:hidden}
        .hero:after{content:"OPORTUNIDADES";position:absolute;right:18px;bottom:8px;font-size:42px;font-weight:1000;color:rgba(255,255,255,.04)}
        .hero h1{margin:0;font-size:35px;max-width:650px}.hero h1 span{color:#9a6cff}.hero p{color:#d5dbea;line-height:1.5;max-width:700px}
        .heroActions{display:flex;gap:8px;margin-top:18px}.primary,.outline{min-height:38px;border-radius:8px;padding:0 12px;font-weight:900}
        .primary{border:0;background:linear-gradient(135deg,#246cf1,#823ef0);color:#fff}.outline{border:1px solid #cbbcf7;background:#fff;color:#6334d7}
        .hero .outline{border-color:rgba(255,255,255,.5);background:transparent;color:#fff}
        .types{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:10px}
        .typeCard{border:1px solid var(--line);background:#fff;border-radius:11px;padding:12px;text-align:center}
        .typeIcon{font-size:27px}.typeCard b{display:block;font-size:9px;margin-top:5px}.typeCard small{font-size:7px;color:#798397}
        .ai{margin-top:10px;border:1px solid #dcd0ff;background:linear-gradient(90deg,#f5f1ff,#fff);border-radius:12px;padding:12px}
        .ai h3{margin:0;font-size:14px}.ai p{margin:3px 0;color:#6e788d;font-size:8px}.aiGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:9px}
        .aiItem{border:1px solid #e3ddf7;background:#fff;border-radius:9px;padding:9px}.aiItem b{font-size:9px}.aiItem small{display:block;color:#22a65f;margin-top:4px}
        .mainGrid{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:10px;margin-top:10px}
        .card{background:#fff;border:1px solid var(--line);border-radius:12px;box-shadow:0 7px 16px rgba(35,52,91,.04)}
        .list{padding:13px}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px}.panelHead h3{margin:0;font-size:15px}
        .row{display:grid;grid-template-columns:45px 1fr auto;gap:9px;align-items:center;padding:10px 0;border-bottom:1px solid #edf0f5}
        .logo{width:42px;height:42px;border-radius:9px;background:linear-gradient(145deg,#e6efff,#eee7ff);display:grid;place-items:center;font-weight:1000}
        .row h4{margin:0;font-size:10px}.row p{margin:3px 0;color:#707b90;font-size:8px}.match{color:#1da45e;font-size:8px;font-weight:900}
        .row button{border:1px solid #dcd3f6;background:#fff;color:var(--violet);border-radius:7px;min-height:31px;padding:0 8px;font-size:8px;font-weight:900}
        .rightStack{display:grid;gap:10px}.mini{padding:12px}.mini h3{margin:0 0 8px;font-size:13px}.mini p{font-size:8px;color:#748095;line-height:1.5}
        .mini button{width:100%;margin-top:8px}
        .lsaBanner{margin-top:10px;padding:13px;display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:center;background:linear-gradient(90deg,#eef8ff,#f7f3ff)}
        .lsaIcon{width:46px;height:46px;border-radius:50%;background:#1768ed;color:#fff;display:grid;place-items:center;font-size:23px}
        .lsaBanner h3{margin:0;font-size:13px}.lsaBanner p{margin:3px 0;color:#6c778b;font-size:8px}
        .moduleHero{padding:17px;border-radius:13px;background:linear-gradient(135deg,#1768ed,#7139e8);color:#fff;display:grid;grid-template-columns:56px 1fr auto;gap:12px;align-items:center}
        .moduleHeroIcon{width:54px;height:54px;border-radius:15px;background:rgba(255,255,255,.15);display:grid;place-items:center;font-size:27px}.moduleHero h2{margin:0}.moduleHero p{margin:4px 0 0;color:#e9edff;font-size:10px}
        .moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}.moduleItem{padding:15px;min-height:125px;display:flex;flex-direction:column;justify-content:space-between}
        .moduleItem h3{margin:0 0 6px;font-size:13px}.moduleItem p{margin:0;color:#6e788c;font-size:9px;line-height:1.5}
        .moduleBadge{align-self:flex-start;margin-top:10px;background:#efe9ff;color:#6536dc;border-radius:99px;padding:4px 7px;font-size:8px;font-weight:900}
        .moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.moduleAction{padding:15px}.moduleAction h3{margin:0 0 5px}.moduleAction p{margin:0 0 11px;color:#6e788c;font-size:9px;line-height:1.5}
        .toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:#6536dc;color:#fff;padding:12px 16px;border-radius:10px;font-weight:1000}
        @media(max-width:1000px){.mainGrid{grid-template-columns:1fr}.types{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:820px){.top{grid-template-columns:1fr auto}.topSearch{display:none}.shell{grid-template-columns:76px 1fr}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.sideBadge{display:none}.aiGrid,.moduleGrid,.moduleActions{grid-template-columns:1fr 1fr}}
        @media(max-width:600px){.top{padding:0 9px}.brand strong{font-size:19px}.brand small,.user{display:none}.shell{grid-template-columns:58px 1fr}.content{padding:8px}.hero h1{font-size:29px}.types{grid-template-columns:repeat(2,1fr)}.aiGrid,.moduleGrid,.moduleActions{grid-template-columns:1fr}.lsaBanner{grid-template-columns:42px 1fr}.lsaBanner button{grid-column:1/-1}}
      `}</style>

      <header className="top">
        <button className="brand" onClick={()=>go("/")}>
          <span className="mark">W</span>
          <span><strong>WorkCerca</strong><small>Oportunidades · tu próximo paso, más cerca.</small></span>
        </button>
        <div className="topSearch">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar oportunidades..." />
          <button onClick={()=>toast("Búsqueda actualizada")}>Buscar</button>
        </div>
        <div className="topActions">
          <button className="iconBtn" onClick={()=>toast("Notificaciones actualizadas")}>🔔</button>
          <button className="iconBtn" onClick={()=>setActive("mensajes")}>✉️</button>
          <button className="user" onClick={()=>toast("Mi Perfil WorkCerca")}>Mi perfil</button>
        </div>
      </header>

      <div className="shell">
        <aside className="side">
          {sidebar.map(([icon,label,key,badge])=>(
            <button
              key={key}
              className={active===key ? "active" : ""}
              onClick={()=>{
                if(key==="feria") return go("/feria-de-carreras");
                if(key==="capacitaciones") return go("/capacitaciones");
                if(key==="panel") return setActive("panel");
                setActive(key);
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {badge ? <span className="sideBadge">{badge}</span> : <span/>}
            </button>
          ))}
          <button onClick={()=>go("/")} style={{marginTop:8,borderTop:"1px solid rgba(255,255,255,.1)",borderRadius:0}}>
            <span>←</span><span>Volver a Inicio</span><span/>
          </button>
        </aside>

        <section className="content">
          {active==="panel" ? (
            <>
              <section className="hero">
                <h1>Encontrá oportunidades que impulsen <span>tu futuro</span></h1>
                <p>Empleos, trabajos por servicio, pasantías, prácticas, primer empleo y convocatorias. Todo conectado en WorkCerca.</p>
                <div className="heroActions">
                  <button className="primary" onClick={()=>setActive("oportunidades")}>Explorar oportunidades</button>
                  <button className="outline" onClick={()=>setActive("ia")}>Cómo funciona la IA</button>
                </div>
              </section>

              <div className="types">
                {[
                  ["💼","Empleos","empleos"],
                  ["🔧","Trabajos por servicio","servicios"],
                  ["🎓","Pasantías","pasantias"],
                  ["🧪","Prácticas","practicas"],
                  ["⭐","Mi Primer Empleo","primer-empleo"],
                  ["📣","Convocatorias","convocatorias"],
                ].map(([i,t,key])=>(
                  <button className="typeCard" key={key} onClick={()=>setActive(key)}>
                    <span className="typeIcon">{i}</span><b>{t}</b><small>Abrir pantalla</small>
                  </button>
                ))}
              </div>

              <section className="ai">
                <h3>✦ Recomendado para vos con IA</h3>
                <p>Basado en información real del perfil, CV, intereses y preferencias.</p>
                <div className="aiGrid">
                  {sampleOpps.map(([title,org,place,mode,match])=>(
                    <button className="aiItem" key={title} onClick={()=>toast(`${title} · ${org}`)}>
                      <b>{title}</b><small>Coincidencia {match}</small>
                    </button>
                  ))}
                </div>
              </section>

              <div className="mainGrid">
                <article className="card list">
                  <div className="panelHead"><h3>Oportunidades destacadas</h3><button className="outline" onClick={()=>setActive("oportunidades")}>Ver todas</button></div>
                  {sampleOpps.map(([title,org,place,mode,match])=>(
                    <div className="row" key={title}>
                      <span className="logo">{org.slice(0,1)}</span>
                      <div><h4>{title}</h4><p>{org} · {place} · {mode}</p><span className="match">Coincidencia {match}</span></div>
                      <button onClick={()=>toast(`Abriendo oportunidad: ${title}`)}>Ver</button>
                    </div>
                  ))}
                </article>

                <aside className="rightStack">
                  <article className="card mini">
                    <h3>🔔 Alertas personalizadas</h3>
                    <p>Recibí oportunidades que coincidan con tus preferencias.</p>
                    <button className="outline" onClick={()=>toast("Alerta creada")}>Crear alerta</button>
                  </article>
                  <article className="card mini">
                    <h3>📚 Capacitarme</h3>
                    <p>Si una oportunidad requiere nuevas habilidades, WorkCerca puede conectarte con formación.</p>
                    <button className="outline" onClick={()=>go("/capacitaciones")}>Ir a Capacitaciones</button>
                  </article>
                  <article className="card mini">
                    <h3>🎓 Feria de Carreras</h3>
                    <p>Explorá carreras, tecnicaturas, cursos y formación.</p>
                    <button className="outline" onClick={()=>go("/feria-de-carreras")}>Abrir Feria</button>
                  </article>
                </aside>
              </div>

              <article className="card lsaBanner">
                <span className="lsaIcon">🤟</span>
                <div>
                  <h3>Accesibilidad WorkCerca · LSA</h3>
                  <p>Activá Lengua de Señas Argentina si querés que WorkCerca tenga en cuenta esta preferencia. A futuro, podrá adaptarse según el país.</p>
                </div>
                <button className={lsa ? "primary" : "outline"} onClick={()=>{setLsa(!lsa);toast(!lsa?"LSA activada":"LSA desactivada")}}>
                  {lsa ? "LSA activada" : "Activar LSA"}
                </button>
              </article>
            </>
          ) : (
            <>
              <section className="moduleHero">
                <span className="moduleHeroIcon">{screenData[active]?.icon || "•"}</span>
                <div>
                  <h2>{screenData[active]?.title || currentTitle}</h2>
                  <p>{screenData[active]?.subtitle}</p>
                </div>
                <button className="primary" onClick={()=>toast(screenData[active]?.primary || "Acción disponible")}>
                  {screenData[active]?.primary || "Continuar"}
                </button>
              </section>

              <div className="moduleGrid">
                {(screenData[active]?.items || []).map(item=>(
                  <article className="card moduleItem" key={item.title}>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                    {item.badge && <span className="moduleBadge">{item.badge}</span>}
                  </article>
                ))}
              </div>

              {active==="accesibilidad" && (
                <article className="card lsaBanner">
                  <span className="lsaIcon">🤟</span>
                  <div><h3>Preferencia LSA</h3><p>Es opcional y podés cambiarla cuando quieras.</p></div>
                  <button className={lsa ? "primary" : "outline"} onClick={()=>{setLsa(!lsa);toast(!lsa?"LSA activada":"LSA desactivada")}}>
                    {lsa ? "Desactivar LSA" : "Activar LSA"}
                  </button>
                </article>
              )}

              <div className="moduleActions">
                <article className="card moduleAction">
                  <h3>🤖 Motor IA WorkCerca</h3>
                  <p>Relaciona oportunidades, perfiles y formación. Si falta una habilidad, puede sugerir capacitación en lugar de inventarla.</p>
                  <button className="primary" onClick={()=>setActive("ia")}>Ver sugerencias IA</button>
                </article>
                <article className="card moduleAction">
                  <h3>🔗 Ecosistema conectado</h3>
                  <p>Empresas, municipios, instituciones, profesionales y personas se conectan alrededor de oportunidades reales.</p>
                  <button className="outline" onClick={()=>setActive("panel")}>Volver a Oportunidades</button>
                </article>
              </div>
            </>
          )}
        </section>
      </div>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
