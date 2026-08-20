"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type StatCard = {
  label: string;
  value: string;
  detail: string;
};

type PerformanceRow = {
  id: string;
  item: string;
  type: "Empleo" | "Producto" | "Promoción" | "Publicidad";
  views: number;
  actions: number;
  conversions: number;
};

const statCards: StatCard[] = [
  { label: "Visitas al perfil", value: "1.284", detail: "+18% este mes" },
  { label: "Postulaciones", value: "39", detail: "3 empleos activos" },
  { label: "Contactos recibidos", value: "67", detail: "Mensajes y consultas" },
  { label: "Promociones vistas", value: "842", detail: "5 promociones activas" },
  { label: "Acciones útiles", value: "126", detail: "Mensajes, agenda y postulaciones" },
];

const performanceRows: PerformanceRow[] = [
  { id: "1", item: "Vendedor/a", type: "Empleo", views: 420, actions: 58, conversions: 18 },
  { id: "2", item: "Carretilla reforzada", type: "Producto", views: 310, actions: 41, conversions: 9 },
  { id: "3", item: "15% en sanitarios", type: "Promoción", views: 842, actions: 96, conversions: 24 },
  { id: "4", item: "Campaña sanitarios Reconquista", type: "Publicidad", views: 1150, actions: 122, conversions: 31 },
];

export default function EmpresaEstadisticasPage() {
  const [period, setPeriod] = useState("30 días");
  const [filter, setFilter] = useState("Todos");
  const [notice, setNotice] = useState("");

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filteredRows = useMemo(() => {
    if (filter === "Todos") return performanceRows;
    return performanceRows.filter((row) => row.type === filter);
  }, [filter]);

  const totals = useMemo(() => {
    return filteredRows.reduce(
      (acc, row) => ({
        views: acc.views + row.views,
        actions: acc.actions + row.actions,
        conversions: acc.conversions + row.conversions,
      }),
      { views: 0, actions: 0, conversions: 0 }
    );
  }, [filteredRows]);

  return (
    <main className="page">
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <nav>
          <button onClick={() => (window.location.href = "/empresa")}>▦ Mi Empresa</button>
          <button onClick={() => (window.location.href = "/empresa/publicar-empleo")}>＋ Publicar empleo</button>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}>⌕ Buscar candidatos</button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>◫ Postulantes</button>
          <button onClick={() => (window.location.href = "/mensajes")}>▱ Mensajes</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>▣ Videollamadas</button>
          <button onClick={() => (window.location.href = "/agenda")}>□ Agenda</button>
          <button onClick={() => (window.location.href = "/empresa/proveedores")}>⌘ Proveedores</button>
          <button onClick={() => (window.location.href = "/empresa/productos-servicios")}>▤ Productos / Servicios</button>
          <button onClick={() => (window.location.href = "/empresa/promociones")}>★ Promociones</button>
          <button onClick={() => (window.location.href = "/empresa/publicidad")}>◎ Publicidad</button>
          <button className="active">◉ Estadísticas</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Métricas con propósito</strong>
          <p>WorkCerca no debe medir solo clics. También debe mostrar acciones útiles, oportunidades y resultados reales.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Estadísticas</strong>
            <span>Entendé qué funciona y qué valor real está generando tu empresa en WorkCerca.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · ESTADÍSTICAS WORKCERCA</span>
              <h1>Medí visibilidad, interacción y resultados reales.</h1>
              <p>
                WorkCerca debe ayudar a entender si una publicación solo fue vista o si realmente
                generó una conversación, una postulación, una entrevista, una consulta o una venta.
              </p>
            </div>

            <div className="impactCard">
              <span>✦ Métrica de impacto</span>
              <strong>126 acciones útiles</strong>
              <p>
                No buscamos inflar números. Buscamos mostrar qué acciones ayudaron a conectar personas,
                trabajo, productos y servicios.
              </p>
            </div>
          </section>

          <section className="controls">
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option>7 días</option>
              <option>30 días</option>
              <option>90 días</option>
              <option>Este año</option>
            </select>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>Todos</option>
              <option>Empleo</option>
              <option>Producto</option>
              <option>Promoción</option>
              <option>Publicidad</option>
            </select>

            <button onClick={() => notify(`Reporte preparado para ${period}. La exportación real se conectará más adelante.`)}>
              Exportar reporte
            </button>
          </section>

          <section className="kpis">
            {statCards.map((card) => (
              <article key={card.label}>
                <strong>{card.value}</strong>
                <b>{card.label}</b>
                <span>{card.detail}</span>
              </article>
            ))}
          </section>

          <section className="summary">
            <article>
              <span>Visualizaciones</span>
              <strong>{totals.views}</strong>
              <small>Personas que vieron contenido</small>
            </article>
            <article>
              <span>Acciones</span>
              <strong>{totals.actions}</strong>
              <small>Mensajes, clics, postulaciones o consultas</small>
            </article>
            <article>
              <span>Resultados</span>
              <strong>{totals.conversions}</strong>
              <small>Acciones consideradas valiosas</small>
            </article>
          </section>

          <section className="panel">
            <div className="panelHead">
              <div>
                <span className="eyebrow dark">RENDIMIENTO</span>
                <h2>Qué está generando resultados</h2>
              </div>
              <small>Datos demostrativos hasta conectar Supabase y eventos reales.</small>
            </div>

            <div className="table">
              <div className="tableHead">
                <span>Publicación</span>
                <span>Tipo</span>
                <span>Vistas</span>
                <span>Acciones</span>
                <span>Resultados</span>
              </div>

              {filteredRows.map((row) => (
                <article key={row.id}>
                  <strong>{row.item}</strong>
                  <span className="tag">{row.type}</span>
                  <span>{row.views}</span>
                  <span>{row.actions}</span>
                  <span>{row.conversions}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="twoCol">
            <article className="insight">
              <span className="eyebrow dark">LECTURA IA FUTURA</span>
              <h2>Qué podría mejorar</h2>
              <p>
                La IA podrá explicar por qué una publicación recibe muchas vistas pero pocos contactos,
                qué datos faltan, si una promoción no es clara o si conviene mejorar su ubicación,
                descripción o público.
              </p>
              <button onClick={() => notify("Análisis IA: se conectará en la etapa IA.")}>
                ✦ Analizar con IA
              </button>
            </article>

            <article className="impact">
              <span className="eyebrow dark">IMPACTO WORKCERCA</span>
              <h2>No todo se mide en dinero.</h2>
              <p>
                Además de ventas y alcance, WorkCerca podrá medir contrataciones, postulaciones,
                entrevistas concretadas, presupuestos respondidos, capacitaciones verificadas y
                conexiones útiles generadas.
              </p>
            </article>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page select{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.impactCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.impactCard>span{font-size:9px;color:#078da8;font-weight:900}.impactCard strong{display:block;font-size:22px;margin:8px 0}.impactCard p{font-size:9px;color:#617287}.controls{display:flex;gap:8px;justify-content:flex-end;margin:16px 0}.controls select,.controls button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.kpis article,.summary article{background:#fff;border:1px solid #e1e7ed;border-radius:10px;padding:14px}.kpis strong,.kpis b,.kpis span{display:block}.kpis strong{font-size:23px}.kpis b{font-size:9px;margin-top:5px}.kpis span{font-size:8px;color:#718096;margin-top:3px}.summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}.summary span,.summary strong,.summary small{display:block}.summary span{font-size:8px;color:#718096}.summary strong{font-size:28px;margin:4px 0}.summary small{font-size:8px;color:#8290a0}.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead h2{font-size:20px;margin:4px 0 14px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.table{border:1px solid #e5eaf0;border-radius:10px;overflow:hidden}.tableHead,.table article{display:grid;grid-template-columns:2fr 1fr .7fr .7fr .7fr;gap:10px;align-items:center;padding:11px 13px}.tableHead{background:#f7f9fb;font-size:8px;font-weight:900;color:#718096}.table article{border-top:1px solid #edf1f4}.table article strong{font-size:9px}.table article>span{font-size:8px}.tag{display:inline-block;background:#eef7fb;color:#087f93;border-radius:999px;padding:5px 7px;font-weight:900}.twoCol{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}.insight,.impact{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.insight h2,.impact h2{font-size:19px;margin:4px 0}.insight p,.impact p{font-size:9px;line-height:1.6;color:#53677b}.insight button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.impact{background:#eefafd;border-color:#cde8ec}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:950px){.hero{grid-template-columns:1fr}.kpis{grid-template-columns:repeat(3,1fr)}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.kpis,.summary,.twoCol{grid-template-columns:1fr}.controls{flex-direction:column}.table{overflow:auto}.tableHead,.table article{min-width:650px}.content{padding:14px}}
      `}</style>
    </main>
  );
}
