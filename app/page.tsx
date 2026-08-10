"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoOficioCerca from "../c5ec2fc2-7957-4add-a75a-7319deca2cc3.png";
import qrOficioCerca from "../qr-oficiocerca-web.png";

// Contacto institucional de OficioCerca.
// Cuando tengas el número y el correo definitivos, solo hay que completar estos dos valores.
const OFICIOCERCA_WHATSAPP = "543482640585";
const OFICIOCERCA_EMAIL = "oficiocerca@oficiocerca.com";
const OFICIOCERCA_INSTAGRAM = "oficiocerca";
const OFICIOCERCA_WEB = "https://oficiocerca-web.vercel.app/";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);


const categories = [
  ["🛠️", "Profesionales", "Encontrá oficios y especialistas cerca."],
  ["💼", "Primer empleo", "Capacitate y encontrá tu primera oportunidad."],
  ["🎓", "Cursos", "Aprendé, actualizate y desarrollá tu oficio."],
  ["🚀", "Emprendedores", "Convertí tu idea en una oportunidad."],
  ["🌱", "Productores regionales", "Descubrí productos hechos en tu región."],
  ["🎨", "Artesanos", "Visibilizá y conectá tus creaciones."],
  ["🏪", "Comercios", "Mostrá tus productos y servicios."],
  ["🏢", "Empresas", "Encontrá talento y proveedores capacitados."],
  ["♿", "Inclusión", "Oportunidades y herramientas accesibles."],
];

const professionals = [
  { name: "Perfil Demo Electricidad", job: "Electricista", city: "Reconquista", rating: "4.9", icon: "⚡", description: "Perfil demostrativo para probar cómo se verá un profesional real dentro de OficioCerca.", availability: "Disponible hoy", rate: "Tarifa a consultar", services: ["Instalaciones eléctricas", "Reparaciones", "Mantenimiento"] },
  { name: "Perfil Demo Pintura", job: "Pintora", city: "Avellaneda", rating: "4.8", icon: "🎨", description: "Perfil demostrativo para visualizar servicios de pintura, mantenimiento y mejoras del hogar.", availability: "Disponible esta semana", rate: "Presupuesto sin cargo", services: ["Pintura interior", "Pintura exterior", "Mantenimiento"] },
  { name: "Perfil Demo Refrigeración", job: "Técnico en refrigeración", city: "Reconquista", rating: "5.0", icon: "❄️", description: "Perfil demostrativo para mostrar cómo funcionarán los servicios técnicos especializados.", availability: "Consultar disponibilidad", rate: "Tarifa a consultar", services: ["Aire acondicionado", "Refrigeración", "Mantenimiento preventivo"] },
  { name: "Perfil Demo Plomería", job: "Plomero", city: "Reconquista", rating: "4.7", icon: "🚰", description: "Perfil demostrativo para servicios de plomería y mantenimiento domiciliario.", availability: "Disponible hoy", rate: "Presupuesto previo", services: ["Pérdidas de agua", "Instalaciones", "Destapes"] },
];

const courses = [
  { title: "Electricidad básica", level: "Inicial", place: "OficioCerca Academy" },
  { title: "Cómo iniciar un emprendimiento", level: "Emprendedores", place: "Institución aliada" },
  { title: "Herramientas digitales para el trabajo", level: "Inicial", place: "OficioCerca Academy" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Inicio");
  const [notice, setNotice] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<any | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactZone, setContactZone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return professionals;
    return professionals.filter(p =>
      `${p.name} ${p.job} ${p.city} ${p.services.join(" ")}`.toLowerCase().includes(q)
    );
  }, [query]);

  const action = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const searchNow = () => {
    window.setTimeout(() => {
      const section = document.getElementById("professionals");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  };

  const openProfile = (professional: any) => {
    setSelectedProfessional(professional);
    setContactOpen(false);
    setContactName("");
    setContactPhone("");
    setContactZone("");
    setContactMessage("");
  };

  const closeProfile = () => {
    setSelectedProfessional(null);
    setContactOpen(false);
    setContactName("");
    setContactPhone("");
    setContactZone("");
    setContactMessage("");
  };

  const sendContactRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProfessional) return;

    const request = {
      professional: selectedProfessional.name,
      service: selectedProfessional.job,
      name: contactName,
      phone: contactPhone,
      zone: contactZone,
      message: contactMessage,
      createdAt: new Date().toISOString(),
    };

    const current = JSON.parse(localStorage.getItem("oficiocerca-contactos") || "[]");
    current.push(request);
    localStorage.setItem("oficiocerca-contactos", JSON.stringify(current));

    if (!OFICIOCERCA_WHATSAPP) {
      setNotice("La solicitud quedó guardada. El WhatsApp institucional de OficioCerca se incorporará antes del lanzamiento.");
      return;
    }

    const whatsappMessage = [
      "Hola! Quiero solicitar un servicio desde OficioCerca.",
      "",
      `Servicio: ${selectedProfessional.job}`,
      `Perfil: ${selectedProfessional.name}`,
      `Nombre: ${contactName}`,
      `Teléfono: ${contactPhone}`,
      `Zona/Barrio: ${contactZone}`,
      `Necesidad: ${contactMessage}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${OFICIOCERCA_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setNotice("Solicitud preparada. Se abrió el WhatsApp institucional de OficioCerca.");
    setContactOpen(false);
    setContactName("");
    setContactPhone("");
    setContactZone("");
    setContactMessage("");
  };

  const openRegister = () => {
    setAuthMode("register");
    setAuthOpen(true);
  };

  const openLogin = () => {
    setAuthMode("login");
    setAuthOpen(true);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabaseUrl || !supabaseKey) {
      action("Falta completar la conexión con Supabase.");
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "register") {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            emailRedirectTo: OFICIOCERCA_WEB,
          },
        });

        if (error) {
          action(`No se pudo crear la cuenta: ${error.message}`);
          return;
        }

        action("Cuenta creada. Revisá tu correo para confirmar el registro si Supabase lo solicita.");
        setAuthOpen(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });

        if (error) {
          action(`No se pudo iniciar sesión: ${error.message}`);
          return;
        }

        action("Sesión iniciada correctamente.");
        setAuthOpen(false);
      }

      setAuthEmail("");
      setAuthPassword("");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <main>
      <header className="topbar">
        <div className="container nav">
          <button
            className="brand"
            onClick={() => setActive("Inicio")}
            aria-label="Ir al inicio de OficioCerca"
            style={{ padding: 0, background: "transparent" }}
          >
            <img
              src={logoOficioCerca.src}
              alt="OficioCerca"
              style={{
                width: 185,
                height: 64,
                objectFit: "contain",
                objectPosition: "left center"
              }}
            />
          </button>
          <nav>
            {["Inicio", "Servicios", "Empleo", "Cursos", "Emprendé"].map(item => (
              <button key={item} className={active === item ? "navActive" : ""} onClick={() => setActive(item)}>
                {item}
              </button>
            ))}
          </nav>
          <div className="navActions">
            <button className="login" onClick={openLogin}>Ingresar</button>
            <button className="primary small" onClick={openRegister}>Crear cuenta</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="heroGlow glowA" />
        <div className="heroGlow glowB" />
        <div className="container heroGrid">
          <div>
            <div className="eyebrow">EL ECOSISTEMA DE OPORTUNIDADES</div>
            <h1>Encontrá soluciones.<br /><span>Creá oportunidades.</span></h1>
            <p className="heroText">
              OficioCerca conecta personas, profesionales, empresas, comercios,
              productores, artesanos y capacitaciones en un solo lugar.
            </p>
            <div className="searchBox">
              <span>🔎</span>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") searchNow(); }}
                placeholder="¿Qué estás buscando? Ej.: electricista"
              />
              <button className="primary" onClick={searchNow}>
                Buscar
              </button>
            </div>
            <div className="quick">
              <span>Buscá:</span>
              {["Electricista", "Plomero", "Pintura", "Refrigeración"].map(x => (
                <button key={x} onClick={() => { setQuery(x); setTimeout(searchNow, 50); }}>{x}</button>
              ))}
            </div>
          </div>
          <div className="heroCard">
            <img
              src={logoOficioCerca.src}
              alt="Logo de OficioCerca"
              style={{
                width: "100%",
                maxHeight: 170,
                objectFit: "contain",
                marginBottom: 16,
                borderRadius: 18
              }}
            />
            <div className="aiBadge">🤖 OficioCerca AI</div>
            <h3>¿No sabés por dónde empezar?</h3>
            <p>Contanos qué querés aprender, trabajar o emprender y te ayudaremos a encontrar un camino.</p>
            <button className="primary wide" onClick={() => action("OficioCerca AI: próximamente podrás recibir recomendaciones personalizadas.")}>Explorar mi oportunidad →</button>
            <div className="miniStats">
              <div><b>9+</b><span>áreas</span></div>
              <div><b>∞</b><span>posibilidades</span></div>
              <div><b>1</b><span>ecosistema</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft" id="professionals">
        <div className="container">
          <div className="sectionHead">
            <div><div className="eyebrow orange">RESULTADOS DE BÚSQUEDA</div><h2>{query.trim() ? `Resultados para “${query.trim()}”` : "Profesionales destacados"}</h2></div>
            <button className="outline" onClick={() => setQuery("")}>Ver todos</button>
          </div>
          <div className="cards">
            {filtered.map(p => (
              <article className="proCard" key={p.name}>
                <div className="avatar">{p.icon}</div>
                <div className="proTop"><span className="verified">✓ Perfil demo</span><span>⭐ {p.rating}</span></div>
                <h3>{p.name}</h3><p>{p.job}</p>
                <div className="location">📍 {p.city}</div>
                <div className="location">🟢 {p.availability}</div>
                <div className="location">💰 {p.rate}</div>
                <button className="outline wide" onClick={() => openProfile(p)}>Ver perfil</button>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty">No encontramos resultados para esta búsqueda. Probá con otro oficio o servicio.</div>}
        </div>
      </section>

      <section className="section" id="results">
        <div className="container">
          <div className="sectionHead">
            <div><div className="eyebrow blue">EXPLORÁ</div><h2>Todo el ecosistema en un solo lugar</h2></div>
            <p>Una puerta de entrada para descubrir servicios, trabajo, formación y producción local.</p>
          </div>
          <div className="categoryGrid">
            {categories.map(([icon, title, desc]) => (
              <button className="category" key={title} onClick={() => action(`${title}: módulo preparado para la próxima etapa.`)}>
                <span className="categoryIcon">{icon}</span>
                <span><b>{title}</b><small>{desc}</small></span>
                <span className="arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="aiSection">
        <div className="container aiGrid">
          <div>
            <div className="eyebrow">INTELIGENCIA PARA CRECER</div>
            <h2>OficioCerca AI puede ayudarte a encontrar tu camino.</h2>
            <p>Para quien busca su primer empleo, quiere aprender un oficio, ya tiene una profesión o necesita hacer crecer un emprendimiento.</p>
            <div className="aiList">
              <div>✓ Recomendar capacitaciones según tus intereses</div>
              <div>✓ Detectar oportunidades laborales</div>
              <div>✓ Ayudar a mejorar tu perfil profesional</div>
              <div>✓ Conectar empresas con talento capacitado</div>
            </div>
            <button className="primary" onClick={() => action("Asistente AI: módulo en preparación.")}>Conocer OficioCerca AI</button>
          </div>
          <div className="journey">
            {["No tengo experiencia", "Me capacito", "Desarrollo mi oficio", "Encuentro oportunidades", "Crezco"].map((x, i) => (
              <div className="journeyItem" key={x}><span>{i + 1}</span><b>{x}</b>{i < 4 && <i>↓</i>}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <div><div className="eyebrow green">OFICIOCERCA ACADEMY</div><h2>Aprendé para crecer</h2></div>
            <button className="outline" onClick={() => action("Academy: catálogo completo en preparación.")}>Ver cursos →</button>
          </div>
          <div className="courseGrid">
            {courses.map(c => (
              <article className="course" key={c.title}>
                <div className="courseIcon">🎓</div>
                <span className="pill">{c.level}</span>
                <h3>{c.title}</h3><p>{c.place}</p>
                <button className="textBtn" onClick={() => action(`Curso seleccionado: ${c.title}.`)}>Más información →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="regional">
        <div className="container regionalGrid">
          <div>
            <div className="eyebrow orange">ECONOMÍA REGIONAL</div>
            <h2>Visibilizamos lo que produce nuestra comunidad.</h2>
            <p>Pequeños productores, artesanos, comercios y emprendedores también forman parte de OficioCerca.</p>
            <button className="primary" onClick={() => action("Mapa económico regional: módulo preparado para integrar mapas y datos reales.")}>Explorar la región →</button>
          </div>
          <div className="mapMock">
            <div className="mapPin p1">🛠️</div><div className="mapPin p2">🌱</div><div className="mapPin p3">🏪</div><div className="mapPin p4">🎨</div>
            <div className="mapLabel">MAPA ECONÓMICO REGIONAL</div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container ctaInner">
          <div><div className="eyebrow">EL PRÓXIMO PASO</div><h2>Tu oportunidad puede estar más cerca de lo que pensás.</h2></div>
          <div className="ctaBtns">
            <button className="primary" onClick={openRegister}>Quiero registrarme</button>
            <button className="whiteBtn" onClick={openRegister}>Soy profesional</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footerGrid">
          <div><div className="footerBrand"><span className="brandMark">OC</span> OficioCerca</div><p>Servicios, trabajo, capacitación, producción y oportunidades en un solo ecosistema.</p></div>
          <div><b>Explorar</b><a>Profesionales</a><a>Empleo</a><a>Cursos</a><a>Emprendedores</a></div>
          <div><b>Comunidad</b><a>Productores</a><a>Artesanos</a><a>Comercios</a><a>Inclusión</a></div>
          <div><b>OficioCerca</b><a>Sobre nosotros</a><a>Ayuda</a><a>Contacto</a><a>Privacidad</a></div>
        </div>
        <div className="container" style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid #223548" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: 24,
              alignItems: "center"
            }}
          >
            <div>
              <b style={{ color: "white", fontSize: 18 }}>Contacto institucional</b>
              <div style={{ marginTop: 12, display: "grid", gap: 10, color: "#cbd5e1", fontSize: 14 }}>
                <a
                  href={`https://wa.me/${OFICIOCERCA_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#cbd5e1", textDecoration: "none" }}
                >
                  📱 WhatsApp: +54 3482 640585
                </a>
                <a
                  href={`mailto:${OFICIOCERCA_EMAIL}`}
                  style={{ color: "#cbd5e1", textDecoration: "none" }}
                >
                  ✉️ {OFICIOCERCA_EMAIL}
                </a>
                <a
                  href={`https://www.instagram.com/${OFICIOCERCA_INSTAGRAM}/`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#cbd5e1", textDecoration: "none" }}
                >
                  📸 Instagram: @{OFICIOCERCA_INSTAGRAM}
                </a>
                <a
                  href={OFICIOCERCA_WEB}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#cbd5e1", textDecoration: "none" }}
                >
                  🌐 OficioCerca Web
                </a>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 16, padding: 10, textAlign: "center" }}>
              <img
                src={qrOficioCerca.src}
                alt="Código QR de OficioCerca"
                style={{ width: 120, height: 120, display: "block" }}
              />
              <div style={{ color: "#0b1f33", fontWeight: 800, fontSize: 11, marginTop: 6 }}>
                Escaneá y entrá
              </div>
            </div>
          </div>
        </div>
        <div className="container copyright">© 2026 OficioCerca — Plataforma de servicios, oportunidades y desarrollo regional.</div>
      </footer>


      {selectedProfessional && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,20,34,.68)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 12,
            overflowY: "auto"
          }}
          onClick={closeProfile}
        >
          <div
            style={{
              width: "min(560px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              background: "white",
              borderRadius: 24,
              padding: 28,
              boxShadow: "0 30px 90px rgba(0,0,0,.28)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
              <div className="avatar">{selectedProfessional.icon}</div>
              <button className="outline" onClick={closeProfile}>Cerrar</button>
            </div>

            <div className="proTop">
              <span className="verified">✓ Perfil demostrativo</span>
              <span>⭐ {selectedProfessional.rating}</span>
            </div>

            <h2 style={{ marginBottom: 4 }}>{selectedProfessional.name}</h2>
            <p style={{ marginTop: 0, color: "#64748b" }}>{selectedProfessional.job} · 📍 {selectedProfessional.city}</p>
            <p style={{ lineHeight: 1.7 }}>{selectedProfessional.description}</p>

            <div style={{ background: "#f4f8f7", borderRadius: 16, padding: 16, marginTop: 18 }}>
              <b>Servicios</b>
              <ul style={{ marginBottom: 0 }}>
                {selectedProfessional.services.map((service: string) => <li key={service}>{service}</li>)}
              </ul>
            </div>

            <div style={{ marginTop: 18 }}>
              <div>🟢 {selectedProfessional.availability}</div>
              <div style={{ marginTop: 7 }}>💰 {selectedProfessional.rate}</div>
            </div>

            {!contactOpen ? (
              <button className="primary wide" onClick={() => setContactOpen(true)}>Contactar</button>
            ) : (
              <form
                onSubmit={sendContactRequest}
                style={{ marginTop: 20, border: "1px solid #dfe9e6", borderRadius: 16, padding: 18 }}
              >
                <b>Enviar una consulta</b>
                <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                  Completá tus datos y contá brevemente qué necesitás. Completá tus datos y contá brevemente qué necesitás. Al enviar, OficioCerca abrirá el WhatsApp oficial con la solicitud preparada.
                </p>

                <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                  Nombre
                </label>
                <input
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  required
                  placeholder="Tu nombre"
                  style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
                />

                <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                  Teléfono
                </label>
                <input
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  required
                  placeholder="Tu teléfono"
                  style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
                />

                <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                  Zona / Barrio
                </label>
                <input
                  value={contactZone}
                  onChange={e => setContactZone(e.target.value)}
                  required
                  placeholder="Ej.: Barrio Centro, Reconquista"
                  style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
                />

                <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                  ¿Qué necesitás?
                </label>
                <textarea
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Ej.: necesito revisar una instalación eléctrica..."
                  style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10, resize: "vertical" }}
                />

                <button className="primary wide" type="submit">
                  Enviar por WhatsApp
                </button>

                <button
                  type="button"
                  className="outline wide"
                  onClick={() => setContactOpen(false)}
                >
                  Cancelar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {authOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,20,34,.68)",
            zIndex: 130,
            display: "grid",
            placeItems: "center",
            padding: 16
          }}
          onClick={() => setAuthOpen(false)}
        >
          <div
            style={{
              width: "min(460px, 100%)",
              background: "white",
              borderRadius: 22,
              padding: 26,
              boxShadow: "0 30px 90px rgba(0,0,0,.28)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div className="eyebrow blue">
                  {authMode === "register" ? "NUEVA CUENTA" : "BIENVENIDO"}
                </div>
                <h2 style={{ margin: 0 }}>
                  {authMode === "register" ? "Crear cuenta" : "Ingresar"}
                </h2>
              </div>
              <button className="outline" onClick={() => setAuthOpen(false)}>
                Cerrar
              </button>
            </div>

            <form onSubmit={handleAuth} style={{ marginTop: 22 }}>
              <label style={{ display: "block", fontWeight: 800, fontSize: 13 }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                required
                placeholder="tu@correo.com"
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 12,
                  border: "1px solid #d7e2df",
                  borderRadius: 10
                }}
              />

              <label
                style={{
                  display: "block",
                  marginTop: 14,
                  fontWeight: 800,
                  fontSize: 13
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: 12,
                  border: "1px solid #d7e2df",
                  borderRadius: 10
                }}
              />

              <button className="primary wide" type="submit" disabled={authLoading}>
                {authLoading
                  ? "Procesando..."
                  : authMode === "register"
                  ? "Crear mi cuenta"
                  : "Ingresar"}
              </button>
            </form>

            <button
              className="textBtn"
              style={{ marginTop: 16 }}
              onClick={() =>
                setAuthMode(authMode === "register" ? "login" : "register")
              }
            >
              {authMode === "register"
                ? "Ya tengo cuenta → Ingresar"
                : "No tengo cuenta → Registrarme"}
            </button>
          </div>
        </div>
      )}

      {notice && <div className="toast">{notice}</div>}
    </main>
  );
}
