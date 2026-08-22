"use client";

import { useMemo, useState } from "react";

type SideItem = readonly [string, string, string, string?];

const sidebar: readonly SideItem[] = [
  ["⌂", "Mi Panel", "panel"],
  ["⌂", "Mi Emprendimiento", "emprendimiento"],
  ["▦", "Productos y Servicios", "productos"],
  ["▣", "Pedidos", "pedidos", "14"],
  ["♙", "Clientes", "clientes"],
  ["▱", "Mensajes", "mensajes", "9"],
  ["□", "Agenda", "agenda"],
  ["▣", "Videollamadas", "videollamadas"],
  ["◇", "Promociones", "promociones"],
  ["⌁", "Publicidad", "publicidad"],
  ["♧", "Proveedores", "proveedores"],
  ["⌘", "Oportunidades", "oportunidades"],
  ["♜", "Programas y Beneficios", "programas"],
  ["▤", "Capacitaciones", "capacitaciones"],
  ["◉", "Finanzas / Estadísticas", "finanzas"],
  ["▧", "Mi CV", "cv"],
  ["▢", "Buscar empleo", "empleo"],
  ["⌁", "Mis postulaciones", "postulaciones"],
  ["♢", "Reputación y Confianza", "confianza"],
  ["⚙", "Configuración", "configuracion"],
];

const moduleScreens: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  primary: string;
  items: { title: string; text: string; badge?: string; photo?: string }[];
}> = {
  emprendimiento: {
    title: "Mi Emprendimiento",
    subtitle: "Administrá la identidad, ubicación, presentación pública y datos visibles de tu emprendimiento.",
    icon: "⌂",
    primary: "Editar emprendimiento",
    items: [
      { title: "Pan Casero Don Luis", text: "Alimentos artesanales · Reconquista, Santa Fe", badge: "Verificado", photo:"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=700" },
      { title: "Perfil público", text: "Descripción, horarios, contacto, zona de entrega y medios de atención.", photo:"https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=700" },
      { title: "Confianza", text: "Información comercial clara y reputación construida dentro de WorkCerca.", badge: "Activo" },
    ],
  },
  productos: {
    title: "Productos y Servicios",
    subtitle: "Publicá y gestioná lo que realmente vendés u ofrecés, con ayuda profesional de IA.",
    icon: "▦",
    primary: "Crear publicación con IA",
    items: [
      { title: "Pan integral artesanal", text: "Foto, descripción, precio y disponibilidad.", badge: "Publicado", photo:"https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=700" },
      { title: "Torta de chocolate", text: "Producto destacado del emprendimiento.", badge: "Publicado", photo:"https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=700" },
      { title: "Asistente de Publicación IA", text: "Mejora luz, fondo, encuadre, título, descripción y etiquetas sin falsear el producto.", badge: "IA WorkCerca" },
    ],
  },
  pedidos: {
    title: "Pedidos",
    subtitle: "Gestioná pedidos nuevos, en preparación, entregados o cancelados.",
    icon: "▣",
    primary: "Ver pedidos nuevos",
    items: [
      { title: "Pedido #1234", text: "Pan integral artesanal · Entrega hoy", badge: "Nuevo" },
      { title: "Pedido #1233", text: "Facturas surtidas · Pago confirmado", badge: "En preparación" },
      { title: "Historial de pedidos", text: "Consultá compras anteriores, estados y entregas." },
    ],
  },
  clientes: {
    title: "Clientes",
    subtitle: "Conocé y atendé mejor a quienes eligen tu emprendimiento.",
    icon: "♙",
    primary: "Ver clientes",
    items: [
      { title: "Clientes frecuentes", text: "Personas que compraron más de una vez." },
      { title: "Nuevos clientes", text: "Contactos recientes desde WorkCerca.", badge: "12 nuevos" },
      { title: "Seguimiento", text: "Historial de pedidos, mensajes y consultas." },
    ],
  },
  mensajes: {
    title: "Mensajes",
    subtitle: "Conversaciones con clientes, proveedores, empresas, municipios e instituciones.",
    icon: "▱",
    primary: "Nuevo mensaje",
    items: [
      { title: "María López", text: "Consulta por disponibilidad de pan casero.", badge: "Nuevo" },
      { title: "Empresa local", text: "Consulta por desayuno para reunión." },
      { title: "Municipalidad", text: "Invitación a feria regional." },
    ],
  },
  agenda: {
    title: "Agenda",
    subtitle: "Organizá entregas, reuniones, compras, eventos y entrevistas.",
    icon: "□",
    primary: "Agregar evento",
    items: [
      { title: "10:00 · Entrega", text: "Pedido #1234 · Reconquista" },
      { title: "14:30 · Reunión", text: "Proveedor de packaging" },
      { title: "17:00 · Videollamada", text: "Empresa local · Propuesta comercial" },
    ],
  },
  videollamadas: {
    title: "Videollamadas",
    subtitle: "Reuniones comerciales, entrevistas laborales y encuentros con organizaciones.",
    icon: "▣",
    primary: "Programar videollamada",
    items: [
      { title: "Empresa local", text: "Reunión comercial · Hoy 17:00", badge: "Hoy" },
      { title: "Entrevista laboral", text: "Empresa regional · Viernes 10:30" },
      { title: "Institución aliada", text: "Capacitación para emprendedores · Próxima semana" },
    ],
  },
  promociones: {
    title: "Promociones",
    subtitle: "Creá ofertas y promociones para dar visibilidad a productos o servicios reales.",
    icon: "◇",
    primary: "Crear promoción",
    items: [
      { title: "Promoción fin de semana", text: "Oferta especial para aumentar ventas.", badge: "Sugerida por IA" },
      { title: "Fechas especiales", text: "Campañas vinculadas al calendario y actividad." },
      { title: "Promoción local", text: "Puede mostrarse a personas cercanas si es relevante." },
    ],
  },
  publicidad: {
    title: "Publicidad",
    subtitle: "Impulsá tu emprendimiento dentro de WorkCerca con segmentación clara.",
    icon: "⌁",
    primary: "Crear campaña",
    items: [
      { title: "Campaña local", text: "Reconquista y alrededores · Segmentación por ubicación." },
      { title: "Producto destacado", text: "Mostrá una publicación en contextos relevantes." },
      { title: "Rendimiento", text: "Visualizaciones, clics y consultas recibidas." },
    ],
  },
  proveedores: {
    title: "Proveedores",
    subtitle: "Encontrá insumos, servicios y aliados para tu emprendimiento.",
    icon: "♧",
    primary: "Buscar proveedores",
    items: [
      { title: "Materia prima", text: "Opciones locales y regionales para comparar.", badge: "Cerca tuyo" },
      { title: "Packaging", text: "Proveedores sugeridos por zona." },
      { title: "Servicios profesionales", text: "Diseño, fotografía, contabilidad, mantenimiento y más." },
    ],
  },
  oportunidades: {
    title: "Oportunidades",
    subtitle: "La IA reúne oportunidades comerciales, institucionales y laborales compatibles con tu actividad.",
    icon: "⌘",
    primary: "Actualizar sugerencias IA",
    items: [
      { title: "Feria regional", text: "Municipalidad · Convocatoria abierta", badge: "IA" },
      { title: "Proveedor para empresa", text: "Empresa busca productos para evento", badge: "IA" },
      { title: "Capacitación", text: "Marketing digital para emprendimientos." },
    ],
  },
  programas: {
    title: "Programas y Beneficios",
    subtitle: "Accedé a programas municipales, institucionales y beneficios para emprendedores.",
    icon: "♜",
    primary: "Explorar programas",
    items: [
      { title: "Programa local", text: "Asistencia a emprendimientos de la región.", badge: "Municipio" },
      { title: "Beneficio institucional", text: "Capacitación y acompañamiento comercial.", badge: "Institución" },
      { title: "Convocatorias", text: "Ferias, fondos, encuentros y espacios de promoción." },
    ],
  },
  capacitaciones: {
    title: "Capacitaciones",
    subtitle: "Formación recomendada para mejorar ventas, gestión y crecimiento.",
    icon: "▤",
    primary: "Explorar capacitaciones",
    items: [
      { title: "Marketing digital", text: "Mejorá la visibilidad de tu emprendimiento.", badge: "Recomendada" },
      { title: "Costos y precios", text: "Herramientas para ordenar números y rentabilidad." },
      { title: "Fotografía de producto", text: "Presentación profesional sin falsear lo que vendés." },
    ],
  },
  finanzas: {
    title: "Finanzas / Estadísticas",
    subtitle: "Visualizá ventas, pedidos, consultas y rendimiento de tu actividad.",
    icon: "◉",
    primary: "Ver informe",
    items: [
      { title: "Ventas del mes", text: "$1.245.300 · Datos demostrativos", badge: "+18%" },
      { title: "Pedidos", text: "32 pedidos registrados." },
      { title: "Producto más vendido", text: "Pan integral artesanal · 45 unidades" },
    ],
  },
  cv: {
    title: "Mi CV",
    subtitle: "Podés emprender y también buscar trabajo con la misma identidad WorkCerca.",
    icon: "▧",
    primary: "Editar mi CV",
    items: [
      { title: "CV WorkCerca", text: "Experiencia, formación, habilidades y referencias.", badge: "Completo 80%" },
      { title: "Experiencia emprendedora", text: "Gestión, ventas, atención al cliente y organización pueden formar parte de tu experiencia." },
      { title: "Visibilidad laboral", text: "Empresas, municipios e instituciones pueden encontrarte según tus permisos." },
    ],
  },
  empleo: {
    title: "Buscar empleo",
    subtitle: "Buscá oportunidades laborales compatibles con experiencia, CV y disponibilidad.",
    icon: "▢",
    primary: "Buscar oportunidades",
    items: [
      { title: "Administración comercial", text: "Empresa local · Reconquista", badge: "90% compatible" },
      { title: "Atención al cliente", text: "Comercio regional · Jornada parcial", badge: "86% compatible" },
      { title: "Asistente de ventas", text: "Empresa de servicios · Modalidad híbrida", badge: "82% compatible" },
    ],
  },
  postulaciones: {
    title: "Mis postulaciones",
    subtitle: "Seguimiento de postulaciones laborales hechas desde tu cuenta WorkCerca.",
    icon: "⌁",
    primary: "Ver oportunidades",
    items: [
      { title: "Empresa local", text: "Administración comercial · CV enviado", badge: "En revisión" },
      { title: "Comercio regional", text: "Atención al cliente · Postulación recibida", badge: "Recibida" },
      { title: "Historial", text: "Consultá procesos anteriores y entrevistas." },
    ],
  },
  confianza: {
    title: "Reputación y Confianza",
    subtitle: "La confianza se construye con información clara, reseñas reales y cumplimiento.",
    icon: "♢",
    primary: "Completar verificaciones",
    items: [
      { title: "Identidad", text: "Datos del titular validados.", badge: "Verificado" },
      { title: "Emprendimiento", text: "Información comercial y contacto actualizados." },
      { title: "Reseñas", text: "Calificaciones basadas en operaciones reales dentro de WorkCerca." },
    ],
  },
  configuracion: {
    title: "Configuración",
    subtitle: "Preferencias de cuenta, privacidad, notificaciones y seguridad.",
    icon: "⚙",
    primary: "Guardar preferencias",
    items: [
      { title: "Privacidad", text: "Elegí qué datos compartir con clientes y organizaciones." },
      { title: "Notificaciones", text: "Pedidos, mensajes, empleo, programas y capacitaciones." },
      { title: "Seguridad", text: "Acceso, sesiones y protección de tu cuenta." },
    ],
  },
};

const heroPhotos = [
  "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/6205769/pexels-photo-6205769.jpeg?auto=compress&cs=tinysrgb&w=800",
];

const quickCards = [
  ["Productos y Servicios","Gestioná tu catálogo","productos","https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Pedidos","Administrá pedidos","pedidos","https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Clientes","Conocé a tus clientes","clientes","https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Mensajes","Respondé consultas","mensajes","https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Promociones","Creá ofertas","promociones","https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Publicidad","Impulsá tu negocio","publicidad","https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Proveedores","Gestioná tus compras","proveedores","https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Agenda","Organizá tu tiempo","agenda","https://images.pexels.com/photos/273011/pexels-photo-273011.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Finanzas","Ingresos y gastos","finanzas","https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Estadísticas","Analizá tu negocio","finanzas","https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Oportunidades","Nuevas oportunidades","oportunidades","https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=500"],
  ["Capacitaciones","Aprendé y crecé","capacitaciones","https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=500"],
] as const;

export default function EmprendedoresPage() {
  const [active,setActive] = useState("panel");
  const [notice,setNotice] = useState("");
  const [query,setQuery] = useState("");

  const currentTitle = useMemo(() => {
    return sidebar.find(i => i[2]===active)?.[1] || "Mi Panel";
  },[active]);

  const toast=(m:string)=>{
    setNotice(m);
    window.setTimeout(()=>setNotice(""),2800);
  };

  const go=(p:string)=>{ window.location.href=p; };

  return (
    <main className="ent">
      <style>{`
        :root{--navy:#061a36;--navy2:#08294f;--blue:#086bed;--text:#10203e;--muted:#6d798c;--line:#e1e7ef;--bg:#f7f9fd;--green:#17a764;--violet:#7442e8;--orange:#ef9814}
        *{box-sizing:border-box}html,body{margin:0;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input{font:inherit}button{cursor:pointer}.ent{min-height:100vh;background:#f7f9fd}.top{height:70px;background:#fff;border-bottom:1px solid var(--line);display:grid;grid-template-columns:300px 1fr auto;gap:16px;align-items:center;padding:0 16px;position:sticky;top:0;z-index:60}.brand{border:0;background:transparent;display:flex;align-items:center;gap:9px;color:#10204a}.mark{width:38px;height:38px;border-radius:50%;background:linear-gradient(145deg,#1d78ef,#0750bf);color:#fff;display:grid;place-items:center;font-weight:1000}.brand strong{font-size:23px}.brand small{margin-left:8px;color:#0d61d7;font-weight:900}.searchTop input{width:100%;min-height:38px;border:1px solid #dce3ec;border-radius:9px;padding:0 12px}.topRight{display:flex;align-items:center;gap:11px}.location{font-size:9px}.location b,.location small{display:block}.location small{color:#086bed}.topIcon{border:0;background:transparent;font-size:16px}.account{display:flex;align-items:center;gap:7px}.account img{width:36px;height:36px;border-radius:50%;object-fit:cover}.account strong,.account small{display:block}.account strong{font-size:10px}.account small{font-size:8px;color:#748095}
        .shell{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:calc(100vh - 70px)}.side{background:linear-gradient(180deg,#061a36,#082b51);padding:13px 9px;color:#fff;position:sticky;top:70px;height:calc(100vh - 70px);overflow:auto}.bizProfile{padding:8px 7px 13px;display:grid;grid-template-columns:46px 1fr;gap:9px;align-items:center}.bizProfile img{width:44px;height:44px;border-radius:50%;object-fit:cover}.bizProfile strong,.bizProfile small{display:block}.bizProfile strong{font-size:10px}.bizProfile small{font-size:8px;color:#c8d5e5;margin-top:2px}.verified{color:#58d98d!important}.side button{width:100%;min-height:38px;border:0;border-radius:8px;background:transparent;color:#f4f7ff;display:grid;grid-template-columns:25px 1fr auto;align-items:center;gap:7px;text-align:left;padding:0 8px;font-size:9px}.side button:hover{background:rgba(255,255,255,.06)}.side button.active{background:linear-gradient(90deg,#1474ef,#0759d8);font-weight:1000}.badge{background:#0f70ed;border-radius:99px;padding:3px 6px;font-size:7px}.premium{margin:13px 4px 0;background:#0c4d91;border-radius:11px;padding:12px}.premium b{font-size:11px}.premium p{font-size:8px;line-height:1.45;color:#d4e4f4}.premium button{display:block;background:#fff;color:#0759d8;text-align:center}.aiSide{margin:9px 4px 0;padding:11px;border-radius:11px;background:#082141;border:1px solid rgba(255,255,255,.13)}.aiSide b{font-size:10px}.aiSide p{font-size:8px;color:#c8d6e6;line-height:1.45}.aiSide button{display:block;background:#0f3765;text-align:center}
        .content{padding:12px;max-width:1320px;margin:auto}.hero{height:310px;border-radius:14px;overflow:hidden;position:relative;display:grid;grid-template-columns:repeat(6,1fr);background:#111}.heroPhoto{width:100%;height:100%;object-fit:cover;border-right:1px solid rgba(255,255,255,.7)}.heroShade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,18,41,.62),rgba(3,18,41,.16) 52%,rgba(3,18,41,.32))}.heroCopy{position:absolute;left:22px;bottom:28px;color:#fff;width:330px}.heroCopy h1{font-size:31px;line-height:1.04;margin:0}.heroCopy p{font-size:10px;line-height:1.5}.statusCard{position:absolute;right:16px;bottom:16px;width:255px;background:rgba(5,21,43,.9);border:1px solid rgba(255,255,255,.25);border-radius:12px;padding:14px;color:#fff;backdrop-filter:blur(8px)}.statusHead{display:flex;justify-content:space-between;align-items:center}.statusHead b{font-size:10px}.activePill{background:#11a762;color:#fff;border-radius:6px;padding:4px 8px;font-size:7px}.statusLine{display:flex;justify-content:space-between;font-size:8px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.12)}.statusCard button{width:100%;margin-top:9px;border:1px solid #1473ef;background:transparent;color:#fff;border-radius:7px;padding:8px;font-size:8px;font-weight:900}
        .metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-top:10px}.metric{background:#fff;border:1px solid var(--line);border-radius:12px;padding:13px;min-height:128px;box-shadow:0 8px 20px rgba(23,52,91,.05)}.metric small,.metric strong,.metric b{display:block}.metric small{font-size:7px;color:#5e7086}.metric strong{font-size:22px;margin:7px 0}.metric b{font-size:8px;color:#19965b}.spark{font-size:14px;letter-spacing:-4px;margin-top:12px}.blue{color:#1473ef}.green{color:#19a25e}.violet{color:#7a43e9}.orange{color:#ed9711}
        .dashboard{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:10px;margin-top:10px}.card{background:#fff;border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 20px rgba(23,52,91,.05)}.section{padding:13px}.section h2{font-size:15px;margin:0 0 10px}.quickGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.quick{border:1px solid #e0e6ee;background:#fff;border-radius:10px;overflow:hidden;text-align:left;padding:0}.quick img{width:100%;height:76px;object-fit:cover}.quick div{padding:8px}.quick b{font-size:8px}.quick small{display:block;font-size:7px;color:#6a778a;margin-top:3px}.quick:hover{box-shadow:0 9px 20px rgba(20,50,90,.12);transform:translateY(-1px)}
        .aiPanel{padding:13px;background:linear-gradient(180deg,#f4f1ff,#fff)}.aiTitle{display:flex;align-items:center;gap:8px}.aiOrb{width:39px;height:39px;border-radius:50%;background:#e8e4ff;color:#6b3be4;display:grid;place-items:center;font-size:20px}.aiTitle h2{font-size:16px;margin:0}.aiTitle p{font-size:8px;color:#6d798c}.aiTabs{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:10px 0}.aiTabs button{min-height:34px;border:1px solid #d5ddef;background:#fff;color:#245aa7;border-radius:7px;font-size:8px;font-weight:900}.aiTabs button:first-child{background:#1473ef;color:#fff}.suggestion{border:1px solid #e0e5ee;background:#fff;border-radius:9px;padding:10px;margin-top:8px}.suggestion b{font-size:9px}.suggestion p{font-size:8px;color:#69778b;line-height:1.45}.suggestion button{width:100%;border:1px solid #cbd8ee;background:#fff;color:#0965d9;border-radius:7px;padding:7px;font-size:8px;font-weight:900}
        .lower{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.panel{padding:13px}.panelHead{display:flex;justify-content:space-between;align-items:center}.panelHead h3{font-size:12px;margin:0}.panelHead button{border:0;background:transparent;color:#086bed;font-size:7px;font-weight:900}.activity{display:grid;grid-template-columns:30px 1fr auto;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #edf1f5}.activity>span{width:28px;height:28px;border-radius:50%;background:#edf4ff;display:grid;place-items:center}.activity b,.activity small{display:block}.activity b{font-size:8px}.activity small{font-size:7px;color:#77869a}.amount{font-size:8px;color:#10965a;font-weight:900}.productRow{display:grid;grid-template-columns:18px 40px 1fr auto;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #edf1f5}.productRow img{width:38px;height:38px;border-radius:7px;object-fit:cover}.productRow b,.productRow small{display:block}.productRow b{font-size:8px}.productRow small{font-size:7px;color:#748095}.price{font-size:8px;color:#10965a;font-weight:900}
        .growth{margin-top:10px;min-height:160px;border-radius:12px;overflow:hidden;position:relative;background:url("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600") center/cover;color:#fff}.growth:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,18,41,.94),rgba(3,18,41,.68),rgba(3,18,41,.35))}.growthInner{position:relative;z-index:2;padding:22px;display:grid;grid-template-columns:1fr repeat(4,135px);gap:8px;align-items:center}.growth h2{font-size:21px;margin:0}.growth p{font-size:9px}.growth button{border:0;background:#fff;color:#0860c9;border-radius:7px;padding:8px 12px;font-size:8px;font-weight:900}.growthStat{border:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.22);border-radius:9px;padding:12px;text-align:center}.growthStat b{font-size:10px}.growthStat small{display:block;font-size:7px;margin-top:4px}
        .trust{margin-top:10px;display:grid;grid-template-columns:repeat(4,1fr);gap:9px;padding:12px}.trustItem{display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:center}.trustIcon{width:34px;height:34px;border-radius:50%;background:#edf4ff;color:#126be3;display:grid;place-items:center}.trustItem b{font-size:8px}.trustItem small{display:block;font-size:7px;color:#748095}
        .moduleHero{padding:18px;border-radius:13px;background:linear-gradient(135deg,#0a4f9b,#1473ef);color:#fff;display:grid;grid-template-columns:58px 1fr auto;gap:12px;align-items:center}.moduleHeroIcon{width:55px;height:55px;border-radius:15px;background:rgba(255,255,255,.14);display:grid;place-items:center;font-size:25px}.moduleHero h2{margin:0;font-size:22px}.moduleHero p{margin:4px 0 0;font-size:9px;color:#e4efff}.primary{border:0;background:#fff;color:#0b61c8;border-radius:8px;padding:9px 12px;font-size:8px;font-weight:900}.moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}.moduleItem{padding:13px;min-height:150px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.moduleItem img{width:100%;height:88px;border-radius:8px;object-fit:cover;margin-bottom:9px}.moduleItem h3{font-size:12px;margin:0 0 6px}.moduleItem p{font-size:8px;color:#6e7a8d;line-height:1.5;margin:0}.moduleBadge{align-self:flex-start;margin-top:8px;border-radius:99px;background:#ecf4ff;color:#1062c9;padding:4px 7px;font-size:7px;font-weight:900}.moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.moduleAction{padding:14px}.moduleAction h3{font-size:12px;margin:0}.moduleAction p{font-size:8px;color:#6d798c;line-height:1.5}.moduleAction button{border:1px solid #cbd7e7;background:#fff;color:#0860c9;border-radius:7px;padding:8px;font-size:8px;font-weight:900}
        .toast{position:fixed;right:18px;bottom:18px;z-index:999;background:#08244a;color:#fff;padding:12px 15px;border-radius:9px;font-size:9px;box-shadow:0 14px 35px rgba(0,0,0,.22)}
        @media(max-width:1120px){.hero{grid-template-columns:repeat(3,1fr)}.heroPhoto:nth-of-type(n+4){display:none}.metrics{grid-template-columns:repeat(3,1fr)}.dashboard{grid-template-columns:1fr}.quickGrid{grid-template-columns:repeat(3,1fr)}.growthInner{grid-template-columns:1fr 1fr 1fr}.growthInner>div:first-child{grid-column:1/-1}}
        @media(max-width:820px){.top{grid-template-columns:1fr auto}.searchTop{display:none}.shell{grid-template-columns:72px 1fr}.bizProfile,.premium,.aiSide{display:none}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.badge{display:none}.metrics{grid-template-columns:1fr 1fr}.quickGrid{grid-template-columns:1fr 1fr}.moduleGrid,.moduleActions{grid-template-columns:1fr 1fr}.heroCopy{width:250px}.statusCard{display:none}}
        @media(max-width:600px){.top{padding:0 8px}.brand strong{font-size:18px}.brand small,.location,.account span{display:none}.shell{grid-template-columns:56px 1fr}.content{padding:7px}.hero{height:265px;grid-template-columns:1fr 1fr}.heroPhoto:nth-of-type(n+3){display:none}.heroCopy h1{font-size:26px}.metrics,.quickGrid,.lower,.moduleGrid,.moduleActions,.trust{grid-template-columns:1fr}.growthInner{grid-template-columns:1fr}.growthInner>div:first-child{grid-column:auto}}
      `}</style>

      <header className="top">
        <button className="brand" onClick={()=>go("/")}>
          <span className="mark">W</span><strong>WorkCerca</strong><small>Emprendedores</small>
        </button>
        <div className="searchTop"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar en WorkCerca..." /></div>
        <div className="topRight">
          <div className="location"><b>⌖ Reconquista, Santa Fe</b><small>Cambiar ubicación</small></div>
          <button className="topIcon" onClick={()=>setActive("mensajes")}>▱</button>
          <button className="topIcon" onClick={()=>toast("Tenés nuevas notificaciones.")}>🔔</button>
          <div className="account">
            <img src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=120" alt="Cuenta del emprendedor"/>
            <span><strong>Mi cuenta</strong><small>Emprendedor</small></span>
          </div>
        </div>
      </header>

      <div className="shell">
        <aside className="side">
          <div className="bizProfile">
            <img src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Pan artesanal"/>
            <div><strong>Pan Casero Don Luis</strong><small>Alimentos Artesanales</small><small className="verified">✓ Emprendimiento verificado</small></div>
          </div>

          {sidebar.map(([icon,label,key,badge])=>(
            <button key={key} className={active===key?"active":""} onClick={()=>setActive(key)}>
              <span>{icon}</span><span>{label}</span>{badge?<span className="badge">{badge}</span>:<span/>}
            </button>
          ))}
          <button onClick={()=>go("/")} style={{marginTop:6,borderTop:"1px solid rgba(255,255,255,.12)",borderRadius:0}}>
            <span>←</span><span>Inicio WorkCerca</span><span/>
          </button>

          <div className="premium"><b>¡Potenciá tu negocio!</b><p>Accedé a herramientas para vender más y gestionar mejor.</p><button onClick={()=>toast("Herramientas para crecer")}>Ver herramientas</button></div>
          <div className="aiSide"><b>✦ IA WorkCerca</b><p>Tu asistente inteligente para emprender mejor.</p><button onClick={()=>toast("IA WorkCerca lista para ayudarte.")}>✦ Hablar con IA</button></div>
        </aside>

        <section className="content">
          {active==="panel" ? <>
            <section className="hero">
              {heroPhotos.map((p,i)=><img className="heroPhoto" src={p} alt="" key={i}/>)}
              <div className="heroShade"/>
              <div className="heroCopy"><h1>Tu esfuerzo merece crecer</h1><p>Gestioná tu negocio, conectá con clientes y llevá tu emprendimiento al siguiente nivel.</p></div>
              <div className="statusCard">
                <div className="statusHead"><b>Estado de tu negocio</b><span className="activePill">Activo</span></div>
                <div className="statusLine"><span>Miembro desde</span><b>Ene 2024</b></div>
                <div className="statusLine"><span>Plan actual</span><b>Emprendedor Pro</b></div>
                <button onClick={()=>setActive("emprendimiento")}>Ver mi perfil público ↗</button>
              </div>
            </section>

            <div className="metrics">
              <article className="metric"><small>Ventas del mes</small><strong>$ 1.245.300</strong><b>↑ 18% vs mes anterior</b><div className="spark green">╱╲╱╱╲╱╲╱╱</div></article>
              <article className="metric"><small>Pedidos</small><strong>32</strong><b>↑ 12% vs mes anterior</b><div className="spark blue">╱╲╱╲╱╱╲╱╱</div></article>
              <article className="metric"><small>Clientes</small><strong>256</strong><b>↑ 24% vs mes anterior</b><div className="spark violet">╲╱╱╲╱╲╱╱╲</div></article>
              <article className="metric"><small>Visitas al perfil</small><strong>1.842</strong><b>↑ 35% vs mes anterior</b><div className="spark orange">╱╱╲╱╲╱╱╲╱</div></article>
              <article className="metric"><small>Calificación</small><strong>⭐ 4.8/5</strong><b style={{color:"#68778b"}}>Basado en 128 opiniones</b></article>
            </div>

            <div className="dashboard">
              <div>
                <article className="card section">
                  <h2>Accesos rápidos</h2>
                  <div className="quickGrid">
                    {quickCards.map(([title,sub,key,photo])=>(
                      <button className="quick" key={title} onClick={()=>setActive(key)}>
                        <img src={photo} alt=""/><div><b>{title}</b><small>{sub}</small></div>
                      </button>
                    ))}
                  </div>
                </article>

                <div className="lower">
                  <article className="card panel">
                    <div className="panelHead"><h3>Actividad reciente</h3><button onClick={()=>setActive("pedidos")}>Ver todo</button></div>
                    {[
                      ["▣","Nuevo pedido recibido #1234","Hace 15 minutos","$45.000"],
                      ["▤","Pago confirmado del pedido #1233","Hace 1 hora","$28.500"],
                      ["☆","Nueva opinión de María López","Hace 3 horas","★★★★★"],
                      ["▱","Nuevo mensaje de Juan Pérez","Hace 5 horas",""],
                      ["◇","Producto “Pan de Campo” actualizado","Ayer, 18:30",""],
                    ].map(([i,t,s,a])=><div className="activity" key={t}><span>{i}</span><div><b>{t}</b><small>{s}</small></div><span className="amount">{a}</span></div>)}
                  </article>

                  <article className="card panel">
                    <div className="panelHead"><h3>Productos más vendidos</h3><button onClick={()=>setActive("productos")}>Ver todos</button></div>
                    {[
                      ["Pan Integral Artesanal","45 unidades","$865.000","https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=120"],
                      ["Torta de Chocolate","38 unidades","$494.000","https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=120"],
                      ["Alfajores Artesanales","52 unidades","$384.000","https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=120"],
                      ["Budín de Limón","28 unidades","$264.000","https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=120"],
                      ["Facturas Surtidas","40 unidades","$234.000","https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=120"],
                    ].map((p,i)=><div className="productRow" key={p[0]}><span>{i+1}</span><img src={p[3]} alt=""/><div><b>{p[0]}</b><small>{p[1]}</small></div><span className="price">{p[2]}</span></div>)}
                  </article>
                </div>

                <section className="growth">
                  <div className="growthInner">
                    <div><h2>Más herramientas, más clientes, más ventas</h2><p>Todo lo que necesitás para profesionalizar tu negocio.</p><button onClick={()=>toast("Herramientas WorkCerca para emprendedores")}>Conocé todas las herramientas →</button></div>
                    <div className="growthStat"><b>Visibilidad</b><small>Aumentá tu alcance</small></div>
                    <div className="growthStat"><b>Clientes</b><small>Conectá con más personas</small></div>
                    <div className="growthStat"><b>Ventas</b><small>Vendé más y mejor</small></div>
                    <div className="growthStat"><b>Crecimiento</b><small>Hacé crecer tu negocio</small></div>
                  </div>
                </section>

                <section className="card trust">
                  <div className="trustItem"><span className="trustIcon">♢</span><div><b>Tu información está protegida</b><small>Seguridad y privacidad.</small></div></div>
                  <div className="trustItem"><span className="trustIcon">▢</span><div><b>Pagos seguros</b><small>Transacciones protegidas.</small></div></div>
                  <div className="trustItem"><span className="trustIcon">♙</span><div><b>Comunidad confiable</b><small>Emprendedores conectados.</small></div></div>
                  <div className="trustItem"><span className="trustIcon">◉</span><div><b>Soporte disponible</b><small>Estamos para ayudarte.</small></div></div>
                </section>
              </div>

              <aside className="card aiPanel">
                <div className="aiTitle"><span className="aiOrb">✦</span><div><h2>IA WorkCerca</h2><p>Te acompaña para hacer crecer tu emprendimiento.</p></div></div>
                <div className="aiTabs"><button>Sugerencias</button><button onClick={()=>toast("Acciones rápidas IA")}>Acciones rápidas</button></div>
                <div className="suggestion"><b>▧ Mejorá tus publicaciones</b><p>La IA puede ayudarte a mejorar fotos y descripciones sin alterar ni falsear el producto real.</p><button onClick={()=>setActive("productos")}>Optimizar ahora →</button></div>
                <div className="suggestion"><b>✦ Nuevas oportunidades</b><p>Hay oportunidades de negocio que pueden interesarte esta semana.</p><button onClick={()=>setActive("oportunidades")}>Ver oportunidades →</button></div>
                <div className="suggestion"><b>◉ Análisis de ventas</b><p>Tu producto más vendido es “Pan Integral Artesanal”.</p><button onClick={()=>setActive("finanzas")}>Ver estadísticas →</button></div>
                <div className="suggestion"><b>⌖ Consejo personalizado</b><p>Podés sumar promociones de fin de semana si vos decidís aplicarlas.</p><button onClick={()=>setActive("promociones")}>Ver consejos →</button></div>
                <button style={{width:"100%",marginTop:10,border:0,background:"transparent",color:"#086bed",fontSize:8,fontWeight:900}} onClick={()=>toast("Más sugerencias IA")}>Ver más sugerencias →</button>
              </aside>
            </div>
          </> : <>
            <section className="moduleHero">
              <span className="moduleHeroIcon">{moduleScreens[active]?.icon || "•"}</span>
              <div><h2>{moduleScreens[active]?.title || currentTitle}</h2><p>{moduleScreens[active]?.subtitle}</p></div>
              <button className="primary" onClick={()=>{
                if(active==="productos") toast("IA WorkCerca: mejora la presentación sin falsear el producto.");
                else toast(moduleScreens[active]?.primary || "Acción preparada");
              }}>{moduleScreens[active]?.primary || "Continuar"}</button>
            </section>

            <div className="moduleGrid">
              {(moduleScreens[active]?.items || []).map(item=>(
                <article className="card moduleItem" key={item.title}>
                  <div>{item.photo&&<img src={item.photo} alt=""/>}<h3>{item.title}</h3><p>{item.text}</p></div>
                  {item.badge&&<span className="moduleBadge">{item.badge}</span>}
                </article>
              ))}
            </div>

            <div className="moduleActions">
              <article className="card moduleAction"><h3>✦ IA WorkCerca</h3><p>La IA conecta este módulo con clientes, proveedores, empresas, municipios, instituciones, capacitación y oportunidades reales. Sugiere, no inventa.</p><button onClick={()=>toast("Sugerencias IA actualizadas para esta pantalla.")}>Ver sugerencias IA</button></article>
              <article className="card moduleAction"><h3>🔗 Ecosistema WorkCerca</h3><p>Tu emprendimiento convive con tu CV y tu búsqueda laboral dentro de la misma identidad.</p><button onClick={()=>setActive("panel")}>Volver a Mi Panel</button></article>
            </div>
          </>}
        </section>
      </div>

      {notice&&<div className="toast">{notice}</div>}
    </main>
  );
}
