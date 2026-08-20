"use client";

import { useMemo, useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type Interview = {
  id: string;
  candidate: string;
  role: string;
  date: string;
  time: string;
  mode: "Videollamada" | "Presencial";
  status: "Pendiente" | "Confirmada" | "Realizada" | "Cancelada";
  notes: string;
};

const initialInterviews: Interview[] = [
  {
    id: "1",
    candidate: "María López",
    role: "Administración / Atención al cliente",
    date: "2026-08-21",
    time: "10:30",
    mode: "Videollamada",
    status: "Confirmada",
    notes: "Entrevista demostrativa vinculada a un perfil de candidato.",
  },
  {
    id: "2",
    candidate: "Lucas Benítez",
    role: "Ventas / Comercio",
    date: "2026-08-22",
    time: "16:00",
    mode: "Presencial",
    status: "Pendiente",
    notes: "Pendiente de confirmación por ambas partes.",
  },
];

export default function EmpresaEntrevistasPage() {
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);
  const [filter, setFilter] = useState("Todas");
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    candidate: "",
    role: "",
    date: "",
    time: "",
    mode: "Videollamada",
    notes: "",
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const filtered = useMemo(() => {
    if (filter === "Todas") return interviews;
    return interviews.filter((item) => item.status === filter);
  }, [interviews, filter]);

  const addInterview = () => {
    if (!form.candidate.trim() || !form.date || !form.time) {
      notify("Completá candidato, fecha y hora.");
      return;
    }

    const newInterview: Interview = {
      id: String(Date.now()),
      candidate: form.candidate.trim(),
      role: form.role.trim() || "Puesto no informado",
      date: form.date,
      time: form.time,
      mode: form.mode as "Videollamada" | "Presencial",
      status: "Pendiente",
      notes: form.notes.trim() || "Sin notas.",
    };

    setInterviews((prev) => [newInterview, ...prev]);
    setForm({
      candidate: "",
      role: "",
      date: "",
      time: "",
      mode: "Videollamada",
      notes: "",
    });
    notify("Entrevista agregada.");
  };

  const updateStatus = (id: string, status: Interview["status"]) => {
    setInterviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    notify(`Estado actualizado a ${status}.`);
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
          <button onClick={() => (window.location.href = "/agenda")}>□ Agenda</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>▣ Videollamadas</button>
          <button className="active">🎙 Entrevistas</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Entrevistas con contexto</strong>
          <p>La entrevista debe estar vinculada a una persona, un puesto y una empresa identificables.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Entrevistas</strong>
            <span>Organizá entrevistas y seguimientos sin perder el contexto del proceso.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · ENTREVISTAS WORKCERCA</span>
              <h1>Prepará mejores entrevistas para tomar mejores decisiones.</h1>
              <p>
                WorkCerca podrá conectar candidato, empleo, mensajes, agenda y videollamada
                en un mismo proceso, evitando información dispersa.
              </p>
            </div>

            <div className="aiCard">
              <span>✦ Asistente IA de entrevista</span>
              <strong>Preparación sin reemplazar el criterio humano.</strong>
              <p>
                La IA podrá sugerir preguntas relevantes según el puesto y ayudar a evitar
                preguntas irrelevantes o discriminatorias.
              </p>
            </div>
          </section>

          <section className="builder">
            <div>
              <span className="eyebrow dark">NUEVA ENTREVISTA</span>
              <h2>Agendar entrevista</h2>
            </div>

            <div className="formGrid">
              <label>
                Candidato
                <input
                  value={form.candidate}
                  onChange={(e) => setForm((prev) => ({ ...prev, candidate: e.target.value }))}
                  placeholder="Nombre del candidato"
                />
              </label>

              <label>
                Puesto
                <input
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="Ej.: Vendedor/a"
                />
              </label>

              <label>
                Fecha
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                />
              </label>

              <label>
                Hora
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                />
              </label>

              <label>
                Modalidad
                <select
                  value={form.mode}
                  onChange={(e) => setForm((prev) => ({ ...prev, mode: e.target.value }))}
                >
                  <option>Videollamada</option>
                  <option>Presencial</option>
                </select>
              </label>

              <label className="full">
                Notas
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Información útil para preparar la entrevista."
                />
              </label>
            </div>

            <div className="builderActions">
              <button onClick={() => notify("Preparación IA: se conectará en la etapa IA.")}>
                ✦ Preparar con IA
              </button>
              <button className="primary" onClick={addInterview}>
                Agregar entrevista
              </button>
            </div>
          </section>

          <section className="toolbar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>Todas</option>
              <option>Pendiente</option>
              <option>Confirmada</option>
              <option>Realizada</option>
              <option>Cancelada</option>
            </select>
          </section>

          <section className="panel">
            <div className="panelHead">
              <div>
                <span className="eyebrow dark">PROCESOS ABIERTOS</span>
                <h2>{filtered.length} entrevistas</h2>
              </div>
              <small>Datos demostrativos hasta conectar Supabase.</small>
            </div>

            <div className="list">
              {filtered.map((item) => (
                <article key={item.id}>
                  <div className="identity">
                    <div className="avatar">
                      {item.candidate
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>{item.candidate}</h3>
                      <p>{item.role}</p>
                      <small>
                        {item.date} · {item.time} · {item.mode}
                      </small>
                    </div>
                  </div>

                  <div className={`status ${item.status === "Confirmada" ? "confirmed" : ""}`}>
                    {item.status}
                  </div>

                  <p className="notes">{item.notes}</p>

                  <div className="actions">
                    <button
                      onClick={() =>
                        (window.location.href = `/mensajes?candidato=${encodeURIComponent(
                          item.candidate
                        )}&empleo=${encodeURIComponent(item.role)}`)
                      }
                    >
                      Mensaje
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href = `/agenda?nuevo=entrevista&candidato=${encodeURIComponent(
                          item.candidate
                        )}&empleo=${encodeURIComponent(item.role)}`)
                      }
                    >
                      Agenda
                    </button>

                    {item.mode === "Videollamada" ? (
                      <button
                        onClick={() =>
                          (window.location.href = `/videollamadas?candidato=${encodeURIComponent(
                            item.candidate
                          )}&empleo=${encodeURIComponent(item.role)}`)
                        }
                      >
                        Abrir videollamada
                      </button>
                    ) : null}

                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(item.id, e.target.value as Interview["status"])
                      }
                    >
                      <option>Pendiente</option>
                      <option>Confirmada</option>
                      <option>Realizada</option>
                      <option>Cancelada</option>
                    </select>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="candidateHelp">
            <div>
              <span className="eyebrow dark">ACOMPAÑAMIENTO WORKCERCA</span>
              <h2>La entrevista también puede ser una barrera para quien busca trabajo.</h2>
              <p>
                Más adelante, el candidato tendrá un espacio privado para practicar cómo presentarse,
                ordenar sus ideas y responder preguntas frecuentes. La empresa no verá esa práctica.
              </p>
            </div>

            <button onClick={() => notify("Entrenador privado del candidato: se construirá en la etapa IA.")}>
              ✦ Entrenador de entrevistas
            </button>
          </section>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page select,.page textarea{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.aiCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.aiCard>span{font-size:9px;color:#078da8;font-weight:900}.aiCard strong{display:block;font-size:14px;margin:8px 0}.aiCard p{font-size:9px;color:#617287}.builder,.panel{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px;margin-top:16px}.builder h2,.panelHead h2{font-size:20px;margin:4px 0 14px}.formGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.formGrid label{font-size:9px;font-weight:700}.formGrid input,.formGrid select,.formGrid textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.formGrid textarea{min-height:90px}.formGrid .full{grid-column:1/-1}.builderActions{display:flex;justify-content:flex-end;gap:8px;margin-top:12px}.builderActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.builderActions .primary{border:0;background:#071a3d;color:#fff}.toolbar{display:flex;justify-content:flex-end;margin:16px 0}.toolbar select{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px}.panelHead{display:flex;justify-content:space-between;align-items:end;gap:12px}.panelHead small{font-size:8px;color:#8290a0;margin-bottom:14px}.list{display:grid;gap:10px}.list article{border:1px solid #e2e8ee;border-radius:11px;padding:14px}.identity{display:flex;gap:10px;align-items:center}.avatar{width:44px;height:44px;border-radius:50%;background:#e7f5f8;color:#087e92;display:grid;place-items:center;font-weight:900;font-size:10px}.identity h3,.identity p,.identity small{margin:0}.identity h3{font-size:11px}.identity p{font-size:9px;color:#53677b;margin-top:3px}.identity small{font-size:8px;color:#8290a0}.status{display:inline-block;margin-top:10px;background:#fff6df;color:#8b6500;border-radius:999px;padding:5px 8px;font-size:8px;font-weight:900}.status.confirmed{background:#e7f7f0;color:#16735a}.notes{font-size:9px;color:#53677b;line-height:1.5}.actions{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}.actions button,.actions select{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:7px 9px;font-size:8px}.candidateHelp{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:13px;padding:18px}.candidateHelp h2{font-size:19px;margin:4px 0}.candidateHelp p{font-size:9px;color:#53677b;line-height:1.6;max-width:760px}.candidateHelp button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.hero{grid-template-columns:1fr}.candidateHelp{align-items:flex-start;flex-direction:column}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.formGrid{grid-template-columns:1fr}.formGrid .full{grid-column:auto}.content{padding:14px}}
      `}</style>
    </main>
  );
}
