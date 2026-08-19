"use client";

import { useEffect, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";

export default function VideollamadasPage() {
  const [candidate, setCandidate] = useState("Postulante WorkCerca");
  const [job, setJob] = useState("Proceso laboral");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidato = params.get("candidato");
    const empleo = params.get("empleo");
    if (candidato) setCandidate(candidato);
    if (empleo) setJob(empleo);
  }, []);

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2400);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7fb", color: "#071a3d" }}>
      {notice ? (
        <div style={{ position: "fixed", right: 20, top: 20, background: "#071a3d", color: "#fff", padding: 12, borderRadius: 8, zIndex: 20 }}>
          {notice}
        </div>
      ) : null}

      <header style={{ background: "#fff", padding: 20, borderBottom: "1px solid #e1e7ed", display: "flex", justifyContent: "space-between", gap: 16 }}>
        <button onClick={() => (window.location.href = "/")} style={{ border: 0, background: "transparent" }}>
          <img src={logoHeader.src} alt="WorkCerca" style={{ width: 180 }} />
        </button>
        <button onClick={() => (window.location.href = "/empresa")}>Volver a Empresa</button>
      </header>

      <section style={{ maxWidth: 1050, margin: "0 auto", padding: 28 }}>
        <div style={{ background: "#071a3d", color: "#fff", borderRadius: 16, padding: 26 }}>
          <div style={{ color: "#38d8d3", fontSize: 11, fontWeight: 800 }}>ENTREVISTA · VIDEOLLAMADA</div>
          <h1>Conectá cara a cara sin salir de WorkCerca.</h1>
          <p style={{ color: "#dce8f2" }}>La videollamada quedará asociada al candidato, empleo y agenda correspondiente.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <section style={{ background: "#fff", border: "1px solid #e1e7ed", borderRadius: 12, padding: 20 }}>
            <div style={{ color: "#078da8", fontSize: 11, fontWeight: 800 }}>REUNIÓN PREPARADA</div>
            <h2>{candidate}</h2>
            <p>{job}</p>
            <p style={{ color: "#718096" }}>Estado: pendiente de agendar</p>
          </section>

          <section style={{ minHeight: 340, background: "#071a3d", color: "#fff", borderRadius: 12, padding: 20, display: "grid", placeItems: "center", textAlign: "center" }}>
            <div>
              <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#0a91a8", display: "grid", placeItems: "center", margin: "0 auto", fontSize: 26, fontWeight: 900 }}>WC</div>
              <h3>Sala de videollamada</h3>
              <p>La conexión real se integrará en una siguiente etapa.</p>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => notify("Micrófono")}>Micrófono</button>
                <button onClick={() => notify("Cámara")}>Cámara</button>
                <button onClick={() => notify("Compartir pantalla")}>Compartir</button>
              </div>
            </div>
          </section>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <button onClick={() => (window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(candidate)}&empleo=${encodeURIComponent(job)}`)}>
            Agendar esta entrevista
          </button>
          <button onClick={() => (window.location.href = `/mensajes?candidato=${encodeURIComponent(candidate)}&empleo=${encodeURIComponent(job)}`)}>
            Enviar mensaje
          </button>
          <button onClick={() => notify("Entrenador de entrevistas IA: próximo módulo.")}>
            Preparar entrevista con IA
          </button>
        </div>
      </section>
    </main>
  );
}
