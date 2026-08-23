"use client";

import { useMemo, useState } from "react";

const sidebar = [
  ["⌂", "Panel Municipio", "panel"],
  ["🏛️", "Perfil del Municipio", "perfil"],
  ["🌐", "Red de Municipios", "red"],
  ["💼", "Empleo y Convocatorias", "empleo", "8"],
  ["👷", "Profesionales", "profesionales"],
  ["🚀", "Emprendedores", "emprendedores"],
  ["🏢", "Empresas", "empresas"],
  ["🏫", "Instituciones", "instituciones"],
  ["🤝", "Pasantías", "pasantias"],
  ["🎓", "Capacitaciones", "capacitaciones"],
  ["🎁", "Programas y Beneficios", "programas"],
  ["🚨", "Emergencias 24/7", "emergencias"],
  ["🔗", "Proveedores", "proveedores"],
  ["💬", "Mensajes", "mensajes", "3"],
  ["📅", "Agenda", "agenda"],
  ["🎥", "Videollamadas", "videollamadas"],
  ["⚡", "Oportunidades", "oportunidades"],
  ["📊", "Estadísticas / Observatorio", "observatorio"],
  ["✦", "IA WorkCerca", "ia"],
  ["⚙️", "Configuración", "configuracion"],
];

const moduleScreens: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  primary: string;
  items: { title: string; text: string; badge?: string }[];
}> = {
  perfil: {
    title: "Perfil del Municipio",
    subtitle: "Administrá la identidad pública del municipio, sus áreas, servicios y canales de contacto.",
    icon: "🏛️",
    primary: "Editar perfil municipal",
    items: [
      { title: "Municipio de Reconquista", text: "Santa Fe · Perfil institucional dentro de WorkCerca.", badge: "Verificado" },
      { title: "Áreas vinculadas", text: "Empleo, producción, educación, desarrollo social, emergencias y atención ciudadana." },
      { title: "Canales oficiales", text: "Teléfonos, correo, WhatsApp institucional y enlaces oficiales." },
    ],
  },
  red: {
    title: "Red de Municipios",
    subtitle: "Conectá, compartí y colaborá con otros municipios de la región.",
    icon: "🌐",
    primary: "Ver red completa",
    items: [
      { title: "Municipios conectados", text: "Avellaneda, Malabrigo, Vera, San Javier y localidades de la región.", badge: "Red activa" },
      { title: "Convocatorias conjuntas", text: "Proyectos y oportunidades que pueden abarcar más de una localidad." },
      { title: "Intercambio regional", text: "Compartir capacitaciones, programas, experiencias, talento y proveedores." },
    ],
  },
  empleo: {
    title: "Empleo y Convocatorias",
    subtitle: "Publicá oportunidades y acercá posibilidades laborales a la comunidad.",
    icon: "💼",
    primary: "Publicar convocatoria",
    items: [
      { title: "Técnico en mantenimiento", text: "Empresa regional · Reconquista · 8 vacantes", badge: "Nueva" },
      { title: "Enfermería / Profesional", text: "Institución de salud · Convocatoria abierta", badge: "Activa" },
      { title: "Primer empleo", text: "Oportunidades para personas sin experiencia previa." },
    ],
  },
  profesionales: {
    title: "Profesionales",
    subtitle: "Consultá perfiles profesionales disponibles y necesidades del territorio.",
    icon: "👷",
    primary: "Buscar profesionales",
    items: [
      { title: "Talento disponible", text: "Profesionales registrados en Reconquista y localidades cercanas.", badge: "IA sugerida" },
      { title: "Perfiles más buscados", text: "Electricidad, soldadura, choferes, enfermería y mantenimiento." },
      { title: "Disponibilidad", text: "La IA puede priorizar perfiles compatibles según ubicación y necesidad." },
    ],
  },
  emprendedores: {
    title: "Emprendedores",
    subtitle: "Visualizá emprendimientos locales, programas, ferias y oportunidades de crecimiento.",
    icon: "🚀",
    primary: "Buscar emprendedores",
    items: [
      { title: "Emprendimientos locales", text: "Productos y servicios activos dentro del ecosistema." },
      { title: "Ferias y rondas de negocio", text: "Convocatorias para visibilidad, comercialización y alianzas." },
      { title: "Acompañamiento", text: "Capacitaciones, programas y beneficios sugeridos según actividad." },
    ],
  },
  empresas: {
    title: "Empresas",
    subtitle: "Conectá necesidades empresariales con talento, proveedores, capacitaciones y oportunidades locales.",
    icon: "🏢",
    primary: "Ver empresas",
    items: [
      { title: "Empresas activas", text: "Organizaciones registradas en la zona.", badge: "128 activas" },
      { title: "Necesidades de personal", text: "Vacantes, perfiles requeridos y oportunidades detectadas." },
      { title: "Desarrollo local", text: "Conexión con profesionales, emprendedores, proveedores e instituciones." },
    ],
  },
  instituciones: {
    title: "Instituciones",
    subtitle: "Articulá con instituciones educativas, de formación, salud y organizaciones de la comunidad.",
    icon: "🏫",
    primary: "Ver instituciones",
    items: [
      { title: "Instituciones de formación", text: "Cursos, talleres y capacitaciones disponibles." },
      { title: "Centros educativos", text: "Posibles alianzas para prácticas, pasantías y formación." },
      { title: "Instituciones comunitarias", text: "Programas, servicios y proyectos de impacto local." },
    ],
  },
  pasantias: {
    title: "Pasantías",
    subtitle: "Conectá jóvenes, instituciones, empresas y municipio para generar experiencia real.",
    icon: "🤝",
    primary: "Crear oportunidad de pasantía",
    items: [
      { title: "Pasantías disponibles", text: "Oportunidades detectadas por empresas e instituciones.", badge: "IA" },
      { title: "Jóvenes compatibles", text: "Perfiles con formación e intereses relacionados con cada oportunidad." },
      { title: "Camino a la experiencia", text: "Capacitación → pasantía → experiencia → oportunidad laboral." },
    ],
  },
  capacitaciones: {
    title: "Capacitaciones",
    subtitle: "Detectá brechas de habilidades y acercá formación pertinente a la comunidad.",
    icon: "🎓",
    primary: "Crear capacitación",
    items: [
      { title: "Instalaciones eléctricas", text: "Alta demanda detectada en la zona.", badge: "Recomendada por IA" },
      { title: "Soldadura básica", text: "Capacitación vinculada a demanda industrial." },
      { title: "Herramientas digitales", text: "Formación para empleo, emprendimientos y gestión." },
    ],
  },
  programas: {
    title: "Programas y Beneficios",
    subtitle: "Centralizá programas municipales, institucionales y beneficios disponibles para la comunidad.",
    icon: "🎁",
    primary: "Crear programa",
    items: [
      { title: "Programa Primer Empleo", text: "Apoyo a personas que buscan su primera experiencia laboral.", badge: "Activo" },
      { title: "Programa Emprender Local", text: "Acompañamiento a emprendimientos de la comunidad.", badge: "Activo" },
      { title: "Beneficios para Empresas", text: "Herramientas, formación y articulación para empresas locales." },
    ],
  },
  emergencias: {
    title: "Emergencias 24/7",
    subtitle: "Acceso rápido a información, alertas y canales de asistencia cuando la situación lo requiera.",
    icon: "🚨",
    primary: "Crear alerta o aviso",
    items: [
      { title: "Alertas activas", text: "Información oficial visible para la comunidad.", badge: "Prioridad" },
      { title: "Servicios de emergencia", text: "Canales y recursos disponibles según el territorio." },
      { title: "Comunicación rápida", text: "Mensajes y avisos coordinados cuando corresponda." },
    ],
  },
  proveedores: {
    title: "Proveedores",
    subtitle: "Encontrá proveedores locales y regionales para obras, servicios, programas y necesidades institucionales.",
    icon: "🔗",
    primary: "Buscar proveedores",
    items: [
      { title: "Proveedores locales", text: "Servicios e insumos registrados dentro de WorkCerca." },
      { title: "Comparar opciones", text: "Ubicación, disponibilidad, reputación y condiciones." },
      { title: "Red regional", text: "Ampliá la búsqueda a municipios conectados cuando sea útil." },
    ],
  },
  mensajes: {
    title: "Mensajes",
    subtitle: "Centralizá conversaciones con personas, profesionales, empresas, instituciones y otros municipios.",
    icon: "💬",
    primary: "Nuevo mensaje",
    items: [
      { title: "Empresa regional", text: "Consulta por perfiles técnicos disponibles.", badge: "Nuevo" },
      { title: "Institución educativa", text: "Propuesta de capacitación conjunta." },
      { title: "Municipio vecino", text: "Invitación a convocatoria regional." },
    ],
  },
  agenda: {
    title: "Agenda",
    subtitle: "Organizá reuniones, eventos, capacitaciones, ferias y videollamadas.",
    icon: "📅",
    primary: "Agregar evento",
    items: [
      { title: "Feria de emprendedores", text: "20 Mayo · Plaza Central · 10:00" },
      { title: "Capacitación soldadura básica", text: "22 Mayo · Centro de Formación · 14:00" },
      { title: "Ronda de negocios regional", text: "24 Mayo · Predio Ferial · 09:00" },
    ],
  },
  videollamadas: {
    title: "Videollamadas",
    subtitle: "Reuniones remotas con empresas, instituciones, profesionales y municipios de la red.",
    icon: "🎥",
    primary: "Programar videollamada",
    items: [
      { title: "Empresa del Norte", text: "Reunión por necesidad de perfiles técnicos.", badge: "Hoy" },
      { title: "Institución de Formación", text: "Coordinación de nueva capacitación." },
      { title: "Red de Municipios", text: "Encuentro regional de programas y oportunidades." },
    ],
  },
  oportunidades: {
    title: "Oportunidades",
    subtitle: "Unificá empleo, proyectos, capacitaciones, pasantías y oportunidades regionales.",
    icon: "⚡",
    primary: "Actualizar oportunidades IA",
    items: [
      { title: "Vacantes laborales", text: "Empresas y organizaciones buscan perfiles de la zona.", badge: "IA" },
      { title: "Convocatorias regionales", text: "Oportunidades compartidas por otros municipios.", badge: "Red" },
      { title: "Pasantías y formación", text: "Opciones para generar experiencia y reducir brechas." },
    ],
  },
  observatorio: {
    title: "Estadísticas / Observatorio",
    subtitle: "Convertí información del ecosistema en señales útiles para tomar mejores decisiones.",
    icon: "📊",
    primary: "Ver informe completo",
    items: [
      { title: "Talento y oportunidades locales", text: "Personas disponibles, empleo, estudiantes y emprendedores." },
      { title: "Brechas detectadas", text: "Perfiles con alta demanda y baja disponibilidad local.", badge: "IA" },
      { title: "Impacto", text: "Capacitaciones, empleos, pasantías y emprendimientos acompañados." },
    ],
  },
  ia: {
    title: "IA WorkCerca",
    subtitle: "El motor que relaciona necesidades, personas, capacidades y oportunidades sin decidir por los actores.",
    icon: "✦",
    primary: "Ver sugerencias completas",
    items: [
      { title: "Detectar oportunidades", text: "Relaciona empresas, personas, instituciones y programas." },
      { title: "Detectar brechas", text: "Identifica capacidades que faltan y sugiere formación pertinente." },
      { title: "Conectar la red", text: "Sugiere colaboración entre municipios cuando puede reducir distancias." },
    ],
  },
  configuracion: {
    title: "Configuración",
    subtitle: "Administrá permisos, privacidad, notificaciones, usuarios y preferencias del módulo municipal.",
    icon: "⚙️",
    primary: "Guardar configuración",
    items: [
      { title: "Permisos", text: "Definí qué áreas y usuarios pueden acceder a cada herramienta." },
      { title: "Privacidad", text: "Controlá qué información institucional se comparte." },
      { title: "Notificaciones", text: "Alertas, convocatorias, mensajes, agenda y oportunidades." },
    ],
  },
};

const opportunities = [
  { icon: "🏭", title: "Técnico en Mantenimiento Industrial", org: "Empresa Metalúrgica del Norte", meta: "Reconquista · 8 vacantes", tag: "Nueva" },
  { icon: "🏛️", title: "Pasantía en Administración", org: "Municipio de Reconquista", meta: "Reconquista · 4 vacantes", tag: "Pasantía" },
  { icon: "🏥", title: "Enfermero/a Profesional", org: "Institución de Salud", meta: "Reconquista · 3 vacantes", tag: "Nueva" },
  { icon: "🎓", title: "Capacitación: Instalaciones Eléctricas", org: "Centro de Formación Técnica", meta: "Reconquista · 30 cupos", tag: "Capacitación" },
];

export default function MunicipiosPage() {
  const [active, setActive] = useState("panel");
  const [notice, setNotice] = useState("");

  const currentTitle = useMemo(() => {
    const found = sidebar.find((item) => item[2] === active);
    return found?.[1] || "Panel Municipio";
  }, [active]);

  const action = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const go = (path: string) => {
    window.location.href = path;
  };

  return (
    <main className="muniApp">
      <style>{`
        :root{
          --navy:#061a36;
          --navy2:#08254b;
          --panel:#0e2d57;
          --panel2:#123a6c;
          --line:#234b77;
          --blue:#2476ef;
          --blue2:#0d5fd9;
          --green:#2bc46f;
          --purple:#8d63e8;
          --orange:#f39a25;
          --red:#ef5757;
          --text:#f8fbff;
          --muted:#a8bdd3;
        }
        *{box-sizing:border-box}
        html,body{margin:0;background:var(--navy);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text)}
        button,input{font:inherit}
        button{cursor:pointer}
        .muniApp{
          min-height:100vh;
          background:
            radial-gradient(circle at 74% 4%,rgba(36,118,239,.12),transparent 28%),
            linear-gradient(180deg,#06172f,#082144 100%)
        }
        .top{
          min-height:82px;
          display:grid;
          grid-template-columns:290px 1fr auto;
          align-items:center;
          gap:20px;
          padding:0 24px;
          border-bottom:1px solid rgba(255,255,255,.08);
          background:rgba(5,21,44,.96);
          backdrop-filter:blur(12px);
          position:sticky;top:0;z-index:60;
        }
        .brand{display:flex;align-items:center;gap:11px;border:0;background:transparent;color:#fff;padding:0;text-align:left}
        .brandMark{width:46px;height:46px;border-radius:18px 18px 23px 23px;background:linear-gradient(145deg,#1b75ff,#0f4eaa);display:grid;place-items:center;font-weight:1000;font-size:23px;box-shadow:0 10px 24px rgba(36,118,239,.2)}
        .brand strong{font-size:27px}.brand small{display:block;color:#a9bfd7;font-size:10px;margin-top:1px}
        .head h1{margin:0;font-size:24px}.head p{margin:3px 0 0;color:#bdcbe0}
        .topActions{display:flex;gap:10px;align-items:center}
        .chip,.iconBtn,.userBtn{border:1px solid rgba(255,255,255,.12);background:#0c2a52;color:#fff;border-radius:11px;min-height:40px}
        .chip{padding:0 13px;font-weight:800}.iconBtn{width:40px;position:relative}
        .badgeTop{position:absolute;top:-5px;right:-3px;background:#ef4b4b;color:#fff;border-radius:999px;min-width:18px;height:18px;display:grid;place-items:center;font-size:9px;font-weight:900}
        .userBtn{display:flex;align-items:center;gap:9px;padding:0 11px}
        .seal{width:32px;height:32px;border-radius:50%;background:#fff;color:#0d4d98;display:grid;place-items:center;font-weight:1000}

        .shell{display:grid;grid-template-columns:290px minmax(0,1fr);min-height:calc(100vh - 82px)}
        .side{
          background:linear-gradient(180deg,#051630,#082447 68%,#0a2c56);
          border-right:1px solid rgba(255,255,255,.07);
          padding:14px 12px 22px;
          position:sticky;top:82px;height:calc(100vh - 82px);overflow:auto
        }
        .side button{
          width:100%;min-height:43px;border:0;border-radius:9px;background:transparent;color:#eef5ff;
          display:grid;grid-template-columns:28px 1fr auto;align-items:center;gap:8px;text-align:left;padding:0 11px;font-size:13px
        }
        .side button:hover{background:rgba(255,255,255,.06)}
        .side button.active{background:linear-gradient(90deg,#2274ed,#1456c9);box-shadow:0 9px 20px rgba(15,78,173,.22);font-weight:1000}
        .sideBadge{min-width:23px;height:23px;border-radius:999px;background:#285fa9;color:#fff;display:grid;place-items:center;padding:0 6px;font-size:10px;font-weight:900}
        .support{margin-top:18px;border:1px solid rgba(255,255,255,.11);border-radius:14px;padding:14px;background:#0d2d57}
        .support b{display:block}.support p{font-size:10px;line-height:1.45;color:#adc0d6}.support button{display:block;min-height:38px;margin-top:9px;background:#1c6dde;text-align:center}

        .content{padding:15px;display:grid;grid-template-columns:minmax(0,1fr) 325px;gap:13px}
        .mainCol,.rightCol{min-width:0}

        .hero{
          min-height:310px;border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden;position:relative;
          background:linear-gradient(90deg,rgba(4,18,39,.94),rgba(4,18,39,.72) 45%,rgba(4,18,39,.18)),
          url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=88") center/cover no-repeat;
          box-shadow:0 18px 42px rgba(0,0,0,.25)
        }
        .hero::after{
          content:"RECONQUISTA";
          position:absolute;right:24px;bottom:20px;
          font-size:clamp(44px,6vw,88px);
          font-weight:1000;letter-spacing:-.05em;color:rgba(255,255,255,.24);
          text-shadow:0 5px 20px rgba(0,0,0,.24)
        }
        .lapacho{display:none;
          position:absolute;bottom:0;width:130px;height:120px;border-radius:60% 60% 10px 10px;
          background:
            radial-gradient(circle at 25% 20%,#ff86bf 0 13%,transparent 14%),
            radial-gradient(circle at 60% 16%,#ff74b4 0 14%,transparent 15%),
            radial-gradient(circle at 48% 38%,#ff8ac3 0 15%,transparent 16%),
            radial-gradient(circle at 76% 38%,#ff6dad 0 12%,transparent 13%),
            radial-gradient(circle at 30% 53%,#ff9acb 0 12%,transparent 13%);
          filter:drop-shadow(0 10px 18px rgba(0,0,0,.2))
        }
        .lapacho::before{content:"";position:absolute;left:61px;bottom:-5px;width:8px;height:78px;background:#4d3429;border-radius:999px}
        .lapacho.l1{left:20px}.lapacho.l2{left:155px;transform:scale(.88)}.lapacho.l3{right:160px;transform:scale(.92)}.lapacho.l4{right:25px;transform:scale(.8)}
        .heroContent{position:relative;z-index:2;padding:24px;width:min(620px,62%)}
        .heroContent h2{font-size:28px;margin:0 0 8px}.heroContent p{margin:0;color:#d4e0ef;line-height:1.55}
        .quote{margin-top:24px;background:rgba(4,20,43,.68);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:13px 15px;font-size:13px;line-height:1.45}

        .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:11px}
        .stat{border:1px solid var(--line);border-radius:13px;padding:14px;background:linear-gradient(145deg,#0e2a52,#0c274a);min-height:112px}
        .statIcon{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-size:20px;margin-bottom:8px}
        .stat:nth-child(1) .statIcon{background:#154b91}.stat:nth-child(2) .statIcon{background:#145c43}.stat:nth-child(3) .statIcon{background:#493677}.stat:nth-child(4) .statIcon{background:#734313}.stat:nth-child(5) .statIcon{background:#135c5b}
        .stat strong{display:block;font-size:25px}.stat small{color:#adbed2}.stat button{border:0;background:transparent;color:#6ba8ff;padding:7px 0 0;font-size:10px;font-weight:900}

        .card{border:1px solid var(--line);background:linear-gradient(145deg,#0e2d57,#0c284d);border-radius:14px;box-shadow:0 9px 22px rgba(0,0,0,.12)}
        .needs{margin-top:11px;padding:14px}
        .panelHead{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}.panelHead h3{margin:0;font-size:15px}.link{border:0;background:transparent;color:#6ba8ff;font-weight:900;font-size:10px}
        .needsGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
        .needBox{border:1px solid #254b76;border-radius:11px;padding:12px;background:#0d294f;min-height:130px}
        .needBox h4{margin:0 0 6px;font-size:12px}.needBox p,.needBox li{font-size:10px;color:#aabbd0;line-height:1.45}.needBox ul{margin:6px 0 0;padding-left:16px}.needBox button{margin-top:9px;border:1px solid #3c74ae;background:#0d2f5a;color:#fff;border-radius:7px;padding:6px 9px;font-size:9px;font-weight:900}

        .lower{display:grid;grid-template-columns:1.1fr .9fr;gap:11px;margin-top:11px}
        .oppList{padding:13px}
        .oppRow{display:grid;grid-template-columns:38px 1fr auto;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07)}
        .oppIcon{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#173d6b}.oppRow b{font-size:11px}.oppRow p{margin:2px 0;color:#9fb3cb;font-size:9px}.tag{display:inline-block;border-radius:6px;padding:3px 6px;background:#17456f;color:#8cc4ff;font-size:8px;font-weight:900}.mini{border:1px solid #4c73a0;background:#102e56;color:#fff;border-radius:7px;padding:5px 8px;font-size:9px}
        .talent{padding:14px;text-align:center}.donut{width:170px;height:170px;border-radius:50%;margin:9px auto;background:conic-gradient(#2b88f2 0 45%,#31b96a 45% 75%,#8d63e8 75% 90%,#f0a02a 90%);display:grid;place-items:center}.donutInner{width:100px;height:100px;border-radius:50%;background:#0d294f;display:grid;place-items:center}.donutInner strong{font-size:28px}.talentLegend{display:grid;gap:5px;text-align:left;font-size:10px;color:#b0c0d4}.legendDot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px}

        .communityVisuals{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:11px;margin-top:11px}
        .communityPhoto{min-height:175px;border-radius:16px;overflow:hidden;position:relative;border:1px solid rgba(255,255,255,.11);background-size:cover;background-position:center;box-shadow:0 12px 28px rgba(0,0,0,.16)}
        .communityPhoto::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 25%,rgba(3,17,36,.92))}
        .communityPhotoText{position:absolute;z-index:2;left:15px;right:15px;bottom:14px}.communityPhotoText b{display:block;font-size:13px}.communityPhotoText span{display:block;margin-top:4px;color:#d1deeb;font-size:9px;line-height:1.4}
        .photoWork{background-image:url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85")}
        .photoTraining{background-image:url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85")}
        .photoLocal{background-image:url("https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85")}
        .network{margin-top:11px;padding:14px}
        .municipios{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
        .muni{width:68px;text-align:center;font-size:9px;color:#b5c4d5}.muniIcon{width:48px;height:48px;margin:0 auto 5px;border-radius:50%;display:grid;place-items:center;background:#173f70;border:1px solid #3f6f9f;font-size:21px}
        .netActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}.netActions button{border:1px solid #3e6c98;background:#102f58;color:#fff;border-radius:7px;padding:6px 8px;font-size:9px;font-weight:800}

        .programs{margin-top:11px;padding:13px}
        .programRow{display:grid;grid-template-columns:1fr auto;gap:10px;padding:9px 0;border-bottom:1px solid rgba(255,255,255,.07)}.programRow:last-child{border-bottom:0}.programRow b{font-size:11px}.programRow small{display:block;color:#9fb1c9}.status{align-self:center;color:#48de8a;font-size:9px;font-weight:900}

        .bottomGrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:11px;margin-top:11px}
        .simple{padding:13px}.simpleRow{padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07)}.simpleRow:last-child{border-bottom:0}.simpleRow b{font-size:11px}.simpleRow small{display:block;color:#9fb1c9;margin-top:2px}

        .ai{padding:14px}
        .aiHead{display:flex;gap:9px;align-items:center}.aiOrb{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#1e6fe5;font-size:22px}
        .ai h3{margin:0}.ai small{color:#9eb2cb}
        .aiBox{margin-top:9px;border:1px solid #2b507d;border-radius:11px;padding:11px;background:#0b284f}.aiBox b{font-size:11px}.aiBox p{font-size:10px;color:#aabbd0;line-height:1.45;margin:4px 0 0}.aiBox button{border:0;background:transparent;color:#73b1ff;padding:7px 0 0;font-size:9px;font-weight:900}
        .ask{width:100%;margin-top:10px;min-height:38px;border:0;border-radius:8px;background:#1d6fde;color:#fff;font-weight:1000}

        .quick{padding:13px;margin-top:11px}.quick button{width:100%;min-height:37px;border:0;border-bottom:1px solid rgba(255,255,255,.07);background:transparent;color:#eaf3ff;display:flex;justify-content:space-between;align-items:center;font-size:10px}.quick button:last-child{border-bottom:0}

        .impact{padding:13px;margin-top:11px}.impactGrid{display:grid;grid-template-columns:1fr 1fr;gap:9px}.impactBox{border:1px solid #274f7b;border-radius:10px;padding:10px;background:#0c294f}.impactBox strong{font-size:19px;color:#70b5ff}.impactBox span{display:block;font-size:9px;color:#aabbd0;margin-top:2px}

        .moduleScreen{display:grid;gap:11px}
        .moduleHero{padding:18px;border-radius:14px;background:linear-gradient(135deg,#1f73e7,#174caa);color:#fff;display:grid;grid-template-columns:58px 1fr auto;gap:14px;align-items:center}
        .moduleHeroIcon{width:56px;height:56px;border-radius:16px;background:rgba(255,255,255,.12);display:grid;place-items:center;font-size:29px}
        .moduleHero h2{margin:0;font-size:23px}.moduleHero p{margin:4px 0 0;font-size:12px;line-height:1.45;color:#dbe9fb}.modulePrimary{border:0;border-radius:9px;background:#fff;color:#0d4fae;min-height:40px;padding:0 14px;font-weight:900}
        .moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.moduleItem{padding:16px;min-height:135px;display:flex;flex-direction:column;justify-content:space-between}.moduleItem h3{margin:0 0 6px;font-size:15px}.moduleItem p{margin:0;color:#aebfd2;font-size:11px;line-height:1.5}.moduleBadge{align-self:flex-start;margin-top:13px;background:#174471;color:#8fc6ff;border-radius:999px;padding:4px 7px;font-size:9px;font-weight:900}
        .moduleActions{display:grid;grid-template-columns:1fr 1fr;gap:11px}.moduleActionCard{padding:16px}.moduleActionCard h3{margin:0 0 5px}.moduleActionCard p{margin:0 0 13px;color:#aabbd0;font-size:11px;line-height:1.5}.primaryBtn,.outlineBtn{min-height:39px;border-radius:8px;font-weight:900}.primaryBtn{border:1px solid #2c7df0;background:#2476ef;color:#fff}.outlineBtn{border:1px solid #3b6798;background:#0e2d57;color:#fff}

        .footer{margin-top:11px;border:1px solid #214a78;background:linear-gradient(90deg,#0d3260,#0c284d);border-radius:13px;padding:13px 16px;display:flex;justify-content:space-between;align-items:center}.footer b{font-size:13px}.footer span{font-size:10px;color:#aabbd0}
        .toast{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:999;background:#1c6fde;color:#fff;padding:13px 17px;border-radius:11px;font-weight:1000;box-shadow:0 14px 38px rgba(0,0,0,.3)}

        @media(max-width:1200px){
          .content{grid-template-columns:1fr}.rightCol{display:grid;grid-template-columns:1fr 1fr;gap:11px}.quick,.impact{margin-top:0}.stats{grid-template-columns:repeat(3,1fr)}
        }
        @media(max-width:900px){
          .top{grid-template-columns:1fr auto}.head{display:none}.chip{display:none}
          .shell{grid-template-columns:80px 1fr}.side button{grid-template-columns:1fr;place-items:center}.side button span:nth-child(2),.sideBadge{display:none}.support{display:none}
          .stats{grid-template-columns:repeat(2,1fr)}.lower,.bottomGrid{grid-template-columns:1fr}.needsGrid{grid-template-columns:1fr}.moduleGrid{grid-template-columns:1fr}.moduleActions{grid-template-columns:1fr}
        }
        @media(max-width:620px){
          .top{padding:0 12px}.brand strong{font-size:21px}.brand small{display:none}.userBtn span:last-child{display:none}
          .shell{grid-template-columns:62px 1fr}.content{padding:9px}.stats{grid-template-columns:1fr 1fr}.rightCol{grid-template-columns:1fr}
          .heroContent{width:100%}.hero::after{font-size:43px}.moduleHero{grid-template-columns:50px 1fr}.modulePrimary{grid-column:1/-1}.footer{display:grid;gap:5px}
        }
      `}</style>

      <header className="top">
        <button className="brand" onClick={() => go("/")}>
          <span className="brandMark">W</span>
          <span><strong>WorkCerca</strong><small>Acerca posibilidades, crea futuro.</small></span>
        </button>

        <div className="head">
          <h1>Panel Municipio</h1>
          <p>Centro de herramientas y oportunidades para el desarrollo local.</p>
        </div>

        <div className="topActions">
          <button className="chip" onClick={() => action("Municipio de Reconquista · Santa Fe")}>📍 Reconquista, Santa Fe</button>
          <button className="iconBtn" onClick={() => action("Tenés 8 notificaciones nuevas.")}>🔔<span className="badgeTop">8</span></button>
          <button className="iconBtn" onClick={() => setActive("mensajes")}>💬<span className="badgeTop">3</span></button>
          <button className="userBtn" onClick={() => setActive("perfil")}><span className="seal">R</span><span>Municipio de Reconquista</span></button>
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
                if (key === "ia") action("Motor IA WorkCerca: sugerencias para desarrollo local.");
                if (key === "red") action("Red de Municipios: conexiones regionales actualizadas.");
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {badge ? <span className="sideBadge">{badge}</span> : <span/>}
            </button>
          ))}

          <button onClick={() => go("/")} style={{marginTop:10,borderTop:"1px solid rgba(255,255,255,.08)",borderRadius:0}}>
            <span>←</span><span>Volver a Inicio</span><span/>
          </button>

          <div className="support">
            <b>¿Necesitás ayuda?</b>
            <p>WorkCerca acompaña al municipio con herramientas, información y conexiones; nunca impone decisiones.</p>
            <button onClick={() => action("Soporte WorkCerca listo para ayudarte.")}>Contactar soporte</button>
          </div>
        </aside>

        <section className="content">
          <div className="mainCol">
            {active === "panel" ? (
              <>
                <section className="hero">
                  <div className="lapacho l1"/><div className="lapacho l2"/><div className="lapacho l3"/><div className="lapacho l4"/>
                  <div className="heroContent">
                    <div style={{display:"inline-block",marginBottom:12,padding:"7px 10px",border:"1px solid rgba(255,255,255,.25)",borderRadius:999,background:"rgba(5,24,50,.58)",fontSize:10,fontWeight:900}}>📍 RECONQUISTA · SANTA FE · COMUNIDAD CONECTADA</div>
                    <h2>¡Bienvenido, Municipio de Reconquista! 👋</h2>
                    <p>WorkCerca te brinda herramientas para acercar oportunidades, desarrollar capacidades y fortalecer la comunidad.</p>
                    <div style={{display:"flex",gap:9,flexWrap:"wrap",marginTop:16}}>
                      <button onClick={() => setActive("oportunidades")} style={{border:0,borderRadius:9,padding:"10px 13px",background:"#2476ef",color:"#fff",fontWeight:900}}>Ver oportunidades locales</button>
                      <button onClick={() => setActive("ia")} style={{border:"1px solid rgba(255,255,255,.35)",borderRadius:9,padding:"10px 13px",background:"rgba(5,24,50,.55)",color:"#fff",fontWeight:900}}>✦ Consultar IA WorkCerca</button>
                    </div>
                    <div className="quote">“Conectamos personas, capacidades y oportunidades para impulsar el desarrollo local y regional.”</div>
                  </div>
                </section>

                <div className="stats">
                  {[
                    ["👥","2.458","Personas conectadas","perfil"],
                    ["💼","153","Oportunidades activas","empleo"],
                    ["🎓","37","Capacitaciones disponibles","capacitaciones"],
                    ["🏢","128","Empresas activas","empresas"],
                    ["📊","62","Programas y beneficios","programas"],
                  ].map(([i,n,t,key]) => (
                    <article className="stat" key={t}>
                      <span className="statIcon">{i}</span>
                      <strong>{n}</strong><small>{t}</small>
                      <button onClick={() => setActive(key)}>Ver más →</button>
                    </article>
                  ))}
                </div>

                <section className="communityVisuals">
                  <article className="communityPhoto photoWork"><div className="communityPhotoText"><b>Trabajo y producción local</b><span>Empresas, profesionales, oficios y oportunidades de la comunidad.</span></div></article>
                  <article className="communityPhoto photoTraining"><div className="communityPhotoText"><b>Formación con salida real</b><span>Capacitaciones vinculadas a necesidades y brechas detectadas.</span></div></article>
                  <article className="communityPhoto photoLocal"><div className="communityPhotoText"><b>Emprendedores y empresas</b><span>Visibilidad, redes y posibilidades de crecimiento local.</span></div></article>
                </section>

                <article className="card needs">
                  <div className="panelHead"><h3>Necesidades y oportunidades locales</h3><button className="link" onClick={() => setActive("observatorio")}>Ver todas →</button></div>
                  <div className="needsGrid">
                    <div className="needBox">
                      <h4>🔎 Perfiles más buscados</h4>
                      <ul><li>Técnicos eléctricos</li><li>Soldadores</li><li>Choferes</li><li>Enfermeros/as</li></ul>
                      <button onClick={() => setActive("profesionales")}>Ver detalle</button>
                    </div>
                    <div className="needBox">
                      <h4>👥 Talento disponible</h4>
                      <p>620 profesionales · 810 personas buscando empleo · 136 jóvenes primer empleo · 292 emprendedores.</p>
                      <button onClick={() => setActive("profesionales")}>Ver detalle</button>
                    </div>
                    <div className="needBox">
                      <h4>⚠️ Brechas de talento</h4>
                      <p>Perfiles con alta demanda y baja disponibilidad local. WorkCerca ayuda a detectarlos, no obliga a contratar.</p>
                      <button onClick={() => setActive("observatorio")}>Ver brechas</button>
                    </div>
                    <div className="needBox">
                      <h4>🧠 Capacitaciones recomendadas por IA</h4>
                      <p>La IA identifica formación que puede ayudar a reducir brechas entre personas y oportunidades.</p>
                      <button onClick={() => setActive("capacitaciones")}>Ver recomendaciones</button>
                    </div>
                  </div>
                </article>

                <div className="lower">
                  <article className="card oppList">
                    <div className="panelHead"><h3>Convocatorias y oportunidades activas</h3><button className="link" onClick={() => setActive("oportunidades")}>Ver todas</button></div>
                    {opportunities.map((o) => (
                      <div className="oppRow" key={o.title}>
                        <span className="oppIcon">{o.icon}</span>
                        <div><b>{o.title}</b><p>{o.org}</p><p>{o.meta} · <span className="tag">{o.tag}</span></p></div>
                        <button className="mini" onClick={() => action(`${o.title}: oportunidad abierta.`)}>Ver</button>
                      </div>
                    ))}
                  </article>

                  <article className="card talent">
                    <div className="panelHead"><h3>Talento y oportunidades locales</h3><button className="link" onClick={() => setActive("observatorio")}>Detalle</button></div>
                    <div className="donut"><div className="donutInner"><div><strong>1.372</strong><div style={{fontSize:10,color:"#9fb2c9"}}>Personas</div></div></div></div>
                    <div className="talentLegend">
                      <span><i className="legendDot" style={{background:"#2b88f2"}}/>Con experiencia · 45%</span>
                      <span><i className="legendDot" style={{background:"#31b96a"}}/>Buscando empleo · 30%</span>
                      <span><i className="legendDot" style={{background:"#8d63e8"}}/>Estudiantes · 15%</span>
                      <span><i className="legendDot" style={{background:"#f0a02a"}}/>Disponibles para pasantías · 10%</span>
                    </div>
                  </article>
                </div>

                <article className="card network">
                  <div className="panelHead"><h3>Red de Municipios</h3><button className="link" onClick={() => setActive("red")}>Ver red completa →</button></div>
                  <p style={{margin:"0",color:"#a7b8cd",fontSize:10}}>Conectá, compartí y crecé junto a otros municipios.</p>
                  <div className="municipios">
                    {["Avellaneda","Malabrigo","Vera","San Javier","Alejandra"].map((m) => (
                      <div className="muni" key={m}><div className="muniIcon">🏛️</div>{m}</div>
                    ))}
                    <button className="muni" onClick={() => setActive("red")} style={{border:0,background:"transparent",color:"#fff"}}><div className="muniIcon">＋</div>Ver más</button>
                  </div>
                  <div className="netActions">
                    <button onClick={() => action("Compartir programas con la Red de Municipios.")}>Compartir programas</button>
                    <button onClick={() => action("Convocatorias conjuntas disponibles.")}>Convocatorias conjuntas</button>
                    <button onClick={() => setActive("capacitaciones")}>Capacitaciones regionales</button>
                    <button onClick={() => setActive("profesionales")}>Intercambio de talento</button>
                  </div>
                </article>

                <article className="card programs">
                  <div className="panelHead"><h3>Programas y beneficios destacados</h3><button className="link" onClick={() => setActive("programas")}>Ver todos →</button></div>
                  {[
                    ["Programa Primer Empleo","Apoyo a personas para su primera experiencia laboral."],
                    ["Programa Emprender Local","Acompañamiento a emprendimientos de la comunidad."],
                    ["Beneficios para Empresas","Herramientas y formación para empresas locales."],
                    ["Plan de Formación Municipal","Capacitaciones para la comunidad."],
                  ].map(([a,b]) => (
                    <div className="programRow" key={a}><div><b>{a}</b><small>{b}</small></div><span className="status">Activo</span></div>
                  ))}
                </article>

                <div className="bottomGrid">
                  <article className="card simple">
                    <div className="panelHead"><h3>Agenda próxima</h3><button className="link" onClick={() => setActive("agenda")}>Ver agenda →</button></div>
                    <div className="simpleRow"><b>20 MAY · Feria de Emprendedores</b><small>Plaza Central · 10:00</small></div>
                    <div className="simpleRow"><b>22 MAY · Soldadura Básica</b><small>Centro de Formación · 14:00</small></div>
                    <div className="simpleRow"><b>24 MAY · Ronda Regional</b><small>Predio Ferial · 09:00</small></div>
                  </article>
                  <article className="card simple">
                    <div className="panelHead"><h3>Comunicados recientes</h3><button className="link" onClick={() => setActive("mensajes")}>Ver todos →</button></div>
                    <div className="simpleRow"><b>📣 Nuevas convocatorias activas</b><small>Actualización reciente</small></div>
                    <div className="simpleRow"><b>🎓 Programa de Becas</b><small>Información institucional</small></div>
                    <div className="simpleRow"><b>⚠️ Aviso programado</b><small>Comunicado municipal</small></div>
                  </article>
                  <article className="card simple">
                    <div className="panelHead"><h3>Impacto en la comunidad</h3><button className="link" onClick={() => setActive("observatorio")}>Ver informe →</button></div>
                    <div className="simpleRow"><b>+340 personas capacitadas</b><small>Último período</small></div>
                    <div className="simpleRow"><b>+56 nuevos empleos</b><small>Oportunidades generadas</small></div>
                    <div className="simpleRow"><b>+158 pasantías activas</b><small>Experiencias en curso</small></div>
                  </article>
                </div>

                <div className="footer">
                  <b>🤝 WorkCerca acerca posibilidades, reduce distancias y construye futuro.</b>
                  <span>El municipio elige qué herramientas utilizar según sus necesidades.</span>
                </div>
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
                    onClick={() => action(`${moduleScreens[active]?.primary}: acción preparada para conectar con datos reales y permisos del municipio.`)}
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
                    <p>La IA sugiere conexiones, oportunidades, capacitaciones y posibles brechas. Nunca decide ni impone al municipio qué acción tomar.</p>
                    <button className="primaryBtn" onClick={() => action("Sugerencias IA actualizadas para esta sección.")}>Ver sugerencias IA</button>
                  </article>
                  <article className="card moduleActionCard">
                    <h3>🌐 Ecosistema conectado</h3>
                    <p>Esta herramienta puede conectarse con personas, profesionales, emprendedores, empresas, instituciones y otros municipios.</p>
                    <button className="outlineBtn" onClick={() => setActive("panel")}>Volver al Panel Municipio</button>
                  </article>
                </div>
              </section>
            )}
          </div>

          <aside className="rightCol">
            <article className="card ai">
              <div className="aiHead"><span className="aiOrb">✦</span><div><h3>Motor IA WorkCerca</h3><small>Sugerencias para el desarrollo local</small></div></div>

              <div className="aiBox">
                <b>💼 Oportunidades detectadas</b>
                <p>Empresas de la zona buscan personal y existen perfiles locales que podrían ser compatibles.</p>
                <button onClick={() => setActive("empleo")}>Ver oportunidades →</button>
              </div>

              <div className="aiBox">
                <b>🎓 Capacitaciones relacionadas</b>
                <p>Hay instituciones con formación que puede ayudar a reducir brechas detectadas.</p>
                <button onClick={() => setActive("capacitaciones")}>Ver capacitaciones →</button>
              </div>

              <div className="aiBox">
                <b>🌐 Posible colaboración regional</b>
                <p>La Red de Municipios puede ofrecer programas o formación complementaria.</p>
                <button onClick={() => setActive("red")}>Ver Red de Municipios →</button>
              </div>

              <div className="aiBox">
                <b>🤝 Pasantías disponibles</b>
                <p>Jóvenes e instituciones pueden vincularse con oportunidades de experiencia práctica.</p>
                <button onClick={() => setActive("pasantias")}>Ver pasantías →</button>
              </div>

              <button className="ask" onClick={() => setActive("ia")}>Ver sugerencias completas</button>
            </article>

            <article className="card quick">
              <div className="panelHead"><h3>Acciones rápidas</h3></div>
              <button onClick={() => setActive("empleo")}><span>Publicar convocatoria</span><span>›</span></button>
              <button onClick={() => setActive("profesionales")}><span>Buscar profesionales</span><span>›</span></button>
              <button onClick={() => setActive("emprendedores")}><span>Buscar emprendedores</span><span>›</span></button>
              <button onClick={() => setActive("programas")}><span>Crear programa</span><span>›</span></button>
              <button onClick={() => setActive("capacitaciones")}><span>Nueva capacitación</span><span>›</span></button>
              <button onClick={() => setActive("mensajes")}><span>Enviar mensaje</span><span>›</span></button>
              <button onClick={() => setActive("emergencias")}><span>Crear alerta o aviso</span><span>›</span></button>
            </article>

            <article className="card impact">
              <div className="panelHead"><h3>Impacto local</h3><button className="link" onClick={() => setActive("observatorio")}>Informe</button></div>
              <div className="impactGrid">
                <div className="impactBox"><strong>+340</strong><span>Personas capacitadas</span></div>
                <div className="impactBox"><strong>+56</strong><span>Nuevos empleos</span></div>
                <div className="impactBox"><strong>+158</strong><span>Pasantías activas</span></div>
                <div className="impactBox"><strong>+92</strong><span>Emprendimientos acompañados</span></div>
              </div>
            </article>
          </aside>
        </section>
      </div>

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
