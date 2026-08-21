"use client";

import { useMemo, useState } from "react";

const sidebar = [
  ["⌂","Inicio Institución","panel"],
  ["🏛️","Mi Institución","institucion"],
  ["👤","Mi Perfil Institucional","perfil"],
  ["👥","Usuarios y Roles","usuarios"],
  ["🎓","Mis propuestas","propuestas","18"],
  ["➕","Publicar propuesta","publicar"],
  ["📝","Borradores","borradores","2"],
  ["📥","Inscriptos","inscriptos","128"],
  ["💬","Solicitudes y Consultas","solicitudes","14"],
  ["⏳","Lista de Espera","espera","6"],
  ["🧩","Cupos y Comisiones","cupos"],
  ["📅","Calendario Académico","calendario"],
  ["🏫","Aulas / Sedes","sedes"],
  ["🏅","Certificados","certificados"],
  ["📊","Informes y Estadísticas","informes"],
  ["📤","Exportar datos","exportar"],
  ["📣","Novedades y Avisos","novedades"],
  ["✉️","Mensajes","mensajes","8"],
  ["🔔","Notificaciones","notificaciones"],
  ["🌐","Red de Instituciones","red"],
  ["🏛️","Municipios y Convenios","municipios"],
  ["⚙️","Configuración","configuracion"],
] as const;

const screens: Record<string, {title:string; subtitle:string; icon:string; primary:string; items:{title:string;text:string;badge?:string}[]}> = {
  institucion:{title:"Mi Institución",subtitle:"Gestioná la información general de tu institución dentro de WorkCerca.",icon:"🏛️",primary:"Editar institución",items:[
    {title:"Instituto Técnico Reconquista",text:"Reconquista, Santa Fe · Institución educativa y de formación.",badge:"Verificada"},
    {title:"Áreas académicas",text:"Tecnicaturas, cursos, talleres, capacitaciones y programas."},
    {title:"Canales oficiales",text:"Teléfono, correo, WhatsApp y sedes institucionales."}]},
  perfil:{title:"Mi Perfil Institucional",subtitle:"Controlá cómo se presenta públicamente la institución.",icon:"👤",primary:"Editar perfil público",items:[
    {title:"Presentación institucional",text:"Misión, propuesta educativa y servicios."},
    {title:"Identidad visual",text:"Logo, imágenes y datos institucionales."},
    {title:"Confianza",text:"Datos verificados y reputación dentro de WorkCerca.",badge:"Ley de Oro"}]},
  usuarios:{title:"Usuarios y Roles",subtitle:"Administrá permisos de gestión institucional.",icon:"👥",primary:"Agregar usuario",items:[
    {title:"Administrador",text:"Acceso completo al panel."},
    {title:"Coordinación académica",text:"Gestiona propuestas, cupos e inscripciones."},
    {title:"Comunicación",text:"Gestiona mensajes, avisos y novedades."}]},
  propuestas:{title:"Mis propuestas para Feria de Carreras",subtitle:"Publicá y gestioná las propuestas que aparecerán en el módulo independiente Feria de Carreras.",icon:"🎓",primary:"Publicar nueva propuesta",items:[
    {title:"Tecnicatura Superior en Enfermería",text:"Presencial · 38 inscriptos · 892 visitas",badge:"Publicada"},
    {title:"Tecnicatura en Desarrollo de Software",text:"Híbrida · 31 inscriptos · 745 visitas",badge:"Publicada"},
    {title:"Curso de Cocina Profesional",text:"Presencial · 13 inscriptos · 398 visitas",badge:"Publicada"}]},
  publicar:{title:"Publicar propuesta",subtitle:"Cargá carreras, tecnicaturas, cursos, capacitaciones o programas para Feria de Carreras.",icon:"➕",primary:"Crear propuesta",items:[
    {title:"Información básica",text:"Nombre, tipo, descripción y área temática."},
    {title:"Modalidad y costos",text:"Presencial, virtual o híbrida · Gratuita o arancelada."},
    {title:"Inscripción WorkCerca",text:"Requisitos, cupos y formulario interno sin saltos externos.",badge:"Inscripción directa"}]},
  borradores:{title:"Borradores",subtitle:"Guardá propuestas incompletas antes de publicarlas.",icon:"📝",primary:"Continuar borrador",items:[
    {title:"Electricidad Domiciliaria",text:"Faltan requisitos y fechas.",badge:"Borrador"},
    {title:"Programa de Becas",text:"Falta configurar inscripción.",badge:"Borrador"},
    {title:"Nuevo borrador",text:"Empezá una propuesta y completala después."}]},
  inscriptos:{title:"Inscriptos",subtitle:"Gestioná inscripciones recibidas directamente dentro de WorkCerca.",icon:"📥",primary:"Ver nuevas inscripciones",items:[
    {title:"Julieta Ramírez",text:"Enfermería · En revisión",badge:"En revisión"},
    {title:"Camila Medina",text:"Administración Contable · Aceptada",badge:"Aceptada"},
    {title:"Lucas Benítez",text:"Mecatrónica · Falta documentación",badge:"Pendiente"}]},
  solicitudes:{title:"Solicitudes y Consultas",subtitle:"Respondé dudas sobre propuestas e inscripciones.",icon:"💬",primary:"Responder consultas",items:[
    {title:"Requisitos",text:"Consulta sobre Desarrollo de Software",badge:"Nueva"},
    {title:"Arancel",text:"Consulta sobre Administración Contable"},
    {title:"Modalidad",text:"Consulta sobre Cocina Profesional"}]},
  espera:{title:"Lista de Espera",subtitle:"Gestioná interesados cuando no quedan cupos.",icon:"⏳",primary:"Gestionar lista",items:[
    {title:"Enfermería",text:"4 personas en espera."},
    {title:"Desarrollo de Software",text:"2 personas en espera."},
    {title:"Avisos automáticos",text:"Notificá cuando se libera un cupo."}]},
  cupos:{title:"Cupos y Comisiones",subtitle:"Organizá capacidad, turnos y comisiones.",icon:"🧩",primary:"Configurar cupos",items:[
    {title:"Enfermería",text:"40 cupos · 38 ocupados"},
    {title:"Software",text:"35 cupos · 31 ocupados"},
    {title:"Cocina Profesional",text:"20 cupos · 13 ocupados"}]},
  calendario:{title:"Calendario Académico",subtitle:"Centralizá fechas de inscripción, cursado y documentación.",icon:"📅",primary:"Agregar fecha",items:[
    {title:"20 MAY",text:"Inicio de inscripciones · Enfermería"},
    {title:"27 MAY",text:"Cierre · Administración Contable"},
    {title:"03 JUN",text:"Inicio de cursado · Mecatrónica"}]},
  sedes:{title:"Aulas / Sedes",subtitle:"Administrá sedes y espacios de cursado.",icon:"🏫",primary:"Agregar sede",items:[
    {title:"Sede Central",text:"Reconquista · Aulas 1 a 12"},
    {title:"Sede Centro",text:"Talleres y laboratorios"},
    {title:"Virtual",text:"Aula digital / plataforma institucional"}]},
  certificados:{title:"Certificados",subtitle:"Gestioná certificados y constancias.",icon:"🏅",primary:"Generar certificado",items:[
    {title:"Emitidos",text:"146 certificados este año."},
    {title:"Pendientes",text:"12 por validar.",badge:"Pendientes"},
    {title:"Verificación",text:"Validación dentro de WorkCerca."}]},
  informes:{title:"Informes y Estadísticas",subtitle:"Medí visitas, interés, inscripciones y ocupación.",icon:"📊",primary:"Generar informe",items:[
    {title:"Visitas",text:"2.456 en los últimos 30 días."},
    {title:"Inscripciones",text:"128 recibidas este año."},
    {title:"Ocupación",text:"86% promedio.",badge:"86%"}]},
  exportar:{title:"Exportar datos",subtitle:"Prepará reportes descargables para gestión.",icon:"📤",primary:"Preparar exportación",items:[
    {title:"Inscriptos",text:"Exportar listados de inscripción."},
    {title:"Propuestas",text:"Exportar oferta publicada."},
    {title:"Estadísticas",text:"Exportar métricas consolidadas."}]},
  novedades:{title:"Novedades y Avisos",subtitle:"Publicá comunicaciones para estudiantes e interesados.",icon:"📣",primary:"Crear novedad",items:[
    {title:"Becas abiertas",text:"Nueva convocatoria institucional.",badge:"Beca"},
    {title:"Nuevo curso",text:"Electricidad Domiciliaria."},
    {title:"Cambio de horario",text:"Actualización institucional."}]},
  mensajes:{title:"Mensajes",subtitle:"Conversaciones con personas, municipios, empresas e instituciones.",icon:"✉️",primary:"Nuevo mensaje",items:[
    {title:"Municipalidad de Reconquista",text:"Consulta por convenio de formación.",badge:"Nuevo"},
    {title:"Empresa local",text:"Interés en pasantías."},
    {title:"Persona interesada",text:"Consulta sobre inscripción."}]},
  notificaciones:{title:"Notificaciones",subtitle:"Administrá alertas del módulo.",icon:"🔔",primary:"Configurar alertas",items:[
    {title:"Inscripciones",text:"24 nuevas en 30 días."},
    {title:"Mensajes",text:"8 conversaciones activas."},
    {title:"Cupos",text:"2 propuestas cerca del límite."}]},
  red:{title:"Red de Instituciones",subtitle:"Conectate con otras instituciones para colaborar.",icon:"🌐",primary:"Explorar red",items:[
    {title:"Red conectada",text:"Instituciones locales, regionales y nacionales."},
    {title:"Formación complementaria",text:"Compartí capacidades y propuestas."},
    {title:"Articulación",text:"Convenios, pasantías y proyectos conjuntos."}]},
  municipios:{title:"Municipios y Convenios",subtitle:"Gestioná articulaciones para programas, becas y propuestas compartidas.",icon:"🏛️",primary:"Crear convenio",items:[
    {title:"Reconquista",text:"Convenio de formación y pasantías.",badge:"Activo"},
    {title:"Red regional",text:"Propuestas compartidas con municipios cercanos."},
    {title:"Feria de Carreras",text:"Municipios pueden impulsar propuestas identificando la institución responsable."}]},
  configuracion:{title:"Configuración",subtitle:"Administrá permisos, privacidad, seguridad y preferencias.",icon:"⚙️",primary:"Guardar configuración",items:[
    {title:"Permisos",text:"Accesos a propuestas e inscripciones."},
    {title:"Privacidad",text:"Datos públicos institucionales."},
    {title:"Seguridad",text:"Sesiones y protección de cuenta."}]},
};

const proposals = [
  ["Tecnicatura Superior en Enfermería","Tecnicatura","Presencial","38","892"],
  ["Tecnicatura en Desarrollo de Software","Tecnicatura","Híbrida","31","745"],
  ["Operador en Mecatrónica Industrial","Curso","Presencial","22","512"],
  ["Administración Contable","Carrera","Presencial","24","663"],
  ["Curso de Cocina Profesional","Curso","Presencial","13","398"],
];

export default function InstitucionesPage(){
  const [active,setActive]=useState("panel");
  const [notice,setNotice]=useState("");

  const currentTitle=useMemo(()=>{
    const found=sidebar.find((i)=>i[2]===active);
    return found?.[1] || "Inicio Institución";
  },[active]);

  const action=(m:string)=>{setNotice(m); window.setTimeout(()=>setNotice(""),2800)};
  const go=(p:string)=>{window.location.href=p};

  return (
    <main className="app">
      <style>{`
        :root{--navy:#071a37;--purple:#6038da;--purple2:#7b4bea;--text:#14213f;--muted:#6d778c;--line:#e3e8f2;--bg:#f7f9fd}
        *{box-sizing:border-box}html,body{margin:0;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button{font:inherit;cursor:pointer}.app{min-height:100vh;background:linear-gradient(180deg,#fff,#f7f9fd)}
        .top{height:80px;background:#fff;border-bottom:1px solid #e7ebf3;display:grid;grid-template-columns:255px 1fr auto;align-items:center;gap:18px;padding:0 22px;position:sticky;top:0;z-index:50}
        .brand{border:0;background:transparent;display:flex;align-items:center;gap:10px;color:#17204a;padding:0;text-align:left}.mark{width:44px;height:44px;border-radius:15px;background:linear-gradient(145deg,var(--purple),#8766f4);color:#fff;display:grid;place-items:center;font-weight:1000}.brand strong{font-size:27px}.brand small{display:block;font-size:10px;color:#737b91}
        .head h1{margin:0;font-size:24px}.head p{margin:3px 0 0;color:#667085}.topActions{display:flex;gap:9px;align-items:center}.iconBtn,.userBtn{border:1px solid #dfe5ef;background:#fff;border-radius:10px;min-height:39px}.iconBtn{width:39px;position:relative}.badgeTop{position:absolute;top:-5px;right:-4px;background:#ef4444;color:#fff;min-width:18px;height:18px;border-radius:99px;display:grid;place-items:center;font-size:9px;font-weight:900}.userBtn{display:flex;align-items:center;gap:8px;padding:0 10px;font-weight:900}.avatar{width:31px;height:31px;border-radius:50%;background:var(--purple);color:#fff;display:grid;place-items:center;font-size:10px}
        .shell{display:grid;grid-template-columns:255px minmax(0,1fr);min-height:calc(100vh - 80px)}.side{background:linear-gradient(180deg,#071a37,#0a2953);color:#fff;padding:13px 10px 20px;position:sticky;top:80px;height:calc(100vh - 80px);overflow:auto}.side button{width:100%;min-height:41px;border:0;border-radius:8px;background:transparent;color:#f5f7ff;display:grid;grid-template-columns:27px 1fr auto;align-items:center;gap:7px;text-align:left;padding:0 9px;font-size:12px}.side button:hover{background:rgba(255,255,255,.06)}.side button.active{background:linear-gradient(90deg,var(--purple),var(--purple2));font-weight:1000}.sideBadge{min-width:22px;height:22px;border-radius:99px;background:#7047df;display:grid;place-items:center;padding:0 5px;font-size:9px}.feriaCard{margin-top:14px;border:1px solid rgba(140,96,240,.36);border-radius:12px;padding:12px;background:linear-gradient(145deg,#241a59,#352179)}.feriaCard b{color:#e3d9ff}.feriaCard p{font-size:10px;line-height:1.45;color:#c8bee7}.feriaCard button{margin-top:7px;background:#784ae8;text-align:center}
        .content{padding:14px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.stat{border:1px solid var(--line);background:#fff;border-radius:13px;padding:14px;min-height:105px;box-shadow:0 8px 18px rgba(35,52,91,.05)}.statIcon{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#ece7ff;font-size:20px}.stat strong{display:block;font-size:27px;margin-top:7px}.stat small{color:#6b7487}.stat button,.link{border:0;background:transparent;color:var(--purple);font-size:10px;font-weight:900;padding:7px 0 0}
        .card{border:1px solid var(--line);background:#fff;border-radius:13px;box-shadow:0 8px 18px rgba(35,52,91,.05)}.proposals{margin-top:10px;padding:14px}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.panelHead h3{margin:0;font-size:16px}.actions{display:flex;gap:7px}.primary,.outline{min-height:37px;border-radius:8px;font-weight:900;padding:0 11px}.primary{border:1px solid var(--purple);background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff}.outline{border:1px solid #d3c7f7;background:#fff;color:var(--purple)}
        .tabs{display:flex;gap:5px;flex-wrap:wrap;border-bottom:1px solid #edf0f5}.tab{border:0;background:transparent;color:#697386;padding:8px 9px;font-size:9px;font-weight:800}.tab.active{color:var(--purple);border-bottom:2px solid var(--purple)}
        .tr{display:grid;grid-template-columns:2fr .8fr .8fr .8fr .55fr .55fr .7fr;gap:8px;align-items:center;padding:9px 7px;border-bottom:1px solid #edf0f5;font-size:9px}.tr.head{font-weight:900;background:#fafbfe}.proposalTitle{font-weight:900}.pill{display:inline-block;background:#eee9ff;color:var(--purple);padding:3px 6px;border-radius:6px;font-size:8px;font-weight:900}.published{color:#20a762;font-weight:900}.manage{border:1px solid #cdbdf8;background:#fff;color:var(--purple);border-radius:6px;padding:5px 7px;font-size:8px;font-weight:900}
        .mid{display:grid;grid-template-columns:.8fr 1.2fr;gap:10px;margin-top:10px}.donutPanel,.recent{padding:13px}.donut{width:160px;height:160px;border-radius:50%;margin:10px auto;background:conic-gradient(#6038da 0 37%,#27b36d 37% 70%,#f0a72e 70% 84%,#3c78ef 84% 93%,#d1d6df 93%);display:grid;place-items:center}.donutInner{width:94px;height:94px;border-radius:50%;background:#fff;display:grid;place-items:center;text-align:center}.donutInner strong{font-size:26px}.legend{display:grid;gap:5px;font-size:9px;color:#657084}.dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:5px}.recentRow{display:grid;grid-template-columns:36px 1fr auto;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #edf0f5}.face{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#eee9ff;color:var(--purple);font-weight:1000;font-size:9px}.recentRow b{font-size:10px}.recentRow p{margin:2px 0;color:#738096;font-size:9px}.status{font-size:8px;font-weight:900}.green{color:#20a762}.orange{color:#e58d15}.blue{color:#3978e6}.purple{color:#6038da}
        .bottom{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:10px}.simple{padding:12px}.simpleRow{padding:8px 0;border-bottom:1px solid #edf0f5}.simpleRow b{font-size:10px}.simpleRow small{display:block;color:#748095;margin-top:2px}.quick button{width:100%;min-height:35px;border:0;border-bottom:1px solid #edf0f5;background:transparent;color:#283650;display:flex;justify-content:space-between;align-items:center;font-size:9px}
        .impact{margin-top:10px;padding:14px;background:linear-gradient(135deg,#f4f0ff,#fff)}.impactGrid{display:grid;grid-template-columns:1.4fr repeat(4,.6fr);gap:10px;align-items:center}.impactIntro{display:flex;gap:10px;align-items:center}.impactIcon{width:48px;height:48px;border-radius:50%;background:var(--purple);color:#fff;display:grid;place-items:center;font-size:22px}.impactIntro h3{margin:0;font-size:14px}.impactIntro p{margin:3px 0 0;color:#6d788c;font-size:9px}.impactNum{text-align:center}.impactNum strong{display:block;font-size:21px;color:var(--purple)}.impactNum span{font-size:8px;color:#6d788c}
        .moduleScreen{display:grid;gap:10px}.moduleHero{padding:17px;border-radius:13px;background:linear-gradient(135deg,var(--purple),var(--purple2));color:#fff;display:grid;grid-template-columns:56px 1fr auto;gap:12px;align-items:center}.moduleHeroIcon{width:54px;height:54px;border-radius:15px;background:rgba(255,255,255,.16);display:grid;place-items:center;font-size:27px}.moduleHero h2{margin:0;font-size:22px}.moduleHero p{margin:4px 0 0;font-size:11px;color:#eee9ff}.modulePrimary{border:0;border-radius:8px;background:#fff;color:var(--purple);min-height:39px;padding:0 13px;font-weight:900}.moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.moduleItem{padding:15px;min-height:130px;display:flex;flex-direction:column;justify-content:space-between}.moduleItem h3{margin:0 0 6px;font-size:14px}.moduleItem p{margin:0;color:#6d788b;font-size:10px;line-height:1.5}.moduleBadge{align-self:flex-start;margin-top:12px;background:#efe9ff;color:var(--purple);border-radius:99px;padding:4px 7px;font-size:8px;font-weight:900}.moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.moduleActionCard{padding:15px}.moduleActionCard h3{margin:0 0 5px}.moduleActionCard p{margin:0 0 12px;color:#6d788b;font-size:10px;line-height:1.5}.toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:var(--purple);color:#fff;padding:12px 16px;border-radius:10px;font-weight:1000}
        @media(max-width:1000px){.stats{grid-template-columns:repeat(2,1fr)}.mid,.bottom{grid-template-columns:1fr}.tr{grid-template-columns:1.8fr .8fr .8fr .7fr}.tr>*:nth-child(n+5){display:none}.impactGrid{grid-template-columns:1fr 1fr}.impactIntro{grid-column:1/-1}}
        @media(max-width:820px){.top{grid-template-columns:1fr auto}.head{display:none}.shell{grid-template-columns:78px 1fr}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.sideBadge,.feriaCard{display:none}.moduleGrid,.moduleActions{grid-template-columns:1fr}}
        @media(max-width:600px){.top{padding:0 10px}.brand strong{font-size:20px}.brand small{display:none}.userBtn span:last-child{display:none}.shell{grid-template-columns:60px 1fr}.content{padding:8px}.stats{grid-template-columns:1fr 1fr}.panelHead{align-items:flex-start;flex-direction:column}.moduleHero{grid-template-columns:48px 1fr}.modulePrimary{grid-column:1/-1}}
      `}</style>

      <header className="top">
        <button className="brand" onClick={()=>go("/")}>
          <span className="mark">W</span>
          <span><strong>WorkCerca</strong><small>Instituciones · formación y oportunidades.</small></span>
        </button>
        <div className="head">
          <h1>¡Bienvenido, Instituto Técnico Reconquista! 👋</h1>
          <p>Gestioná y publicá tus propuestas educativas dentro de WorkCerca.</p>
        </div>
        <div className="topActions">
          <button className="iconBtn" onClick={()=>action("Tenés 5 notificaciones nuevas.")}>🔔<span className="badgeTop">5</span></button>
          <button className="iconBtn" onClick={()=>setActive("mensajes")}>💬<span className="badgeTop">3</span></button>
          <button className="userBtn" onClick={()=>setActive("perfil")}><span className="avatar">ITR</span><span>Instituto Técnico</span></button>
        </div>
      </header>

      <div className="shell">
        <aside className="side">
          {sidebar.map(([icon,label,key,badge])=>(
            <button key={key} className={active===key?"active":""} onClick={()=>setActive(key)}>
              <span>{icon}</span><span>{label}</span>{badge?<span className="sideBadge">{badge}</span>:<span/>}
            </button>
          ))}
          <div className="feriaCard">
            <b>🎓 Feria de Carreras</b>
            <p>Tus propuestas se muestran en el módulo independiente Feria de Carreras.</p>
            <button onClick={()=>go("/feria-de-carreras")}>Ir a Feria de Carreras</button>
          </div>
          <button onClick={()=>go("/")} style={{marginTop:10,borderTop:"1px solid rgba(255,255,255,.08)",borderRadius:0}}>
            <span>←</span><span>Volver a Inicio</span><span/>
          </button>
        </aside>

        <section className="content">
          {active==="panel" ? (
            <>
              <div className="stats">
                <article className="stat"><span className="statIcon">🎓</span><strong>18</strong><small>Propuestas publicadas</small><button onClick={()=>setActive("propuestas")}>Ver mis propuestas →</button></article>
                <article className="stat"><span className="statIcon">👥</span><strong>128</strong><small>Inscriptos totales</small><button onClick={()=>setActive("inscriptos")}>Ver inscriptos →</button></article>
                <article className="stat"><span className="statIcon">📥</span><strong>24</strong><small>Inscripciones nuevas</small><button onClick={()=>setActive("inscriptos")}>Ver nuevas →</button></article>
                <article className="stat"><span className="statIcon">👁️</span><strong>2.456</strong><small>Visitas a propuestas</small><button onClick={()=>setActive("informes")}>Ver estadísticas →</button></article>
              </div>

              <article className="card proposals">
                <div className="panelHead">
                  <div><h3>Mis propuestas para Feria de Carreras</h3><div style={{fontSize:9,color:"#737d91",marginTop:3}}>Publicá y gestioná carreras, tecnicaturas, cursos, capacitaciones y programas.</div></div>
                  <div className="actions">
                    <button className="outline" onClick={()=>go("/feria-de-carreras")}>Ver en Feria</button>
                    <button className="primary" onClick={()=>setActive("publicar")}>+ Publicar propuesta</button>
                  </div>
                </div>
                <div className="tabs">
                  {["Todas (18)","Carreras (7)","Tecnicaturas (3)","Cursos (6)","Capacitaciones (3)","Programas (2)","Borradores (2)"].map((t,i)=><button key={t} className={`tab ${i===0?"active":""}`}>{t}</button>)}
                </div>
                <div className="tr head"><span>Propuesta</span><span>Tipo</span><span>Modalidad</span><span>Estado</span><span>Inscriptos</span><span>Visitas</span><span>Acciones</span></div>
                {proposals.map(([title,type,mode,enrolled,views])=>(
                  <div className="tr" key={title}>
                    <span className="proposalTitle">{title}</span>
                    <span><span className="pill">{type}</span></span>
                    <span>{mode}</span>
                    <span className="published">● Publicada</span>
                    <span>{enrolled}</span>
                    <span>{views}</span>
                    <span><button className="manage" onClick={()=>action(`Gestionando: ${title}`)}>Gestionar</button></span>
                  </div>
                ))}
              </article>

              <div className="mid">
                <article className="card donutPanel">
                  <div className="panelHead"><h3>Inscriptos por estado</h3><button className="link" onClick={()=>setActive("inscriptos")}>Ver todos</button></div>
                  <div className="donut"><div className="donutInner"><div><strong>128</strong><div style={{fontSize:9,color:"#737d91"}}>Total</div></div></div></div>
                  <div className="legend">
                    <span><i className="dot" style={{background:"#6038da"}}/>En revisión · 48</span>
                    <span><i className="dot" style={{background:"#27b36d"}}/>Aceptados · 42</span>
                    <span><i className="dot" style={{background:"#f0a72e"}}/>Lista de espera · 18</span>
                    <span><i className="dot" style={{background:"#3c78ef"}}/>Documentación pendiente · 12</span>
                  </div>
                </article>

                <article className="card recent">
                  <div className="panelHead"><h3>Inscripciones recientes</h3><button className="link" onClick={()=>setActive("inscriptos")}>Ver todas</button></div>
                  {[
                    ["JR","Julieta Ramírez","Enfermería","En revisión","orange"],
                    ["ML","Matías López","Software","En revisión","orange"],
                    ["CM","Camila Medina","Administración","Aceptado","green"],
                    ["LB","Lucas Benítez","Mecatrónica","Documentación pendiente","blue"],
                    ["MS","María Solís","Cocina Profesional","Lista de espera","purple"],
                  ].map(([i,n,c,s,cl])=><div className="recentRow" key={n}><span className="face">{i}</span><div><b>{n}</b><p>{c}</p></div><span className={`status ${cl}`}>{s}</span></div>)}
                </article>
              </div>

              <div className="bottom">
                <article className="card simple">
                  <div className="panelHead"><h3>Calendario académico</h3><button className="link" onClick={()=>setActive("calendario")}>Ver completo</button></div>
                  <div className="simpleRow"><b>20 MAY · Inicio de inscripciones</b><small>Enfermería · 08:00</small></div>
                  <div className="simpleRow"><b>27 MAY · Cierre de inscripciones</b><small>Administración · 23:59</small></div>
                  <div className="simpleRow"><b>03 JUN · Inicio de cursado</b><small>Mecatrónica · 08:00</small></div>
                </article>

                <article className="card simple">
                  <div className="panelHead"><h3>Novedades y avisos</h3><button className="link" onClick={()=>setActive("novedades")}>Ver todas</button></div>
                  <div className="simpleRow"><b>🎓 Becas abiertas</b><small>Nueva convocatoria</small></div>
                  <div className="simpleRow"><b>📘 Nuevo curso</b><small>Electricidad Domiciliaria</small></div>
                  <div className="simpleRow"><b>📣 Cambio de horario</b><small>Atención institucional</small></div>
                </article>

                <article className="card simple quick">
                  <div className="panelHead"><h3>Acciones rápidas</h3></div>
                  <button onClick={()=>setActive("publicar")}><span>Publicar carrera o tecnicatura</span><span>›</span></button>
                  <button onClick={()=>setActive("publicar")}><span>Publicar curso o taller</span><span>›</span></button>
                  <button onClick={()=>setActive("publicar")}><span>Publicar capacitación</span><span>›</span></button>
                  <button onClick={()=>setActive("publicar")}><span>Publicar pasantía / práctica</span><span>›</span></button>
                  <button onClick={()=>setActive("municipios")}><span>Crear convenio</span><span>›</span></button>
                  <button onClick={()=>setActive("informes")}><span>Generar informe</span><span>›</span></button>
                </article>
              </div>

              <article className="card impact">
                <div className="impactGrid">
                  <div className="impactIntro"><span className="impactIcon">🎓</span><div><h3>Tu contenido en Feria de Carreras</h3><p>Tus propuestas pueden verse desde Reconquista, la región y todo el país.</p></div></div>
                  <div className="impactNum"><strong>2.456</strong><span>Visitas</span></div>
                  <div className="impactNum"><strong>1.284</strong><span>Interesados</span></div>
                  <div className="impactNum"><strong>128</strong><span>Inscriptos</span></div>
                  <div className="impactNum"><button className="outline" onClick={()=>go("/feria-de-carreras")}>Ver en Feria</button></div>
                </div>
              </article>
            </>
          ) : (
            <section className="moduleScreen">
              <div className="moduleHero">
                <div className="moduleHeroIcon">{screens[active]?.icon || "•"}</div>
                <div><h2>{screens[active]?.title || currentTitle}</h2><p>{screens[active]?.subtitle}</p></div>
                <button className="modulePrimary" onClick={()=>action(`${screens[active]?.primary}: acción preparada para conectar con datos reales.`)}>{screens[active]?.primary}</button>
              </div>

              <div className="moduleGrid">
                {(screens[active]?.items || []).map(item=>(
                  <article className="card moduleItem" key={item.title}>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                    {item.badge && <span className="moduleBadge">{item.badge}</span>}
                  </article>
                ))}
              </div>

              <div className="moduleActions">
                <article className="card moduleActionCard">
                  <h3>🎓 Conexión con Feria de Carreras</h3>
                  <p>La institución publica desde aquí; las personas exploran, comparan y se inscriben en el módulo independiente Feria de Carreras.</p>
                  <button className="primary" onClick={()=>go("/feria-de-carreras")}>Ir a Feria de Carreras</button>
                </article>
                <article className="card moduleActionCard">
                  <h3>🔗 Ecosistema conectado</h3>
                  <p>Instituciones se articula con personas, municipios, empresas y otras instituciones sin salir de WorkCerca.</p>
                  <button className="outline" onClick={()=>setActive("panel")}>Volver al Inicio Institución</button>
                </article>
              </div>
            </section>
          )}
        </section>
      </div>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
