"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Promotion = {
  id: string;
  title: string;
  product: string;
  discount: string;
  location: string;
  validUntil: string;
  status: "Activa" | "Borrador" | "Finalizada";
  trust: "Verificado" | "Identidad confirmada" | "En revisión";
  description: string;
};

const initialPromotions: Promotion[] = [
  {
    id: "1",
    title: "15% en sanitarios seleccionados",
    product: "Productos sanitarios",
    discount: "15% OFF",
    location: "Reconquista",
    validUntil: "2026-08-31",
    status: "Activa",
    trust: "Verificado",
    description: "Promoción demostrativa para productos sanitarios seleccionados.",
  },
  {
    id: "2",
    title: "Service comercial con precio promocional",
    product: "Servicio de mantenimiento",
    discount: "Consultar",
    location: "Avellaneda",
    validUntil: "2026-09-10",
    status: "Activa",
    trust: "Identidad confirmada",
    description: "Beneficio temporal para comercios y pequeñas empresas.",
  },
  {
    id: "3",
    title: "Promo lanzamiento herramientas",
    product: "Ferretería",
    discount: "10% OFF",
    location: "Reconquista",
    validUntil: "2026-09-15",
    status: "Borrador",
    trust: "En revisión",
    description: "Borrador de promoción pendiente de completar y revisar.",
  },
];

export default function EmpresaPromocionesPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    title: "",
    product: "",
    discount: "",
    location: "",
    validUntil: "",
    description: "",
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return promotions.filter((promo) => {
      const text = `${promo.title} ${promo.product} ${promo.location} ${promo.description}`.toLowerCase();
      const searchOk = !q || text.includes(q);
      const statusOk = filter === "Todas" || promo.status === filter;
      return searchOk && statusOk;
    });
  }, [promotions, search, filter]);

  const addDraft = () => {
    if (!form.title.trim() || !form.product.trim() || !form.validUntil) {
      notify("Completá título, producto/servicio y vigencia.");
      return;
    }

    const newPromotion: Promotion = {
      id: String(Date.now()),
      title: form.title.trim(),
      product: form.product.trim(),
      discount: form.discount.trim() || "Consultar",
      location: form.location.trim() || "Ubicación no informada",
      validUntil: form.validUntil,
      status: "Borrador",
      trust: "En revisión",
      description: form.description.trim() || "Descripción pendiente de completar.",
    };

    setPromotions((prev) => [newPromotion, ...prev]);
    setForm({
      title: "",
      product: "",
      discount: "",
      location: "",
      validUntil: "",
      description: "",
    });
    notify("Borrador de promoción creado.");
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
          <button className="active">★ Promociones</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Confianza WorkCerca</strong>
          <p>Una promoción puede pagar por visibilidad, pero nunca por confianza o verificación.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Promociones</strong>
            <span>Creá ofertas claras, útiles y verificables para llegar a las personas correctas.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · PROMOCIONES WORKCERCA</span>
              <h1>Una promoción útil debe aparecer cuando realmente puede servir.</h1>
              <p>
                WorkCerca podrá relacionar promociones con búsquedas, ubicación, productos,
                servicios y necesidades concretas sin convertir la plataforma en spam.
              </p>
            </div>

            <div className="aiCard">
              <span>✦ IA de relevancia</span>
              <strong>Más relevancia, menos ruido.</strong>
              <p>
                La IA podrá sugerir a quién mostrar una promoción según contexto y necesidad,
                pero siempre respetando ubicación, preferencias y confianza.
              </p>
            </div>
          </section>

          <section className="builder">
            <div>
              <span className="eyebrow dark">NUEVA PROMOCIÓN</span>
              <h2>Crear promoción</h2>
            </div>

            <div className="formGrid">
              <label>
                Título
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej.: 15% en sanitarios seleccionados"
                />
              </label>

              <label>
                Producto / servicio relacionado
                <input
                  value={form.product}
                  onChange={(e) => setForm((prev) => ({ ...prev, product: e.target.value }))}
                  placeholder="Ej.: Productos sanitarios"
                />
              </label>

              <label>
                Beneficio
                <input
                  value={form.discount}
                  onChange={(e) => setForm((prev) => ({ ...prev, discount: e.target.value }))}
                  placeholder="Ej.: 15% OFF"
                />
              </label>

              <label>
                Ubicación
                <input
                  value={form.location}
                  onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Ciudad / localidad"
                />
              </label>

              <label>
                Vigente hasta
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={(e) => setForm((prev) => ({ ...prev, validUntil: e.target.value }))}
                />
              </label>

              <label className="full">
                Descripción
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Explicá con claridad qué incluye la promoción y sus condiciones."
                />
              </label>
            </div>

            <div className="builderActions">
              <button onClick={() => notify("La IA para mejorar promociones se conectará en la etapa IA.")}>
                ✦ Mejorar con IA
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
              placeholder="Buscar promoción..."
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
                <span className="eyebrow dark">PROMOCIONES EMPRESA</span>
                <h2>{filtered.length} promociones</h2>
              </div>
              <small>Datos demostrativos hasta conectar Supabase.</small>
            </div>

            <div className="cards">
              {filtered.map((promo) => (
                <article key={promo.id}>
                  <div className="cardTop">
                    <span className={`state ${promo.status === "Activa" ? "activeState" : ""}`}>
                      {promo.status}
                    </span>
                    <span className="trust">🛡 {promo.trust}</span>
                  </div>

                  <h3>{promo.title}</h3>
                  <p className="product">{promo.product} · ⌖ {promo.location}</p>
                  <strong className="discount">{promo.discount}</strong>
                  <p className="description">{promo.description}</p>
                  <small>Vigente hasta {promo.validUntil}</small>

                  <div className="actions">
                    <button onClick={() => notify(`Editar: ${promo.title}`)}>Editar</button>
                    <button onClick={() => notify(`Vista pública: ${promo.title}`)}>Vista pública</button>
                    <button onClick={() => notify(`Estadísticas: ${promo.title}`)}>Estadísticas</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="relevance">
            <strong>✦ Cómo se conectará con el ecosistema</strong>
            <p>
              Si alguien busca un producto, servicio o necesidad relacionada, WorkCerca podrá
              mostrar una promoción relevante del comercio o empresa correspondiente. Más adelante
              esto se conectará con ubicación, productos, servicios, IA y notificaciones.
            </p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page select,.page textarea{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.aiCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.aiCard>span{font-size:9px;color:#078da8;font-weight:900}.aiCard strong{display:block;font-size:14px;margin:8px 0}.aiCard p{font-size:9px;color:#617287}.builder,.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-top:16px}.builder h2,.panelHead h2{font-size:20px;margin:4px 0 14px}.formGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.formGrid label{font-size:9px;font-weight:700}.formGrid input,.formGrid textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.formGrid textarea{min-height:90px}.formGrid .full{grid-column:1/-1}.builderActions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.builderActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.builderActions .primary{border:0;background:#071a3d;color:#fff}.toolbar{display:grid;grid-template-columns:1fr 220px;gap:10px;margin:16px 0}.toolbar input,.toolbar select{border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.cards article{border:1px solid #e2e8ee;border-radius:11px;padding:15px}.cardTop{display:flex;justify-content:space-between;gap:8px}.state,.trust{font-size:7px;font-weight:900;border-radius:999px;padding:5px 7px}.state{background:#fff6df;color:#8b6500}.activeState{background:#e7f7f0;color:#16735a}.trust{background:#eefafd;color:#087f93}.cards h3{font-size:12px;margin:11px 0 4px}.product{font-size:8px;color:#718096}.discount{display:block;font-size:15px;margin:10px 0}.description{font-size:9px;color:#53677b;line-height:1.5}.cards small{font-size:8px;color:#718096}.actions{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}.actions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px 8px;font-size:7px;cursor:pointer}.relevance{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:11px;padding:14px}.relevance strong{font-size:11px;color:#087f93}.relevance p{font-size:9px;color:#53677b;line-height:1.5;margin-bottom:0}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.hero{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.formGrid,.toolbar,.cards{grid-template-columns:1fr}.formGrid .full{grid-column:auto}.content{padding:14px}}
      `}</style>
    </main>
  );
}
