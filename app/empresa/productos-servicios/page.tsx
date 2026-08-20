"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Listing = {
  id: string;
  type: "Producto" | "Servicio";
  title: string;
  category: string;
  price: string;
  location: string;
  status: "Publicado" | "Borrador";
  trust: "Verificado" | "Identidad confirmada" | "En revisión";
  description: string;
};

const initialListings: Listing[] = [
  {
    id: "1",
    type: "Producto",
    title: "Carretilla reforzada",
    category: "Ferretería / Construcción",
    price: "$ 89.000",
    location: "Reconquista",
    status: "Publicado",
    trust: "Verificado",
    description: "Carretilla para obra y uso intensivo. Publicación demostrativa.",
  },
  {
    id: "2",
    type: "Servicio",
    title: "Mantenimiento eléctrico comercial",
    category: "Electricidad",
    price: "Consultar",
    location: "Reconquista",
    status: "Publicado",
    trust: "Identidad confirmada",
    description: "Servicio para comercios, oficinas y pequeñas empresas.",
  },
  {
    id: "3",
    type: "Producto",
    title: "Kit sanitario baño",
    category: "Sanitarios",
    price: "$ 24.500",
    location: "Avellaneda",
    status: "Borrador",
    trust: "En revisión",
    description: "Ejemplo de producto que más adelante podrá relacionarse con búsquedas cotidianas mediante IA.",
  },
];

export default function EmpresaProductosServiciosPage() {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    type: "Producto",
    title: "",
    category: "",
    price: "",
    location: "",
    description: "",
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return listings.filter((item) => {
      const text = `${item.title} ${item.category} ${item.location} ${item.description}`.toLowerCase();
      const searchOk = !q || text.includes(q);
      const filterOk = filter === "Todos" || item.type === filter;
      return searchOk && filterOk;
    });
  }, [listings, search, filter]);

  const addDraft = () => {
    if (!form.title.trim() || !form.category.trim()) {
      notify("Completá título y categoría.");
      return;
    }

    const newListing: Listing = {
      id: String(Date.now()),
      type: form.type as "Producto" | "Servicio",
      title: form.title.trim(),
      category: form.category.trim(),
      price: form.price.trim() || "Consultar",
      location: form.location.trim() || "Ubicación no informada",
      status: "Borrador",
      trust: "En revisión",
      description: form.description.trim() || "Descripción pendiente de completar.",
    };

    setListings((prev) => [newListing, ...prev]);
    setForm({
      type: "Producto",
      title: "",
      category: "",
      price: "",
      location: "",
      description: "",
    });
    notify("Borrador creado. Más adelante se guardará en Supabase.");
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
          <button className="active">▤ Productos / Servicios</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Confianza WorkCerca</strong>
          <p>Una publicación paga puede ganar visibilidad, pero nunca comprar verificación o confianza.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Productos y servicios</strong>
            <span>Mostrá lo que tu empresa ofrece dentro del ecosistema WorkCerca.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · VIDRIERA WORKCERCA</span>
              <h1>Publicá mejor para que las personas encuentren lo que realmente necesitan.</h1>
              <p>
                WorkCerca no quiere limitar una publicación a una foto y un precio.
                La IA ayudará a completar información útil sin inventar características.
              </p>
            </div>

            <div className="aiCard">
              <span>✦ Asistente IA de publicación</span>
              <strong>De “foto + precio” a una publicación clara.</strong>
              <p>
                La IA podrá sugerir título, descripción, datos faltantes, entrega,
                disponibilidad y palabras relacionadas con búsquedas cotidianas.
              </p>
            </div>
          </section>

          <section className="builder">
            <div>
              <span className="eyebrow dark">NUEVA PUBLICACIÓN</span>
              <h2>Crear producto o servicio</h2>
            </div>

            <div className="formGrid">
              <label>
                Tipo
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                >
                  <option>Producto</option>
                  <option>Servicio</option>
                </select>
              </label>

              <label>
                Título
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej.: Carretilla reforzada"
                />
              </label>

              <label>
                Categoría
                <input
                  value={form.category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Ej.: Ferretería"
                />
              </label>

              <label>
                Precio
                <input
                  value={form.price}
                  onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="Ej.: $ 89.000 o Consultar"
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

              <label className="full">
                Descripción
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Contá qué ofrecés. Más adelante la IA te ayudará a completar lo que falte."
                />
              </label>
            </div>

            <div className="builderActions">
              <button onClick={() => notify("Asistente IA para mejorar publicaciones: se conectará en la etapa IA.")}>
                ✦ Mejorar con IA
              </button>
              <button className="primary" onClick={addDraft}>Guardar borrador</button>
            </div>
          </section>

          <section className="toolbar">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar publicación..."
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>Todos</option>
              <option>Producto</option>
              <option>Servicio</option>
            </select>
          </section>

          <section className="panel">
            <div className="panelHead">
              <div>
                <span className="eyebrow dark">CATÁLOGO EMPRESA</span>
                <h2>{filtered.length} publicaciones</h2>
              </div>
              <small>Datos demostrativos hasta conectar Supabase.</small>
            </div>

            <div className="cards">
              {filtered.map((item) => (
                <article key={item.id}>
                  <div className="cardTop">
                    <span className={`type ${item.type === "Servicio" ? "service" : ""}`}>
                      {item.type}
                    </span>
                    <span className={`state ${item.status === "Publicado" ? "published" : ""}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p className="category">{item.category} · ⌖ {item.location}</p>
                  <strong className="price">{item.price}</strong>
                  <p className="description">{item.description}</p>

                  <div className="trust">
                    🛡 {item.trust}
                  </div>

                  <div className="actions">
                    <button onClick={() => notify(`Editar: ${item.title}`)}>Editar</button>
                    <button onClick={() => notify(`Vista pública: ${item.title}`)}>Vista pública</button>
                    <button onClick={() => notify(`Promocionar ${item.title}: se conectará al módulo Nº 15.`)}>
                      Crear promoción
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="example">
            <strong>✦ Ejemplo de búsqueda inteligente</strong>
            <p>
              Si una persona escribe “necesito el cosito del baño porque pierde agua”,
              WorkCerca podrá interpretar la necesidad y relacionarla con productos,
              comercios, promociones y profesionales adecuados, sin exigir que conozca
              el nombre técnico.
            </p>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page select,.page textarea{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.aiCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.aiCard>span{font-size:9px;color:#078da8;font-weight:900}.aiCard strong{display:block;font-size:14px;margin:8px 0}.aiCard p{font-size:9px;color:#617287}.builder,.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-top:16px}.builder h2,.panelHead h2{font-size:20px;margin:4px 0 14px}.formGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.formGrid label{font-size:9px;font-weight:700}.formGrid input,.formGrid select,.formGrid textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.formGrid textarea{min-height:90px}.formGrid .full{grid-column:1/-1}.builderActions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.builderActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.builderActions .primary{border:0;background:#071a3d;color:#fff}.toolbar{display:grid;grid-template-columns:1fr 220px;gap:10px;margin:16px 0}.toolbar input,.toolbar select{border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}.cards article{border:1px solid #e2e8ee;border-radius:11px;padding:15px}.cardTop{display:flex;justify-content:space-between;gap:8px}.type,.state{font-size:7px;font-weight:900;border-radius:999px;padding:5px 7px}.type{background:#eef7fb;color:#087f93}.type.service{background:#f2eefb;color:#655096}.state{background:#fff6df;color:#8b6500}.state.published{background:#e7f7f0;color:#16735a}.cards h3{font-size:12px;margin:11px 0 4px}.category{font-size:8px;color:#718096}.price{display:block;font-size:14px;margin:10px 0}.description{font-size:9px;color:#53677b;line-height:1.5}.trust{display:inline-block;background:#eefafd;color:#087f93;border-radius:999px;padding:5px 8px;font-size:7px;font-weight:900;margin:7px 0}.actions{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}.actions button{border:1px solid #dce3ea;background:#fff;border-radius:6px;padding:6px 8px;font-size:7px;cursor:pointer}.example{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:11px;padding:14px}.example strong{font-size:11px;color:#087f93}.example p{font-size:9px;color:#53677b;line-height:1.5;margin-bottom:0}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.hero{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.formGrid,.toolbar,.cards{grid-template-columns:1fr}.formGrid .full{grid-column:auto}.content{padding:14px}}
      `}</style>
    </main>
  );
}
