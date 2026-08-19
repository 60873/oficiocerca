"use client";

import { useEffect, useMemo, useState } from "react";
import logoHeader from "../../workcerca-logo-header.png";

type Conversation = {
  id: string;
  name: string;
  role: string;
  last: string;
  unread: number;
};

const initialConversations: Conversation[] = [
  { id: "1", name: "Usuario Prueba WorkCerca", role: "Postulante · Vendedor/a", last: "Postulación recibida", unread: 1 },
  { id: "2", name: "Equipo WorkCerca", role: "Soporte", last: "Tu cuenta está lista.", unread: 0 },
];

export default function MensajesPage() {
  const [candidate, setCandidate] = useState("");
  const [job, setJob] = useState("");
  const [selected, setSelected] = useState("1");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidato = params.get("candidato") || "";
    const empleo = params.get("empleo") || "";
    setCandidate(candidato);
    setJob(empleo);
    if (candidato) setSelected("candidate");
  }, []);

  const conversations = useMemo<Conversation[]>(() => {
    if (!candidate) return initialConversations;
    return [
      { id: "candidate", name: candidate, role: job ? `Postulante · ${job}` : "Postulante WorkCerca", last: "Conversación vinculada a una postulación", unread: 0 },
      ...initialConversations,
    ];
  }, [candidate, job]);

  const current = conversations.find((c) => c.id === selected) || conversations[0];

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const send = () => {
    if (!message.trim()) return;
    notify("Mensaje preparado. Luego se guardará en Supabase.");
    setMessage("");
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

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => (window.location.href = "/empresa")}>Mi Empresa</button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>Postulantes</button>
          <button onClick={() => (window.location.href = "/agenda")}>Agenda</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>Videollamadas</button>
        </div>
      </header>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: 28 }}>
        <div style={{ background: "#071a3d", color: "#fff", borderRadius: 16, padding: 26 }}>
          <div style={{ color: "#38d8d3", fontSize: 11, fontWeight: 800 }}>COMUNICACIÓN CENTRALIZADA</div>
          <h1>Hablá dentro de WorkCerca sin perder el contexto.</h1>
          <p style={{ color: "#dce8f2" }}>Cada conversación podrá quedar asociada al empleo, solicitud, presupuesto u oportunidad correspondiente.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "330px 1fr", marginTop: 16, background: "#fff", border: "1px solid #e1e7ed", borderRadius: 14, overflow: "hidden", minHeight: 500 }}>
          <aside style={{ borderRight: "1px solid #e7edf2", padding: 14 }}>
            <h2>Conversaciones</h2>
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{ width: "100%", border: 0, background: selected === c.id ? "#eef7fb" : "#fff", textAlign: "left", padding: 12, borderRadius: 9, marginTop: 6 }}>
                <strong>{c.name}</strong>
                <div style={{ fontSize: 12, color: "#6b7b8d", marginTop: 3 }}>{c.role}</div>
                <div style={{ fontSize: 11, color: "#8290a0", marginTop: 3 }}>{c.last}</div>
              </button>
            ))}
          </aside>

          <section style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}>
            <header style={{ padding: 16, borderBottom: "1px solid #e7edf2", display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <strong>{current.name}</strong>
                <div style={{ fontSize: 12, color: "#718096", marginTop: 3 }}>{current.role}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => (window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(current.name)}&empleo=${encodeURIComponent(job)}`)}>Agendar</button>
                <button onClick={() => (window.location.href = `/videollamadas?candidato=${encodeURIComponent(current.name)}&empleo=${encodeURIComponent(job)}`)}>Videollamada</button>
              </div>
            </header>

            <div style={{ padding: 18, background: "#fbfcfd" }}>
              <div style={{ textAlign: "center", fontSize: 11, color: "#8290a0" }}>Conversación protegida dentro de WorkCerca.</div>
              <div style={{ marginTop: 20, maxWidth: "70%", background: "#eef4f7", borderRadius: 10, padding: 12 }}>
                Hola, esta conversación está vinculada a tu proceso en WorkCerca.
              </div>
            </div>

            <footer style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid #e7edf2" }}>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escribí un mensaje..." style={{ flex: 1, minHeight: 60, border: "1px solid #dce3ea", borderRadius: 8, padding: 10 }} />
              <button onClick={send}>Enviar</button>
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}
