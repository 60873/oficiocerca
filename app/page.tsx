"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoWorkCerca from "../b9132c5a-18cd-4603-a022-cd3efd09857f.png";
// Contacto institucional de WorkCerca.
// Cuando tengas el número y el correo definitivos, solo hay que completar estos dos valores.
const WORKCERCA_WHATSAPP = "543482640585";
const WORKCERCA_EMAIL = "workcerca@gmail.com";
const WORKCERCA_INSTAGRAM = "workcerca";
const WORKCERCA_WEB = process.env.NEXT_PUBLIC_SITE_URL || "";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}


const categories = [
  ["🛠️", "Servicios y urgencias", "Encontrá profesionales, pedí presupuestos y resolvé necesidades cercanas."],
  ["📋", "Mi Proyecto", "Organizá una necesidad, compará propuestas y seguí cada etapa."],
  ["💼", "Mi Primer Empleo", "Armá tu CV, descubrí oportunidades y preparate para entrevistas."],
  ["🗓️", "Mi Día profesional", "Organizá solicitudes, presupuestos, trabajos y disponibilidad."],
  ["🚀", "Mi Negocio", "Herramientas para emprendedores, costos, proveedores, pedidos y crecimiento."],
  ["🏢", "Empresas", "Publicá oportunidades, encontrá talento, proveedores y servicios."],
  ["🎓", "Formación", "Cursos, carreras, becas, capacitaciones e instituciones."],
  ["🏛️", "Red de Municipios", "Desarrollo local, capacitación, obras y oportunidades regionales."],
  ["🌱", "Economía regional", "Productores, artesanos, comercios y emprendimientos de la región."],
  ["♿", "Inclusión y accesibilidad", "Oportunidades y herramientas para una comunidad más accesible."],
  ["📊", "Observatorio WorkCerca", "Información sobre necesidades, empleo, servicios y desarrollo local."],
  ["🎥", "Comunicación", "Mensajes, notificaciones y futuras videollamadas para consultas y entrevistas."],
];

const professionals = [
  { name: "Perfil Demo Electricidad", job: "Electricista", city: "Reconquista", rating: "4.9", icon: "⚡", description: "Perfil demostrativo para probar cómo se verá un profesional real dentro de WorkCerca.", availability: "Disponible hoy", rate: "Tarifa a consultar", services: ["Instalaciones eléctricas", "Reparaciones", "Mantenimiento"] },
  { name: "Perfil Demo Pintura", job: "Pintora", city: "Avellaneda", rating: "4.8", icon: "🎨", description: "Perfil demostrativo para visualizar servicios de pintura, mantenimiento y mejoras del hogar.", availability: "Disponible esta semana", rate: "Presupuesto sin cargo", services: ["Pintura interior", "Pintura exterior", "Mantenimiento"] },
  { name: "Perfil Demo Refrigeración", job: "Técnico en refrigeración", city: "Reconquista", rating: "5.0", icon: "❄️", description: "Perfil demostrativo para mostrar cómo funcionarán los servicios técnicos especializados.", availability: "Consultar disponibilidad", rate: "Tarifa a consultar", services: ["Aire acondicionado", "Refrigeración", "Mantenimiento preventivo"] },
  { name: "Perfil Demo Plomería", job: "Plomero", city: "Reconquista", rating: "4.7", icon: "🚰", description: "Perfil demostrativo para servicios de plomería y mantenimiento domiciliario.", availability: "Disponible hoy", rate: "Presupuesto previo", services: ["Pérdidas de agua", "Instalaciones", "Destapes"] },
];

const courses = [
  { title: "Electricidad básica", level: "Inicial", place: "WorkCerca Academy" },
  { title: "Cómo iniciar un emprendimiento", level: "Emprendedores", place: "Institución aliada" },
  { title: "Herramientas digitales para el trabajo", level: "Inicial", place: "WorkCerca Academy" },
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
  const [confirmEmailNotice, setConfirmEmailNotice] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileType, setProfileType] = useState("Cliente");
  const [profileJob, setProfileJob] = useState("");
  const [profileCity, setProfileCity] = useState("");
  const [profileZone, setProfileZone] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [profileWhatsapp, setProfileWhatsapp] = useState("");
  const [profileAvailability, setProfileAvailability] = useState("");
  const [realProfessionals, setRealProfessionals] = useState<any[]>([]);
  const [loadingProfessionals, setLoadingProfessionals] = useState(true);

  const filtered = useMemo(() => {
    const allProfessionals = [...realProfessionals, ...professionals];
    const q = query.toLowerCase().trim();

    if (!q) return allProfessionals;

    return allProfessionals.filter((p) =>
      `${p.name} ${p.job} ${p.city} ${p.services.join(" ")}`
        .toLowerCase()
        .includes(q)
    );
  }, [query, realProfessionals]);

  const action = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) {
        setCurrentUserId(user.id);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setCurrentUserId(user?.id || "");
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const loadProfessionals = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) {
        setLoadingProfessionals(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id,nombre,tipo_usuario,oficio,ciudad,zona,descripcion,whatsapp,disponibilidad")
        .eq("tipo_usuario", "Profesional");

      if (!error && data) {
        const mapped = data.map((p) => ({
          id: p.id,
          name: p.nombre || "Profesional de WorkCerca",
          job: p.oficio || "Profesional",
          city: p.ciudad || "Zona no informada",
          rating: "Nuevo",
          icon: "🛠️",
          description: p.descripcion || "Profesional registrado en WorkCerca.",
          availability: p.disponibilidad || "Consultar disponibilidad",
          rate: "Tarifa a consultar",
          services: p.descripcion ? [p.descripcion] : ["Servicio profesional"],
          whatsapp: p.whatsapp || "",
          isReal: true,
        }));

        setRealProfessionals(mapped);
      }

      setLoadingProfessionals(false);
    };

    loadProfessionals();
  }, []);

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

    const current = JSON.parse(localStorage.getItem("workcerca-contactos") || "[]");
    current.push(request);
    localStorage.setItem("workcerca-contactos", JSON.stringify(current));

    if (!WORKCERCA_WHATSAPP) {
      setNotice("La solicitud quedó guardada. El WhatsApp institucional de WorkCerca se incorporará antes del lanzamiento.");
      return;
    }

    const whatsappMessage = [
      "Hola! Quiero solicitar un servicio desde workcerca.",
      "",
      `Servicio: ${selectedProfessional.job}`,
      `Perfil: ${selectedProfessional.name}`,
      `Nombre: ${contactName}`,
      `Teléfono: ${contactPhone}`,
      `Zona/Barrio: ${contactZone}`,
      `Necesidad: ${contactMessage}`,
    ].join("\n");

    const professionalNumber = selectedProfessional.whatsapp
      ? String(selectedProfessional.whatsapp).replace(/\D/g, "")
      : "";

    const destinationNumber = professionalNumber || WORKCERCA_WHATSAPP;
    const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setNotice(
      professionalNumber
        ? "Solicitud preparada. Se abrió el WhatsApp del profesional."
        : "Solicitud preparada. Se abrió el WhatsApp institucional de workcerca."
    );
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

    const supabase = getSupabaseClient();

    if (!supabase) {
      action("Falta completar la conexión con Supabase en Vercel.");
      return;
    }

    setAuthLoading(true);

    try {
      if (authMode === "register") {
        const { error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            emailRedirectTo: WORKCERCA_WEB || window.location.origin,
          },
        });

        if (error) {
          action(`No se pudo crear la cuenta: ${error.message}`);
          return;
        }

        setConfirmEmailNotice(true);
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

        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user?.id || "";

        if (userId) {
          setCurrentUserId(userId);
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .maybeSingle();

          if (existingProfile) {
            setProfileName(existingProfile.nombre || "");
            setProfileType(existingProfile.tipo_usuario || "Cliente");
            setProfileJob(existingProfile.oficio || "");
            setProfileCity(existingProfile.ciudad || "");
            setProfileZone(existingProfile.zona || "");
            setProfileDescription(existingProfile.descripcion || "");
            setProfileWhatsapp(existingProfile.whatsapp || "");
            setProfileAvailability(existingProfile.disponibilidad || "");
          }

          setProfileOpen(true);
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

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = getSupabaseClient();
    if (!supabase || !currentUserId) {
      action("Primero iniciá sesión para guardar tu perfil.");
      return;
    }

    setProfileLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert(
          {
            id: currentUserId,
            nombre: profileName,
            tipo_usuario: profileType,
            oficio: profileType === "Profesional" ? profileJob : null,
            ciudad: profileCity,
            zona: profileZone,
            descripcion: profileDescription,
            whatsapp: profileWhatsapp,
            disponibilidad: profileType === "Profesional" ? profileAvailability : null,
          },
          { onConflict: "id" }
        );

      if (error) {
        action(`No se pudo guardar el perfil: ${error.message}`);
        return;
      }

      action("Perfil guardado correctamente en WorkCerca.");
      setProfileOpen(false);
    } finally {
      setProfileLoading(false);
    }
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setCurrentUserId("");
    setProfileOpen(false);
    action("Sesión cerrada.");
  };

  return (
    <main className="workcercaSite">
      <header className="topbar">
        <div className="container nav">
          <button
            className="brand"
            onClick={() => {
              setActive("Inicio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Ir al inicio de WorkCerca"
          >
            <img src={logoWorkCerca.src} alt="WorkCerca" />
          </button>

          <nav className="mainNav" aria-label="Navegación principal">
            {["Inicio", "Buscar", "Categorías", "Empresas", "Emprendedores"].map((item) => (
              <button
                key={item}
                className={active === item ? "navActive" : ""}
                onClick={() => {
                  setActive(item);
                  if (item === "Buscar") searchNow();
                  if (item === "Categorías") document.getElementById("ecosistema")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="navActions">
            {currentUserId ? (
              <>
                <button className="login" onClick={() => setProfileOpen(true)}>Mi perfil</button>
                <button className="primary small" onClick={signOut}>Salir</button>
              </>
            ) : (
              <>
                <button className="login" onClick={openLogin}>Iniciar sesión</button>
                <button className="outline small" onClick={openRegister}>Registrate</button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="heroPremium">
        <div className="heroPhotoGrid" aria-hidden="true">
          <img
            src="https://images.pexels.com/photos/3184374/pexels-photo-3184374.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/29288253/pexels-photo-29288253.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt=""
          />
          <img
            src="https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=1000"
            alt=""
          />
          <div className="heroPhotoShade" />
        </div>

        <div className="container heroPremiumInner">
          <div className="heroCopy">
            <div className="heroBrandName">WORKCERCA</div>
            <div className="eyebrow light">CONECTA · ENCUENTRA · CRECE</div>
            <h1>Personas, trabajo y oportunidades. <span>Todo más cerca.</span></h1>
            <p>
              WorkCerca conecta personas, profesionales, empleo, formación,
              emprendimientos, empresas, instituciones y municipios en un solo ecosistema.
            </p>
          </div>

          <div className="searchPanel">
            <div className="searchField">
              <span className="searchIcon">⌕</span>
              <div>
                <label>¿Qué necesitás?</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") searchNow(); }}
                  placeholder="Ej.: Electricista, plomero, diseño, catering..."
                />
              </div>
            </div>

            <div className="locationField">
              <span className="pinIcon">⌖</span>
              <div>
                <label>Tu ubicación</label>
                <button
                  type="button"
                  onClick={() => action("El GPS real se activará en la etapa de geolocalización.")}
                >
                  Usar mi ubicación
                </button>
              </div>
            </div>

            <button className="primary searchButton" onClick={searchNow}>Buscar</button>
          </div>

          <div className="heroPaths">
            {[
              ["💼", "Mi Primer Empleo"],
              ["🛠️", "Oficios y Servicios"],
              ["🏪", "Comercios y Emprendedores"],
              ["🏭", "Empresas e Industria"],
              ["📐", "Profesionales y Proyectos"],
              ["📣", "Publicidad y Promociones"],
              ["🤝", "Comunidad y Conexiones"],
            ].map(([icon, title]) => (
              <button
                key={title}
                onClick={() => action(`${title}: esta sección se activará por etapas.`)}
              >
                <span>{icon}</span>
                <b>{title}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section cleanSection" id="ecosistema">
        <div className="container">
          <div className="sectionHead compactHead">
            <div>
              <div className="eyebrow blue">EXPLORÁ</div>
              <h2>Encontrá tu lugar en WorkCerca</h2>
            </div>
            <button className="textBtn" onClick={() => action("Próximamente: catálogo completo de categorías.")}>
              Ver todas las categorías →
            </button>
          </div>

          <div className="sectorGrid">
            {[
              ["Construcción", "https://images.pexels.com/photos/29288253/pexels-photo-29288253.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Electricidad", "https://images.pexels.com/photos/27928762/pexels-photo-27928762.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Gastronomía", "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Comercios", "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Emprendimientos", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Industria", "https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Mi Primer Empleo", "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Profesionales", "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Empresas", "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=900"],
              ["Productores y rurales", "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=900"],
            ].map(([title, image]) => (
              <button
                className="sectorCard"
                key={title}
                onClick={() => action(`${title}: módulo preparado para la próxima etapa.`)}
              >
                <img src={image} alt={title} />
                <span className="sectorShade" />
                <b>{title}</b>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id="professionals">
        <div className="container">
          <div className="sectionHead compactHead">
            <div>
              <div className="eyebrow blue">CERCA TUYO</div>
              <h2>{query.trim() ? `Resultados para “${query.trim()}”` : "Profesionales disponibles"}</h2>
              <p>Perfiles reales registrados en WorkCerca y perfiles de demostración mientras ampliamos la comunidad.</p>
            </div>
            <button className="outline" onClick={() => setQuery("")}>Ver todos</button>
          </div>

          {loadingProfessionals && <div className="empty">Cargando profesionales registrados...</div>}

          <div className="cards professionalCards">
            {filtered.slice(0, 6).map((p) => (
              <article className="proCard formalCard" key={`${p.name}-${p.job}`}>
                <div className="professionalHeader">
                  <div className="avatar formalAvatar">{p.icon}</div>
                  <div>
                    <span className={`verified ${p.isReal ? "verifiedReal" : "verifiedDemo"}`}>{p.isReal ? "Perfil registrado" : "Perfil demo"}</span>
                    <h3>{p.name}</h3>
                    <p>{p.job}</p>
                  </div>
                </div>
                <div className="profileMeta">
                  <span>📍 {p.city}</span>
                  <span>● {p.availability}</span>
                  <span>💬 {p.rating === "Nuevo" ? "Nuevo" : p.rating}</span>
                </div>
                <button className="outline wide" onClick={() => openProfile(p)}>Ver perfil</button>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty">No encontramos resultados. Probá con otro oficio, servicio o ciudad.</div>
          )}
        </div>
      </section>

      <section className="section featureSection">
        <div className="container featureGrid">
          <article className="featurePanel gpsPanel">
            <div className="featureText">
              <div className="eyebrow blue">GPS WORKCERCA</div>
              <h2>Servicios cerca tuyo</h2>
              <p>Encontrá profesionales y comercios de tu zona y, más adelante, consultá disponibilidad en tiempo real.</p>
              <button className="primary" onClick={() => action("GPS: integración real planificada para la próxima etapa.")}>
                Ver en el mapa
              </button>
            </div>
            <img
              src="https://images.pexels.com/photos/30403062/pexels-photo-30403062.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Teléfono mostrando un mapa con GPS"
            />
          </article>

          <article className="featurePanel networkPanel">
            <div className="eyebrow blue">RED WORKCERCA</div>
            <h2>Conectá, colaborá, crecé</h2>
            <p>Personas, empresas, instituciones y municipios conectados para generar oportunidades y proyectos.</p>
            <div className="networkVisual" aria-hidden="true">
              <span className="node n1">●</span>
              <span className="node n2">●</span>
              <span className="node n3">●</span>
              <span className="node n4">●</span>
              <span className="node n5">●</span>
              <i className="line l1" /><i className="line l2" /><i className="line l3" /><i className="line l4" />
            </div>
          </article>

          <article className="featurePanel adPanel">
            <span className="sponsored">PATROCINADO</span>
            <div className="featureText">
              <div className="eyebrow orange">PUBLICIDAD</div>
              <h2>Dale visibilidad a tu negocio</h2>
              <p>Espacios preparados para comercios, empresas, profesionales, instituciones y promociones locales.</p>
              <button className="primary" onClick={() => action("Publicidad WorkCerca: módulo comercial en preparación.")}>
                Publicitar ahora
              </button>
            </div>
            <img
              src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Comercio preparado para recibir clientes"
            />
          </article>
        </div>
      </section>

      <section className="section adsSection">
        <div className="container">
          <div className="sectionHead compactHead">
            <div>
              <div className="eyebrow orange">OPORTUNIDADES DESTACADAS</div>
              <h2>Publicidad y promociones</h2>
            </div>
            <span className="adDisclosure">Los contenidos pagos siempre se mostrarán como patrocinados.</span>
          </div>

          <div className="adCards">
            {[
              ["Ferretería y materiales", "Todo para tu proyecto, cerca de vos."],
              ["Panadería y gastronomía", "Promociones y productos del día."],
              ["Servicios profesionales", "Mostrá tu trabajo a nuevos clientes."],
              ["Capacitación y empleo", "Cursos, búsquedas y oportunidades."],
            ].map(([title, text]) => (
              <article className="adCard" key={title}>
                <span>Patrocinado</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <button onClick={() => action(`${title}: espacio publicitario de demostración.`)}>Ver más</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="trustStrip">
        <div className="container trustGrid">
          <div><b>✓</b><span>Perfiles y reputación</span></div>
          <div><b>↔</b><span>Comunicación directa</span></div>
          <div><b>⌖</b><span>Cercanía y ubicación</span></div>
          <div><b>?</b><span>Soporte y ayuda</span></div>
        </div>
      </section>

      <footer className="premiumFooter">
        <div className="container footerGrid">
          <div className="footerAbout">
            <img src={logoWorkCerca.src} alt="WorkCerca" />
            <p>Conectamos personas, impulsamos trabajo, negocios, formación y oportunidades.</p>
          </div>
          <div><b>Explorar</b><a>Servicios</a><a>Profesionales</a><a>Empleo</a><a>Formación</a></div>
          <div><b>WorkCerca</b><a>Empresas</a><a>Emprendedores</a><a>Municipios</a><a>Inclusión</a></div>
          <div>
            <b>Contacto</b>
            <a href={`mailto:${WORKCERCA_EMAIL}`}>{WORKCERCA_EMAIL}</a>
            <a href={`https://www.instagram.com/${WORKCERCA_INSTAGRAM}/`} target="_blank" rel="noreferrer">
              @{WORKCERCA_INSTAGRAM}
            </a>
            <a href={`https://wa.me/${WORKCERCA_WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="container copyright">© 2026 WorkCerca — CONECTA · ENCUENTRA · CRECE</div>
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
              <span className="verified">
                {selectedProfessional.isReal ? "✓ Perfil registrado" : "✓ Perfil demostrativo"}
              </span>
              <span>
                {selectedProfessional.rating === "Nuevo"
                  ? "🆕 Nuevo"
                  : `⭐ ${selectedProfessional.rating}`}
              </span>
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
                  Completá tus datos y contá brevemente qué necesitás. Completá tus datos y contá brevemente qué necesitás. Al enviar, WorkCerca abrirá el WhatsApp oficial con la solicitud preparada.
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

      {profileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,20,34,.68)",
            zIndex: 150,
            display: "grid",
            placeItems: "center",
            padding: 12,
            overflowY: "auto"
          }}
          onClick={() => setProfileOpen(false)}
        >
          <div
            style={{
              width: "min(620px, 100%)",
              maxHeight: "92vh",
              overflowY: "auto",
              background: "white",
              borderRadius: 22,
              padding: 26,
              boxShadow: "0 30px 90px rgba(0,0,0,.28)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <div className="eyebrow green">MI PERFIL</div>
                <h2 style={{ margin: 0 }}>Completá tus datos</h2>
              </div>
              <button className="outline" onClick={() => setProfileOpen(false)}>Cerrar</button>
            </div>

            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Tu cuenta puede crecer con vos. Hoy podés usar WorkCerca como cliente y más adelante activar opciones profesionales, de empleo, formación o emprendimiento.
            </p>

            <form onSubmit={saveProfile}>
              <label style={{ display: "block", marginTop: 12, fontWeight: 800, fontSize: 13 }}>
                Tipo de usuario
              </label>
              <select
                value={profileType}
                onChange={(e) => setProfileType(e.target.value)}
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
              >
                <option>Cliente</option>
                <option>Profesional</option>
              </select>

              <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                Nombre y apellido
              </label>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                required
                placeholder="Tu nombre"
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
              />

              {profileType === "Profesional" && (
                <>
                  <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                    Oficio / profesión
                  </label>
                  <input
                    value={profileJob}
                    onChange={(e) => setProfileJob(e.target.value)}
                    required
                    placeholder="Ej.: Electricista"
                    style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
                  />
                </>
              )}

              <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                Ciudad
              </label>
              <input
                value={profileCity}
                onChange={(e) => setProfileCity(e.target.value)}
                required
                placeholder="Ej.: Reconquista"
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
              />

              <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                Zona / barrio
              </label>
              <input
                value={profileZone}
                onChange={(e) => setProfileZone(e.target.value)}
                placeholder="Ej.: Barrio Centro"
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
              />

              <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                Descripción
              </label>
              <textarea
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                rows={4}
                placeholder={profileType === "Profesional" ? "Contá qué servicios ofrecés y tu experiencia." : "Contanos qué tipo de servicios u oportunidades buscás."}
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10, resize: "vertical" }}
              />

              <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                WhatsApp
              </label>
              <input
                value={profileWhatsapp}
                onChange={(e) => setProfileWhatsapp(e.target.value)}
                placeholder="Ej.: 543482..."
                style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
              />

              {profileType === "Profesional" && (
                <>
                  <label style={{ display: "block", marginTop: 14, fontWeight: 800, fontSize: 13 }}>
                    Disponibilidad
                  </label>
                  <input
                    value={profileAvailability}
                    onChange={(e) => setProfileAvailability(e.target.value)}
                    placeholder="Ej.: Disponible hoy / Lunes a viernes"
                    style={{ width: "100%", marginTop: 6, padding: 12, border: "1px solid #d7e2df", borderRadius: 10 }}
                  />
                </>
              )}

              <button className="primary wide" type="submit" disabled={profileLoading}>
                {profileLoading ? "Guardando..." : "Guardar mi perfil"}
              </button>
            </form>
          </div>
        </div>
      )}

      {confirmEmailNotice && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,20,34,.68)",
            zIndex: 140,
            display: "grid",
            placeItems: "center",
            padding: 16
          }}
          onClick={() => setConfirmEmailNotice(false)}
        >
          <div
            style={{
              width: "min(500px, 100%)",
              background: "white",
              borderRadius: 22,
              padding: 28,
              boxShadow: "0 30px 90px rgba(0,0,0,.28)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="eyebrow green">CUENTA CREADA</div>
            <h2 style={{ marginTop: 6 }}>Confirmá tu correo electrónico</h2>
            <p style={{ color: "#64748b", lineHeight: 1.7 }}>
              Te enviamos un mensaje de confirmación al correo que registraste.
              Abrí ese correo, confirmá tu dirección y después volvé a WorkCerca para iniciar sesión.
            </p>

            <div
              style={{
                background: "#f4f8f7",
                borderRadius: 14,
                padding: 16,
                marginTop: 18,
                color: "#334155",
                lineHeight: 1.6
              }}
            >
              <b>Importante:</b> no tenés que confirmar en 20 segundos.
              El aviso anterior desaparecía rápido, pero el enlace de confirmación del correo sigue disponible durante su período de validez.
            </div>

            <button
              className="primary wide"
              onClick={() => {
                setConfirmEmailNotice(false);
                setAuthMode("login");
                setAuthOpen(true);
              }}
            >
              Ya confirmé mi correo → Ingresar
            </button>

            <button
              className="outline wide"
              onClick={() => setConfirmEmailNotice(false)}
            >
              Cerrar
            </button>
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
