"use client";

import { useMemo, useState } from "react";

const sidebar = [
  ["⌂","Inicio","panel"],
  ["▦","Todas las propuestas","todas"],
  ["🏛️","Carreras universitarias","carreras"],
  ["🎓","Tecnicaturas","tecnicaturas"],
  ["📘","Cursos y capacitaciones","cursos"],
  ["💻","Educación a distancia","distancia"],
  ["🎁","Becas y financiamiento","becas"],
  ["🟢","Propuestas gratuitas","gratuitas"],
  ["✦","Orientador IA WorkCerca","orientador","NUEVO"],
  ["🧭","Descubrí tu camino","camino"],
  ["♥","Explorar por intereses","intereses"],
  ["⚖","Comparar opciones","comparar"],
  ["☆","Mis guardados","guardados"],
  ["📝","Mis inscripciones","inscripciones","3"],
  ["▶","Mi cursado","cursado","2"],
  ["↺","Historial","historial"],
  ["🏫","Instituciones","instituciones"],
  ["🏛️","Municipios y convenios","municipios"],
  ["📣","Noticias y novedades","novedades"],
  ["?","Preguntas frecuentes","faq"],
];

const proposals = [
  {
    title:"Licenciatura en Enfermería",
    institution:"Universidad Nacional del Litoral",
    city:"Santa Fe",
    province:"Santa Fe",
    mode:"Presencial",
    type:"Carrera",
    duration:"5 años",
    cost:"Gratuita",
    online:false,
    integratedCourse:false,
    badge:"RECOMENDADA",
    icon:"🩺",
  },
  {
    title:"Tecnicatura en Desarrollo de Software",
    institution:"Instituto Tecnológico Buenos Aires",
    city:"CABA",
    province:"Buenos Aires",
    mode:"Virtual",
    type:"Tecnicatura",
    duration:"2 años",
    cost:"Arancelada",
    online:true,
    integratedCourse:true,
    badge:"ALTA DEMANDA",
    icon:"💻",
  },
  {
    title:"Profesorado de Educación Primaria",
    institution:"Instituto Superior del Profesorado",
    city:"Rosario",
    province:"Santa Fe",
    mode:"Presencial",
    type:"Carrera",
    duration:"4 años",
    cost:"Gratuita",
    online:false,
    integratedCourse:false,
    badge:"GRATUITA",
    icon:"📚",
  },
  {
    title:"Curso de Diseño Gráfico Profesional",
    institution:"Escuela de Diseño Avanzado",
    city:"Online",
    province:"Todo el país",
    mode:"Virtual",
    type:"Curso",
    duration:"6 meses",
    cost:"Arancelada",
    online:true,
    integratedCourse:true,
    badge:"NUEVO",
    icon:"🎨",
  },
  {
    title:"Tecnicatura en Energías Renovables",
    institution:"Instituto de Energías Sustentables",
    city:"Neuquén",
    province:"Neuquén",
    mode:"Presencial",
    type:"Tecnicatura",
    duration:"3 años",
    cost:"Arancelada",
    online:false,
    integratedCourse:false,
    badge:"NUEVA",
    icon:"🌱",
  },
  {
    title:"Administración y Gestión",
    institution:"Instituto Superior de Formación Técnica",
    city:"Mendoza",
    province:"Mendoza",
    mode:"Híbrida",
    type:"Tecnicatura",
    duration:"2 años",
    cost:"Arancelada",
    online:true,
    integratedCourse:false,
    badge:"DESTACADA",
    icon:"📊",
  },
];

const screenData: Record<string, {title:string; subtitle:string; icon:string; items:{title:string;text:string;badge?:string}[]}> = {
  todas:{title:"Todas las propuestas",subtitle:"Explorá carreras, tecnicaturas, cursos y capacitaciones de todo el país.",icon:"▦",items:[
    {title:"12.458 propuestas",text:"Opciones disponibles en distintas provincias, ciudades y modalidades."},
    {title:"2.156 instituciones",text:"Universidades, institutos, centros de formación y organizaciones."},
    {title:"Inscripción dentro de WorkCerca",text:"Cuando la institución lo habilita, podés completar todo sin salir de la plataforma.",badge:"Directo"}]},
  carreras:{title:"Carreras universitarias",subtitle:"Compará propuestas universitarias por área, provincia, modalidad y arancel.",icon:"🏛️",items:[
    {title:"Salud",text:"Medicina, Enfermería, Kinesiología y más."},
    {title:"Tecnología",text:"Ingenierías, Sistemas, Ciencia de Datos y afines."},
    {title:"Ciencias sociales y educación",text:"Derecho, Psicología, Docencia y otras áreas."}]},
  tecnicaturas:{title:"Tecnicaturas",subtitle:"Opciones de formación técnica y profesional con trayectos más cortos.",icon:"🎓",items:[
    {title:"Tecnología",text:"Software, redes, electrónica y automatización."},
    {title:"Industria",text:"Mecatrónica, mantenimiento, soldadura y producción."},
    {title:"Servicios",text:"Administración, gastronomía, salud y gestión."}]},
  cursos:{title:"Cursos y capacitaciones",subtitle:"Formación breve para desarrollar habilidades concretas.",icon:"📘",items:[
    {title:"Herramientas digitales",text:"Marketing, diseño, ofimática y gestión."},
    {title:"Oficios",text:"Electricidad, soldadura, refrigeración y más."},
    {title:"Habilidades laborales",text:"CV, entrevistas, atención al cliente y organización."}]},
  distancia:{title:"Educación a distancia",subtitle:"Propuestas virtuales e híbridas para estudiar desde donde estés.",icon:"💻",items:[
    {title:"Cursado dentro de WorkCerca",text:"Algunas propuestas permiten clases, actividades y seguimiento en Mi cursado.",badge:"Aula WorkCerca"},
    {title:"Campus de la institución",text:"Otras instituciones usan su propio campus y WorkCerca mantiene el seguimiento."},
    {title:"Modalidad híbrida",text:"Combiná encuentros presenciales y actividades online."}]},
  becas:{title:"Becas y financiamiento",subtitle:"Descubrí becas, beneficios y opciones de apoyo económico.",icon:"🎁",items:[
    {title:"Becas nacionales",text:"Programas disponibles según requisitos."},
    {title:"Becas institucionales",text:"Beneficios ofrecidos por universidades e institutos."},
    {title:"Programas provinciales o municipales",text:"Apoyos impulsados por gobiernos locales y provinciales."}]},
  gratuitas:{title:"Propuestas gratuitas",subtitle:"Filtrá opciones sin arancel de cursado.",icon:"🟢",items:[
    {title:"Universidades públicas",text:"Carreras y tecnicaturas gratuitas según propuesta."},
    {title:"Cursos gratuitos",text:"Capacitaciones financiadas por instituciones o programas públicos."},
    {title:"Convenios",text:"Propuestas articuladas con municipios y organizaciones."}]},
  orientador:{title:"Orientador IA WorkCerca",subtitle:"Conversá con la IA para explorar posibilidades sin que decida por vos.",icon:"✦",items:[
    {title:"¿Todavía no sabés qué estudiar?",text:"La IA te hace preguntas sobre intereses, preferencias y objetivos."},
    {title:"Explorá alternativas",text:"Compará áreas, duración, modalidad y posibilidades reales."},
    {title:"Vos elegís",text:"La IA orienta y recomienda; la decisión siempre es tuya.",badge:"Orientación, no diagnóstico"}]},
  camino:{title:"Descubrí tu camino",subtitle:"Construí un recorrido desde formación hasta empleo.",icon:"🧭",items:[
    {title:"1. Formación",text:"Carrera, curso o capacitación."},
    {title:"2. Práctica",text:"Pasantías, prácticas o experiencia."},
    {title:"3. Oportunidad",text:"Mi Primer Empleo, empleo o desarrollo profesional."}]},
  intereses:{title:"Explorar por intereses",subtitle:"Buscá por áreas que te llaman la atención.",icon:"♥",items:[
    {title:"Salud",text:"Enfermería, medicina, nutrición y áreas afines."},
    {title:"Tecnología",text:"Software, redes, IA, diseño y electrónica."},
    {title:"Educación, arte, derecho y más",text:"Explorá todas las áreas disponibles."}]},
  comparar:{title:"Comparar opciones",subtitle:"Compará hasta tres propuestas lado a lado.",icon:"⚖",items:[
    {title:"Duración",text:"Visualizá trayectos cortos y largos."},
    {title:"Costo y modalidad",text:"Gratuita/arancelada · Presencial/virtual/híbrida."},
    {title:"Inscripción y cursado",text:"Compará requisitos, fechas y si permite cursado dentro de WorkCerca."}]},
  guardados:{title:"Mis guardados",subtitle:"Revisá las propuestas que te interesaron.",icon:"☆",items:[
    {title:"Enfermería",text:"Guardada recientemente."},
    {title:"Desarrollo de Software",text:"Guardada para comparar."},
    {title:"Diseño Gráfico",text:"Guardada como opción virtual."}]},
  inscripciones:{title:"Mis inscripciones",subtitle:"Seguí el estado de cada inscripción dentro de WorkCerca.",icon:"📝",items:[
    {title:"Enfermería",text:"Estado: En revisión.",badge:"En revisión"},
    {title:"Desarrollo de Software",text:"Estado: Aceptada.",badge:"Aceptada"},
    {title:"Curso de Diseño",text:"Estado: Falta documentación.",badge:"Pendiente"}]},
  cursado:{title:"Mi cursado / Aula WorkCerca",subtitle:"Accedé a clases y actividades de propuestas online integradas.",icon:"▶",items:[
    {title:"Desarrollo de Software",text:"Progreso 38% · Próxima clase: viernes 18:00",badge:"Activo"},
    {title:"Diseño Gráfico Profesional",text:"Progreso 62% · 2 actividades pendientes",badge:"Activo"},
    {title:"Aula WorkCerca",text:"Clases, materiales, tareas, progreso, mensajes y certificados según corresponda."}]},
  historial:{title:"Historial",subtitle:"Consultá inscripciones, cursados y propuestas anteriores.",icon:"↺",items:[
    {title:"Capacitación completada",text:"Herramientas digitales · Finalizada."},
    {title:"Inscripción anterior",text:"Administración · No continuada."},
    {title:"Certificados",text:"Accedé a constancias emitidas por instituciones responsables."}]},
  instituciones:{title:"Instituciones",subtitle:"Explorá instituciones educativas y de formación.",icon:"🏫",items:[
    {title:"Universidades",text:"Públicas y privadas."},
    {title:"Institutos",text:"Terciarios y tecnológicos."},
    {title:"Centros de formación",text:"Cursos, oficios y capacitaciones."}]},
  municipios:{title:"Municipios y convenios",subtitle:"Descubrí propuestas impulsadas o articuladas por municipios.",icon:"🏛️",items:[
    {title:"Reconquista",text:"Programas de formación y convenios educativos."},
    {title:"Red de Municipios",text:"Propuestas regionales compartidas."},
    {title:"Institución responsable",text:"WorkCerca siempre identifica quién dicta y certifica la formación.",badge:"Transparencia"}]},
  novedades:{title:"Noticias y novedades",subtitle:"Enterate de nuevas carreras, becas, ferias y aperturas de inscripción.",icon:"📣",items:[
    {title:"Nueva carrera",text:"Apertura de propuesta en Córdoba."},
    {title:"Feria educativa",text:"Evento regional en Rosario."},
    {title:"Becas disponibles",text:"Actualización de programas de apoyo."}]},
  faq:{title:"Preguntas frecuentes",subtitle:"Respuestas claras sobre inscripción, cursado, costos y modalidades.",icon:"?",items:[
    {title:"¿Cómo me inscribo?",text:"Desde WorkCerca, cuando la propuesta permite inscripción integrada."},
    {title:"¿Quién otorga el título?",text:"La institución responsable de la propuesta."},
    {title:"¿Puedo hablar con la institución?",text:"Sí, por mensaje o videollamada cuando esté habilitado."}]},
};

export default function FeriaDeCarrerasPage(){
  const [active,setActive]=useState("panel");
  const [notice,setNotice]=useState("");
  const [query,setQuery]=useState("");
  const [province,setProvince]=useState("Toda Argentina");
  const [mode,setMode]=useState("Todas");
  const [type,setType]=useState("Todas");
  const [cost,setCost]=useState("Todas");
  const [selected,setSelected]=useState<(typeof proposals)[number] | null>(null);
  const [compare,setCompare]=useState<string[]>([]);

  const title=useMemo(()=>{
    const f=sidebar.find((x)=>x[2]===active);
    return f?.[1] || "Inicio";
  },[active]);

  const filtered=useMemo(()=>proposals.filter(p=>{
    const q=query.trim().toLowerCase();
    const qok=!q || [p.title,p.institution,p.city,p.province,p.type].join(" ").toLowerCase().includes(q);
    const pok=province==="Toda Argentina" || p.province===province;
    const mok=mode==="Todas" || p.mode===mode;
    const tok=type==="Todas" || p.type===type;
    const cok=cost==="Todas" || p.cost===cost;
    return qok && pok && mok && tok && cok;
  }),[query,province,mode,type,cost]);

  const action=(m:string)=>{setNotice(m); window.setTimeout(()=>setNotice(""),3000)};
  const go=(p:string)=>{window.location.href=p};

  const toggleCompare=(title:string)=>{
    setCompare(prev=>{
      if(prev.includes(title)) return prev.filter(x=>x!==title);
      if(prev.length>=3){ action("Podés comparar hasta 3 propuestas."); return prev; }
      return [...prev,title];
    });
  };

  return (
    <main className="feriaApp">
      <style>{`
        :root{--navy:#08152f;--navy2:#102154;--purple:#6536dc;--purple2:#7e49ef;--text:#18213d;--muted:#6d778c;--line:#e1e7f0;--bg:#f7f8fc}
        *{box-sizing:border-box}html,body{margin:0;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input,select{font:inherit}button{cursor:pointer}.feriaApp{min-height:100vh;background:linear-gradient(180deg,#fff,#f7f8fc)}
        .top{height:74px;background:#fff;border-bottom:1px solid #e7eaf2;display:grid;grid-template-columns:240px 1fr auto;gap:18px;align-items:center;padding:0 20px;position:sticky;top:0;z-index:70}.brand{border:0;background:transparent;display:flex;gap:10px;align-items:center;text-align:left;color:#1b2251}.mark{width:42px;height:42px;border-radius:14px;background:linear-gradient(145deg,var(--purple),#8b65f4);color:#fff;display:grid;place-items:center;font-weight:1000}.brand strong{font-size:25px}.brand small{display:block;font-size:10px;color:#6f7890}.topSearch{display:flex;gap:8px}.topSearch input{flex:1;min-height:40px;border:1px solid #dce3ee;border-radius:9px;padding:0 12px}.topSearch select{min-height:40px;border:1px solid #dce3ee;border-radius:9px;background:#fff;padding:0 10px}.topActions{display:flex;gap:9px;align-items:center}.iconBtn,.userBtn{border:1px solid #dfe5ef;background:#fff;border-radius:10px;min-height:39px}.iconBtn{width:39px;position:relative}.badgeTop{position:absolute;top:-5px;right:-3px;background:#ef4444;color:#fff;border-radius:99px;min-width:18px;height:18px;display:grid;place-items:center;font-size:9px;font-weight:900}.userBtn{display:flex;gap:8px;align-items:center;padding:0 10px;font-weight:900}.avatar{width:31px;height:31px;border-radius:50%;background:var(--purple);color:#fff;display:grid;place-items:center}
        .shell{display:grid;grid-template-columns:240px minmax(0,1fr);min-height:calc(100vh - 74px)}.side{background:linear-gradient(180deg,#08152f,#0d2145 72%,#13254e);color:#fff;padding:12px 10px 18px;position:sticky;top:74px;height:calc(100vh - 74px);overflow:auto}.side button{width:100%;min-height:40px;border:0;border-radius:8px;background:transparent;color:#f2f5ff;display:grid;grid-template-columns:27px 1fr auto;gap:7px;align-items:center;text-align:left;padding:0 9px;font-size:11px}.side button:hover{background:rgba(255,255,255,.06)}.side button.active{background:linear-gradient(90deg,var(--purple),var(--purple2));font-weight:1000}.sideBadge{min-width:22px;height:22px;border-radius:99px;background:#7448e5;display:grid;place-items:center;padding:0 5px;font-size:8px}.sideHelp{margin-top:18px;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;background:#171a52}.sideHelp p{font-size:9px;line-height:1.45;color:#c7c7e7}.sideHelp button{display:block;margin-top:8px;background:#6840dc;text-align:center}
        .content{padding:14px}.heroGrid{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:11px}.hero{min-height:305px;border-radius:15px;overflow:hidden;position:relative;background:radial-gradient(circle at 77% 35%,rgba(137,88,255,.38),transparent 28%),linear-gradient(135deg,#091435,#25115d 55%,#3d1781);color:#fff;padding:25px;box-shadow:0 12px 26px rgba(50,31,104,.18)}.hero::after{content:"ARGENTINA";position:absolute;right:24px;top:46px;font-size:62px;font-weight:1000;letter-spacing:-.05em;color:rgba(255,255,255,.07);transform:rotate(-12deg)}.hero h1{font-size:39px;margin:0 0 9px}.hero h1 span{color:#9b6bff}.hero p{margin:0;color:#d9d9ee;max-width:540px;line-height:1.5}.heroSearch{display:grid;grid-template-columns:1.35fr .8fr .8fr auto;gap:7px;margin-top:22px}.heroSearch input,.heroSearch select{min-height:42px;border:0;border-radius:8px;padding:0 10px}.searchBtn{border:0;border-radius:8px;background:linear-gradient(135deg,#7344e9,#8d58f5);color:#fff;padding:0 15px;font-weight:900}.popular{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.popular span{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.12);border-radius:99px;padding:5px 8px;font-size:9px}.heroStats{display:flex;gap:26px;margin-top:34px}.heroStats strong{display:block;font-size:20px}.heroStats span{font-size:9px;color:#c9cae2}
        .aiCard{border:1px solid #e4ddf6;border-radius:15px;background:linear-gradient(180deg,#f8f4ff,#fff);padding:15px}.aiRobot{font-size:58px;text-align:center}.aiCard h3{margin:0;color:#43249c}.aiCard h4{font-size:15px;margin:10px 0 4px}.aiCard p{font-size:10px;line-height:1.5;color:#6d7186}.aiCard button{width:100%;min-height:38px;border:0;border-radius:8px;background:linear-gradient(135deg,#6536dc,#7e49ef);color:#fff;font-weight:900;margin-top:8px}.aiCard .link{background:transparent;color:#6536dc;border:0;text-align:left;padding:7px 0}
        .benefits{margin-top:11px;display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.benefit{border:1px solid #e4e8f0;background:#fff;border-radius:12px;padding:11px;display:flex;gap:9px;align-items:center}.benefitIcon{width:36px;height:36px;border-radius:50%;background:#f0eaff;color:#6536dc;display:grid;place-items:center}.benefit b{font-size:10px}.benefit p{margin:2px 0 0;color:#788296;font-size:8px}
        .mainGrid{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:11px;margin-top:11px}.card{border:1px solid var(--line);background:#fff;border-radius:13px;box-shadow:0 8px 18px rgba(35,52,91,.05)}.section{padding:13px}.panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.panelHead h3{margin:0;font-size:16px}.linkBtn{border:0;background:transparent;color:var(--purple);font-size:9px;font-weight:900}
        .cards{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.proposal{border:1px solid #e1e6ef;border-radius:11px;overflow:hidden;background:#fff}.proposalVisual{height:100px;background:linear-gradient(145deg,#dce8ff,#efe4ff);display:grid;place-items:center;font-size:40px;position:relative}.badge{position:absolute;top:7px;left:7px;background:#1dbb6b;color:#fff;border-radius:5px;padding:3px 6px;font-size:7px;font-weight:1000}.proposalBody{padding:9px}.proposalBody h4{margin:0;font-size:11px}.proposalBody p{margin:3px 0;color:#6f798c;font-size:8px}.proposalMeta{display:grid;gap:3px;margin-top:6px;font-size:8px;color:#556276}.costFree{color:#18a95d;font-weight:900}.costPaid{color:#d45151;font-weight:900}.proposalActions{display:grid;grid-template-columns:1fr auto;gap:5px;margin-top:8px}.proposalActions button{min-height:31px;border-radius:7px;font-size:8px;font-weight:900}.viewBtn{border:1px solid #c8b8f5;background:#fff;color:#6536dc}.saveBtn{width:31px;border:1px solid #dde2ec;background:#fff}.compareBtn{width:100%;border:0;background:#f2eeff;color:#6536dc;margin-top:5px;min-height:29px;border-radius:6px;font-size:8px;font-weight:900}
        .filters{padding:13px}.filters label{display:block;font-size:9px;font-weight:900;margin:9px 0 4px}.filters select{width:100%;min-height:36px;border:1px solid #dce3ee;border-radius:7px;background:#fff;padding:0 8px}.apply{width:100%;min-height:38px;border:0;border-radius:8px;background:linear-gradient(135deg,#6536dc,#7e49ef);color:#fff;font-weight:900;margin-top:12px}
        .interest{margin-top:11px;padding:13px}.interestGrid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.interestBox{border:1px solid #e3e7f0;border-radius:10px;padding:10px;text-align:center}.interestIcon{font-size:22px}.interestBox b{display:block;font-size:9px;margin-top:5px}.interestBox small{font-size:7px;color:#7b8496}
        .tableCard{margin-top:11px;padding:13px}.tabs{display:flex;gap:8px;border-bottom:1px solid #eceff5}.tab{border:0;background:transparent;padding:8px;color:#6b7488;font-size:9px;font-weight:800}.tab.active{color:#6536dc;border-bottom:2px solid #6536dc}.tr{display:grid;grid-template-columns:1.4fr 1fr .7fr .55fr .55fr .4fr;gap:8px;align-items:center;padding:9px 6px;border-bottom:1px solid #edf0f5;font-size:8px}.tr.head{font-weight:900;background:#fafbfe}.tr b{font-size:9px}.more{border:1px solid #c8b8f5;background:#fff;color:#6536dc;border-radius:6px;padding:5px 6px;font-size:8px;font-weight:900}
        .sideStack{display:grid;gap:11px}.miniCard{padding:12px}.miniRow{padding:8px 0;border-bottom:1px solid #edf0f5}.miniRow:last-child{border-bottom:0}.miniRow b{font-size:9px}.miniRow p{margin:2px 0;color:#748095;font-size:8px}
        .footerFeatures{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:11px}.feature{padding:13px;display:flex;gap:10px;align-items:center}.featureIcon{width:44px;height:44px;border-radius:50%;background:#eee8ff;color:#6536dc;display:grid;place-items:center;font-size:22px}.feature b{font-size:11px}.feature p{margin:2px 0;color:#717c90;font-size:8px}.feature button{border:1px solid #cbbcf4;background:#fff;color:#6536dc;border-radius:7px;padding:5px 8px;font-size:8px;font-weight:900;margin-top:4px}
        .moduleScreen{display:grid;gap:10px}.moduleHero{padding:17px;border-radius:13px;background:linear-gradient(135deg,#6536dc,#7e49ef);color:#fff;display:grid;grid-template-columns:56px 1fr auto;gap:12px;align-items:center}.moduleHeroIcon{width:54px;height:54px;border-radius:15px;background:rgba(255,255,255,.16);display:grid;place-items:center;font-size:27px}.moduleHero h2{margin:0;font-size:22px}.moduleHero p{margin:4px 0 0;font-size:11px;color:#eee9ff}.moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.moduleItem{padding:15px;min-height:126px;display:flex;flex-direction:column;justify-content:space-between}.moduleItem h3{margin:0 0 6px;font-size:14px}.moduleItem p{margin:0;color:#6e788c;font-size:10px;line-height:1.5}.moduleBadge{align-self:flex-start;margin-top:11px;background:#efe9ff;color:#6536dc;border-radius:99px;padding:4px 7px;font-size:8px;font-weight:900}.moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.moduleAction{padding:15px}.moduleAction h3{margin:0 0 5px}.moduleAction p{margin:0 0 12px;color:#6e788c;font-size:10px;line-height:1.5}.purpleBtn,.outlineBtn{min-height:37px;border-radius:8px;font-weight:900;padding:0 11px}.purpleBtn{border:1px solid #6536dc;background:#6536dc;color:#fff}.outlineBtn{border:1px solid #cdbef6;background:#fff;color:#6536dc}
        .modalBack{position:fixed;inset:0;background:rgba(7,15,35,.62);z-index:100;display:grid;place-items:center;padding:18px}.modal{width:min(760px,100%);max-height:88vh;overflow:auto;background:#fff;border-radius:16px;padding:18px;box-shadow:0 24px 70px rgba(0,0,0,.3)}.modalHead{display:flex;justify-content:space-between;gap:12px}.close{width:36px;height:36px;border:1px solid #dde3ed;background:#fff;border-radius:50%}.modal h2{margin:0}.modalMeta{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-top:12px}.metaBox{border:1px solid #e2e7ef;border-radius:9px;padding:10px}.metaBox b{font-size:9px}.metaBox p{margin:3px 0;color:#6e788c;font-size:9px}.modalActions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.modalActions button{min-height:38px;border-radius:8px;font-weight:900}.modalNote{margin-top:12px;background:#f5f2ff;border-radius:10px;padding:11px;font-size:9px;color:#5f6680;line-height:1.5}.toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:#6536dc;color:#fff;padding:12px 16px;border-radius:10px;font-weight:1000}
        @media(max-width:1100px){.heroGrid,.mainGrid{grid-template-columns:1fr}.cards{grid-template-columns:repeat(2,1fr)}.filters{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.filters .apply{grid-column:1/-1}.benefits{grid-template-columns:repeat(3,1fr)}.interestGrid{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:850px){.top{grid-template-columns:1fr auto}.topSearch{display:none}.shell{grid-template-columns:78px 1fr}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.sideBadge,.sideHelp{display:none}.moduleGrid,.moduleActions{grid-template-columns:1fr}.heroSearch{grid-template-columns:1fr 1fr}.searchBtn{min-height:42px}.heroStats{gap:14px}.tr{grid-template-columns:1.5fr .8fr .7fr .45fr}.tr>*:nth-child(4),.tr>*:nth-child(5){display:none}}
        @media(max-width:600px){.top{padding:0 10px}.brand strong{font-size:20px}.brand small{display:none}.userBtn span:last-child{display:none}.shell{grid-template-columns:60px 1fr}.content{padding:8px}.hero h1{font-size:31px}.heroSearch{grid-template-columns:1fr}.benefits{grid-template-columns:1fr 1fr}.cards{grid-template-columns:1fr}.interestGrid{grid-template-columns:repeat(2,1fr)}.footerFeatures{grid-template-columns:1fr}.modalMeta,.modalActions{grid-template-columns:1fr}}
      `}</style>

      <header className="top">
        <button className="brand" onClick={()=>go("/")}>
          <span className="mark">W</span>
          <span><strong>WorkCerca</strong><small>Feria de Carreras · tu futuro en un solo lugar.</small></span>
        </button>
        <div className="topSearch">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar carreras, cursos, instituciones..." />
          <select value={province} onChange={e=>setProvince(e.target.value)}>
            <option>Toda Argentina</option><option>Santa Fe</option><option>Buenos Aires</option><option>Córdoba</option><option>Mendoza</option><option>Neuquén</option>
          </select>
        </div>
        <div className="topActions">
          <button className="iconBtn" onClick={()=>action("Tenés 5 novedades nuevas.")}>🔔<span className="badgeTop">5</span></button>
          <button className="iconBtn" onClick={()=>action("Tenés 2 mensajes nuevos.")}>✉️<span className="badgeTop">2</span></button>
          <button className="userBtn" onClick={()=>setActive("inscripciones")}><span className="avatar">S</span><span>Hola, Sofía</span></button>
        </div>
      </header>

      <div className="shell">
        <aside className="side">
          {sidebar.map(([icon,label,key,badge])=>(
            <button key={key} className={active===key?"active":""} onClick={()=>setActive(key)}>
              <span>{icon}</span><span>{label}</span>{badge?<span className="sideBadge">{badge}</span>:<span/>}
            </button>
          ))}
          <button onClick={()=>go("/")} style={{marginTop:10,borderTop:"1px solid rgba(255,255,255,.08)",borderRadius:0}}>
            <span>←</span><span>Volver a Inicio</span><span/>
          </button>
          <div className="sideHelp">
            <b>¿Necesitás ayuda?</b>
            <p>Podés hablar con el Orientador IA o con una institución cuando la propuesta lo permita.</p>
            <button onClick={()=>setActive("orientador")}>Abrir orientación</button>
          </div>
        </aside>

        <section className="content">
          {active==="panel" ? (
            <>
              <div className="heroGrid">
                <section className="hero">
                  <h1>Tu <span>futuro</span> empieza acá</h1>
                  <p>Explorá miles de carreras, cursos y capacitaciones de todo el país en un solo lugar.</p>
                  <div className="heroSearch">
                    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="¿Qué querés estudiar?" />
                    <select value={mode} onChange={e=>setMode(e.target.value)}><option>Todas</option><option>Presencial</option><option>Virtual</option><option>Híbrida</option></select>
                    <select value={type} onChange={e=>setType(e.target.value)}><option>Todas</option><option>Carrera</option><option>Tecnicatura</option><option>Curso</option></select>
                    <button className="searchBtn" onClick={()=>action(`${filtered.length} propuestas encontradas.`)}>Buscar</button>
                  </div>
                  <div className="popular"><span>Enfermería</span><span>Programación</span><span>Diseño</span><span>Administración</span><span>Educación</span></div>
                  <div className="heroStats">
                    <div><strong>12.458</strong><span>Propuestas</span></div>
                    <div><strong>2.156</strong><span>Instituciones</span></div>
                    <div><strong>24</strong><span>Provincias</span></div>
                    <div><strong>365</strong><span>Días para explorar</span></div>
                  </div>
                </section>

                <aside className="aiCard">
                  <h3>Orientador IA WorkCerca</h3>
                  <div className="aiRobot">🤖</div>
                  <h4>¿No sabés qué estudiar?</h4>
                  <p>La IA te ayuda a explorar intereses, modalidades y alternativas reales. Vos elegís.</p>
                  <button onClick={()=>setActive("orientador")}>Hablar con la IA</button>
                  <button className="link" onClick={()=>setActive("camino")}>Descubrir mi camino →</button>
                </aside>
              </div>

              <div className="benefits">
                {[
                  ["🛡","Todo en un solo lugar","Explorá opciones de todo el país."],
                  ["💜","Gratuitas y aranceladas","Encontrá propuestas según tu presupuesto."],
                  ["💻","Presencial, virtual e híbrida","Elegí cómo estudiar."],
                  ["📝","Inscribite desde WorkCerca","Evitá saltos innecesarios."],
                  ["📍","Seguimiento de inscripción","Controlá el estado desde tu cuenta."],
                ].map(([i,t,d])=><div className="benefit" key={t}><span className="benefitIcon">{i}</span><div><b>{t}</b><p>{d}</p></div></div>)}
              </div>

              <div className="mainGrid">
                <div>
                  <article className="card section">
                    <div className="panelHead"><h3>✦ Recomendadas para vos</h3><button className="linkBtn" onClick={()=>setActive("todas")}>Ver todas</button></div>
                    <div className="cards">
                      {filtered.slice(0,4).map(p=>(
                        <article className="proposal" key={p.title}>
                          <div className="proposalVisual"><span className="badge">{p.badge}</span>{p.icon}</div>
                          <div className="proposalBody">
                            <h4>{p.title}</h4><p>{p.institution}</p>
                            <div className="proposalMeta">
                              <span>📍 {p.city}</span><span>▣ {p.mode}</span><span>◷ {p.duration}</span>
                              <span className={p.cost==="Gratuita"?"costFree":"costPaid"}>{p.cost}</span>
                              {p.integratedCourse && <span className="costFree">● Cursado disponible en WorkCerca</span>}
                            </div>
                            <div className="proposalActions">
                              <button className="viewBtn" onClick={()=>setSelected(p)}>Ver propuesta</button>
                              <button className="saveBtn" onClick={()=>action("Propuesta guardada.")}>☆</button>
                            </div>
                            <button className="compareBtn" onClick={()=>toggleCompare(p.title)}>{compare.includes(p.title)?"Quitar de comparación":"Comparar"}</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </article>

                  <article className="card interest">
                    <div className="panelHead"><h3>Explorá por áreas de interés</h3><button className="linkBtn" onClick={()=>setActive("intereses")}>Ver todas</button></div>
                    <div className="interestGrid">
                      {[
                        ["♥","Salud","1.245 opciones"],["▣","Tecnología","1.890 opciones"],["🎓","Educación","1.156 opciones"],["📊","Administración","1.432 opciones"],["🎨","Arte y Diseño","876 opciones"],["⚖","Derecho","642 opciones"],["…","Ver más","Todas las áreas"],
                      ].map(([i,t,n])=><button className="interestBox" key={t} onClick={()=>{setQuery(t==="Ver más"?"":t);action(`Explorando ${t}`)}}><span className="interestIcon">{i}</span><b>{t}</b><small>{n}</small></button>)}
                    </div>
                  </article>

                  <article className="card tableCard">
                    <div className="panelHead"><h3>Propuestas destacadas</h3><button className="linkBtn" onClick={()=>setActive("todas")}>Ver todas</button></div>
                    <div className="tabs"><button className="tab active">Destacadas</button><button className="tab">Nuevas</button><button className="tab">Gratuitas</button><button className="tab">A distancia</button><button className="tab">Con salida laboral</button></div>
                    <div className="tr head"><span>Propuesta</span><span>Institución</span><span>Modalidad</span><span>Duración</span><span>Arancel</span><span/></div>
                    {proposals.slice(0,5).map(p=><div className="tr" key={p.title}><span><b>{p.title}</b></span><span>{p.institution}</span><span>{p.mode}</span><span>{p.duration}</span><span className={p.cost==="Gratuita"?"costFree":"costPaid"}>{p.cost}</span><span><button className="more" onClick={()=>setSelected(p)}>Ver más</button></span></div>)}
                  </article>
                </div>

                <aside className="sideStack">
                  <article className="card filters">
                    <div className="panelHead"><h3>Filtrá tu búsqueda</h3></div>
                    <label>Provincia</label><select value={province} onChange={e=>setProvince(e.target.value)}><option>Toda Argentina</option><option>Santa Fe</option><option>Buenos Aires</option><option>Córdoba</option><option>Mendoza</option><option>Neuquén</option></select>
                    <label>Modalidad</label><select value={mode} onChange={e=>setMode(e.target.value)}><option>Todas</option><option>Presencial</option><option>Virtual</option><option>Híbrida</option></select>
                    <label>Tipo de formación</label><select value={type} onChange={e=>setType(e.target.value)}><option>Todas</option><option>Carrera</option><option>Tecnicatura</option><option>Curso</option></select>
                    <label>Arancel</label><select value={cost} onChange={e=>setCost(e.target.value)}><option>Todas</option><option>Gratuita</option><option>Arancelada</option></select>
                    <button className="apply" onClick={()=>action(`${filtered.length} resultados aplicando filtros.`)}>Aplicar filtros</button>
                  </article>

                  <article className="card miniCard">
                    <div className="panelHead"><h3>Becas y financiamiento</h3><button className="linkBtn" onClick={()=>setActive("becas")}>Ver todas</button></div>
                    <div className="miniRow"><b>🎓 Becas nacionales</b><p>Programas según requisitos.</p></div>
                    <div className="miniRow"><b>🏫 Becas institucionales</b><p>Beneficios por institución.</p></div>
                    <div className="miniRow"><b>🏛️ Programas provinciales</b><p>Apoyo según provincia.</p></div>
                  </article>

                  <article className="card miniCard">
                    <div className="panelHead"><h3>Novedades</h3><button className="linkBtn" onClick={()=>setActive("novedades")}>Ver todas</button></div>
                    <div className="miniRow"><b>Nueva carrera en Córdoba</b><p>Ciencia de Datos · apertura reciente.</p></div>
                    <div className="miniRow"><b>Feria educativa en Rosario</b><p>Evento regional.</p></div>
                    <div className="miniRow"><b>Becas disponibles</b><p>Nuevos programas de apoyo.</p></div>
                  </article>
                </aside>
              </div>

              <div className="footerFeatures">
                <article className="card feature"><span className="featureIcon">⚖</span><div><b>Compará opciones fácilmente</b><p>Hasta 3 propuestas lado a lado.</p><button onClick={()=>setActive("comparar")}>Comparar ahora</button></div></article>
                <article className="card feature"><span className="featureIcon">📝</span><div><b>Inscribite dentro de WorkCerca</b><p>Seguimiento sin perderte entre páginas.</p><button onClick={()=>setActive("inscripciones")}>Mis inscripciones</button></div></article>
                <article className="card feature"><span className="featureIcon">▶</span><div><b>Cursá online desde WorkCerca</b><p>Cuando la institución habilita Aula WorkCerca.</p><button onClick={()=>setActive("cursado")}>Mi cursado</button></div></article>
              </div>
            </>
          ) : (
            <section className="moduleScreen">
              <div className="moduleHero">
                <div className="moduleHeroIcon">{screenData[active]?.icon || "•"}</div>
                <div><h2>{screenData[active]?.title || title}</h2><p>{screenData[active]?.subtitle}</p></div>
                {active==="orientador" ? <button className="purpleBtn" onClick={()=>action("Orientador IA: contame qué tenés en mente y exploramos opciones.")}>Iniciar conversación</button> : <button className="purpleBtn" onClick={()=>setActive("panel")}>Volver a explorar</button>}
              </div>
              <div className="moduleGrid">
                {(screenData[active]?.items || []).map(item=><article className="card moduleItem" key={item.title}><div><h3>{item.title}</h3><p>{item.text}</p></div>{item.badge&&<span className="moduleBadge">{item.badge}</span>}</article>)}
              </div>
              <div className="moduleActions">
                <article className="card moduleAction">
                  <h3>✦ IA WorkCerca</h3>
                  <p>Podés pedir orientación, comparar opciones o revisar qué se adapta mejor a tus intereses y situación. La IA no decide por vos.</p>
                  <button className="purpleBtn" onClick={()=>setActive("orientador")}>Hablar con el Orientador IA</button>
                </article>
                <article className="card moduleAction">
                  <h3>🔗 Todo conectado</h3>
                  <p>Instituciones y municipios publican propuestas; vos explorás, consultás, te inscribís y seguís el proceso desde WorkCerca.</p>
                  <button className="outlineBtn" onClick={()=>setActive("panel")}>Volver a Feria de Carreras</button>
                </article>
              </div>
            </section>
          )}
        </section>
      </div>

      {selected && (
        <div className="modalBack" onClick={()=>setSelected(null)}>
          <article className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modalHead"><div><h2>{selected.title}</h2><p style={{margin:"5px 0",color:"#687287"}}>{selected.institution}</p></div><button className="close" onClick={()=>setSelected(null)}>✕</button></div>
            <div className="modalMeta">
              <div className="metaBox"><b>Ubicación</b><p>{selected.city}, {selected.province}</p></div>
              <div className="metaBox"><b>Modalidad</b><p>{selected.mode}</p></div>
              <div className="metaBox"><b>Duración</b><p>{selected.duration}</p></div>
              <div className="metaBox"><b>Arancel</b><p>{selected.cost}</p></div>
            </div>
            <div className="modalNote">
              La institución responsable es <b>{selected.institution}</b>. WorkCerca facilita la inscripción, comunicación y, cuando está habilitado, el cursado online; no reemplaza a la institución académica ni otorga el título salvo que legalmente corresponda.
            </div>
            <div className="modalActions">
              <button className="purpleBtn" onClick={()=>{action("Inscripción iniciada dentro de WorkCerca.");setActive("inscripciones");setSelected(null)}}>Inscribirme en WorkCerca</button>
              <button className="outlineBtn" onClick={()=>action("Mensaje enviado a la institución.")}>Hablar con la institución</button>
              <button className="outlineBtn" onClick={()=>action("Solicitud de videollamada enviada. Podrás elegir horario y motivo de consulta.")}>Solicitar videollamada</button>
            </div>
            {selected.integratedCourse && (
              <div className="modalNote" style={{marginTop:10}}>
                <b>● Cursado disponible en WorkCerca.</b> Si tu inscripción es aceptada, esta propuesta aparecerá en <b>Mi cursado</b> con clases, actividades, calendario, progreso y comunicación.
              </div>
            )}
          </article>
        </div>
      )}

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
