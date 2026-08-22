"use client";

import { useEffect, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";
import logoFooter from "../../workcerca-logo-footer.png";

const opportunities = [
  ["💼", "Trabajos cerca tuyo", "Encontrá trabajos y servicios disponibles en tu zona.", "Ver oportunidades"],
  ["📈", "Ofertas para vos", "Profesionales con ofertas especiales activas.", "Ver ofertas"],
  ["⭐", "Recomendados", "Profesionales mejor calificados cerca tuyo.", "Ver recomendados"],
  ["👥", "Nuevos en tu zona", "Profesionales y comercios que se sumaron.", "Ver nuevos"],
];

const sectors = [
  ["Construcción", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"],
  ["Electricidad", "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80"],
  ["Plomería", "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80"],
  ["Pintura", "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=500&q=80"],
  ["Refrigeración", "https://images.unsplash.com/photo-1631545806609-65b6b2e0a79e?auto=format&fit=crop&w=500&q=80"],
  ["Limpieza", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80"],
  ["Tecnología", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80"],
];

const pros = [
  ["Juan Carlos", "Electricista Matriculado", "4.9 (128)", "0,6 km", "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80"],
  ["Marta López", "Pintora Profesional", "4.8 (93)", "1,2 km", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"],
  ["Carlos Gómez", "Plomero Gasista", "4.7 (156)", "1,5 km", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"],
];

const promos = [
  ["Ferretería Soluciones", "10% OFF", "en herramientas", "Hasta el 31/08", "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=500&q=80"],
  ["Casa del Aire", "15% OFF", "en instalación de aires", "Hasta el 01/09", "https://images.unsplash.com/photo-1631545806609-65b6b2e0a79e?auto=format&fit=crop&w=500&q=80"],
  ["Pinturería Color", "20% OFF", "en pinturas seleccionadas", "Hasta el 31/08", "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=500&q=80"],
  ["Limpieza Total", "$2000 OFF", "en servicios generales", "Hasta el 30/08", "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80"],
  ["TechService", "GRATIS", "Diagnóstico en reparación de PC", "Hasta el 31/08", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=80"],
];

export default function MiWorkCerca() {
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeScreen, setActiveScreen] = useState("panel");
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) setActiveScreen(hash);
    const frame = window.requestAnimationFrame(() => setPageReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const openScreen = (key: string) => {
    setActiveScreen(key);
    window.history.replaceState(null, "", key === "panel" ? "/mi-workcerca" : `/mi-workcerca#${key}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const act = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(""), 2600); };

  return (
    <main className="mwcPage" style={{opacity: pageReady ? 1 : 0, visibility: pageReady ? "visible" : "hidden", transition:"opacity 220ms ease-out"}}>
      {notice && <div className="mwcToast">{notice}</div>}
      <aside className="mwcSidebar">
        <button className="mwcSideLogo" onClick={() => window.location.href = "/"}><img src={logoHeader.src} alt="WorkCerca" /></button>
        <div className="mwcUser">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80" alt="Perfil" />
          <div><strong>Hola, Mariana</strong><span>Usuario verificado ✓</span></div>
        </div>
        <nav className="mwcSideNav">
          <button onClick={() => window.location.href = "/"}>⌂ <span>Inicio WorkCerca</span></button>
          <button className={activeScreen==="panel" ? "active" : ""} onClick={() => openScreen("panel")}>▣ <span>Mi WorkCerca</span></button>
          <button onClick={() => window.location.href = "/solicitudes"}>▤ <span>Solicitudes</span><b>2</b></button>
          <button onClick={() => window.location.href = "/busco-trabajo"}>💼 <span>Busco trabajo / Mi CV</span></button>
          <button className={activeScreen==="presupuestos" ? "active" : ""} onClick={() => openScreen("presupuestos")}>▧ <span>Presupuestos</span><b>4</b></button>
          <button className={activeScreen==="mensajes" ? "active" : ""} onClick={() => openScreen("mensajes")}>▱ <span>Mensajes</span><b>3</b></button>
          <button className={activeScreen==="videollamadas" ? "active" : ""} onClick={() => openScreen("videollamadas")}>▣ <span>Videollamadas</span><b>3</b></button>
          <button className={activeScreen==="agenda" ? "active" : ""} onClick={() => openScreen("agenda")}>□ <span>Agenda</span></button>
          <button className={activeScreen==="proyectos" ? "active" : ""} onClick={() => openScreen("proyectos")}>▣ <span>Proyectos</span><b>1</b></button>
          <button className={activeScreen==="favoritos" ? "active" : ""} onClick={() => openScreen("favoritos")}>♡ <span>Favoritos</span></button>
          <button className={activeScreen==="resenas" ? "active" : ""} onClick={() => openScreen("resenas")}>☆ <span>Mis reseñas</span></button>
          <button className={activeScreen==="pagos" ? "active" : ""} onClick={() => openScreen("pagos")}>$ <span>Pagos y facturas</span></button>
          <button className={activeScreen==="configuracion" ? "active" : ""} onClick={() => openScreen("configuracion")}>⚙ <span>Configuración</span></button>
        </nav>
        <div className="mwcInvite"><strong>✦ IA WorkCerca</strong><p>Decime qué necesitás y te guío por la plataforma.</p><button onClick={() => act("IA WorkCerca lista para orientarte.")}>Hablar con IA</button></div>
        <div className="mwcHelp"><strong>ⓘ Cómo funciona WorkCerca</strong><p>Recorrido simple por todas las herramientas.</p><button onClick={() => act("Recorrido guiado WorkCerca.")}>Ver recorrido</button></div>
      </aside>

      <section className="mwcMain">
        <header className="mwcTop">
          <button className="active" onClick={() => window.location.href = "/"}>Inicio</button><button>Buscar</button><button>Categorías</button><button>Empresas</button><button>Emprendedores</button><button>Mi Perfil</button>
          <div className="mwcTopRight"><button>🔔<i>3</i></button><button>💬</button><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Perfil" /></div>
        </header>

        {activeScreen === "panel" && (
        <div className="mwcContent">
          <h1>¿Qué vas a hacer <em>hoy?</em></h1>
          <div className="mwcSearch">
            <span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ej: Electricista, Plomero, Pintura, Abogado..." />
            <button className="location" onClick={() => act("Usaremos tu ubicación actual con tu permiso.")}>⌖ Mi ubicación</button><button className="searchBtn" onClick={() => act(query ? `Buscando: ${query}` : "Escribí qué necesitás.")}>⌕ Buscar</button>
          </div>
          <div className="mwcQuick"><button>⌖ Servicios cerca mío</button><button>▤ Pedir un presupuesto</button><button>✚ Publicar un trabajo</button><button>🛡 Emergencias 24/7</button></div>

          <h2>¿Qué <em>oportunidades</em> tengo?</h2>
          <div className="mwcOppGrid">{opportunities.map((o, i) => <article key={o[1]}><div className={`oppIcon i${i}`}>{o[0]}</div><h3>{o[1]}</h3><p>{o[2]}</p><button onClick={() => act(`${o[1]}: abriremos el detalle.`)}>{o[3]} →</button></article>)}</div>

          <div className="mwcTwoCol">
            <article className="mwcPanel mapPanel"><div className="panelTitle"><h3>Cerca tuyo ahora</h3><button>Ver en mapa</button></div><div className="fakeMap"><div className="mapRoad r1"/><div className="mapRoad r2"/><div className="mapRoad r3"/><div className="userDot"/><span className="pin p1">⚡</span><span className="pin p2">🔧</span><span className="pin p3">🚰</span><span className="pin p4">🛠</span><span className="pin p5">❄</span></div><p>Mostrando resultados en un radio de 5 km</p><input type="range" min="1" max="20" defaultValue="5"/><div className="rangeLabels"><span>1 km</span><b>5 km</b><span>10 km</span><span>20 km</span></div></article>
            <article className="mwcPanel"><div className="panelTitle"><h3>Profesionales cerca tuyo</h3><button>Ver todos →</button></div>{pros.map(p => <div className="proRow" key={p[0]}><img src={p[4]} alt=""/><div><strong>{p[0]} <i>✓</i></strong><span>{p[1]}</span><small>⭐ {p[2]}　⌖ {p[3]}</small></div><button onClick={() => act(`Contactar a ${p[0]}`)}>Contactar 💬</button></div>)}<button className="moreLink">Ver más profesionales →</button></article>
          </div>

          <article className="mwcPanel sectorsPanel"><div className="panelTitle"><h3>Explorá por sectores</h3><button>Ver todas las categorías →</button></div><div className="sectorStrip">{sectors.map(s => <button key={s[0]} onClick={() => act(`Sector: ${s[0]}`)}><img src={s[1]} alt=""/><span>{s[0]}</span></button>)}<button className="moreSector"><b>•••</b><span>Ver más</span></button></div></article>

          <article className="mwcPanel promoPanel"><div className="panelTitle"><h3>Promociones de empresas</h3><button>Ver todas las promociones →</button></div><div className="promoStrip">{promos.map((p,i) => <div className="promoCard" key={p[0]}><div className="promoImg" style={{backgroundImage:`url(${p[4]})`}}><span>{i%2===0?"PROMO":"OFERTA"}</span></div><strong>{p[0]}</strong><b>{p[1]}</b><p>{p[2]}</p><small>{p[3]}</small><button onClick={() => act(`Promoción de ${p[0]}`)}>Ver promo</button></div>)}</div></article>

          <div className="mwcBottomGrid">
            <article className="mwcPanel"><div className="panelTitle"><h3>Actividad reciente</h3></div><ul className="activity"><li>▣ <span>Solicitaste un presupuesto a 3 profesionales<small>Hace 2 horas</small></span><b>Enviado</b></li><li>▧ <span>Nuevo presupuesto recibido de Juan Carlos<small>Hace 4 horas</small></span><b>Nuevo</b></li><li>▣ <span>Marta López aceptó tu solicitud<small>Hace 1 día</small></span><b>Aceptado</b></li></ul><button className="moreLink">Ver todas mis actividades →</button></article>
            <article className="mwcPanel"><div className="panelTitle"><h3>Solicitudes activas</h3><button>Ver todas →</button></div><div className="requests"><p><strong>Cambio de instalación eléctrica</strong><span>Publicado el 12/08/2026</span><b>3 propuestas</b></p><p><strong>Pintar interior de casa</strong><span>Publicado el 10/08/2026</span><b>5 propuestas</b></p><p><strong>Arreglo de termotanque</strong><span>Publicado el 08/08/2026</span><b>2 propuestas</b></p></div><button className="publishBtn">Publicar nuevo trabajo　＋</button></article>
            <article className="premiumBox"><h3>♛ WorkCerca Premium</h3><p>Más visibilidad, más respuestas, más oportunidades.</p><span>✓ Destacá tus publicaciones</span><span>✓ Recibí más propuestas</span><span>✓ Soporte prioritario 24/7</span><button>Conocer más</button></article>
          </div>
        </div>

        )}

        {activeScreen !== "panel" && (
          <div className="mwcInternal">
            <section className="mwcInternalHero">
              <div>
                <span>MI WORKCERCA · {activeScreen.toUpperCase()}</span>
                <h1>{
                  activeScreen==="presupuestos" ? "Presupuestos" :
                  activeScreen==="mensajes" ? "Mensajes" :
                  activeScreen==="videollamadas" ? "Videollamadas" :
                  activeScreen==="agenda" ? "Agenda" :
                  activeScreen==="proyectos" ? "Proyectos" :
                  activeScreen==="favoritos" ? "Favoritos" :
                  activeScreen==="resenas" ? "Mis reseñas" :
                  activeScreen==="pagos" ? "Pagos y facturas" : "Configuración"
                }</h1>
                <p>Todo dentro de tu mismo panel. No cambiamos el barral ni te hacemos perder dónde estabas.</p>
              </div>
              <button onClick={() => openScreen("panel")}>← Volver a Mi WorkCerca</button>
            </section>

            <div className="mwcInternalGrid">
              {activeScreen==="presupuestos" && <>
                <article><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Presupuestos recibidos</h3><p>Compará propuestas, precios, disponibilidad y reputación antes de decidir.</p><button onClick={() => act("Abrir presupuesto recibido")}>Ver recibidos</button></article>
                <article><h3>Solicitar presupuesto</h3><p>Contá qué necesitás y WorkCerca te ayuda a encontrar opciones.</p><button onClick={() => window.location.href="/solicitudes"}>Nueva solicitud</button></article>
              </>}
              {activeScreen==="mensajes" && <>
                <article><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Conversaciones recientes</h3><p>Profesionales, empresas, instituciones y contactos de WorkCerca en un solo lugar.</p><button onClick={() => window.location.href="/mensajes"}>Abrir mensajes</button></article>
                <article><h3>IA WorkCerca</h3><p>Puede ayudarte a ordenar consultas y encontrar la conversación relacionada con tu necesidad.</p><button onClick={() => act("IA para mensajes")}>Usar IA</button></article>
              </>}
              {activeScreen==="videollamadas" && <>
                <article><img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Próximas videollamadas</h3><p>Entrevistas, instituciones, empresas y reuniones de trabajo.</p><button onClick={() => window.location.href="/videollamadas"}>Entrar a videollamadas</button></article>
                <article><h3>Programar reunión</h3><p>Coordiná una videollamada sin salir del ecosistema.</p><button onClick={() => window.location.href="/agenda"}>Ir a Agenda</button></article>
              </>}
              {activeScreen==="agenda" && <>
                <article><img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Tu agenda</h3><p>Entrevistas, turnos, reuniones y recordatorios.</p><button onClick={() => window.location.href="/agenda"}>Abrir agenda completa</button></article>
                <article><h3>Próximo evento</h3><p>Organizá tus actividades sin perder el contexto de WorkCerca.</p><button onClick={() => act("Nuevo evento")}>Agregar evento</button></article>
              </>}
              {activeScreen==="proyectos" && <>
                <article><img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Mis proyectos</h3><p>Ideas, trabajos y proyectos que estás siguiendo dentro de WorkCerca.</p><button onClick={() => act("Abrir proyecto")}>Ver proyectos</button></article>
                <article><h3>Crear proyecto</h3><p>Podés relacionarlo con profesionales, empresas, capacitaciones y oportunidades.</p><button onClick={() => act("Nuevo proyecto")}>Nuevo proyecto</button></article>
              </>}
              {activeScreen==="favoritos" && <>
                <article><img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Guardados</h3><p>Perfiles, oportunidades, cursos y servicios que marcaste para volver después.</p><button onClick={() => act("Ver favoritos")}>Ver favoritos</button></article>
                <article><h3>Organizá tus favoritos</h3><p>Separalos por trabajo, estudio, servicios o proyectos.</p><button onClick={() => act("Organizar favoritos")}>Organizar</button></article>
              </>}
              {activeScreen==="resenas" && <>
                <article><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Mis reseñas</h3><p>Opiniones vinculadas a experiencias reales dentro de WorkCerca.</p><button onClick={() => act("Ver reseñas")}>Ver reseñas</button></article>
                <article><h3>Reputación y confianza</h3><p>Las calificaciones ayudan a elegir mejor, pero no reemplazan la verificación.</p><button onClick={() => act("Ver reputación")}>Ver reputación</button></article>
              </>}
              {activeScreen==="pagos" && <>
                <article><img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=700&q=80" alt=""/><h3>Pagos y facturas</h3><p>Historial, comprobantes y operaciones relacionadas con servicios.</p><button onClick={() => act("Ver movimientos")}>Ver movimientos</button></article>
                <article><h3>Seguridad</h3><p>Información clara de cada operación y comprobantes disponibles.</p><button onClick={() => act("Centro de seguridad")}>Ver seguridad</button></article>
              </>}
              {activeScreen==="configuracion" && <>
                <article><h3>Privacidad</h3><p>Elegí qué información puede mostrarse y a quién.</p><button onClick={() => act("Preferencias de privacidad")}>Configurar</button></article>
                <article><h3>Accesibilidad</h3><p>Preferencias de lectura, ayudas y futura integración de lengua de señas.</p><button onClick={() => act("Preferencias de accesibilidad")}>Configurar</button></article>
                <article><h3>Notificaciones</h3><p>Elegí qué avisos querés recibir de oportunidades, mensajes y actividad.</p><button onClick={() => act("Preferencias de notificaciones")}>Configurar</button></article>
              </>}
            </div>
          </div>
        )}

        <div className="mwcTrust"><span>✓ <b>Perfiles verificados<br/>y calificaciones</b></span><span>▣ <b>Comunicación directa<br/>y segura</b></span><span>🛡 <b>Pagos seguros<br/>en la plataforma</b></span><span>♧ <b>Soporte y ayuda<br/>siempre disponibles</b></span></div>
        <footer className="mwcFooter"><div><img src={logoFooter.src} alt="WorkCerca"/><p>Conectamos personas, impulsamos negocios, generamos oportunidades.</p></div><div><b>Navegación</b><span>Inicio</span><span>Buscar</span><span>Categorías</span><span>Empresas</span><span>Emprendedores</span></div><div><b>Recursos</b><span>Centro de ayuda</span><span>Cómo funciona</span><span>Consejos de seguridad</span><span>Blog</span></div><div><b>WorkCerca</b><span>Quiénes somos</span><span>Términos y condiciones</span><span>Política de privacidad</span><span>Contacto</span></div><div><b>Seguinos en</b><p className="socials">●　◎　▶　in</p></div><small>© 2026 WorkCerca — CONECTA. ENCUENTRA. CRECE</small></footer>
      </section>

        <style jsx>{`
          .mwcInternal{padding:28px;max-width:1180px;margin:auto}
          .mwcInternalHero{min-height:190px;border-radius:18px;padding:26px;display:flex;justify-content:space-between;align-items:end;gap:24px;color:#fff;background:linear-gradient(90deg,rgba(4,24,50,.9),rgba(5,56,98,.65)),url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80") center/cover}
          .mwcInternalHero span{font-size:9px;letter-spacing:.12em;color:#62d8ef;font-weight:900}.mwcInternalHero h1{font-size:34px;margin:8px 0}.mwcInternalHero p{font-size:11px;max-width:620px;color:#dbe8f4}.mwcInternalHero button{border:1px solid #ffffff66;background:#fff;color:#0b5fbd;border-radius:9px;padding:10px 13px;font-size:10px;font-weight:900}
          .mwcInternalGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px}.mwcInternalGrid article{background:#fff;border:1px solid #e1e7ef;border-radius:15px;padding:18px;box-shadow:0 8px 24px rgba(20,50,90,.06)}.mwcInternalGrid img{width:100%;height:145px;object-fit:cover;border-radius:11px;margin-bottom:12px}.mwcInternalGrid h3{font-size:17px;margin:0 0 7px}.mwcInternalGrid p{font-size:11px;line-height:1.5;color:#657589}.mwcInternalGrid button{border:0;background:#0b6fe5;color:#fff;border-radius:8px;padding:9px 12px;font-size:9px;font-weight:900}
          .mwcSideNav button.active{background:linear-gradient(90deg,#0874ea,#16b5cf)!important}
          @media(max-width:760px){.mwcInternalGrid{grid-template-columns:1fr}.mwcInternalHero{align-items:start;flex-direction:column}.mwcInternal{padding:14px}}
        `}</style>
    </main>
  );
}
