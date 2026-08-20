"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Provider = {
  id: string;
  name: string;
  category: string;
  location: string;
  trust: "Verificado" | "Identidad confirmada" | "En revisión";
  description: string;
  services: string[];
};

const providers: Provider[] = [
  { id:"1", name:"Electricidad Norte", category:"Electricidad", location:"Reconquista", trust:"Verificado", description:"Servicios eléctricos para comercios, oficinas y pequeñas empresas.", services:["Instalaciones","Mantenimiento","Urgencias"] },
  { id:"2", name:"Servicios Integrales Avellaneda", category:"Mantenimiento", location:"Avellaneda", trust:"Identidad confirmada", description:"Mantenimiento general y soluciones para espacios comerciales.", services:["Pintura","Reparaciones","Mantenimiento"] },
  { id:"3", name:"Clima Profesional", category:"Refrigeración", location:"Reconquista", trust:"En revisión", description:"Instalación y mantenimiento de equipos de climatización.", services:["Aire acondicionado","Service","Instalación"] },
];

export default function EmpresaProveedoresPage() {
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("todas");
  const [notice,setNotice] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return providers.filter(p => {
      const text = `${p.name} ${p.category} ${p.location} ${p.services.join(" ")}`.toLowerCase();
      return (!q || text.includes(q)) && (category === "todas" || p.category === category);
    });
  },[search,category]);

  const notify = (text:string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""),2200);
  };

  return (
    <main className="page">
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => window.location.href="/"}>
          <img src={logoHeader.src} alt="WorkCerca"/>
        </button>
        <nav>
          <button onClick={() => window.location.href="/empresa"}>▦ Mi Empresa</button>
          <button onClick={() => window.location.href="/empresa/publicar-empleo"}>＋ Publicar empleo</button>
          <button onClick={() => window.location.href="/empresa/candidatos"}>⌕ Buscar candidatos</button>
          <button onClick={() => window.location.href="/empresa/postulantes"}>◫ Postulantes</button>
          <button onClick={() => window.location.href="/mensajes"}>▱ Mensajes</button>
          <button onClick={() => window.location.href="/videollamadas"}>▣ Videollamadas</button>
          <button onClick={() => window.location.href="/agenda"}>□ Agenda</button>
          <button className="active">⌘ Proveedores</button>
        </nav>
        <div className="trust">
          <strong>🛡 WorkCerca Confianza</strong>
          <p>La identidad y la confianza no se compran. Las verificaciones deben estar respaldadas por controles reales.</p>
        </div>
      </aside>

      <section className="main">
        <header className="top">
          <div><strong>Proveedores y profesionales</strong><span>Encontrá soluciones para las necesidades reales de tu empresa.</span></div>
          <button onClick={() => window.location.href="/empresa"}>Volver a Mi Empresa</button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · RED DE PROVEEDORES</span>
              <h1>Conectá con personas y empresas que puedan ayudarte a crecer.</h1>
              <p>Buscá profesionales, proveedores y servicios por especialidad y ubicación. Antes de contratar, WorkCerca mostrará el nivel de confianza disponible.</p>
            </div>
            <div className="ai">
              <span>✦ IA + Confianza WorkCerca</span>
              <strong>Buscar no alcanza. También hay que poder confiar.</strong>
              <p>La IA podrá detectar inconsistencias y señales de riesgo, pero nunca presentará una alerta automática como prueba definitiva de fraude.</p>
            </div>
          </section>

          <section className="quick">
            <button onClick={() => notify("Solicitud de presupuesto: se conectará en el módulo Nº 23.")}><span>▧</span><strong>Solicitar presupuesto</strong><small>Contá qué necesita tu empresa</small></button>
            <button onClick={() => notify("Publicar necesidad se conectará en la etapa de integración.")}><span>＋</span><strong>Publicar necesidad</strong><small>Recibí propuestas relacionadas</small></button>
            <button onClick={() => notify("Profesionales cercanos se conectará al módulo Profesionales.")}><span>⌖</span><strong>Profesionales cercanos</strong><small>Búsqueda por ubicación</small></button>
          </section>

          <section className="filters">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar proveedor, servicio, localidad..."/>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option value="todas">Todas las categorías</option>
              <option value="Electricidad">Electricidad</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Refrigeración">Refrigeración</option>
            </select>
          </section>

          <section className="panel">
            <div className="panelHead">
              <div><span className="eyebrow dark">RED WORKCERCA</span><h2>{filtered.length} proveedores encontrados</h2></div>
              <small>Perfiles demostrativos hasta conectar datos reales.</small>
            </div>
            <div className="grid">
              {filtered.map(provider => (
                <article key={provider.id}>
                  <div className="providerHead">
                    <div className="avatar">{provider.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
                    <div><h3>{provider.name}</h3><p>{provider.category} · ⌖ {provider.location}</p></div>
                  </div>
                  <div className={`status ${provider.trust === "Verificado" ? "verified" : ""}`}>🛡 {provider.trust}</div>
                  <p className="description">{provider.description}</p>
                  <div className="tags">{provider.services.map(service => <span key={service}>{service}</span>)}</div>
                  <div className="actions">
                    <button onClick={() => notify(`Perfil de ${provider.name}: se conectará al crear perfiles de proveedores.`)}>Ver perfil</button>
                    <button onClick={() => window.location.href=`/mensajes?candidato=${encodeURIComponent(provider.name)}`}>Mensaje</button>
                    <button onClick={() => window.location.href=`/agenda?candidato=${encodeURIComponent(provider.name)}&nuevo=reunion`}>Agendar</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="safety">
            <strong>🛡 Antes de contratar</strong>
            <p>WorkCerca debe diferenciar identidad confirmada, información en revisión y verificaciones respaldadas. Un anuncio pago nunca modificará el nivel de confianza de un proveedor.</p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page select{font:inherit}.sidebar{width:240px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;min-height:100vh}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;cursor:pointer;font-size:11px}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trust{border:1px solid #2e5876;border-radius:11px;padding:13px;margin-top:22px}.trust strong{font-size:10px;color:#38d8d3}.trust p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.top{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:15px}.top strong,.top span{display:block}.top span{font-size:10px;color:#718096;margin-top:4px}.top button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.ai{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.ai>span{font-size:9px;color:#078da8;font-weight:900}.ai strong{display:block;font-size:14px;margin:8px 0}.ai p{font-size:9px;color:#617287}.quick{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}.quick button{border:1px solid #dfe6ed;background:#fff;border-radius:11px;padding:14px;text-align:left;color:#071a3d;cursor:pointer}.quick span{display:grid;place-items:center;width:34px;height:34px;background:#eaf5fb;color:#087d9b;border-radius:8px}.quick strong,.quick small{display:block}.quick strong{font-size:11px;margin:7px 0 3px}.quick small{font-size:8px;color:#718096}.filters{display:grid;grid-template-columns:1fr 240px;gap:10px;margin-bottom:16px}.filters input,.filters select{border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px}.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead h2{font-size:20px;margin:4px 0 14px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.grid article{border:1px solid #e2e8ee;border-radius:11px;padding:15px}.providerHead{display:flex;gap:9px;align-items:center}.avatar{width:42px;height:42px;border-radius:50%;background:#e8f5f8;color:#087f93;display:grid;place-items:center;font-size:10px;font-weight:900}.providerHead h3{font-size:11px;margin:0}.providerHead p{font-size:8px;color:#718096;margin:3px 0}.status{display:inline-block;margin-top:11px;background:#fff6df;color:#8b6500;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:800}.status.verified{background:#e7f7f0;color:#16735a}.description{font-size:9px;color:#53677b;line-height:1.5}.tags{display:flex;gap:5px;flex-wrap:wrap;margin:10px 0}.tags span{font-size:7px;background:#eef7fb;color:#087f93;padding:5px 7px;border-radius:999px}.actions{display:flex;gap:5px;flex-wrap:wrap}.actions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px 8px;font-size:8px;cursor:pointer}.safety{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:11px;padding:14px}.safety strong{font-size:11px;color:#087f93}.safety p{font-size:9px;color:#53677b;line-height:1.5;margin-bottom:0}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}.hero{grid-template-columns:1fr}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.quick,.filters,.grid{grid-template-columns:1fr}.content{padding:14px}}
      `}</style>
    </main>
  );
}
