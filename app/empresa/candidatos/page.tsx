"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Candidate = {
  id: string;
  name: string;
  role: string;
  location: string;
  verified: boolean;
  cv: string;
  skills: string[];
  availability: string;
};

const candidateData: Candidate[] = [
  { id: "1", name: "María López", role: "Administración / Atención al cliente", location: "Reconquista", verified: true, cv: "CV WorkCerca", skills: ["Atención al cliente", "PC", "Organización"], availability: "Full time" },
  { id: "2", name: "Lucas Benítez", role: "Ventas / Comercio", location: "Avellaneda", verified: true, cv: "CV WorkCerca", skills: ["Ventas", "Comercio", "Comunicación"], availability: "Part time" },
  { id: "3", name: "Sofía Gómez", role: "Asistente de oficina", location: "Reconquista", verified: false, cv: "Perfil completo", skills: ["Administración", "Documentación", "Agenda"], availability: "Full time" },
];

export default function EmpresaCandidatosPage() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("todas");
  const [notice, setNotice] = useState("");

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filteredCandidates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return candidateData.filter((candidate) => {
      const text = `${candidate.name} ${candidate.role} ${candidate.location} ${candidate.skills.join(" ")}`.toLowerCase();
      const searchOk = !query || text.includes(query);
      const locationOk = locationFilter === "todas" || candidate.location.toLowerCase() === locationFilter.toLowerCase();
      return searchOk && locationOk;
    });
  }, [search, locationFilter]);

  return (
    <main className="page">
      {notice ? <div className="toast">{notice}</div> : null}

      <aside className="sidebar">
        <button className="logo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>
        <nav>
          <button onClick={() => (window.location.href = "/empresa")}>Mi Empresa</button>
          <button className="active">Buscar candidatos</button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>Postulantes</button>
          <button onClick={() => (window.location.href = "/mensajes")}>Mensajes</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>Videollamadas</button>
          <button onClick={() => (window.location.href = "/agenda")}>Agenda</button>
        </nav>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Buscar candidatos</strong>
            <span>Encontrá perfiles compatibles con las necesidades de tu empresa.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>Volver a Mi Empresa</button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · TALENTO WORKCERCA</span>
              <h1>Buscá personas por perfil, habilidades y ubicación.</h1>
              <p>WorkCerca podrá cruzar búsquedas laborales reales con perfiles y CV reales. La IA explicará coincidencias sin inventar experiencia.</p>
            </div>
            <div className="heroCard">
              <span>✦ Motor IA WorkCerca</span>
              <strong>Coincidencias explicables</strong>
              <p>La próxima etapa conectará esta pantalla con perfiles reales de Supabase.</p>
            </div>
          </section>

          <section className="filters">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre, perfil, habilidad o localidad..." />
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="todas">Todas las localidades</option>
              <option value="Reconquista">Reconquista</option>
              <option value="Avellaneda">Avellaneda</option>
            </select>
          </section>

          <section className="results">
            <div className="sectionHead">
              <span className="eyebrow dark">RESULTADOS</span>
              <h2>{filteredCandidates.length} perfiles encontrados</h2>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="empty">No encontramos candidatos con esos filtros.</div>
            ) : (
              <div className="candidateGrid">
                {filteredCandidates.map((candidate) => (
                  <article key={candidate.id}>
                    <div className="candidateHeader">
                      <div className="avatar">{candidate.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}</div>
                      <div>
                        <h3>{candidate.name} {candidate.verified ? <span className="verified">✓</span> : null}</h3>
                        <p>{candidate.role}</p>
                        <small>{candidate.location}</small>
                      </div>
                    </div>
                    <div className="skills">
                      {candidate.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                    <div className="meta">
                      <span>CV: {candidate.cv}</span>
                      <span>Disponibilidad: {candidate.availability}</span>
                    </div>
                    <div className="actions">
                      <button onClick={() => notify(`Ver CV de ${candidate.name}`)}>Ver perfil / CV</button>
                      <button onClick={() => (window.location.href = `/mensajes?candidato=${encodeURIComponent(candidate.name)}`)}>Mensaje</button>
                      <button onClick={() => (window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(candidate.name)}`)}>Agendar entrevista</button>
                      <button onClick={() => (window.location.href = `/videollamadas?candidato=${encodeURIComponent(candidate.name)}`)}>Videollamada</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:235px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent}.logo img{width:185px}.sidebar nav{display:grid;gap:6px;margin-top:24px}.sidebar nav button{border:0;background:transparent;color:#fff;text-align:left;padding:12px;border-radius:8px}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px 28px}.topbar span{display:block;font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px}.content{max-width:1150px;margin:0 auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.1em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.1;margin:8px 0}.hero p{color:#dce8f2;font-size:11px;line-height:1.6}.heroCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.heroCard>span{color:#078da8;font-size:9px;font-weight:900}.heroCard strong{display:block;margin:8px 0}.heroCard p{color:#617287;font-size:9px}.filters{display:grid;grid-template-columns:1fr 240px;gap:10px;margin:16px 0}.filters input,.filters select{width:100%;border:1px solid #dce3ea;background:#fff;border-radius:9px;padding:11px}.results{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.sectionHead h2{margin:4px 0 14px;font-size:20px}.candidateGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.candidateGrid article{border:1px solid #e2e8ee;border-radius:12px;padding:16px}.candidateHeader{display:flex;gap:10px;align-items:center}.avatar{width:48px;height:48px;border-radius:50%;background:#e7f5f8;color:#087e92;display:grid;place-items:center;font-weight:900}.candidateHeader h3,.candidateHeader p,.candidateHeader small{margin:0}.candidateHeader h3{font-size:13px}.candidateHeader p{font-size:9px;color:#53677b;margin-top:3px}.candidateHeader small{font-size:8px;color:#8290a0}.verified{color:#078da8}.skills{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}.skills span{background:#eef7fb;color:#087f93;border-radius:999px;padding:5px 8px;font-size:8px}.meta{display:grid;gap:4px;font-size:8px;color:#607185;margin-bottom:12px}.actions{display:flex;flex-wrap:wrap;gap:6px}.actions button{border:1px solid #dce3ea;background:#fff;color:#071a3d;border-radius:7px;padding:7px 9px;font-size:8px}.empty{border:1px dashed #ccd7e1;border-radius:10px;padding:18px;color:#607185}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px}@media(max-width:820px){.page{display:block}.sidebar{width:100%;min-height:0}.hero,.filters,.candidateGrid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
