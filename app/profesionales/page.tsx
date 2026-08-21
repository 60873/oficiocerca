"use client";

import { useMemo, useState } from "react";

const requests = [
  { title: "Instalación eléctrica en vivienda", place: "Reconquista, Santa Fe", distance: "1.2 km", time: "Hoy, 10:30" },
  { title: "Mantenimiento de tablero eléctrico", place: "Avellaneda, Santa Fe", distance: "12 km", time: "Hoy, 09:15" },
  { title: "Revisión de instalación comercial", place: "Reconquista, Santa Fe", distance: "2.5 km", time: "Ayer, 18:40" },
];

const messages = [
  { initials: "ER", from: "Empresa Reconquista SRL", text: "Hola Mariana, nos interesa tu perfil para una vacante.", time: "11:20", badge: "2" },
  { initials: "MR", from: "Municipalidad de Reconquista", text: "Te invitamos a participar de un proyecto local.", time: "Ayer", badge: "" },
  { initials: "CP", from: "Centro de Salud N°3", text: "Necesitamos un técnico para una intervención programada.", time: "31 May", badge: "" },
];

const opportunities = [
  { icon: "💼", title: "Técnico Electricista", org: "Empresa del Norte SRL", meta: "Reconquista · 2 km", tag: "Tiempo completo" },
  { icon: "🏛️", title: "Instalador Eléctrico", org: "Municipalidad de Reconquista", meta: "Reconquista · 1.8 km", tag: "Proyecto" },
  { icon: "🏫", title: "Técnico de Mantenimiento", org: "Institución Educativa N°45", meta: "Reconquista · 3 km", tag: "Media jornada" },
];

const sidebar = [
  ["⌂", "Mi Panel Profesional", "panel"],
  ["👤", "Mi Perfil Profesional", "perfil"],
  ["📄", "Mi CV", "cv"],
  ["🧰", "Mis Servicios", "servicios"],
  ["✉", "Solicitudes recibidas", "solicitudes", "4"],
  ["$", "Presupuestos", "presupuestos", "2"],
  ["▣", "Trabajos activos", "trabajos", "3"],
  ["▦", "Agenda", "agenda"],
  ["◯", "Mensajes", "mensajes", "5"],
  ["▣", "Videollamadas", "videollamadas"],
  ["◷", "Disponibilidad", "disponibilidad"],
  ["☆", "Calificaciones y reseñas", "calificaciones"],
  ["⌕", "Buscar empleo", "empleo"],
  ["➤", "Mis postulaciones", "postulaciones", "3"],
  ["⚡", "Oportunidades", "oportunidades"],
  ["🎓", "Capacitaciones", "capacitaciones"],
  ["🛡", "Mi reputación / Confianza", "confianza"],
  ["⚙", "Configuración", "configuracion"],
];


const moduleScreens: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  primary: string;
  items: { title: string; text: string; badge?: string }[];
}> = {
  perfil: {
    title: "Mi Perfil Profesional",
    subtitle: "Administrá tu presentación pública, experiencia, especialidades y datos de contacto.",
    icon: "👤",
    primary: "Editar mi perfil",
    items: [
      { title: "Perfil público", text: "Revisá cómo te ven personas, empresas, municipios e instituciones.", badge: "Verificado" },
      { title: "Especialidades", text: "Electricidad · Instalaciones · Mantenimiento · Tableros" },
      { title: "Zona de trabajo", text: "Reconquista, Santa Fe · Radio configurado hasta 30 km" },
    ],
  },
  cv: {
    title: "Mi CV",
    subtitle: "Tu CV laboral se conecta con empresas, municipios e instituciones que buscan perfiles como el tuyo.",
    icon: "📄",
    primary: "Editar mi CV",
    items: [
      { title: "CV WorkCerca", text: "Experiencia, formación, habilidades y referencias en un solo perfil.", badge: "Completo 85%" },
      { title: "Postulación rápida", text: "Usá este CV para presentarte a oportunidades compatibles." },
      { title: "Visibilidad inteligente", text: "La IA puede sugerir tu perfil cuando una organización busca tus habilidades." },
    ],
  },
  servicios: {
    title: "Mis Servicios",
    subtitle: "Publicá y organizá los servicios que ofrecés como profesional independiente.",
    icon: "🧰",
    primary: "Agregar servicio",
    items: [
      { title: "Instalaciones eléctricas", text: "Domiciliarias y comerciales · Presupuesto previo", badge: "Activo" },
      { title: "Mantenimiento eléctrico", text: "Revisión, diagnóstico y mantenimiento preventivo", badge: "Activo" },
      { title: "Tableros eléctricos", text: "Armado, reparación y actualización de tableros" },
    ],
  },
  solicitudes: {
    title: "Solicitudes recibidas",
    subtitle: "Consultas de personas y organizaciones interesadas en contratar tus servicios.",
    icon: "✉",
    primary: "Ver nuevas solicitudes",
    items: [
      { title: "Instalación eléctrica en vivienda", text: "Reconquista · 1.2 km · Recibida hoy", badge: "Nueva" },
      { title: "Mantenimiento de tablero", text: "Avellaneda · 12 km · Recibida hoy", badge: "Nueva" },
      { title: "Revisión en comercio", text: "Reconquista · 2.5 km · Recibida ayer" },
    ],
  },
  presupuestos: {
    title: "Presupuestos",
    subtitle: "Prepará, enviá y seguí presupuestos vinculados a solicitudes de trabajo.",
    icon: "$",
    primary: "Crear presupuesto",
    items: [
      { title: "Presupuesto #WC-102", text: "Instalación domiciliaria · Pendiente de respuesta", badge: "Pendiente" },
      { title: "Presupuesto #WC-101", text: "Tablero eléctrico · Enviado al cliente", badge: "Enviado" },
      { title: "Historial", text: "Consultá presupuestos aceptados, rechazados y vencidos." },
    ],
  },
  trabajos: {
    title: "Trabajos activos",
    subtitle: "Seguimiento de trabajos confirmados, fechas, estado y próximos pasos.",
    icon: "▣",
    primary: "Actualizar trabajos",
    items: [
      { title: "Instalación comercial", text: "En ejecución · Próxima visita mañana 09:00", badge: "Activo" },
      { title: "Mantenimiento preventivo", text: "En ejecución · Avance estimado 60%", badge: "Activo" },
      { title: "Finalizados", text: "Accedé al historial y solicitá calificaciones al finalizar." },
    ],
  },
  agenda: {
    title: "Agenda",
    subtitle: "Organizá entrevistas, visitas, trabajos y videollamadas en un solo lugar.",
    icon: "▦",
    primary: "Agregar evento",
    items: [
      { title: "10:30 · Visita técnica", text: "Reconquista · Instalación eléctrica" },
      { title: "14:00 · Videollamada", text: "Empresa del Norte SRL · Entrevista laboral" },
      { title: "17:30 · Presupuesto", text: "Avellaneda · Revisión de tablero" },
    ],
  },
  mensajes: {
    title: "Mensajes",
    subtitle: "Conversaciones con clientes, empresas, municipios e instituciones.",
    icon: "◯",
    primary: "Nuevo mensaje",
    items: [
      { title: "Empresa Reconquista SRL", text: "Nos interesa tu perfil para una vacante.", badge: "2 nuevos" },
      { title: "Municipalidad de Reconquista", text: "Invitación a participar de un proyecto local." },
      { title: "Centro de Salud N°3", text: "Consulta por mantenimiento programado." },
    ],
  },
  videollamadas: {
    title: "Videollamadas",
    subtitle: "Entrevistas y reuniones remotas directamente desde WorkCerca.",
    icon: "▣",
    primary: "Programar videollamada",
    items: [
      { title: "Próxima entrevista", text: "Empresa del Norte SRL · Hoy 14:00", badge: "Hoy" },
      { title: "Reuniones programadas", text: "Tus próximas videollamadas aparecerán aquí." },
      { title: "Historial", text: "Consultá entrevistas y reuniones anteriores." },
    ],
  },
  disponibilidad: {
    title: "Disponibilidad",
    subtitle: "Definí cuándo, dónde y para qué tipo de oportunidades estás disponible.",
    icon: "◷",
    primary: "Editar disponibilidad",
    items: [
      { title: "Estado", text: "Disponible para servicios y oportunidades laborales.", badge: "Disponible" },
      { title: "Radio de trabajo", text: "Hasta 30 km desde Reconquista." },
      { title: "Horarios", text: "Lun a Vie 08:00–18:00 · Sáb 08:00–13:00" },
    ],
  },
  calificaciones: {
    title: "Calificaciones y reseñas",
    subtitle: "Tu reputación se construye con experiencias reales dentro del ecosistema.",
    icon: "☆",
    primary: "Ver todas las reseñas",
    items: [
      { title: "Calificación general", text: "4.9 sobre 5 · 128 reseñas", badge: "Excelente" },
      { title: "Puntualidad", text: "Valoración destacada por clientes y organizaciones." },
      { title: "Calidad del trabajo", text: "Fortaleza principal detectada en tus reseñas." },
    ],
  },
  empleo: {
    title: "Buscar empleo",
    subtitle: "Encontrá puestos compatibles con tu profesión, CV, ubicación y disponibilidad.",
    icon: "⌕",
    primary: "Buscar oportunidades",
    items: [
      { title: "Técnico Electricista", text: "Empresa del Norte SRL · Reconquista · Tiempo completo", badge: "92% compatible" },
      { title: "Instalador Eléctrico", text: "Municipalidad de Reconquista · Proyecto", badge: "88% compatible" },
      { title: "Técnico de mantenimiento", text: "Institución Educativa N°45 · Media jornada", badge: "84% compatible" },
    ],
  },
  postulaciones: {
    title: "Mis postulaciones",
    subtitle: "Seguimiento de todas tus postulaciones laborales y procesos de selección.",
    icon: "➤",
    primary: "Ver oportunidades",
    items: [
      { title: "Empresa del Norte SRL", text: "Técnico Electricista · CV enviado", badge: "En revisión" },
      { title: "Municipalidad de Reconquista", text: "Instalador Eléctrico · Postulación recibida", badge: "Recibida" },
      { title: "Institución Educativa N°45", text: "Técnico de mantenimiento · Entrevista pendiente", badge: "Entrevista" },
    ],
  },
  oportunidades: {
    title: "Oportunidades",
    subtitle: "La IA WorkCerca reúne empleo, proyectos, servicios y oportunidades compatibles con vos.",
    icon: "⚡",
    primary: "Actualizar sugerencias IA",
    items: [
      { title: "Empresa", text: "Vacante de Técnico Electricista · 92% compatible", badge: "IA" },
      { title: "Municipio", text: "Proyecto de instalación eléctrica comunitaria · 88% compatible", badge: "IA" },
      { title: "Institución", text: "Mantenimiento técnico · 84% compatible", badge: "IA" },
    ],
  },
  capacitaciones: {
    title: "Capacitaciones",
    subtitle: "Cursos y formación recomendados según tu perfil y la demanda de tu zona.",
    icon: "🎓",
    primary: "Explorar capacitaciones",
    items: [
      { title: "Instalaciones Industriales", text: "Alta demanda en Reconquista y zona", badge: "Recomendada por IA" },
      { title: "Seguridad eléctrica", text: "Actualización profesional · Modalidad mixta" },
      { title: "Herramientas digitales", text: "Mejorá presupuestos, organización y comunicación." },
    ],
  },
  confianza: {
    title: "Mi reputación / Confianza",
    subtitle: "Verificaciones, calificaciones y señales que fortalecen tu perfil WorkCerca.",
    icon: "🛡",
    primary: "Completar verificaciones",
    items: [
      { title: "Identidad", text: "Identidad validada dentro de WorkCerca.", badge: "Verificado" },
      { title: "Matrícula / credencial", text: "Credencial profesional disponible para validación." },
      { title: "Historial de reputación", text: "Calificaciones, trabajos y referencias construyen tu confianza." },
    ],
  },
  configuracion: {
    title: "Configuración",
    subtitle: "Preferencias de cuenta, privacidad, notificaciones y seguridad.",
    icon: "⚙",
    primary: "Guardar preferencias",
    items: [
      { title: "Privacidad", text: "Elegí qué información mostrar a personas y organizaciones." },
      { title: "Notificaciones", text: "Configurá alertas de solicitudes, empleo, mensajes y agenda." },
      { title: "Seguridad", text: "Acceso, sesiones activas y protección de tu cuenta." },
    ],
  },
};

export default function ProfesionalesPage() {
  const [active, setActive] = useState("panel");
  const [notice, setNotice] = useState("");
  const [available, setAvailable] = useState(true);

  const title = useMemo(() => {
    const found = sidebar.find((item) => item[2] === active);
    return found?.[1] || "Mi Panel Profesional";
  }, [active]);

  const action = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const go = (path: string) => {
    window.location.href = path;
  };

  return (
    <main className="proApp">
      <style>{`
        :root{
          --blue:#0b5ef0;
          --blue2:#1148b8;
          --navy:#061e4c;
          --navy2:#082b68;
          --text:#0e1d49;
          --muted:#667085;
          --line:#dfe7f2;
          --bg:#f6f9fe;
          --white:#fff;
          --green:#18a85b;
          --purple:#7448e8;
          --orange:#ff9400;
        }
        *{box-sizing:border-box}
        html,body{margin:0;background:var(--bg);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input{font:inherit}
        button{cursor:pointer}
        .proApp{min-height:100vh;background:linear-gradient(180deg,#fff 0,#f7faff 100%)}
        .top{
          height:86px;background:#fff;border-bottom:1px solid #e3eaf4;
          display:grid;grid-template-columns:280px 1fr auto;align-items:center;gap:20px;
          padding:0 28px;position:sticky;top:0;z-index:50
        }
        .brand{display:flex;align-items:center;gap:12px;font-weight:1000;font-size:29px;color:#0b2b68}
        .brandMark{width:46px;height:46px;border-radius:16px 16px 22px 22px;background:linear-gradient(145deg,#0b69ff,#083ab0);color:#fff;display:grid;place-items:center;font-size:25px;box-shadow:0 10px 22px rgba(11,94,240,.2)}
        .brand small{display:block;font-size:10px;font-weight:700;line-height:1.2;color:#24406e}
        .headTitle h1{font-size:25px;margin:0 0 3px}
        .headTitle p{margin:0;color:#1b2a4c}
        .topActions{display:flex;align-items:center;gap:12px}
        .locationChip{border:1px solid #d9e4f1;border-radius:12px;background:#fff;padding:10px 13px;font-weight:800}
        .topIcon{width:40px;height:40px;border:0;background:#fff;border-radius:50%;font-size:20px;position:relative}
        .topIcon .badge{position:absolute;top:-2px;right:-2px;background:#ef2b2b;color:#fff;font-size:10px;width:18px;height:18px;border-radius:50%;display:grid;place-items:center}
        .userChip{display:flex;align-items:center;gap:9px;border:0;background:#fff;font-weight:900}
        .userChip img{width:42px;height:42px;border-radius:50%;object-fit:cover}

        .shell{display:grid;grid-template-columns:290px minmax(0,1fr);min-height:calc(100vh - 86px)}
        .side{
          background:linear-gradient(180deg,#071f4b 0%,#07317a 55%,#08275e 100%);
          color:#fff;padding:16px 14px 18px;position:sticky;top:86px;height:calc(100vh - 86px);overflow:auto
        }
        .side button{
          width:100%;border:0;background:transparent;color:#fff;border-radius:10px;
          min-height:44px;padding:0 13px;display:grid;grid-template-columns:28px 1fr auto;align-items:center;
          text-align:left;gap:8px;font-size:14px
        }
        .side button:hover{background:rgba(255,255,255,.08)}
        .side button.active{background:linear-gradient(90deg,#0a5df2,#0d48c8);box-shadow:0 8px 20px rgba(0,0,0,.18)}
        .side .ico{font-size:19px;text-align:center}
        .sideBadge{min-width:24px;height:24px;padding:0 6px;border-radius:999px;background:#0d66ff;display:grid;place-items:center;font-size:11px;font-weight:900}
        .assistantCard{
          margin-top:22px;border-radius:15px;padding:16px;background:linear-gradient(145deg,#0b58d5,#074099);
          border:1px solid rgba(255,255,255,.12);box-shadow:0 12px 24px rgba(0,0,0,.18)
        }
        .assistantCard b{display:block;font-size:16px}
        .assistantCard p{margin:6px 0 0;font-size:12px;line-height:1.5;color:rgba(255,255,255,.9)}

        .content{padding:16px 18px 18px;display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:16px}
        .mainCol{min-width:0}
        .rightCol{min-width:0}
        .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .stat{
          background:#fff;border:1px solid var(--line);border-radius:14px;padding:15px 16px;
          box-shadow:0 8px 18px rgba(22,54,99,.05);display:grid;grid-template-columns:48px 1fr;gap:12px;min-height:104px
        }
        .statIcon{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;color:#fff;font-size:22px}
        .stat:nth-child(1) .statIcon{background:#0d62ef}
        .stat:nth-child(2) .statIcon{background:#16aa63}
        .stat:nth-child(3) .statIcon{background:#ff9308}
        .stat:nth-child(4) .statIcon{background:#7449e8}
        .stat strong{display:block;font-size:29px;line-height:1}
        .stat span{font-size:12px;color:#243653}
        .stat button{grid-column:2;border:0;background:transparent;color:var(--blue);font-weight:800;text-align:left;padding:0;font-size:12px}

        .card{background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 8px 18px rgba(22,54,99,.05)}
        .profile{margin-top:12px;padding:18px;display:grid;grid-template-columns:130px 1fr 190px;gap:18px;align-items:center}
        .profilePhoto{width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #fff;box-shadow:0 8px 24px rgba(0,0,0,.16)}
        .profile h2{margin:0;font-size:23px}
        .verified{color:#0b62e7;font-size:16px}
        .role{color:#075ddd;font-weight:900;margin:6px 0}
        .meta{display:flex;gap:12px;flex-wrap:wrap;font-size:13px;margin:10px 0}
        .verifyPill{background:#e8fbef;color:#168047;padding:4px 8px;border-radius:999px;font-weight:800}
        .bio{font-size:13px;line-height:1.55;color:#293a58}
        .tags{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}
        .tag{background:#eef4ff;color:#145ed6;border-radius:999px;padding:4px 8px;font-size:11px;font-weight:800}
        .profileBtns{display:grid;gap:8px}
        .primaryBtn,.outlineBtn{min-height:42px;border-radius:10px;font-weight:900}
        .primaryBtn{border:1px solid var(--blue);background:var(--blue);color:#fff}
        .outlineBtn{border:1px solid #cfdced;background:#fff;color:#12356d}
        .outlineBtn:hover{background:#f6f9ff}

        .midGrid{display:grid;grid-template-columns:1.35fr .85fr;gap:12px;margin-top:12px}
        .panel{padding:16px}
        .panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
        .panelHead h3{margin:0;font-size:16px}
        .select{border:1px solid #d7e2ef;border-radius:9px;background:#fff;padding:7px 10px;font-size:12px}
        .chart{height:220px;position:relative;padding:18px 12px 32px 28px}
        .gridLine{position:absolute;left:28px;right:12px;height:1px;background:#e6edf6}
        .gridLine:nth-child(1){top:30px}.gridLine:nth-child(2){top:70px}.gridLine:nth-child(3){top:110px}.gridLine:nth-child(4){top:150px}.gridLine:nth-child(5){top:190px}
        .svgChart{position:absolute;left:28px;right:12px;top:22px;width:calc(100% - 40px);height:165px}
        .legend{position:absolute;bottom:3px;left:28px;right:12px;display:flex;justify-content:center;gap:28px;font-size:11px;color:#44526b}
        .dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:5px}
        .availability .status{float:right;background:#e9f8ee;color:#138044;border-radius:8px;padding:7px 10px;font-size:12px;font-weight:900}
        .availability p{font-size:12px;color:#34425c;line-height:1.55}
        .availableText{color:#149051;font-weight:900}
        .editAvail{width:100%;margin-top:8px}

        .bottomGrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
        .listPanel{padding:13px}
        .sectionLink{border:0;background:transparent;color:var(--blue);font-weight:800;font-size:11px}
        .row{display:grid;grid-template-columns:1fr auto;gap:10px;padding:10px 0;border-bottom:1px solid #edf2f7;align-items:center}
        .row:last-child{border-bottom:0}
        .row b{font-size:12px;display:block}
        .row small{display:block;color:#657189;margin-top:2px}
        .newPill{display:inline-block;margin-right:6px;background:#e8f9ee;color:#148146;border-radius:6px;padding:3px 5px;font-size:9px;font-weight:900}
        .miniBtn{border:1px solid #7fb0ff;background:#fff;color:#1260da;border-radius:7px;padding:6px 12px;font-weight:800;font-size:11px}
        .messageRow{display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #edf2f7}
        .messageRow:last-child{border-bottom:0}
        .initials{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#2055a2;color:#fff;font-size:11px;font-weight:900}
        .messageRow b{font-size:12px}
        .messageRow p{margin:2px 0 0;font-size:11px;color:#59667c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px}
        .msgTime{font-size:10px;color:#48546a;text-align:right}
        .tinyBadge{display:inline-grid;place-items:center;background:#0b62ef;color:#fff;border-radius:999px;min-width:18px;height:18px;font-size:9px;margin-top:4px}

        .ai{padding:14px}
        .aiTitle{display:flex;gap:10px;align-items:center}
        .aiTitleIcon{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#eef3ff;color:#4e4add;font-size:22px}
        .ai h3{margin:0;font-size:17px}
        .ai small{color:#5f6d84}
        .aiBox{border:1px solid #e0e7f2;border-radius:12px;padding:12px;margin-top:10px;background:#fff}
        .aiBoxHead{display:grid;grid-template-columns:38px 1fr;gap:9px}
        .aiBoxIcon{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#edf4ff;font-size:19px}
        .aiBox:nth-of-type(3) .aiBoxIcon{background:#eafbf1}
        .aiBox:nth-of-type(4) .aiBoxIcon{background:#f4edff}
        .aiBox:nth-of-type(5) .aiBoxIcon{background:#fff1dd}
        .aiBox b{font-size:13px}
        .aiBox p{font-size:11px;color:#57647a;line-height:1.4;margin:3px 0 0}
        .aiBox button{border:0;background:transparent;color:var(--blue);font-size:11px;font-weight:900;padding:8px 0 0}
        .askAI{width:100%;margin-top:10px;min-height:38px;border:0;border-radius:8px;background:#eaf2ff;color:#124fc1;font-weight:900}

        .opp{padding:14px;margin-top:12px}
        .oppRow{display:grid;grid-template-columns:40px 1fr auto;gap:9px;align-items:center;padding:11px 0;border-bottom:1px solid #edf2f7}
        .oppRow:last-of-type{border-bottom:0}
        .oppIcon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#edf4ff}
        .oppRow b{font-size:12px}
        .oppRow p{font-size:10px;color:#657189;margin:2px 0}
        .oppTag{display:inline-block;background:#e8f8ee;color:#168047;border-radius:6px;padding:3px 6px;font-size:9px}
        .oppGo{width:30px;height:30px;border:0;border-radius:50%;background:#edf4ff;color:#0c5bdd}
        .moreOpp{width:100%;margin-top:11px;min-height:38px;border:0;border-radius:8px;background:#0b62ef;color:#fff;font-weight:900}

        .trust{margin-top:12px;padding:15px 18px;display:grid;grid-template-columns:auto 1.2fr auto;align-items:center;gap:14px;background:linear-gradient(90deg,#edf4ff,#f4f7ff)}
        .trustIcon{width:50px;height:50px;border-radius:50%;display:grid;place-items:center;background:#0b62ef;color:#fff;font-size:25px}
        .trust h3{margin:0;font-size:16px}.trust p{margin:3px 0 0;font-size:11px;color:#4f5d74}
        .people{display:flex;align-items:center}
        .people img{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #fff;margin-left:-8px}
        .people img:first-child{margin-left:0}
        .peopleText{margin-left:12px;font-weight:900;font-size:12px}
        .viewTitle{display:none;padding:14px 16px;margin-bottom:12px}
        .viewTitle h2{margin:0}


        .moduleScreen{display:grid;gap:12px}
        .moduleHero{
          padding:20px;border-radius:15px;background:linear-gradient(135deg,#0b5ef0,#0a46b7);
          color:#fff;display:grid;grid-template-columns:64px 1fr auto;gap:16px;align-items:center;
          box-shadow:0 12px 28px rgba(11,94,240,.16)
        }
        .moduleHeroIcon{width:60px;height:60px;border-radius:18px;background:rgba(255,255,255,.16);display:grid;place-items:center;font-size:30px}
        .moduleHero h2{margin:0;font-size:24px}.moduleHero p{margin:5px 0 0;color:rgba(255,255,255,.88);line-height:1.5}
        .modulePrimary{border:0;border-radius:10px;background:#fff;color:#0a4cc7;min-height:42px;padding:0 16px;font-weight:900}
        .moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .moduleItem{padding:17px;min-height:138px;display:flex;flex-direction:column;justify-content:space-between}
        .moduleItem h3{margin:0 0 7px;font-size:16px}.moduleItem p{margin:0;color:#5b687e;line-height:1.5;font-size:13px}
        .moduleBadge{display:inline-block;margin-top:14px;align-self:flex-start;background:#e8f2ff;color:#0b5bdc;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:900}
        .moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .moduleActionCard{padding:18px}
        .moduleActionCard h3{margin:0 0 6px}.moduleActionCard p{margin:0 0 14px;color:#5a677c;font-size:13px;line-height:1.5}
        @media(max-width:900px){.moduleGrid{grid-template-columns:1fr}.moduleHero{grid-template-columns:54px 1fr}.modulePrimary{grid-column:1/-1}.moduleActions{grid-template-columns:1fr}}
        .toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:#071f49;color:#fff;padding:13px 18px;border-radius:12px;box-shadow:0 14px 38px rgba(0,0,0,.28);font-weight:800}

        @media(max-width:1200px){
          .content{grid-template-columns:1fr}.rightCol{display:grid;grid-template-columns:1fr 1fr;gap:12px}.opp{margin-top:0}
          .stats{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:900px){
          .top{grid-template-columns:1fr auto;padding:0 16px}.headTitle{display:none}.locationChip{display:none}
          .shell{grid-template-columns:84px 1fr}.side button{grid-template-columns:1fr;place-items:center;padding:0}.side button span:nth-child(2),.sideBadge{display:none}.assistantCard{display:none}
          .profile{grid-template-columns:100px 1fr}.profilePhoto{width:92px;height:92px}.profileBtns{grid-column:1/-1;grid-template-columns:repeat(3,1fr)}
          .midGrid,.bottomGrid{grid-template-columns:1fr}.rightCol{grid-template-columns:1fr}
        }
        @media(max-width:620px){
          .brand{font-size:22px}.brand small{display:none}.topActions .topIcon:nth-of-type(1){display:none}.userChip span{display:none}
          .content{padding:10px}.stats{grid-template-columns:1fr 1fr}.stat{padding:10px;grid-template-columns:40px 1fr}.statIcon{width:40px;height:40px}
          .profile{grid-template-columns:1fr;text-align:center}.profilePhoto{margin:auto}.meta,.tags{justify-content:center}.profileBtns{grid-template-columns:1fr}
          .shell{grid-template-columns:64px 1fr}.side{padding:10px 7px}.side .ico{font-size:18px}
          .trust{grid-template-columns:auto 1fr}.people{display:none}
        }
      `}</style>

      <header className="top">
        <button className="brand" onClick={() => go("/")} style={{border:0,background:"transparent",padding:0,textAlign:"left"}}>
          <span className="brandMark">W</span>
          <span>
            WorkCerca
            <small>Conectá, encontrá y hacé crecer<br/>tus ideas.</small>
          </span>
        </button>

        <div className="headTitle">
          <h1>Panel Profesional</h1>
          <p>Bienvenida, Mariana Rodríguez 👋</p>
        </div>

        <div className="topActions">
          <button className="locationChip" onClick={() => action("Ubicación profesional: Reconquista, Santa Fe.")}>📍 Reconquista, Santa Fe</button>
          <button className="topIcon" onClick={() => action("Búsqueda rápida del ecosistema WorkCerca.")}>⌕</button>
          <button className="topIcon" onClick={() => action("Tenés 3 notificaciones nuevas.")}>♧<span className="badge">3</span></button>
          <button className="topIcon" onClick={() => setActive("mensajes")}>💬<span className="badge">2</span></button>
          <button className="userChip" onClick={() => setActive("perfil")}>
            <img src="https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=250" alt="Perfil profesional" />
            <span>Mariana⌄</span>
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
                if (key === "empleo" || key === "oportunidades") action("La IA WorkCerca está preparando oportunidades compatibles.");
                if (key === "capacitaciones") action("Capacitaciones recomendadas según tu perfil profesional.");
              }}
            >
              <span className="ico">{icon}</span>
              <span>{label}</span>
              {badge ? <span className="sideBadge">{badge}</span> : <span />}
            </button>
          ))}

          <button
            onClick={() => go("/")}
            style={{marginTop:12,borderTop:"1px solid rgba(255,255,255,.15)",borderRadius:0}}
          >
            <span className="ico">←</span><span>Volver a Inicio</span><span/>
          </button>

          <div className="assistantCard">
            <b>✦ Asistente IA WorkCerca</b>
            <p>Tu asistente inteligente para conectar servicios, empleo, empresas, municipios e instituciones.</p>
          </div>
        </aside>

        <section className="content">
          <div className="mainCol">
            {active !== "panel" ? (
              <section className="moduleScreen">
                <div className="moduleHero">
                  <div className="moduleHeroIcon">{moduleScreens[active]?.icon || "•"}</div>
                  <div>
                    <h2>{moduleScreens[active]?.title || title}</h2>
                    <p>{moduleScreens[active]?.subtitle}</p>
                  </div>
                  <button
                    className="modulePrimary"
                    onClick={() => action(`${moduleScreens[active]?.primary}: acción preparada para conectar con Supabase y la IA WorkCerca.`)}
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
                    <h3>✦ IA WorkCerca</h3>
                    <p>
                      La IA analiza tu perfil, CV, ubicación y disponibilidad para relacionarte
                      con personas, empresas, municipios e instituciones cuando corresponda.
                    </p>
                    <button className="primaryBtn" onClick={() => action("IA WorkCerca: sugerencias actualizadas para esta sección.")}>
                      Ver sugerencias IA
                    </button>
                  </article>

                  <article className="card moduleActionCard">
                    <h3>🔗 Conexión con el ecosistema</h3>
                    <p>
                      Esta pantalla forma parte del mismo perfil profesional y comparte información
                      autorizada con el resto de WorkCerca según tus permisos.
                    </p>
                    <button className="outlineBtn" onClick={() => setActive("panel")}>Volver al Panel Profesional</button>
                  </article>
                </div>
              </section>
            ) : (
              <>
                <div className="stats">
              <article className="stat">
                <div className="statIcon">▰</div>
                <div><strong>3</strong><span>Solicitudes nuevas</span></div>
                <button onClick={() => setActive("solicitudes")}>Ver solicitudes</button>
              </article>
              <article className="stat">
                <div className="statIcon">📄</div>
                <div><strong>2</strong><span>Presupuestos pendientes</span></div>
                <button onClick={() => setActive("presupuestos")}>Ver presupuestos</button>
              </article>
              <article className="stat">
                <div className="statIcon">💼</div>
                <div><strong>2</strong><span>Trabajos activos</span></div>
                <button onClick={() => setActive("trabajos")}>Ver trabajos</button>
              </article>
              <article className="stat">
                <div className="statIcon">▦</div>
                <div><strong>5</strong><span>Eventos hoy</span></div>
                <button onClick={() => setActive("agenda")}>Ver agenda</button>
              </article>
            </div>

            <article className="card profile">
              <img className="profilePhoto" src="https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=350" alt="Mariana Rodríguez" />
              <div>
                <h2>Mariana Rodríguez <span className="verified">●</span></h2>
                <div className="role">Técnica Electricista Matriculada</div>
                <div className="meta">
                  <span>📍 Reconquista, Santa Fe</span>
                  <span>⭐ 4.9 (128 reseñas)</span>
                  <span className="verifyPill">◇ Verificado</span>
                </div>
                <div className="bio">
                  Más de 8 años de experiencia en instalaciones eléctricas domiciliarias, comerciales e industriales.
                  Trabajo responsable, seguro y garantizado.
                </div>
                <div className="tags">
                  <span className="tag">Electricidad</span>
                  <span className="tag">Instalaciones</span>
                  <span className="tag">Mantenimiento</span>
                  <span className="tag">Tableros</span>
                  <span className="tag">+3</span>
                </div>
              </div>
              <div className="profileBtns">
                <button className="primaryBtn" onClick={() => action("Vista pública del perfil profesional.")}>◉ Ver mi perfil público</button>
                <button className="outlineBtn" onClick={() => setActive("perfil")}>✎ Editar perfil</button>
                <button className="outlineBtn" onClick={() => setActive("cv")}>⇩ Descargar CV</button>
              </div>
            </article>

            <div className="midGrid">
              <article className="card panel">
                <div className="panelHead">
                  <h3>Resumen de actividad</h3>
                  <select className="select" defaultValue="7"><option value="7">Últimos 7 días</option><option value="30">Últimos 30 días</option></select>
                </div>
                <div className="chart">
                  <div className="gridLine"/><div className="gridLine"/><div className="gridLine"/><div className="gridLine"/><div className="gridLine"/>
                  <svg className="svgChart" viewBox="0 0 500 165" preserveAspectRatio="none">
                    <polyline points="10,120 80,95 150,35 220,72 290,25 360,68 420,86 490,48" fill="none" stroke="#0b62ef" strokeWidth="3"/>
                    <polyline points="10,140 80,122 150,78 220,108 290,67 360,91 420,79 490,80" fill="none" stroke="#7448e8" strokeWidth="3"/>
                    <polyline points="10,155 80,145 150,120 220,137 290,112 360,135 420,114 490,114" fill="none" stroke="#17a862" strokeWidth="3"/>
                  </svg>
                  <div className="legend">
                    <span><i className="dot" style={{background:"#0b62ef"}}/>Solicitudes</span>
                    <span><i className="dot" style={{background:"#17a862"}}/>Mensajes</span>
                    <span><i className="dot" style={{background:"#7448e8"}}/>Visitas a perfil</span>
                  </div>
                </div>
              </article>

              <article className="card panel availability">
                <span className="status">● {available ? "Disponible" : "No disponible"}</span>
                <h3 style={{marginTop:0}}>Disponibilidad</h3>
                <p>Estado actual<br/><span className="availableText">{available ? "Disponible" : "No disponible"}</span></p>
                <p>Tipo de trabajo<br/><b>Ambos (servicios y empleo)</b></p>
                <p>Radio de trabajo<br/><b>Hasta 30 km</b></p>
                <p>Horarios preferidos<br/><b>Lun a Vie: 8:00 - 18:00<br/>Sáb: 8:00 - 13:00</b></p>
                <button className="outlineBtn editAvail" onClick={() => {setAvailable(!available); action("Disponibilidad actualizada.");}}>◷ Editar disponibilidad</button>
              </article>
            </div>

            <div className="bottomGrid">
              <article className="card listPanel">
                <div className="panelHead"><h3>Solicitudes recientes</h3><button className="sectionLink" onClick={() => setActive("solicitudes")}>Ver todas</button></div>
                {requests.map((r) => (
                  <div className="row" key={r.title}>
                    <div>
                      <b><span className="newPill">NUEVA</span>{r.title}</b>
                      <small>{r.place} · A {r.distance}</small>
                    </div>
                    <div style={{textAlign:"right"}}><small>{r.time}</small><br/><button className="miniBtn" onClick={() => action(`Solicitud: ${r.title}`)}>Ver</button></div>
                  </div>
                ))}
                <button className="sectionLink" onClick={() => setActive("solicitudes")} style={{width:"100%",textAlign:"center",paddingTop:8}}>Ver todas las solicitudes</button>
              </article>

              <article className="card listPanel">
                <div className="panelHead"><h3>Mensajes recientes</h3><button className="sectionLink" onClick={() => setActive("mensajes")}>Ver todos</button></div>
                {messages.map((m) => (
                  <div className="messageRow" key={m.from}>
                    <span className="initials">{m.initials}</span>
                    <div><b>{m.from}</b><p>{m.text}</p></div>
                    <div className="msgTime">{m.time}{m.badge && <><br/><span className="tinyBadge">{m.badge}</span></>}</div>
                  </div>
                ))}
              </article>
            </div>

            <article className="card trust">
              <div className="trustIcon">🛡</div>
              <div>
                <h3>Confianza, seguridad y comunidad</h3>
                <p>Verificamos perfiles, cuidamos tu información y te conectamos con lo que realmente necesitás.</p>
              </div>
              <div className="people">
                {[
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120",
                  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120",
                  "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=120",
                  "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=120",
                ].map((src) => <img key={src} src={src} alt="" />)}
                <span className="peopleText">+ comunidad profesional<br/>WorkCerca</span>
              </div>
            </article>
              </>
            )}
          </div>

          <aside className="rightCol">
            <article className="card ai">
              <div className="aiTitle">
                <span className="aiTitleIcon">✦</span>
                <div><h3>Motor IA WorkCerca</h3><small>Sugerencias para vos</small></div>
              </div>

              <div className="aiBox">
                <div className="aiBoxHead"><span className="aiBoxIcon">👥</span><div><b>3 oportunidades de empleo</b><p>Empresas y organizaciones buscan profesionales como vos.</p></div></div>
                <button onClick={() => setActive("oportunidades")}>Ver oportunidades →</button>
              </div>

              <div className="aiBox">
                <div className="aiBoxHead"><span className="aiBoxIcon">🎯</span><div><b>4 solicitudes compatibles</b><p>Coinciden con tu perfil, ubicación y disponibilidad.</p></div></div>
                <button onClick={() => setActive("solicitudes")}>Ver solicitudes →</button>
              </div>

              <div className="aiBox">
                <div className="aiBoxHead"><span className="aiBoxIcon">🎓</span><div><b>Capacitación recomendada</b><p>Curso de Instalaciones Industriales. Alta demanda en tu zona.</p></div></div>
                <button onClick={() => setActive("capacitaciones")}>Ver capacitación →</button>
              </div>

              <div className="aiBox">
                <div className="aiBoxHead"><span className="aiBoxIcon">📈</span><div><b>Mejorá tu visibilidad</b><p>Completá tu perfil y CV para aumentar coincidencias.</p></div></div>
                <button onClick={() => setActive("perfil")}>Completar perfil →</button>
              </div>

              <button className="askAI" onClick={() => action("Asistente IA WorkCerca listo para ayudarte.")}>✦ Preguntar a la IA</button>
            </article>

            <article className="card opp">
              <div className="panelHead"><h3>Oportunidades cerca tuyo</h3><button className="sectionLink" onClick={() => setActive("oportunidades")}>Ver todas</button></div>
              {opportunities.map((o) => (
                <div className="oppRow" key={o.title + o.org}>
                  <span className="oppIcon">{o.icon}</span>
                  <div><b>{o.title}</b><p>{o.org}</p><p>{o.meta} · <span className="oppTag">{o.tag}</span></p></div>
                  <button className="oppGo" onClick={() => action(`${o.org}: oportunidad sugerida por WorkCerca IA.`)}>›</button>
                </div>
              ))}
              <button className="moreOpp" onClick={() => setActive("oportunidades")}>⌕ Buscar más oportunidades</button>
            </article>
          </aside>
        </section>
      </div>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
