"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Campaign = {
  id: string;
  name: string;
  objective: string;
  audience: string;
  location: string;
  budget: string;
  status: "Activa" | "Borrador" | "Finalizada";
  trust: "Verificado" | "Identidad confirmada" | "En revisión";
  description: string;
};

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Campaña sanitarios Reconquista",
    objective: "Visibilizar productos",
    audience: "Personas interesadas en hogar / construcción",
    location: "Reconquista",
    budget: "$ 25.000",
    status: "Activa",
    trust: "Verificado",
    description: "Campaña demostrativa asociada a productos sanitarios y búsquedas relacionadas.",
  },
  {
    id: "2",
    name: "Servicios comerciales para pymes",
    objective: "Generar contactos",
    audience: "Comercios y pequeñas empresas",
    location: "Avellaneda",
    budget: "$ 18.000",
    status: "Borrador",
    trust: "Identidad confirmada",
    description: "Campaña para dar visibilidad a servicios de mantenimiento y soporte comercial.",
  },
];

export default function EmpresaPublicidadPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    name: "",
    objective: "",
    audience: "",
    location: "",
    budget: "",
    description: "",
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const text = `${campaign.name} ${campaign.objective} ${campaign.audience} ${campaign.location}`.toLowerCase();
      const searchOk = !q || text.includes(q);
      const statusOk = filter === "Todas" || campaign.status === filter;
      return searchOk && statusOk;
    });
  }, [campaigns, search, filter]);

  const addDraft = () => {
    if (!form.name.trim() || !form.objective.trim()) {
      notify("Completá nombre y objetivo de campaña.");
      return;
    }

    const newCampaign: Campaign = {
      id: String(Date.now()),
      name: form.name.trim(),
      objective: form.objective.trim(),
      audience: form.audience.trim() || "Audiencia por definir",
      location: form.location.trim() || "Ubicación no informada",
      budget: form.budget.trim() || "Sin presupuesto definido",
      status: "Borrador",
      trust: "En revisión",
      description: form.description.trim() || "Descripción pendiente de completar.",
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    setForm({
      name: "",
      objective: "",
      audience: "",
      location: "",
      budget: "",
      description: "",
    });
    notify("Borrador de campaña creado.");
  };

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
          <button className="active">◎ Publicidad</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Regla WorkCerca</strong>
          <p>La publicidad compra alcance, no confianza. Una campaña patrocinada nunca debe parecer verificada si no lo está.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Publicidad</strong>
            <span>Impulsá publicaciones sin alterar la confianza ni engañar a la comunidad.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · PUBLICIDAD WORKCERCA</span>
              <h1>Más visibilidad, pero siempre con contexto y transparencia.</h1>
              <p>
                WorkCerca podrá ofrecer campañas para productos, servicios, promociones y
                oportunidades. Todo contenido patrocinado deberá estar claramente identificado.
              </p>
            </div>

            <div className="aiCard">
              <span>✦ IA de relevancia publicitaria</span>
              <strong>Publicidad útil, no invasiva.</strong>
              <p>
                La IA podrá sugerir audiencias y momentos relevantes, pero no podrá ocultar
                que una publicación es patrocinada ni modificar su nivel de confianza.
              </p>
            </div>
          </section>

          <section className="principles">
            <article>
              <strong>Visibilidad</strong>
              <span>Se puede contratar.</span>
            </article>
            <article>
              <strong>Confianza</strong>
              <span>Se gana y se verifica.</span>
            </article>
            <article>
              <strong>Relevancia</strong>
              <span>Debe ayudar, no saturar.</span>
            </article>
            <article>
              <strong>Transparencia</strong>
              <span>Todo anuncio debe decir “Patrocinado”.</span>
            </article>
          </section>

          <section className="builder">
            <div>
              <span className="eyebrow dark">NUEVA CAMPAÑA</span>
              <h2>Crear campaña publicitaria</h2>
            </div>

            <div className="formGrid">
              <label>
                Nombre de campaña
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej.: Campaña sanitarios Reconquista"
                />
              </label>

              <label>
                Objetivo
                <input
                  value={form.objective}
                  onChange={(e) => setForm((prev) => ({ ...prev, objective: e.target.value }))}
                  placeholder="Ej.: Visibilizar productos"
                />
              </label>

              <label>
                Audiencia
                <input
                  value={form.audience}
                  onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))}
                  placeholder="Ej.: Comercios, hogares, estudiantes..."
                />
              </label>

              <label>
                Ubicación / radio
                <input
                  value={form.location}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Ciudad, localidad o zona"
                />
              </label>

              <label>
                Presupuesto
                <input
                  value={form.budget}
                  onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                  placeholder="Ej.: $ 25.000"
                />
              </label>

              <label className="full">
                Descripción
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Qué querés promocionar y por qué puede ser útil."
                />
              </label>
            </div>

            <div className="builderActions">
              <button onClick={() => notify("La IA de segmentación se conectará en la etapa IA.")}>
                ✦ Sugerir audiencia con IA
              </button>
              <button className="primary" onClick={addDraft}>
                Guardar borrador
              </button>
            </div>
          </section>

          <section className="toolbar">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar campaña..."
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>Todas</option>
              <option>Activa</option>
              <option>Borrador</option>
              <option>Finalizada</option>
            </select>
          </section>

          <section className="panel">
            <div className="panelHead">
              <div>
                <span className="eyebrow dark">CAMPAÑAS</span>
                <h2>{filtered.length} campañas</h2>
              </div>
              <small>Datos demostrativos hasta conectar Supabase.</small>
            </div>

            <div className="cards">
              {filtered.map((campaign) => (
                <article key={campaign.id}>
                  <div className="cardTop">
                    <span className="sponsored">PATROCINADO</span>
                    <span className={`state ${campaign.status === "Activa" ? "activeState" : ""}`}>
                      {campaign.status}
                    </span>
                  </div>

                  <h3>{campaign.name}</h3>
                  <p className="objective">{campaign.objective}</p>
                  <p className="meta">Audiencia: {campaign.audience}</p>
                  <p className="meta">⌖ {campaign.location}</p>
                  <strong className="budget">{campaign.budget}</strong>
                  <p className="description">{campaign.description}</p>

                  <div className="trust">
                    🛡 {campaign.trust}
                  </div>

                  <div className="actions">
                    <button onClick={() => notify(`Editar campaña: ${campaign.name}`)}>Editar</button>
                    <button onClick={() => notify(`Rendimiento: ${campaign.name}`)}>Rendimiento</button>
                    <button onClick={() => notify(`Vista pública: ${campaign.name}`)}>Vista pública</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="safety">
            <strong>🛡 Publicidad responsable WorkCerca</strong>
            <p>
              Una campaña no podrá ocultar advertencias de confianza, falsear verificaciones ni
              desplazar información crítica u oficial. La monetización debe convivir con la utilidad
              y seguridad de la comunidad.
            </p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page select,.page textarea{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.aiCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.aiCard>span{font-size:9px;color:#078da8;font-weight:900}.aiCard strong{display:block;font-size:14px;margin:8px 0}.aiCard p{font-size:9px;color:#617287}.principles{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}.principles article{background:#fff;border:1px solid #e1e7ed;border-radius:10px;padding:13px}.principles strong,.principles span{display:block}.principles strong{font-size:11px}.principles span{font-size:8px;color:#718096;margin-top:4px}.builder,.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-top:16px}.builder h2,.panelHead h2{font-size:20px;margin:4px 0 14px}.formGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.formGrid label{font-size:9px;font-weight:700}.formGrid input,.formGrid textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.formGrid textarea{min-height:90px}.formGrid .full{grid-column:1/-1}.builderActions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.builderActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.builderActions .primary{border:0;background:#071a3d;color:#fff}.toolbar{display:grid;grid-template-columns:1fr 220px;gap:10px;margin:16px 0}.toolbar input,.toolbar select{border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:11px}.cards article{border:1px solid #e2e8ee;border-radius:11px;padding:15px}.cardTop{display:flex;justify-content:space-between;gap:8px}.sponsored,.state,.trust{font-size:7px;font-weight:900;border-radius:999px;padding:5px 7px}.sponsored{background:#f0ecfb;color:#655096}.state{background:#fff6df;color:#8b6500}.activeState{background:#e7f7f0;color:#16735a}.trust{display:inline-block;background:#eefafd;color:#087f93;margin:6px 0}.cards h3{font-size:12px;margin:11px 0 4px}.objective{font-size:9px;font-weight:700}.meta{font-size:8px;color:#718096}.budget{display:block;font-size:15px;margin:10px 0}.description{font-size:9px;color:#53677b;line-height:1.5}.actions{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}.actions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px 8px;font-size:7px;cursor:pointer}.safety{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:11px;padding:14px}.safety strong{font-size:11px;color:#087f93}.safety p{font-size:9px;color:#53677b;line-height:1.5;margin-bottom:0}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.hero{grid-template-columns:1fr}.principles{grid-template-columns:1fr 1fr}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.principles,.formGrid,.toolbar,.cards{grid-template-columns:1fr}.formGrid .full{grid-column:auto}.content{padding:14px}}
      `}</style>
    </main>
  );
}
