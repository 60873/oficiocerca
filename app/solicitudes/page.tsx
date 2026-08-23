"use client";

import { useEffect, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";
type RequestItem = {
  title: string;
  type: string;
  category: string;
  location: string;
  date: string;
  status: "Activa" | "En espera" | "Con propuestas" | "Completada" | "Cancelada" | "Explorando";
  meta: string;
  action: string;
};

const requestTypes = [
  ["📄", "Cliente", "Busco servicios"],
  ["💼", "Busco trabajo", "Oportunidades laborales"],
  ["🏢", "Empresa", "Publico trabajos"],
  ["🏛️", "Municipio", "Capacitaciones y más"],
  ["🧵", "Emprendedor", "Ferias, ayudas y más"],
  ["🎓", "Institución", "Cursos y estudios"],
  ["🔎", "Explorando", "Aún no lo tengo claro"],
];

const requests: RequestItem[] = [
  {
    title: "Reparación de cañería de agua",
    type: "Cliente",
    category: "Plomería",
    location: "Nueva Córdoba, Córdoba",
    date: "14/08/2026 - 10:30 hs",
    status: "Activa",
    meta: "3 propuestas",
    action: "Ver detalles",
  },
  {
    title: "Busco trabajo: Auxiliar administrativo",
    type: "Busco trabajo",
    category: "Administración / Oficina",
    location: "Córdoba Capital",
    date: "11/08/2026 - 14:20 hs",
    status: "Con propuestas",
    meta: "4 empresas interesadas",
    action: "Ver oportunidades",
  },
  {
    title: "Publicación de empleo: Vendedor",
    type: "Empresa",
    category: "Ventas",
    location: "Mi empresa",
    date: "10/08/2026 - 11:00 hs",
    status: "Activa",
    meta: "6 postulaciones",
    action: "Ver postulantes",
  },
  {
    title: "Capacitación en Manipulación Segura de Alimentos",
    type: "Municipio",
    category: "Capacitación",
    location: "Municipalidad",
    date: "14/08/2026",
    status: "Activa",
    meta: "Inscripción abierta",
    action: "Ver capacitación",
  },
  {
    title: "Feria de Emprendedores",
    type: "Emprendedor",
    category: "Feria / Comercialización",
    location: "Centro Cultural",
    date: "05/09/2026",
    status: "Activa",
    meta: "Convocatoria abierta",
    action: "Ver feria",
  },
  {
    title: "Curso de Electricidad Domiciliaria",
    type: "Institución",
    category: "Formación",
    location: "Instituto Técnico",
    date: "12/08/2026",
    status: "Activa",
    meta: "Vacantes disponibles",
    action: "Ver curso",
  },
  {
    title: "Pedido de luminarias LED para plaza",
    type: "Municipio",
    category: "Proveedores",
    location: "Municipalidad",
    date: "09/08/2026",
    status: "En espera",
    meta: "2 propuestas",
    action: "Ver propuestas",
  },
  {
    title: "Aún no sé qué necesito",
    type: "Explorando",
    category: "Explorando opciones",
    location: "Sin ubicación definida",
    date: "05/08/2026 - 18:20 hs",
    status: "Explorando",
    meta: "Sugerencias personalizadas",
    action: "Explorar ideas",
  },
];

export default function SolicitudesPage() {
  const [activeType, setActiveType] = useState("Todas");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const act = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const filtered = requests.filter((item) => {
    const typeOk = activeType === "Todas" || item.type === activeType;
    const q = query.trim().toLowerCase();
    const queryOk =
      !q ||
      `${item.title} ${item.type} ${item.category} ${item.location}`
        .toLowerCase()
        .includes(q);
    return typeOk && queryOk;
  });

  return (
    <main className="mwcPage solicitudesPage">
      {notice && <div className="mwcToast">{notice}</div>}

      <aside className="mwcSidebar">
        <button className="mwcSideLogo" onClick={() => window.location.href="/"}><img src={logoHeader.src} alt="WorkCerca"/></button>
        <div className="mwcUser"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80" alt="Perfil"/><div><strong>Hola, Mariana</strong><span>Usuario verificado ✓</span></div></div>
        <nav className="mwcSideNav">
          <button onClick={() => window.location.href="/"}>⌂ <span>Inicio WorkCerca</span></button>
          <button onClick={() => window.location.href="/mi-workcerca"}>▣ <span>Mi WorkCerca</span></button>
          <button className="active">▤ <span>Solicitudes</span><b>16</b></button>
          <button onClick={() => window.location.href="/busco-trabajo"}>💼 <span>Busco trabajo / Mi CV</span></button>
          <button onClick={() => window.location.href="/mi-workcerca#presupuestos"}>▧ <span>Presupuestos</span><b>6</b></button>
          <button onClick={() => window.location.href="/mi-workcerca#mensajes"}>▱ <span>Mensajes</span><b>7</b></button>
          <button onClick={() => window.location.href="/mi-workcerca#videollamadas"}>▣ <span>Videollamadas</span><b>3</b></button>
          <button onClick={() => window.location.href="/mi-workcerca#agenda"}>□ <span>Agenda</span></button>
          <button onClick={() => window.location.href="/mi-workcerca#proyectos"}>▣ <span>Proyectos</span><b>3</b></button>
          <button onClick={() => window.location.href="/mi-workcerca#favoritos"}>♡ <span>Favoritos</span></button>
          <button onClick={() => window.location.href="/mi-workcerca#resenas"}>☆ <span>Mis reseñas</span></button>
          <button onClick={() => window.location.href="/mi-workcerca#pagos"}>$ <span>Pagos y facturas</span></button>
          <button onClick={() => window.location.href="/mi-workcerca#configuracion"}>⚙ <span>Configuración</span></button>
        </nav>
        <div className="mwcInvite"><strong>✦ IA WorkCerca</strong><p>Te ayuda a entender y gestionar tus solicitudes.</p><button onClick={() => act("IA WorkCerca para Solicitudes")}>Hablar con IA</button></div>
        <div className="mwcHelp"><strong>ⓘ Cómo funciona</strong><p>Volvé siempre al mismo panel sin perderte.</p><button onClick={() => window.location.href="/mi-workcerca"}>Mi WorkCerca</button></div>
      </aside>

      <section className="mwcMain">
        <header className="mwcTop">
          <button onClick={() => (window.location.href = "/")}>Inicio</button>
          <button onClick={() => (window.location.href = "/mi-workcerca")}>Mi WorkCerca</button>
          <button onClick={() => (window.location.href = "/busco-trabajo")}>Busco trabajo</button>
          <button>Buscar</button>
          <button>Categorías</button>
          <button onClick={() => setActiveType("Empresa")}>Empresas</button>
          <button onClick={() => setActiveType("Emprendedor")}>Emprendedores</button>
          <button onClick={() => setActiveType("Municipio")}>Municipios</button>
          <button onClick={() => setActiveType("Institución")}>Instituciones</button>

          <div className="mwcTopRight">
            <button onClick={() => act("Notificaciones")}>🔔<i>3</i></button>
            <button onClick={() => act("Mensajes")}>💬</button>
            <button onClick={() => act("Videollamadas")}>📹</button>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Perfil"
            />
          </div>
        </header>

        <div className="mwcContent solicitudesContent">
          <div className="solTitleRow">
            <div>
              <h1>Solicitudes</h1>
              <p>
                Gestioná tus solicitudes, oportunidades, trabajos, cursos y servicios
                en un solo lugar.
              </p>
            </div>
            <div className="solTopActions">
              <button onClick={() => act("Nueva solicitud: elegiremos qué necesitás.")}>
                ＋ Nueva solicitud
              </button>
              <button onClick={() => act("Abriremos Mi CV y postulaciones.")}>
                💼 Mis CV y postulaciones
              </button>
            </div>
          </div>

          <section className="mwcPanel solTypePanel">
            <span className="solSmallTitle">Explorá solicitudes por tipo:</span>
            <div className="solTypeGrid">
              {requestTypes.map(([icon, title, subtitle]) => (
                <button
                  key={title}
                  className={activeType === title ? "active" : ""}
                  onClick={() => {
                    if (title === "Busco trabajo") {
                      window.location.href = "/busco-trabajo";
                      return;
                    }
                    setActiveType(title);
                    act(`${title}: mostrando contenido relacionado.`);
                  }}
                >
                  <span className="solTypeIcon">{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <small>{subtitle}</small>
                  </div>
                  <i>›</i>
                </button>
              ))}
            </div>
          </section>

          <div className="solStatusTabs">
            {["Todas", "Activas", "En espera", "Con propuestas", "Completadas", "Canceladas"].map(
              (item) => (
                <button
                  key={item}
                  className={activeType === "Todas" && item === "Todas" ? "active" : ""}
                  onClick={() => act(`${item}: filtro de estado en preparación.`)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="solMetrics">
            <article><span>📄</span><strong>16</strong><b>Total solicitudes</b><small>Este mes</small></article>
            <article><span>🗓️</span><strong>6</strong><b>Activas</b><small>En progreso</small></article>
            <article><span>🕒</span><strong>3</strong><b>En espera</b><small>Pendientes de respuesta</small></article>
            <article><span>💬</span><strong>5</strong><b>Con propuestas</b><small>Para revisar</small></article>
            <article><span>✓</span><strong>9</strong><b>Completadas</b><small>Este mes</small></article>
            <article><span>✕</span><strong>1</strong><b>Canceladas</b><small>Este mes</small></article>
          </div>

          <div className="solLayout">
            <div>
              <div className="solFilters">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por servicio, trabajo, curso, empresa..."
                />
                <button onClick={() => act("Filtro por tipo")}>Tipo: Todos⌄</button>
                <button onClick={() => act("Filtro por estado")}>Estado: Todos⌄</button>
                <button onClick={() => act("Filtro por categoría")}>Categoría: Todas⌄</button>
                <button onClick={() => act("Filtro por fecha")}>Fecha: Más recientes⌄</button>
                <button onClick={() => act("Filtros avanzados")}>▽ Filtros</button>
              </div>

              <section className="mwcPanel solList">
                {filtered.map((item, index) => (
                  <article className="solRow" key={`${item.title}-${index}`}>
                    <div className={`solKind kind${index % 6}`}>
                      {item.type === "Cliente" && "🔧"}
                      {item.type === "Busco trabajo" && "💼"}
                      {item.type === "Empresa" && "🏢"}
                      {item.type === "Municipio" && "🏛️"}
                      {item.type === "Emprendedor" && "🧵"}
                      {item.type === "Institución" && "🎓"}
                      {item.type === "Explorando" && "🔎"}
                    </div>

                    <div className="solMainInfo">
                      <strong>{item.title}</strong>
                      <span>{item.category}</span>
                      <small>⌖ {item.location}</small>
                      <small>Creada el {item.date}</small>
                    </div>

                    <div className="solMeta">
                      <b>{item.meta}</b>
                      <div className="solMiniActions">
                        <button onClick={() => act("Abrir mensajes")}>💬</button>
                        <button onClick={() => act("Abrir videollamada")}>📹</button>
                        <button onClick={() => act("Abrir agenda")}>📅</button>
                        <button onClick={() => act("Guardar")}>♡</button>
                      </div>
                    </div>

                    <div className="solState">
                      <span className={`state ${item.status.replace(" ", "").toLowerCase()}`}>
                        {item.status}
                      </span>
                      <button onClick={() => act(`${item.action}: ${item.title}`)}>
                        {item.action} →
                      </button>
                    </div>
                  </article>
                ))}

                {filtered.length === 0 && (
                  <div className="empty">
                    No encontramos solicitudes con ese criterio.
                  </div>
                )}
              </section>
            </div>

            <aside className="solRight">
              <section className="mwcPanel">
                <h3>Resumen rápido</h3>
                <p><span>Solicitudes activas</span><b>6</b></p>
                <p><span>En espera de respuesta</span><b>3</b></p>
                <p><span>Con propuestas</span><b>5</b></p>
                <p><span>Completadas</span><b>9</b></p>
                <p><span>Canceladas</span><b>1</b></p>
                <button onClick={() => setActiveType("Todas")}>Ver todas mis solicitudes →</button>
              </section>

              <section className="mwcPanel">
                <h3>Acciones rápidas</h3>
                <button onClick={() => act("Crear nueva solicitud")}>📄 Nueva solicitud</button>
                <button onClick={() => act("Crear o actualizar CV")}>💼 Crear / actualizar mi CV</button>
                <button onClick={() => act("Ver postulaciones")}>📋 Mis postulaciones</button>
                <button onClick={() => act("Ver presupuestos")}>🧾 Mis presupuestos</button>
                <button onClick={() => act("Abrir mensajes")}>💬 Mensajes</button>
                <button onClick={() => act("Abrir videollamadas")}>📹 Videollamadas</button>
                <button onClick={() => act("Abrir agenda")}>📅 Agenda</button>
              </section>

              <section className="mwcPanel">
                <h3>Consejos para vos</h3>
                <button onClick={() => act("Completar perfil")}>👤 Completá tu perfil</button>
                <button onClick={() => act("Subir CV")}>📄 Subí tu CV</button>
                <button onClick={() => act("Responder rápido")}>⚡ Respondé rápido</button>
                <button onClick={() => act("Calificar experiencia")}>⭐ Calificá tu experiencia</button>
              </section>

              <section className="mwcPanel">
                <h3>¿Necesitás ayuda?</h3>
                <p>Estamos para ayudarte.</p>
                <button onClick={() => act("Contactar soporte")}>Contactar soporte</button>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
