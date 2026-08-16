"use client";

import { useState } from "react";
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
  const act = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(""), 2600); };

  return (
    <main className="mwcPage">
      {notice && <div className="mwcToast">{notice}</div>}
      <aside className="mwcSidebar">
        <button className="mwcSideLogo" onClick={() => window.location.href = "/"}><img src={logoHeader.src} alt="WorkCerca" /></button>
        <div className="mwcUser">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80" alt="Perfil" />
          <div><strong>Hola, Mariana</strong><span>Usuario verificado ✓</span></div>
        </div>
        <nav className="mwcSideNav">
          <button onClick={() => window.location.href = "/"}><i className="mwcNavIcon">⌂</i> <span>Inicio</span></button>
          <button className="active"><i className="mwcNavIcon">▣</i> <span>Mi WorkCerca</span></button>
          <button onClick={() => window.location.href = "/solicitudes"}><i className="mwcNavIcon">▤</i> <span>Solicitudes</span><b>2</b></button>
          <button onClick={() => window.location.href = "/busco-trabajo"}><i className="mwcNavIcon">💼</i> <span>Busco trabajo / Mi CV</span></button>
          <button onClick={() => act("Abriremos Presupuestos en su pantalla propia.")}><i className="mwcNavIcon">▧</i> <span>Presupuestos</span><b>4</b></button>
          <button onClick={() => act("Mensajes y videollamadas: próxima pantalla.")}><i className="mwcNavIcon">▱</i> <span>Mensajes</span><b>3</b></button>
          <button onClick={() => act("Agenda: próxima pantalla.")}><i className="mwcNavIcon">□</i> <span>Agenda</span></button>
          <button onClick={() => act("Mi Proyecto: próxima pantalla.")}><i className="mwcNavIcon">▣</i> <span>Proyectos</span><b>1</b></button>
          <button onClick={() => act("Favoritos: próxima pantalla.")}><i className="mwcNavIcon">♡</i> <span>Favoritos</span></button>
          <button onClick={() => act("Reseñas y calificaciones: próxima pantalla.")}><i className="mwcNavIcon">☆</i> <span>Mis reseñas</span></button>
          <button onClick={() => act("Pagos y facturas: próxima pantalla.")}><i className="mwcNavIcon">$</i> <span>Pagos y facturas</span></button>
          <button onClick={() => act("Configuración: próxima pantalla.")}><i className="mwcNavIcon">⚙</i> <span>Configuración</span></button>
        </nav>
        <div className="mwcInvite"><strong>♧ Invitá y ganá</strong><p>Invitá amigos y ganá beneficios en WorkCerca.</p><button onClick={() => act("Invitaciones: función en preparación.")}>Invitar ahora</button></div>
        <div className="mwcHelp"><strong>ⓘ ¿Necesitás ayuda?</strong><p>Estamos para ayudarte</p><button onClick={() => act("Centro de ayuda: próxima pantalla.")}>Centro de ayuda</button></div>
      </aside>

      <section className="mwcMain">
        <header className="mwcTop">
          <button className="active" onClick={() => window.location.href = "/"}>Inicio</button><button>Buscar</button><button>Categorías</button><button>Empresas</button><button>Emprendedores</button><button>Mi Perfil</button>
          <div className="mwcTopRight"><button>🔔<i>3</i></button><button>💬</button><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Perfil" /></div>
        </header>

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

        <div className="mwcTrust"><span>✓ <b>Perfiles verificados<br/>y calificaciones</b></span><span>▣ <b>Comunicación directa<br/>y segura</b></span><span>🛡 <b>Pagos seguros<br/>en la plataforma</b></span><span>♧ <b>Soporte y ayuda<br/>siempre disponibles</b></span></div>
        <footer className="mwcFooter"><div><img src={logoFooter.src} alt="WorkCerca"/><p>Conectamos personas, impulsamos negocios, generamos oportunidades.</p></div><div><b>Navegación</b><span>Inicio</span><span>Buscar</span><span>Categorías</span><span>Empresas</span><span>Emprendedores</span></div><div><b>Recursos</b><span>Centro de ayuda</span><span>Cómo funciona</span><span>Consejos de seguridad</span><span>Blog</span></div><div><b>WorkCerca</b><span>Quiénes somos</span><span>Términos y condiciones</span><span>Política de privacidad</span><span>Contacto</span></div><div><b>Seguinos en</b><p className="socials">●　◎　▶　in</p></div><small>© 2026 WorkCerca — CONECTA. ENCUENTRA. CRECE</small></footer>
      </section>
      <style jsx>{`
        .mwcSideNav button {
          min-height: 46px;
          font-weight: 600;
          letter-spacing: .01em;
        }
        .mwcNavIcon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: inline-grid;
          place-items: center;
          flex: 0 0 28px;
          font-style: normal;
          font-size: 15px;
          color: #3b82f6;
          background: rgba(59,130,246,.12);
          border: 1px solid rgba(96,165,250,.22);
        }
        .mwcSideNav button:hover .mwcNavIcon,
        .mwcSideNav button.active .mwcNavIcon {
          color: #dff7ff;
          background: #1d4ed8;
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(59,130,246,.12);
        }
        .mwcSideNav button.active {
          font-weight: 800;
        }
      `}</style>

    </main>
  );
}
