"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import logoWorkCerca from "../b9132c5a-18cd-4603-a022-cd3efd09857f.png";
import logoWorkCercaHeader from "../workcerca-logo-header.png";
import logoWorkCercaFooter from "../workcerca-logo-footer.png";
import isotipoWorkCerca from "../workcerca-isotipo.png";
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
  const [searchLocation, setSearchLocation] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
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

  const goTo = (path: string) => { window.location.href = path; };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      action("Tu navegador no permite usar GPS. Podés elegir una ciudad manualmente.");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`);
          const data = await response.json();
          const city = data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.municipality || data?.address?.county || "Ubicación actual";
          setSearchLocation(city);
          action(`Ubicación actual: ${city}. Esto no modifica la ciudad guardada en tu perfil.`);
        } catch {
          setSearchLocation("Ubicación actual");
          action("GPS activado. Tu localidad del perfil no fue modificada.");
        } finally { setGpsLoading(false); }
      },
      () => { setGpsLoading(false); action("No pudimos acceder a tu ubicación. Podés escribir otra ciudad."); },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const useProfileLocation = () => {
    if (profileCity.trim()) {
      setSearchLocation(profileCity.trim());
      action(`Buscando en ${profileCity.trim()}, tu localidad del perfil.`);
    } else if (currentUserId) {
      action("Completá primero la ciudad de tu perfil.");
      setProfileOpen(true);
    } else {
      action("Iniciá sesión para usar la localidad guardada en tu perfil.");
      openLogin();
    }
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
    <main className="wcPage">
      <style>{`
        :root {
          --wc-blue: #0b5ee8;
          --wc-blue-dark: #06377f;
          --wc-navy: #071f49;
          --wc-text: #0c1d45;
          --wc-muted: #667085;
          --wc-line: #dce6f3;
          --wc-bg: #f6f9fe;
          --wc-white: #ffffff;
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: var(--wc-bg); color: var(--wc-text); }
        button, input, select, textarea { font: inherit; }
        button { cursor: pointer; }
        .wcPage {
          min-height: 100vh;
          background:
            radial-gradient(circle at 15% 20%, rgba(11,94,232,.07), transparent 28%),
            linear-gradient(180deg, #fff 0%, #f7faff 100%);
          color: var(--wc-text);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .wcContainer { width: min(1460px, calc(100% - 44px)); margin: 0 auto; }

        .wcHeader {
          position: sticky;
          top: 0;
          z-index: 80;
          height: 72px;
          background: rgba(255,255,255,.96);
          border-bottom: 1px solid rgba(7,31,73,.08);
          backdrop-filter: blur(12px);
        }
        .wcNav {
          height: 72px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 26px;
        }
        .wcBrand {
          border: 0;
          background: transparent;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .wcBrand img { height: 42px; width: auto; display: block; }
        .wcMainNav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .wcMainNav button {
          border: 0;
          background: transparent;
          color: #101828;
          font-weight: 800;
          padding: 11px 12px;
          border-radius: 12px;
        }
        .wcMainNav button:hover,
        .wcMainNav button.wcNavActive { color: var(--wc-blue); background: #eef5ff; }
        .wcNavActions { display: flex; gap: 8px; align-items: center; }
        .wcIconBtn, .wcGhostBtn, .wcBlueBtn {
          min-height: 40px;
          border-radius: 11px;
          border: 1px solid #d7e2ef;
          font-weight: 800;
          padding: 0 14px;
        }
        .wcIconBtn { width: 42px; padding: 0; background: white; }
        .wcGhostBtn { background: white; color: var(--wc-text); }
        .wcBlueBtn { background: var(--wc-blue); color: white; border-color: var(--wc-blue); }
        .wcBlueBtn:hover { filter: brightness(.96); }

        .wcHero {
          position: relative;
          min-height: 585px;
          overflow: hidden;
          background:
            linear-gradient(90deg, rgba(5,21,49,.88) 0%, rgba(5,21,49,.62) 37%, rgba(5,21,49,.24) 68%, rgba(5,21,49,.34) 100%),
            url("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1900") center/cover no-repeat;
          isolation: isolate;
        }
        .wcHero::before {
          content: "RECONQUISTA";
          position: absolute;
          right: 4%;
          top: 16%;
          z-index: -1;
          color: rgba(255,255,255,.20);
          text-shadow: 0 4px 18px rgba(0,0,0,.24);
          font-size: clamp(82px, 11vw, 190px);
          line-height: .9;
          font-weight: 1000;
          letter-spacing: -.06em;
          white-space: nowrap;
        }
        .wcHero::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 130px;
          z-index: -1;
          background: linear-gradient(180deg, transparent, rgba(3,17,41,.33));
        }
        .wcHeroInner { position: relative; min-height: 585px; padding-top: 64px; padding-bottom: 30px; }
        .wcHeroTopCards {
          position: absolute;
          right: 0;
          top: 26px;
          display: flex;
          gap: 12px;
          z-index: 3;
        }
        .wcMiniCard {
          min-width: 220px;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.90);
          box-shadow: 0 16px 36px rgba(0,0,0,.18);
          border-radius: 16px;
          padding: 14px 16px;
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .wcMiniCard.ad {
          color: #fff;
          background: linear-gradient(135deg, #075de1, #063c9e);
          border-color: rgba(255,255,255,.15);
        }
        .wcMiniIcon { font-size: 26px; }
        .wcMiniCard b { display: block; font-size: 14px; }
        .wcMiniCard small { display: block; margin-top: 3px; opacity: .86; font-size: 12px; }

        .wcHeroCopy {
          width: min(610px, 52vw);
          margin-top: 58px;
          color: white;
          position: relative;
          z-index: 2;
        }
        .wcHeroCopy h1 {
          margin: 0;
          font-size: clamp(46px, 5vw, 76px);
          line-height: .98;
          letter-spacing: -.05em;
          font-weight: 1000;
          text-shadow: 0 4px 22px rgba(0,0,0,.32);
        }
        .wcHeroCopy h1 span { color: #1474ff; }
        .wcHeroCopy p {
          font-size: clamp(18px, 1.5vw, 24px);
          line-height: 1.38;
          max-width: 470px;
          margin: 20px 0 0;
          text-shadow: 0 2px 12px rgba(0,0,0,.45);
        }

        .wcWorkerStrip {
          position: absolute;
          right: 2%;
          bottom: 104px;
          width: min(670px, 50vw);
          height: 310px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: end;
          gap: 8px;
          pointer-events: none;
          opacity: .98;
        }
        .wcWorkerStrip img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          border-radius: 90px 90px 22px 22px;
          border: 2px solid rgba(255,255,255,.35);
          box-shadow: 0 20px 50px rgba(0,0,0,.28);
        }
        .wcWorkerStrip img:nth-child(1),
        .wcWorkerStrip img:nth-child(4) { height: 86%; }
        .wcWorkerStrip img:nth-child(2) { height: 94%; }

        .wcSearchGlass {
          position: absolute;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          z-index: 4;
          width: min(1180px, calc(100% - 40px));
          display: grid;
          grid-template-columns: 1.2fr 1.05fr auto;
          align-items: stretch;
          background: linear-gradient(90deg, rgba(5,20,45,.38), rgba(7,27,58,.27));
          border: 1px solid rgba(255,255,255,.46);
          border-radius: 18px;
          box-shadow: 0 16px 42px rgba(0,0,0,.16);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          color: white;
        }
        .wcSearchPart {
          min-height: 88px;
          padding: 13px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .wcSearchPart + .wcSearchPart { border-left: 1px solid rgba(255,255,255,.28); }
        .wcSearchBigIcon { font-size: 34px; opacity: .95; }
        .wcSearchPart label { display: block; font-weight: 900; font-size: 15px; margin-bottom: 6px; }
        .wcSearchPart input {
          width: 100%;
          min-width: 220px;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,.38);
          background: transparent;
          color: white;
          outline: none;
          padding: 5px 0 7px;
        }
        .wcSearchPart input::placeholder { color: rgba(255,255,255,.83); }
        .wcLocationLine { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        .wcLocationLine button {
          border: 0;
          padding: 0;
          background: transparent;
          color: #6dacff;
          font-weight: 900;
        }
        .wcSearchButton {
          margin: 18px;
          min-width: 170px;
          border: 0;
          border-radius: 16px;
          background: #0865ef;
          color: white;
          font-size: 18px;
          font-weight: 900;
          box-shadow: 0 12px 30px rgba(0,68,190,.35);
        }
        .wcSearchAi {
          grid-column: 1 / -1;
          min-height: 42px;
          border-top: 1px solid rgba(255,255,255,.22);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 8px 16px;
          color: #fff;
          background: rgba(5,19,42,.20);
        }
        .wcSearchAi span { font-size: 11px; }
        .wcSearchAi small { font-size: 10px; color: rgba(255,255,255,.82); }
        .wcSearchAi button {
          border: 0;
          background: transparent;
          color: #72b3ff;
          font-size: 10px;
          font-weight: 900;
        }

        .wcActorsWrap {
          position: relative;
          z-index: 8;
          margin-top: -2px;
        }
        .wcActors {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 14px 34px rgba(20,50,90,.10);
          border: 1px solid #e2eaf4;
          padding: 18px;
          overflow: visible;
        }
        .wcActor {
          min-height: 166px;
          border: 1px solid #e2e9f2;
          border-radius: 15px;
          background: #fff;
          color: var(--wc-text);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 8px;
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(23,52,91,.06);
          overflow: hidden;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .wcActor:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(23,52,91,.12);
          border-color: #bcd2f3;
        }
        .wcActorPhoto {
          width: 100%;
          height: 78px;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }
        .wcActorText {
          display: grid;
          gap: 2px;
          text-align: center;
          padding: 1px 3px 5px;
        }
        .wcActorText strong {
          font-size: 13px;
          color: #102046;
        }
        .wcActorText small {
          font-size: 10px;
          line-height: 1.25;
          color: #6b778c;
          font-weight: 600;
        }
        .wcActorIcon { display: none; }

        .wcFeatureRow {
          margin: 24px 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .wcFeature {
          position: relative;
          border: 1px solid #dae5f1;
          border-radius: 18px;
          min-height: 164px;
          padding: 18px 20px;
          overflow: hidden;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 10px 26px rgba(24,53,95,.08);
          background: white;
        }
        .wcFeature::before {
          content: "";
          position: absolute;
          inset: 0 0 0 48%;
          background-position: center;
          background-size: cover;
          opacity: .94;
        }
        .wcFeature::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,.99) 0%, rgba(255,255,255,.97) 46%, rgba(255,255,255,.36) 70%, rgba(255,255,255,.05) 100%);
        }
        .wcFeature.emergency::before {
          background-image: url("https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=850");
        }
        .wcFeature.training::before {
          background-image: url("https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=850");
        }
        .wcFeature.observatory::before {
          background-image: url("https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=850");
        }
        .wcFeature > * { position: relative; z-index: 2; }
        .wcFeatureIcon {
          flex: 0 0 46px;
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: #eff5ff;
          color: #075bd4;
          font-size: 23px;
        }
        .wcFeature.emergency .wcFeatureIcon { background: #fff0ef; color: #dc3f39; }
        .wcFeature.observatory .wcFeatureIcon { background: #f3efff; color: #7040ca; }
        .wcFeature b { display: block; font-size: 18px; }
        .wcFeature p { margin: 6px 0 0; color: #44516a; line-height: 1.4; max-width: 220px; font-size: 13px; }
        .wcFeatureDetail { display: block; color: #778399; font-size: 10px; margin-top: 7px; font-weight: 700; }
        .wcFeature button {
          margin-left: auto;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #7aa9f6;
          background: rgba(255,255,255,.95);
          color: #1269e8;
          font-weight: 900;
          align-self: flex-end;
        }

        .wcSection { padding: 18px 0 28px; }
        .wcSectionHead { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 14px; }
        .wcSectionHead h2 { margin: 0; font-size: 25px; }
        .wcSectionHead p { color: var(--wc-muted); margin: 5px 0 0; }
        .wcTextBtn { border: 0; background: transparent; color: var(--wc-blue); font-weight: 900; }

        .wcPros {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .wcProCard {
          border: 1px solid #e0e8f2;
          border-radius: 16px;
          background: white;
          min-height: 178px;
          padding: 14px;
          display: grid;
          grid-template-columns: 48px 1fr 76px;
          gap: 12px;
          align-items: center;
          box-shadow: 0 10px 24px rgba(24,53,95,.07);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .wcProCard:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(24,53,95,.12); }
        .wcProIcon {
          width: 62px; height: 62px; border-radius: 50%;
          display: grid; place-items: center;
          background: #0c62dd; color: white; font-size: 32px;
        }
        .wcProPhoto {
          width: 58px; height: 58px; border-radius: 50%; object-fit: cover;
          border: 2px solid white; box-shadow: 0 4px 12px rgba(0,0,0,.15);
        }
        .wcProCard h3 { margin: 2px 0 4px; font-size: 17px; }
        .wcProCard p { margin: 0; color: #5a6477; }
        .wcRating { margin-top: 10px; color: #f59e0b; font-weight: 900; }
        .wcAvailability {
          display: inline-block; margin-top: 10px; padding: 5px 8px;
          background: #dcfce7; color: #168044; border-radius: 7px; font-size: 12px; font-weight: 900;
        }
        .wcProCard .wcOpenProfile {
          grid-column: 1 / -1;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #cfe0f7;
          background: #f7fbff;
          color: #075ad1;
          font-weight: 900;
        }

        .wcTrust {
          margin: 18px 0 30px;
          background: linear-gradient(90deg, #eef5ff, #f6f8ff);
          border: 1px solid #dfe9f8;
          border-radius: 18px;
          padding: 18px 22px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }
        .wcTrustItem { display: flex; gap: 12px; align-items: center; }
        .wcTrustIcon {
          flex: 0 0 45px; width: 45px; height: 45px; border-radius: 50%;
          display: grid; place-items: center; color: white; background: #0a61dc; font-size: 22px;
        }
        .wcTrustItem b { display: block; font-size: 14px; }
        .wcTrustItem small { color: #5b667a; line-height: 1.4; }

        .wcFooter { background: linear-gradient(135deg, #063477, #061e4a); color: white; margin-top: 12px; }
        .wcFooterGrid {
          display: grid;
          grid-template-columns: 1.2fr .9fr .9fr .8fr;
          gap: 36px;
          padding: 36px 0 30px;
        }
        .wcFooter img { height: 42px; width: auto; margin-bottom: 10px; }
        .wcFooter p { color: rgba(255,255,255,.83); line-height: 1.6; }
        .wcFooter b { display: block; margin-bottom: 10px; }
        .wcFooter a { display: block; color: rgba(255,255,255,.86); margin: 7px 0; text-decoration: none; cursor: pointer; }
        .wcSocials { display: flex; gap: 10px; margin-top: 10px; }
        .wcSocials span {
          width: 36px; height: 36px; border-radius: 50%;
          display: grid; place-items: center; border: 1px solid rgba(255,255,255,.35);
        }
        .wcCopyright { border-top: 1px solid rgba(255,255,255,.15); padding: 17px 0 22px; text-align: center; color: rgba(255,255,255,.75); font-size: 13px; }

        .primary, .outline, .login, .textBtn {
          border-radius: 10px;
          font-weight: 800;
        }
        .primary { border: 1px solid var(--wc-blue); background: var(--wc-blue); color: white; padding: 10px 14px; }
        .outline { border: 1px solid #cfdceb; background: white; color: var(--wc-text); padding: 10px 14px; }
        .login { border: 1px solid #d6e0ea; background: white; padding: 9px 12px; }
        .textBtn { border: 0; background: transparent; color: var(--wc-blue); padding: 8px 0; }
        .wide { width: 100%; margin-top: 14px; }
        .eyebrow { font-size: 12px; font-weight: 900; letter-spacing: .13em; }
        .green { color: #168044; }
        .blue { color: var(--wc-blue); }
        .avatar {
          width: 58px; height: 58px; border-radius: 50%;
          background: #eaf3ff; display: grid; place-items: center; font-size: 28px;
        }
        .proTop { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 20px; }
        .verified { background: #eaf7ef; color: #197a46; border-radius: 999px; padding: 5px 9px; font-size: 12px; font-weight: 900; }

        .toast {
          position: fixed;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%);
          z-index: 999;
          width: min(620px, calc(100% - 30px));
          padding: 14px 18px;
          border-radius: 14px;
          background: #071f49;
          color: white;
          box-shadow: 0 18px 50px rgba(0,0,0,.28);
          text-align: center;
          font-weight: 800;
        }

        @media (max-width: 1100px) {
          .wcMainNav { display: none; }
          .wcNav { grid-template-columns: auto 1fr; }
          .wcNavActions { justify-content: end; }
          .wcHeroCopy { width: 60%; }
          .wcWorkerStrip { opacity: .72; width: 54%; }
          .wcSearchGlass { grid-template-columns: 1fr 1fr; }
          .wcSearchButton { grid-column: 1 / -1; min-height: 58px; margin-top: 0; }
          .wcActors { grid-template-columns: repeat(4, 1fr); border-radius: 0; }
          .wcActor { border-bottom: 1px solid #e3ebf6; }
          .wcFeatureRow { grid-template-columns: 1fr; }
          .wcPros { grid-template-columns: repeat(2, 1fr); }
          .wcTrust { grid-template-columns: repeat(2, 1fr); }
          .wcFooterGrid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 720px) {
          .wcContainer { width: min(100% - 24px, 1460px); }
          .wcHeader, .wcNav { height: 64px; }
          .wcBrand img { height: 34px; }
          .wcNavActions .wcGhostBtn { display: none; }
          .wcHero { min-height: 720px; }
          .wcHeroInner { min-height: 720px; padding-top: 28px; }
          .wcHeroTopCards { position: relative; top: 0; right: auto; display: grid; grid-template-columns: 1fr 1fr; }
          .wcMiniCard { min-width: 0; padding: 10px; }
          .wcHeroCopy { width: 100%; margin-top: 26px; }
          .wcHeroCopy h1 { font-size: 50px; }
          .wcWorkerStrip { opacity: .45; width: 100%; height: 260px; right: 0; bottom: 210px; }
          .wcSearchGlass {
            bottom: 18px;
            grid-template-columns: 1fr;
            width: calc(100% - 24px);
          }
          .wcSearchPart { min-height: auto; padding: 14px 16px; }
          .wcSearchPart + .wcSearchPart { border-left: 0; border-top: 1px solid rgba(255,255,255,.25); }
          .wcSearchButton { grid-column: auto; margin: 12px; min-height: 54px; }
          .wcActors { grid-template-columns: repeat(2, 1fr); }
          .wcActor { min-height: 94px; }
          .wcPros { grid-template-columns: 1fr; }
          .wcTrust { grid-template-columns: 1fr; }
          .wcFooterGrid { grid-template-columns: 1fr; gap: 22px; }
        }
      `}</style>

      <header className="wcHeader">
        <div className="wcContainer wcNav">
          <button
            className="wcBrand"
            onClick={() => {
              setActive("Inicio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Ir al inicio de WorkCerca"
          >
            <img src={logoWorkCercaHeader.src} alt="WorkCerca" />
          </button>

          <nav className="wcMainNav" aria-label="Navegación principal">
            {["Inicio", "Buscar", "Oportunidades", "Capacitaciones", "Mi Perfil"].map((item) => (
              <button
                key={item}
                className={active === item ? "wcNavActive" : ""}
                onClick={() => {
                  setActive(item);
                  if (item === "Inicio") window.scrollTo({ top: 0, behavior: "smooth" });
                  if (item === "Buscar") searchNow();
                  if (item === "Oportunidades") goTo("/oportunidades");
                  if (item === "Capacitaciones") goTo("/capacitaciones");
                  if (item === "Mi Perfil") {
                    if (currentUserId) setProfileOpen(true);
                    else openLogin();
                  }
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="wcNavActions">
            <button className="wcIconBtn" onClick={() => action("Notificaciones: módulo en preparación.")} aria-label="Notificaciones">🔔</button>
            {currentUserId ? (
              <>
                <button className="wcGhostBtn" onClick={() => goTo("/mi-workcerca")}>Mi WorkCerca</button>
                <button className="wcBlueBtn" onClick={signOut}>Salir</button>
              </>
            ) : (
              <>
                <button className="wcGhostBtn" onClick={openLogin}>Ingresar</button>
                <button className="wcBlueBtn" onClick={openRegister}>Registrate</button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="wcHero">
        <div className="wcContainer wcHeroInner">
          <div className="wcHeroTopCards">
            <button className="wcMiniCard" onClick={useCurrentLocation}>
              <span className="wcMiniIcon">📍</span>
              <span><b>Usar mi ubicación</b><small>Encontrá lo más cerca tuyo</small></span>
            </button>
            <button className="wcMiniCard ad" onClick={() => goTo("/empresa/publicidad")}>
              <span><b>PUBLICITÁ EN WORKCERCA</b><small>Hacé crecer tu negocio llegando a más personas</small></span>
              <span className="wcMiniIcon">📣</span>
            </button>
          </div>

          <div className="wcHeroCopy">
            <h1>CONECTA <span>•</span> ENCUENTRA <span>•</span> CRECE</h1>
            <p>Personas, profesionales, empresas y oportunidades en un solo lugar.</p>
          </div>

          <div className="wcWorkerStrip" aria-hidden="true">
            <img src="https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=700" alt="" />
            <img src="https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=700" alt="" />
            <img src="https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=700" alt="" />
            <img src="https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=700" alt="" />
          </div>

          <div className="wcSearchGlass">
            <div className="wcSearchPart">
              <span className="wcSearchBigIcon">⌕</span>
              <div style={{ width: "100%" }}>
                <label>¿Qué necesitás?</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") searchNow(); }}
                  placeholder="Ej.: Electricista, Plomero, Diseño, Repostería..."
                />
              </div>
            </div>

            <div className="wcSearchPart">
              <span className="wcSearchBigIcon">📍</span>
              <div style={{ width: "100%" }}>
                <label>Tu ubicación para esta búsqueda</label>
                <div className="wcLocationLine">
                  <button type="button" onClick={useCurrentLocation}>
                    {gpsLoading ? "Ubicando..." : "Usar mi ubicación"}
                  </button>
                  <button type="button" onClick={useProfileLocation}>Mi localidad</button>
                </div>
                <input
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Elegir otra ciudad"
                  aria-label="Elegir otra ciudad"
                />
              </div>
            </div>

            <button className="wcSearchButton" onClick={searchNow}>⌕ Buscar</button>
            <div className="wcSearchAi">
              <span>✦ <b>IA WorkCerca</b></span>
              <small>Te entiende, te orienta y te conecta con lo que necesitás.</small>
              <button type="button" onClick={() => action("IA WorkCerca: contame qué necesitás y te ayudo a encontrar el camino.")}>Preguntale a la IA →</button>
            </div>
          </div>
        </div>
      </section>

      <div className="wcActorsWrap">
        <div className="wcContainer wcActors">
          {[
            ["Personas", "/mi-workcerca", "Conectá con otros", "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Profesionales", "/profesionales", "Servicios confiables", "https://images.pexels.com/photos/8961158/pexels-photo-8961158.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Emprendedores", "/emprendedores", "Impulsá tu negocio", "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Empresas", "/empresa", "Encontrá talento", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Municipios", "/municipios", "Gestión y oportunidades", "https://images.pexels.com/photos/208733/pexels-photo-208733.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Instituciones", "/instituciones", "Educación y desarrollo", "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Feria de Carreras", "/feria-de-carreras", "Tu futuro empieza acá", "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=500"],
            ["Oportunidades", "/oportunidades", "Empleo, ofertas y proyectos", "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=500"],
          ].map(([title, path, subtitle, photo]) => (
            <button className="wcActor" key={title} onClick={() => goTo(path)}>
              <img className="wcActorPhoto" src={photo} alt="" />
              <span className="wcActorText"><strong>{title}</strong><small>{subtitle}</small></span>
            </button>
          ))}
        </div>
      </div>

      <div className="wcContainer">
        <div className="wcFeatureRow">
          <article className="wcFeature emergency">
            <div className="wcFeatureIcon">⚡</div>
            <div>
              <b>Necesito ahora</b>
              <p>Encontrá soluciones inmediatas cerca tuyo con IA.</p>
              <span className="wcFeatureDetail">Gomería · Cerrajero · Electricista · Cuidados · Contactos oficiales</span>
            </div>
            <button onClick={() => goTo("/emergencias")}>→</button>
          </article>

          <article className="wcFeature training">
            <div className="wcFeatureIcon">🎓</div>
            <div>
              <b>Capacitaciones</b>
              <p>Aprendé, crecé y construí tu futuro.</p>
              <span className="wcFeatureDetail">Cursos · Instituciones · Certificaciones</span>
            </div>
            <button onClick={() => goTo("/capacitaciones")}>→</button>
          </article>

          <article className="wcFeature observatory">
            <div className="wcFeatureIcon">📈</div>
            <div>
              <b>Observatorio WorkCerca</b>
              <p>Información que impulsa decisiones.</p>
              <span className="wcFeatureDetail">Empleo · Formación · Economía · Tendencias</span>
            </div>
            <button onClick={() => action("Observatorio WorkCerca: módulo preparado para una próxima etapa.")}>→</button>
          </article>
        </div>

        <section className="wcSection" id="professionals">
          <div className="wcSectionHead">
            <div>
              <h2>{query.trim() ? `Resultados para “${query.trim()}”` : "Profesionales cerca tuyo"}</h2>
              <p>Perfiles registrados y demostrativos mientras crece la comunidad WorkCerca.</p>
            </div>
            <button className="wcTextBtn" onClick={() => setQuery("")}>Ver todos →</button>
          </div>

          {loadingProfessionals && <div style={{ padding: 18 }}>Cargando profesionales registrados...</div>}

          <div className="wcPros">
            {filtered.slice(0, 4).map((p, index) => {
              const demoPhotos = [
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
                "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
                "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300",
              ];
              return (
                <article className="wcProCard" key={`${p.name}-${p.job}`}>
                  <div className="wcProIcon">{p.icon}</div>
                  <div>
                    <h3>{p.job}</h3>
                    <p>{p.city}</p>
                    <div className="wcRating">★ {p.rating === "Nuevo" ? "Nuevo" : p.rating}</div>
                    <span className="wcAvailability">{p.availability}</span>
                  </div>
                  <img className="wcProPhoto" src={demoPhotos[index % demoPhotos.length]} alt="" />
                  <button className="wcOpenProfile" onClick={() => openProfile(p)}>Ver perfil</button>
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: 18, background: "white", borderRadius: 14 }}>
              No encontramos resultados. Probá con otro oficio, servicio o ciudad.
            </div>
          )}
        </section>

        <section className="wcTrust">
          <div className="wcTrustItem">
            <span className="wcTrustIcon">✓</span>
            <span><b>Perfiles verificados</b><small>Información clara para generar confianza.</small></span>
          </div>
          <div className="wcTrustItem">
            <span className="wcTrustIcon">★</span>
            <span><b>Calificaciones reales</b><small>Opiniones para ayudarte a elegir mejor.</small></span>
          </div>
          <div className="wcTrustItem">
            <span className="wcTrustIcon">🔒</span>
            <span><b>Tus datos protegidos</b><small>Cuidamos tu información y tu privacidad.</small></span>
          </div>
          <div className="wcTrustItem">
            <span className="wcTrustIcon">🎧</span>
            <span><b>Soporte local</b><small>Estamos cerca para ayudarte cuando lo necesites.</small></span>
          </div>
        </section>
      </div>

      <footer className="wcFooter">
        <div className="wcContainer wcFooterGrid">
          <div>
            <img src={logoWorkCercaFooter.src} alt="WorkCerca" />
            <p>Conectamos personas, servicios y oportunidades.</p>
            <p>📍 Reconquista, Santa Fe, Argentina.</p>
          </div>
          <div>
            <b>Institucional</b>
            <a>Quiénes somos</a>
            <a>Cómo funciona</a>
            <a>Términos y condiciones</a>
            <a>Política de privacidad</a>
          </div>
          <div>
            <b>Contacto</b>
            <a onClick={() => window.open(`https://wa.me/${WORKCERCA_WHATSAPP}`, "_blank")}>WhatsApp: +54 3482 640-585</a>
            <a href={`mailto:${WORKCERCA_EMAIL}`}>{WORKCERCA_EMAIL}</a>
            <a>@{WORKCERCA_INSTAGRAM}</a>
          </div>
          <div>
            <b>Seguinos</b>
            <div className="wcSocials"><span>◎</span><span>f</span><span>▶</span><span>◉</span></div>
          </div>
        </div>
        <div className="wcContainer wcCopyright">© 2026 WorkCerca. Todos los derechos reservados.</div>
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
                <option>Emprendedor</option>
                <option>Empresa</option>
                <option>Municipio</option>
                <option>Institución</option>
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
