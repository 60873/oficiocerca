"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import logoHeader from "../../../../workcerca-logo-header.png";

type CandidateProfile = {
  id: string;
  name: string;
  role: string;
  location: string;
  verified: boolean;
  trust: "Verificado" | "Identidad confirmada" | "En revisión";
  summary: string;
  availability: string;
  experience: string[];
  education: string[];
  skills: string[];
  cvLabel: string;
};

const candidateProfiles: CandidateProfile[] = [
  {
    id: "1",
    name: "María López",
    role: "Administración / Atención al cliente",
    location: "Reconquista",
    verified: true,
    trust: "Verificado",
    summary: "Perfil demostrativo orientado a tareas administrativas, atención al público y organización.",
    availability: "Full time",
    experience: [
      "Atención al cliente en comercio minorista",
      "Tareas administrativas generales",
      "Organización de turnos y documentación",
    ],
    education: [
      "Secundario completo",
      "Curso de herramientas digitales básicas",
    ],
    skills: ["Atención al cliente", "Organización", "PC", "Comunicación"],
    cvLabel: "CV WorkCerca",
  },
  {
    id: "2",
    name: "Lucas Benítez",
    role: "Ventas / Comercio",
    location: "Avellaneda",
    verified: true,
    trust: "Identidad confirmada",
    summary: "Perfil demostrativo con experiencia comercial y trato con clientes.",
    availability: "Part time",
    experience: [
      "Ventas presenciales",
      "Reposición y control de stock",
      "Atención postventa",
    ],
    education: [
      "Secundario completo",
    ],
    skills: ["Ventas", "Comercio", "Comunicación", "Stock"],
    cvLabel: "CV WorkCerca",
  },
  {
    id: "3",
    name: "Sofía Gómez",
    role: "Asistente de oficina",
    location: "Reconquista",
    verified: false,
    trust: "En revisión",
    summary: "Perfil demostrativo para tareas de apoyo administrativo y organización.",
    availability: "Full time",
    experience: [
      "Prácticas administrativas",
    ],
    education: [
      "Secundario completo",
      "Curso de administración inicial",
    ],
    skills: ["Administración", "Documentación", "Agenda", "Organización"],
    cvLabel: "Perfil completo",
  },
];

export default function EmpresaCandidatoPerfilPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "1";
  const [notice, setNotice] = useState("");

  const candidate = useMemo(
    () => candidateProfiles.find((item) => item.id === id) || candidateProfiles[0],
    [id]
  );

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
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
          <button onClick={() => (window.location.href = "/empresa/candidatos")}>⌕ Buscar candidatos</button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>◫ Postulantes</button>
          <button onClick={() => (window.location.href = "/mensajes")}>▱ Mensajes</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>▣ Videollamadas</button>
          <button onClick={() => (window.location.href = "/agenda")}>□ Agenda</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 WorkCerca Confianza</strong>
          <p>La empresa debe ver qué datos están verificados, cuáles están declarados y cuáles siguen en revisión.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Perfil / CV del candidato</strong>
            <span>Información laboral del perfil seleccionado.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}>
            Volver a candidatos
          </button>
        </header>

        <div className="content">
          <section className="profileHero">
            <div className="identity">
              <div className="avatar">
                {candidate.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <span className="eyebrow">CANDIDATO WORKCERCA</span>
                <h1>{candidate.name}</h1>
                <p>{candidate.role}</p>
                <small>⌖ {candidate.location}</small>
              </div>
            </div>

            <div className="trustCard">
              <span>🛡 Nivel de confianza</span>
              <strong>{candidate.trust}</strong>
              <p>
                La verificación no significa que WorkCerca garantice una contratación. Indica
                únicamente qué controles pudieron completarse sobre el perfil.
              </p>
            </div>
          </section>

          <section className="actionsBar">
            <button
              onClick={() =>
                (window.location.href = `/mensajes?candidato=${encodeURIComponent(
                  candidate.name
                )}`)
              }
            >
              💬 Enviar mensaje
            </button>

            <button
              onClick={() =>
                (window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(
                  candidate.name
                )}&empleo=${encodeURIComponent(candidate.role)}`)
              }
            >
              📅 Agendar entrevista
            </button>

            <button
              onClick={() =>
                (window.location.href = `/videollamadas?candidato=${encodeURIComponent(
                  candidate.name
                )}&empleo=${encodeURIComponent(candidate.role)}`)
              }
            >
              📹 Videollamada
            </button>

            <button onClick={() => notify("Descarga de CV: se conectará cuando exista un archivo real.")}>
              ⬇ Ver archivo CV
            </button>
          </section>

          <section className="grid">
            <article className="card">
              <span className="eyebrow dark">PRESENTACIÓN</span>
              <h2>Perfil profesional</h2>
              <p>{candidate.summary}</p>

              <div className="meta">
                <span>Disponibilidad</span>
                <strong>{candidate.availability}</strong>
              </div>

              <div className="meta">
                <span>CV</span>
                <strong>{candidate.cvLabel}</strong>
              </div>
            </article>

            <article className="card">
              <span className="eyebrow dark">HABILIDADES</span>
              <h2>Competencias declaradas</h2>
              <div className="skills">
                {candidate.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="infoBox">
                <strong>Importante</strong>
                <p>
                  Las habilidades declaradas no deben mostrarse como verificadas salvo que exista
                  evidencia o validación específica.
                </p>
              </div>
            </article>

            <article className="card">
              <span className="eyebrow dark">EXPERIENCIA</span>
              <h2>Experiencia laboral</h2>
              <div className="timeline">
                {candidate.experience.map((item) => (
                  <div key={item}>
                    <span>•</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card">
              <span className="eyebrow dark">FORMACIÓN</span>
              <h2>Estudios y cursos</h2>
              <div className="timeline">
                {candidate.education.map((item) => (
                  <div key={item}>
                    <span>•</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="educationTrust">
                <strong>🛡 Validación educativa futura</strong>
                <p>
                  WorkCerca deberá distinguir entre formación declarada, institución verificada y
                  títulos/certificaciones con respaldo oficial comprobado.
                </p>
              </div>
            </article>
          </section>

          <section className="aiPanel">
            <div>
              <span className="eyebrow dark">COINCIDENCIA IA FUTURA</span>
              <h2>Explicar por qué un perfil puede encajar con un puesto.</h2>
              <p>
                La IA podrá comparar requisitos reales de una búsqueda con datos reales del CV y
                explicar coincidencias o faltantes sin inventar experiencia, estudios ni habilidades.
              </p>
            </div>

            <button onClick={() => notify("Análisis de coincidencia IA: se conectará en la etapa IA.")}>
              ✦ Analizar coincidencia
            </button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.profileHero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.identity{display:flex;gap:16px;align-items:center}.avatar{width:82px;height:82px;border-radius:50%;background:#0a91a8;display:grid;place-items:center;font-size:24px;font-weight:900}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.identity h1{font-size:34px;margin:6px 0}.identity p{font-size:12px;color:#dce8f2;margin:0}.identity small{display:block;font-size:9px;color:#cbd8e4;margin-top:5px}.trustCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.trustCard>span{font-size:9px;color:#078da8;font-weight:900}.trustCard strong{display:block;font-size:18px;margin:8px 0}.trustCard p{font-size:9px;color:#617287;line-height:1.5}.actionsBar{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0}.actionsBar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.card{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.card h2{font-size:19px;margin:4px 0 12px}.card>p{font-size:9px;color:#53677b;line-height:1.6}.meta{display:flex;justify-content:space-between;gap:12px;border-top:1px solid #edf1f4;padding-top:10px;margin-top:10px}.meta span{font-size:8px;color:#718096}.meta strong{font-size:9px}.skills{display:flex;flex-wrap:wrap;gap:6px}.skills span{background:#eef7fb;color:#087f93;border-radius:999px;padding:6px 8px;font-size:8px}.infoBox,.educationTrust{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:9px;padding:11px}.infoBox strong,.educationTrust strong{font-size:9px;color:#087f93}.infoBox p,.educationTrust p{font-size:8px;color:#53677b;line-height:1.5;margin-bottom:0}.timeline{display:grid;gap:8px}.timeline div{display:grid;grid-template-columns:12px 1fr;gap:6px}.timeline span{color:#078da8}.timeline p{font-size:9px;color:#53677b;margin:0;line-height:1.5}.aiPanel{display:flex;justify-content:space-between;align-items:center;gap:18px;background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-top:14px}.aiPanel h2{font-size:19px;margin:4px 0}.aiPanel p{font-size:9px;color:#53677b;line-height:1.6;max-width:760px}.aiPanel button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.profileHero,.grid{grid-template-columns:1fr}.aiPanel{align-items:flex-start;flex-direction:column}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.content{padding:14px}.identity{align-items:flex-start}.avatar{width:64px;height:64px}}
      `}</style>
    </main>
  );
}
