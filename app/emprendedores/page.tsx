"use client";

import { useMemo, useState } from "react";

const sidebar = [
  ["⌂", "Mi Panel Emprendedor", "panel"],
  ["🚀", "Mi Emprendimiento", "emprendimiento"],
  ["🛍️", "Productos y Servicios", "productos"],
  ["📦", "Pedidos", "pedidos", "4"],
  ["👥", "Clientes", "clientes"],
  ["💬", "Mensajes", "mensajes", "3"],
  ["📅", "Agenda", "agenda"],
  ["🎥", "Videollamadas", "videollamadas"],
  ["📣", "Promociones", "promociones"],
  ["📢", "Publicidad", "publicidad"],
  ["🤝", "Proveedores", "proveedores"],
  ["⚡", "Oportunidades", "oportunidades"],
  ["🏛️", "Programas y Beneficios", "programas"],
  ["🎓", "Capacitaciones", "capacitaciones"],
  ["📊", "Finanzas / Estadísticas", "finanzas"],
  ["📄", "Mi CV", "cv"],
  ["🔎", "Buscar empleo", "empleo"],
  ["➤", "Mis postulaciones", "postulaciones", "2"],
  ["🛡️", "Reputación / Confianza", "confianza"],
  ["⚙️", "Configuración", "configuracion"],
];

const moduleScreens: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  primary: string;
  items: { title: string; text: string; badge?: string }[];
}> = {
  emprendimiento: {
    title: "Mi Emprendimiento",
    subtitle: "Administrá la identidad, descripción, ubicación y presentación pública de tu emprendimiento.",
    icon: "🚀",
    primary: "Editar emprendimiento",
    items: [
      { title: "Dulce Momento", text: "Pastelería artesanal · Reconquista, Santa Fe", badge: "Activo" },
      { title: "Presentación pública", text: "Descripción, horarios, contacto y zona de entrega." },
      { title: "Verificación", text: "Información comercial y reputación dentro de WorkCerca.", badge: "Confianza" },
    ],
  },
  productos: {
    title: "Productos y Servicios",
    subtitle: "Publicá, organizá y mejorá la presentación de tus productos o servicios.",
    icon: "🛍️",
    primary: "Crear publicación con IA",
    items: [
      { title: "Torta de chocolate", text: "Foto, descripción, precio y disponibilidad.", badge: "Publicado" },
      { title: "Box desayuno", text: "Producto destacado para fechas especiales.", badge: "Publicado" },
      { title: "Asistente de Publicación IA", text: "Mejora fondo, luz, encuadre, título, descripción y etiquetas sin falsear el producto.", badge: "IA WorkCerca" },
    ],
  },
  pedidos: {
    title: "Pedidos",
    subtitle: "Gestioná pedidos nuevos, en preparación, entregados o cancelados.",
    icon: "📦",
    primary: "Ver pedidos nuevos",
    items: [
      { title: "Pedido #WC-201", text: "Torta personalizada · Entrega mañana", badge: "Nuevo" },
      { title: "Pedido #WC-200", text: "Box desayuno · En preparación", badge: "En proceso" },
      { title: "Historial", text: "Consultá entregas anteriores y estado de cada pedido." },
    ],
  },
  clientes: {
    title: "Clientes",
    subtitle: "Organizá contactos, historial de compras y relaciones con clientes.",
    icon: "👥",
    primary: "Agregar cliente",
    items: [
      { title: "Clientes frecuentes", text: "Personas que compraron más de una vez." },
      { title: "Nuevos clientes", text: "Consultas recientes desde WorkCerca.", badge: "3 nuevos" },
      { title: "Seguimiento", text: "Historial de pedidos, mensajes y preferencias." },
    ],
  },
  mensajes: {
    title: "Mensajes",
    subtitle: "Conversaciones con clientes, proveedores, empresas, municipios e instituciones.",
    icon: "💬",
    primary: "Nuevo mensaje",
    items: [
      { title: "Cliente particular", text: "Consulta por torta para cumpleaños.", badge: "Nuevo" },
      { title: "Empresa Reconquista SRL", text: "Consulta por catering para evento." },
      { title: "Municipalidad de Reconquista", text: "Invitación a feria regional." },
    ],
  },
  agenda: {
    title: "Agenda",
    subtitle: "Organizá entregas, reuniones, compras, eventos y entrevistas.",
    icon: "📅",
    primary: "Agregar evento",
    items: [
      { title: "10:00 · Entrega", text: "Pedido #WC-201 · Reconquista" },
      { title: "14:30 · Reunión", text: "Proveedor de packaging" },
      { title: "17:00 · Videollamada", text: "Empresa local · Propuesta comercial" },
    ],
  },
  videollamadas: {
    title: "Videollamadas",
    subtitle: "Reuniones comerciales, entrevistas laborales y encuentros con organizaciones.",
    icon: "🎥",
    primary: "Programar videollamada",
    items: [
      { title: "Empresa local", text: "Reunión comercial · Hoy 17:00", badge: "Hoy" },
      { title: "Entrevista laboral", text: "Empresa del Norte · Viernes 10:30" },
      { title: "Institución aliada", text: "Capacitación para emprendedores · Próxima semana" },
    ],
  },
  promociones: {
    title: "Promociones",
    subtitle: "Creá promociones y descuentos para mejorar la visibilidad de tus productos y servicios.",
    icon: "📣",
    primary: "Crear promoción",
    items: [
      { title: "Promo merienda", text: "10% de descuento · Vigente hasta el domingo", badge: "Activa" },
      { title: "Fechas especiales", text: "Campañas sugeridas por calendario local." },
      { title: "IA de promoción", text: "Sugerencias según demanda, zona y comportamiento de clientes.", badge: "IA" },
    ],
  },
  publicidad: {
    title: "Publicidad",
    subtitle: "Promocioná tu emprendimiento dentro de WorkCerca de forma clara y segmentada.",
    icon: "📢",
    primary: "Crear campaña",
    items: [
      { title: "Campaña local", text: "Reconquista y alrededores · Segmentación por ubicación." },
      { title: "Producto destacado", text: "Mostrá una publicación dentro de categorías relevantes." },
      { title: "Rendimiento", text: "Visualizaciones, clics y consultas recibidas." },
    ],
  },
  proveedores: {
    title: "Proveedores",
    subtitle: "Encontrá insumos, servicios y aliados para tu emprendimiento.",
    icon: "🤝",
    primary: "Buscar proveedores",
    items: [
      { title: "Packaging", text: "Proveedor cercano sugerido por ubicación.", badge: "IA" },
      { title: "Materia prima", text: "Opciones locales y regionales para comparar." },
      { title: "Servicios profesionales", text: "Diseño, fotografía, contabilidad, electricidad y más." },
    ],
  },
  oportunidades: {
    title: "Oportunidades",
    subtitle: "La IA reúne oportunidades comerciales, institucionales y laborales compatibles con vos.",
    icon: "⚡",
    primary: "Actualizar sugerencias IA",
    items: [
      { title: "Feria regional", text: "Municipalidad de Reconquista · Convocatoria abierta", badge: "IA" },
      { title: "Proveedor para empresa", text: "Empresa busca servicio de catering local", badge: "IA" },
      { title: "Capacitación", text: "Marketing digital para emprendimientos · Institución aliada" },
    ],
  },
  programas: {
    title: "Programas y Beneficios",
    subtitle: "Accedé a programas municipales, institucionales y beneficios para emprendedores.",
    icon: "🏛️",
    primary: "Explorar programas",
    items: [
      { title: "Programa local", text: "Asistencia a emprendimientos de Reconquista.", badge: "Municipio" },
      { title: "Beneficio institucional", text: "Capacitación y acompañamiento comercial.", badge: "Institución" },
      { title: "Convocatorias", text: "Ferias, fondos, encuentros y espacios de promoción." },
    ],
  },
  capacitaciones: {
    title: "Capacitaciones",
    subtitle: "Formación recomendada para mejorar ventas, gestión y crecimiento.",
    icon: "🎓",
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
    icon: "📊",
    primary: "Ver informe",
    items: [
      { title: "Ventas del mes", text: "$285.000 · Datos demostrativos", badge: "+12%" },
      { title: "Pedidos completados", text: "18 pedidos finalizados este mes." },
      { title: "Producto más consultado", text: "Box desayuno · 32 consultas" },
    ],
  },
  cv: {
    title: "Mi CV",
    subtitle: "Tu emprendimiento no te impide buscar trabajo. Conservá un CV laboral dentro de la misma cuenta.",
    icon: "📄",
    primary: "Editar mi CV",
    items: [
      { title: "CV WorkCerca", text: "Experiencia, formación, habilidades y referencias.", badge: "Completo 80%" },
      { title: "Experiencia emprendedora", text: "Podés incorporar gestión, ventas, atención al cliente y organización." },
      { title: "Visibilidad laboral", text: "Empresas, municipios e instituciones pueden encontrarte según permisos." },
    ],
  },
  empleo: {
    title: "Buscar empleo",
    subtitle: "Buscá oportunidades laborales compatibles con tu experiencia, CV y disponibilidad.",
    icon: "🔎",
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
    icon: "➤",
    primary: "Ver oportunidades",
    items: [
      { title: "Empresa local", text: "Administración comercial · CV enviado", badge: "En revisión" },
      { title: "Comercio regional", text: "Atención al cliente · Postulación recibida", badge: "Recibida" },
      { title: "Historial", text: "Consultá procesos anteriores y entrevistas." },
    ],
  },
  confianza: {
    title: "Reputación / Confianza",
    subtitle: "La confianza se construye con información clara, reseñas reales y cumplimiento.",
    icon: "🛡️",
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
    icon: "⚙️",
    primary: "Guardar preferencias",
    items: [
      { title: "Privacidad", text: "Elegí qué datos compartir con clientes y organizaciones." },
      { title: "Notificaciones", text: "Pedidos, mensajes, empleo, programas y capacitaciones." },
      { title: "Seguridad", text: "Acceso, sesiones y protección de tu cuenta." },
    ],
  },
};

export default function EmprendedoresPage() {
  const [active, setActive] = useState("panel");
  const [notice, setNotice] = useState("");
  const [businessOpen, setBusinessOpen] = useState(true);

  const currentTitle = useMemo(() => {
    const found = sidebar.find((item) => item[2] === active);
    return found?.[1] || "Mi Panel Emprendedor";
  }, [active]);

  const action = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const go = (path: string) => {
    window.location.href = path;
  };

  return (
    <main className="entApp">
      <style>{`
        :root{
          --navy:#07162e;
          --navy2:#0d2349;
          --panel:#10294f;
          --panel2:#15335f;
          --line:#25456f;
          --text:#f7f9fd;
          --muted:#a8bad2;
          --amber:#f7a928;
          --amber2:#ffbd4a;
          --blue:#2c7df0;
          --green:#2cc970;
          --red:#ff5c5c;
        }
        *{box-sizing:border-box}
        html,body{margin:0;background:var(--navy);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input{font:inherit}
        button{cursor:pointer}
        .entApp{min-height:100vh;background:
          radial-gradient(circle at 70% 0%,rgba(44,125,240,.12),transparent 30%),
          linear-gradient(180deg,#07152c 0,#091b39 100%)}
        .top{
          height:82px;display:grid;grid-template-columns:290px 1fr auto;align-items:center;gap:18px;
          padding:0 26px;border-bottom:1px solid rgba(255,255,255,.08);
          background:rgba(7,22,46,.96);backdrop-filter:blur(12px);position:sticky;top:0;z-index:60
        }
        .brand{display:flex;align-items:center;gap:11px;border:0;background:transparent;color:#fff;text-align:left;padding:0}
        .mark{width:46px;height:46px;border-radius:14px;background:linear-gradient(145deg,#f8ae2c,#ec8c13);color:#07162e;display:grid;place-items:center;font-weight:1000;font-size:24px;box-shadow:0 9px 24px rgba(247,169,40,.25)}
        .brand strong{font-size:27px}.brand small{display:block;color:#b9c6d8;font-size:10px;margin-top:1px}
        .head h1{margin:0;font-size:24px}.head p{margin:3px 0 0;color:#c4d0df}
        .topActions{display:flex;align-items:center;gap:10px}
        .chip,.iconBtn,.userBtn{border:1px solid rgba(255,255,255,.12);background:#0d2349;color:#fff;border-radius:11px;min-height:40px}
        .chip{padding:0 13px;font-weight:800}.iconBtn{width:40px}.userBtn{display:flex;align-items:center;gap:9px;padding:0 11px}
        .userAvatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(145deg,#f0a126,#ffbd4a);color:#07162e;display:grid;place-items:center;font-weight:1000}

        .shell{display:grid;grid-template-columns:300px minmax(0,1fr);min-height:calc(100vh - 82px)}
        .side{
          background:linear-gradient(180deg,#061329,#0a1d3b 68%,#0c254b);
          border-right:1px solid rgba(255,255,255,.07);padding:15px 13px 22px;
          position:sticky;top:82px;height:calc(100vh - 82px);overflow:auto
        }
        .side button{
          width:100%;min-height:44px;border:0;border-radius:9px;background:transparent;color:#eaf1fb;
          display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:8px;text-align:left;padding:0 12px;font-size:13px
        }
        .side button:hover{background:rgba(255,255,255,.06)}
        .side button.active{background:linear-gradient(90deg,#f4a529,#e58d16);color:#07162e;font-weight:1000;box-shadow:0 8px 18px rgba(247,169,40,.2)}
        .sideBadge{min-width:23px;height:23px;border-radius:999px;background:#2858a0;color:#fff;display:grid;place-items:center;padding:0 6px;font-size:10px;font-weight:900}
        .side button.active .sideBadge{background:#07162e;color:#fff}
        .aiMini{margin-top:18px;border:1px solid rgba(247,169,40,.28);border-radius:14px;padding:14px;background:linear-gradient(145deg,#102b56,#132e58)}
        .aiMini b{color:#ffbd4a}.aiMini p{font-size:11px;line-height:1.45;color:#c2cee0;margin:6px 0 0}

        .content{padding:16px;display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:14px}
        .mainCol,.rightCol{min-width:0}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:11px}
        .stat{
          border:1px solid var(--line);background:linear-gradient(145deg,#10284c,#0e2344);
          border-radius:13px;padding:15px;min-height:102px;box-shadow:0 9px 22px rgba(0,0,0,.12)
        }
        .statTop{display:flex;justify-content:space-between;align-items:center}
        .statIcon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#173861;color:#ffbd4a}
        .stat strong{font-size:28px;display:block;margin-top:8px}.stat small{color:#aebed1}
        .trend{color:#42d784;font-size:11px;font-weight:900}

        .card{border:1px solid var(--line);background:linear-gradient(145deg,#10284d,#0e2344);border-radius:14px;box-shadow:0 9px 22px rgba(0,0,0,.12)}
        .business{margin-top:11px;padding:17px;display:grid;grid-template-columns:90px 1fr 190px;gap:15px;align-items:center}
        .bizLogo{width:82px;height:82px;border-radius:18px;background:linear-gradient(145deg,#ffe0a3,#f9ab2e);color:#6d3d00;display:grid;place-items:center;font-size:38px}
        .business h2{margin:0;font-size:22px}.bizType{color:#ffbd4a;font-weight:900;margin:4px 0}
        .meta{display:flex;flex-wrap:wrap;gap:10px;color:#c2cee0;font-size:12px;margin:8px 0}
        .tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
        .tag{background:#193a67;color:#d9e8ff;border-radius:999px;padding:4px 7px;font-size:10px}
        .bizBtns{display:grid;gap:8px}
        .amberBtn,.outlineBtn{min-height:40px;border-radius:9px;font-weight:900}
        .amberBtn{border:1px solid #f4a529;background:linear-gradient(135deg,#f8ad2f,#ed9417);color:#07162e}
        .outlineBtn{border:1px solid #365a85;background:#10294f;color:#edf4ff}
        .outlineBtn:hover{background:#173861}

        .mid{display:grid;grid-template-columns:1.2fr .8fr;gap:11px;margin-top:11px}
        .panel{padding:14px}
        .panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
        .panelHead h3{margin:0;font-size:15px}.linkBtn{border:0;background:transparent;color:#ffbd4a;font-weight:900;font-size:11px}
        .products{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
        .product{
          border:1px solid #274970;border-radius:11px;overflow:hidden;background:#0d2243
        }
        .productVisual{
          height:92px;background:linear-gradient(145deg,#d69d54,#6f4324);
          display:grid;place-items:center;font-size:39px
        }
        .productBody{padding:9px}.productBody b{font-size:12px}.productBody p{margin:3px 0;color:#aebed1;font-size:10px}.price{color:#ffbd4a;font-weight:1000}
        .aiPublish{
          border:1px dashed rgba(255,189,74,.5);background:rgba(247,169,40,.06);
          border-radius:11px;display:grid;place-items:center;text-align:center;padding:12px;min-height:150px
        }
        .aiPublishIcon{font-size:30px}.aiPublish b{color:#ffbd4a}.aiPublish p{font-size:10px;color:#b9c7d9;line-height:1.4}
        .aiPublish button{border:0;border-radius:8px;background:#f4a529;color:#07162e;padding:7px 10px;font-weight:900;font-size:11px}
        .salesChart{height:185px;position:relative}
        .salesChart svg{width:100%;height:145px}.legend{font-size:10px;color:#aebed1;text-align:center}

        .bottom{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:11px}
        .list{padding:13px}
        .row{display:grid;grid-template-columns:1fr auto;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07);align-items:center}
        .row:last-child{border-bottom:0}.row b{font-size:11px}.row small{display:block;color:#9fb0c7;margin-top:3px}.status{display:inline-block;background:#173b66;color:#9fc4ff;border-radius:6px;padding:3px 6px;font-size:9px;font-weight:900}
        .mini{border:1px solid #4c6f98;background:#11294d;color:#fff;border-radius:7px;padding:5px 9px;font-size:10px;font-weight:900}
        .message{display:grid;grid-template-columns:34px 1fr auto;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07)}
        .initial{width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:#20457a;color:#fff;font-size:10px;font-weight:900}
        .message b{font-size:11px}.message p{margin:2px 0 0;color:#9fb0c7;font-size:10px}.time{font-size:9px;color:#7f93ad}

        .ai{padding:14px}
        .aiHead{display:flex;gap:9px;align-items:center}
        .aiOrb{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#f8ad2f,#f0800d);color:#07162e;font-size:23px}
        .ai h3{margin:0}.ai small{color:#9fb0c7}
        .aiBox{margin-top:9px;border:1px solid #2b4b73;border-radius:11px;padding:11px;background:#0d2345}
        .aiBox b{font-size:12px}.aiBox p{margin:4px 0 0;font-size:10px;color:#aebed1;line-height:1.4}.aiBox button{border:0;background:transparent;color:#ffbd4a;font-size:10px;font-weight:900;padding:7px 0 0}
        .ask{width:100%;margin-top:10px;min-height:38px;border:0;border-radius:8px;background:#f4a529;color:#07162e;font-weight:1000}

        .opp{padding:13px;margin-top:11px}
        .oppRow{display:grid;grid-template-columns:36px 1fr auto;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07)}
        .oppIcon{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#183b69}
        .oppRow b{font-size:11px}.oppRow p{margin:2px 0;color:#9fb0c7;font-size:9px}.oppTag{color:#5be093;font-size:9px;font-weight:900}
        .arrow{width:27px;height:27px;border:0;border-radius:50%;background:#193c69;color:#fff}
        .promoBanner{margin-top:11px;padding:15px;background:linear-gradient(135deg,#ed991c,#f8bd4f);color:#07162e;display:flex;justify-content:space-between;align-items:center}
        .promoBanner h3{margin:0 0 4px}.promoBanner p{margin:0;font-size:11px}.promoBanner button{border:0;border-radius:8px;background:#07162e;color:#fff;padding:8px 11px;font-weight:900}

        .moduleScreen{display:grid;gap:11px}
        .moduleHero{padding:18px;border-radius:14px;background:linear-gradient(135deg,#f0a020,#f7bc4d);color:#07162e;display:grid;grid-template-columns:58px 1fr auto;gap:14px;align-items:center}
        .moduleHeroIcon{width:56px;height:56px;border-radius:16px;background:rgba(7,22,46,.11);display:grid;place-items:center;font-size:29px}
        .moduleHero h2{margin:0;font-size:23px}.moduleHero p{margin:4px 0 0;font-size:12px;line-height:1.45}
        .modulePrimary{border:0;border-radius:9px;background:#07162e;color:#fff;min-height:40px;padding:0 14px;font-weight:900}
        .moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
        .moduleItem{padding:16px;min-height:135px;display:flex;flex-direction:column;justify-content:space-between}
        .moduleItem h3{margin:0 0 6px;font-size:15px}.moduleItem p{margin:0;color:#aebed1;font-size:11px;line-height:1.5}
        .moduleBadge{align-self:flex-start;margin-top:13px;background:#193b68;color:#ffd17b;border-radius:999px;padding:4px 7px;font-size:9px;font-weight:900}
        .moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:11px}
        .moduleActionCard{padding:16px}.moduleActionCard h3{margin:0 0 5px}.moduleActionCard p{margin:0 0 13px;color:#aebed1;font-size:11px;line-height:1.5}

        .trust{margin-top:11px;padding:14px 16px;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;background:linear-gradient(90deg,#122d56,#15335f)}
        .shield{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:#f4a529;color:#07162e;font-size:23px}
        .trust h3{margin:0;font-size:14px}.trust p{margin:3px 0 0;color:#aebed1;font-size:10px}.community{color:#ffbd4a;font-weight:1000;font-size:12px}

        .toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:#f4a529;color:#07162e;padding:13px 17px;border-radius:11px;font-weight:1000;box-shadow:0 14px 38px rgba(0,0,0,.3)}

        @media(max-width:1200px){
          .content{grid-template-columns:1fr}.rightCol{display:grid;grid-template-columns:1fr 1fr;gap:11px}.opp{margin-top:0}.stats{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:900px){
          .top{grid-template-columns:1fr auto}.head{display:none}.chip{display:none}
          .shell{grid-template-columns:82px 1fr}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.sideBadge{display:none}.aiMini{display:none}
          .business{grid-template-columns:80px 1fr}.bizBtns{grid-column:1/-1;grid-template-columns:repeat(3,1fr)}
          .mid,.bottom{grid-template-columns:1fr}.moduleGrid{grid-template-columns:1fr}.moduleActions{grid-template-columns:1fr}
        }
        @media(max-width:620px){
          .top{padding:0 12px}.brand strong{font-size:21px}.brand small{display:none}.userBtn span:last-child{display:none}
          .shell{grid-template-columns:62px 1fr}.content{padding:9px}.stats{grid-template-columns:1fr 1fr}
          .business{grid-template-columns:1fr;text-align:center}.bizLogo{margin:auto}.meta,.tags{justify-content:center}.bizBtns{grid-template-columns:1fr}
          .products{grid-template-columns:1fr}.rightCol{grid-template-columns:1fr}
          .moduleHero{grid-template-columns:50px 1fr}.modulePrimary{grid-column:1/-1}.trust{grid-template-columns:auto 1fr}.community{display:none}
        }
      `}</style>

      <header className="top">
        <button className="brand" onClick={() => go("/")}>
          <span className="mark">W</span>
          <span>
            <strong>WorkCerca</strong>
            <small>Conectá, encontrá y hacé crecer tus ideas.</small>
          </span>
        </button>

        <div className="head">
          <h1>Panel Emprendedor</h1>
          <p>Gestioná tu negocio y conectate con nuevas oportunidades.</p>
        </div>

        <div className="topActions">
          <button className="chip" onClick={() => action("Ubicación del emprendimiento: Reconquista, Santa Fe.")}>📍 Reconquista, Santa Fe</button>
          <button className="iconBtn" onClick={() => action("Búsqueda rápida dentro del ecosistema.")}>⌕</button>
          <button className="iconBtn" onClick={() => action("Tenés notificaciones nuevas.")}>🔔</button>
          <button className="userBtn" onClick={() => setActive("emprendimiento")}>
            <span className="userAvatar">DM</span>
            <span>Dulce Momento</span>
          </button>
        </div>
      </header>

      <div className="shell">
        <aside className="side">
          {sidebar.map(([icon,label,key,badge]) => (
            <button
              key={key}
              className={active === key ? "active" : ""}
              onClick={() => {
                setActive(key);
                if (key === "oportunidades") action("La IA WorkCerca está actualizando oportunidades.");
                if (key === "productos") action("Podés crear publicaciones con IA sin falsear el producto.");
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {badge ? <span className="sideBadge">{badge}</span> : <span />}
            </button>
          ))}

          <button onClick={() => go("/")} style={{marginTop:10,borderTop:"1px solid rgba(255,255,255,.08)",borderRadius:0}}>
            <span>←</span><span>Volver a Inicio</span><span/>
          </button>

          <div className="aiMini">
            <b>✦ Motor IA WorkCerca</b>
            <p>Te ayuda con productos, clientes, proveedores, empleo, programas, capacitaciones y crecimiento.</p>
          </div>
        </aside>

        <section className="content">
          <div className="mainCol">
            {active === "panel" ? (
              <>
                <div className="stats">
                  <article className="stat">
                    <div className="statTop"><span className="statIcon">📦</span><span className="trend">+2 hoy</span></div>
                    <strong>4</strong><small>Pedidos nuevos</small>
                  </article>
                  <article className="stat">
                    <div className="statTop"><span className="statIcon">💬</span><span className="trend">+5%</span></div>
                    <strong>9</strong><small>Consultas</small>
                  </article>
                  <article className="stat">
                    <div className="statTop"><span className="statIcon">💰</span><span className="trend">+12%</span></div>
                    <strong>$285k</strong><small>Ventas del mes</small>
                  </article>
                  <article className="stat">
                    <div className="statTop"><span className="statIcon">⚡</span><span className="trend">IA</span></div>
                    <strong>6</strong><small>Oportunidades</small>
                  </article>
                </div>

                <article className="card business">
                  <div className="bizLogo">🧁</div>
                  <div>
                    <h2>Dulce Momento</h2>
                    <div className="bizType">Pastelería artesanal</div>
                    <div className="meta">
                      <span>📍 Reconquista, Santa Fe</span>
                      <span>⭐ 4.9 (86 reseñas)</span>
                      <span>🛡️ Perfil verificado</span>
                    </div>
                    <div style={{fontSize:12,color:"#c0ccdc",lineHeight:1.5}}>
                      Tortas, boxes y propuestas artesanales para momentos especiales.
                    </div>
                    <div className="tags">
                      <span className="tag">Pastelería</span>
                      <span className="tag">Eventos</span>
                      <span className="tag">Desayunos</span>
                      <span className="tag">Catering</span>
                    </div>
                  </div>
                  <div className="bizBtns">
                    <button className="amberBtn" onClick={() => action("Vista pública del emprendimiento.")}>Ver emprendimiento</button>
                    <button className="outlineBtn" onClick={() => setActive("emprendimiento")}>Editar datos</button>
                    <button className="outlineBtn" onClick={() => setActive("cv")}>Mi CV laboral</button>
                  </div>
                </article>

                <div className="mid">
                  <article className="card panel">
                    <div className="panelHead">
                      <h3>Productos destacados</h3>
                      <button className="linkBtn" onClick={() => setActive("productos")}>Ver todos</button>
                    </div>
                    <div className="products">
                      <div className="product">
                        <div className="productVisual">🎂</div>
                        <div className="productBody"><b>Torta chocolate</b><p>Producto destacado</p><span className="price">$18.000</span></div>
                      </div>
                      <div className="product">
                        <div className="productVisual">🎁</div>
                        <div className="productBody"><b>Box desayuno</b><p>Ideal para regalar</p><span className="price">$15.500</span></div>
                      </div>
                      <div className="aiPublish">
                        <span className="aiPublishIcon">✦</span>
                        <b>Crear con IA</b>
                        <p>Mejorá foto, título y descripción sin falsear el producto.</p>
                        <button onClick={() => setActive("productos")}>Crear publicación</button>
                      </div>
                    </div>
                  </article>

                  <article className="card panel">
                    <div className="panelHead"><h3>Actividad comercial</h3><button className="linkBtn" onClick={() => setActive("finanzas")}>Ver informe</button></div>
                    <div className="salesChart">
                      <svg viewBox="0 0 500 145" preserveAspectRatio="none">
                        <polyline points="10,115 80,95 150,105 220,62 290,78 360,35 430,52 490,20" fill="none" stroke="#f7a928" strokeWidth="4"/>
                        <polyline points="10,130 80,120 150,95 220,110 290,90 360,82 430,70 490,72" fill="none" stroke="#2c7df0" strokeWidth="3"/>
                      </svg>
                      <div className="legend">Ventas y consultas · Últimos 7 días</div>
                    </div>
                  </article>
                </div>

                <div className="bottom">
                  <article className="card list">
                    <div className="panelHead"><h3>Pedidos recientes</h3><button className="linkBtn" onClick={() => setActive("pedidos")}>Ver todos</button></div>
                    {[
                      ["#WC-201 · Torta personalizada","Entrega mañana","Nuevo"],
                      ["#WC-200 · Box desayuno","En preparación","En proceso"],
                      ["#WC-199 · Catering empresa","Entrega viernes","Confirmado"],
                    ].map(([a,b,c]) => (
                      <div className="row" key={a}>
                        <div><b>{a}</b><small>{b}</small></div>
                        <div><span className="status">{c}</span><br/><button className="mini" onClick={() => action(a)}>Ver</button></div>
                      </div>
                    ))}
                  </article>

                  <article className="card list">
                    <div className="panelHead"><h3>Mensajes recientes</h3><button className="linkBtn" onClick={() => setActive("mensajes")}>Ver todos</button></div>
                    {[
                      ["CL","Cliente particular","¿Hacés torta para 20 personas?","11:10"],
                      ["ER","Empresa Reconquista","Consulta por catering corporativo","Ayer"],
                      ["MR","Municipalidad","Invitación a feria regional","Lun"],
                    ].map(([i,n,m,t]) => (
                      <div className="message" key={n}>
                        <span className="initial">{i}</span>
                        <div><b>{n}</b><p>{m}</p></div>
                        <span className="time">{t}</span>
                      </div>
                    ))}
                  </article>
                </div>

                <article className="card trust">
                  <span className="shield">🛡️</span>
                  <div><h3>Confianza, visibilidad y crecimiento real</h3><p>WorkCerca potencia lo que realmente ofrecés. La IA mejora la presentación, nunca inventa características.</p></div>
                  <span className="community">Ecosistema conectado</span>
                </article>
              </>
            ) : (
              <section className="moduleScreen">
                <div className="moduleHero">
                  <div className="moduleHeroIcon">{moduleScreens[active]?.icon || "•"}</div>
                  <div>
                    <h2>{moduleScreens[active]?.title || currentTitle}</h2>
                    <p>{moduleScreens[active]?.subtitle}</p>
                  </div>
                  <button
                    className="modulePrimary"
                    onClick={() => {
                      if (active === "productos") {
                        action("Asistente IA: mejorá presentación, foto, descripción y etiquetas sin falsear el producto.");
                      } else {
                        action(`${moduleScreens[active]?.primary}: acción preparada para conectar con datos reales.`);
                      }
                    }}
                  >
                    {moduleScreens[active]?.primary}
                  </button>
                </div>

                <div className="moduleGrid">
                  {(moduleScreens[active]?.items || []).map((item) => (
                    <article className="card moduleItem" key={item.title}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                      {item.badge && <span className="moduleBadge">{item.badge}</span>}
                    </article>
                  ))}
                </div>

                <div className="moduleActions">
                  <article className="card moduleActionCard">
                    <h3>✦ Motor IA WorkCerca</h3>
                    <p>
                      La IA conecta tu emprendimiento con clientes, proveedores, empresas, municipios,
                      instituciones, capacitaciones y oportunidades laborales según tus permisos.
                    </p>
                    <button className="amberBtn" onClick={() => action("Sugerencias IA actualizadas para esta sección.")}>Ver sugerencias IA</button>
                  </article>

                  <article className="card moduleActionCard">
                    <h3>🔗 Una sola identidad</h3>
                    <p>
                      Podés emprender y al mismo tiempo buscar empleo con tu CV, sin crear otra cuenta.
                    </p>
                    <button className="outlineBtn" onClick={() => setActive("panel")}>Volver al Panel Emprendedor</button>
                  </article>
                </div>
              </section>
            )}
          </div>

          <aside className="rightCol">
            <article className="card ai">
              <div className="aiHead">
                <span className="aiOrb">✦</span>
                <div><h3>Motor IA WorkCerca</h3><small>Asistente para tu crecimiento</small></div>
              </div>

              <div className="aiBox">
                <b>🛍️ Mejorá tus publicaciones</b>
                <p>Subí una foto y la IA puede mejorar luz, fondo y encuadre, además de sugerir título y descripción sin falsear el producto.</p>
                <button onClick={() => setActive("productos")}>Crear publicación con IA →</button>
              </div>

              <div className="aiBox">
                <b>🤝 Proveedores sugeridos</b>
                <p>Encontramos opciones cercanas para packaging, materia prima y servicios profesionales.</p>
                <button onClick={() => setActive("proveedores")}>Ver proveedores →</button>
              </div>

              <div className="aiBox">
                <b>🏛️ Programas disponibles</b>
                <p>Municipios e instituciones pueden ofrecer programas y beneficios compatibles con tu actividad.</p>
                <button onClick={() => setActive("programas")}>Ver programas →</button>
              </div>

              <div className="aiBox">
                <b>💼 También podés buscar empleo</b>
                <p>Tu CV permanece activo aunque tengas un emprendimiento.</p>
                <button onClick={() => setActive("empleo")}>Ver oportunidades laborales →</button>
              </div>

              <button className="ask" onClick={() => action("Asistente IA WorkCerca listo para ayudarte.")}>✦ Preguntar a la IA</button>
            </article>

            <article className="card opp">
              <div className="panelHead"><h3>Oportunidades para vos</h3><button className="linkBtn" onClick={() => setActive("oportunidades")}>Ver todas</button></div>
              {[
                ["🏛️","Feria de emprendedores","Municipalidad de Reconquista","Convocatoria abierta"],
                ["🏢","Catering empresarial","Empresa local busca proveedor","Compatible"],
                ["🎓","Marketing digital","Institución aliada","Capacitación"],
              ].map(([i,t,d,tag]) => (
                <div className="oppRow" key={t}>
                  <span className="oppIcon">{i}</span>
                  <div><b>{t}</b><p>{d}</p><span className="oppTag">{tag}</span></div>
                  <button className="arrow" onClick={() => action(`${t}: oportunidad sugerida por IA WorkCerca.`)}>›</button>
                </div>
              ))}
            </article>

            <article className="card promoBanner">
              <div><h3>📣 Publicitá en WorkCerca</h3><p>Mostrá tus productos a más personas de tu zona.</p></div>
              <button onClick={() => setActive("publicidad")}>Crear campaña</button>
            </article>
          </aside>
        </section>
      </div>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
