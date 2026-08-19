"use client";

import { useEffect, useState } from "react";

type AgendaItem = {
  id: string;
  title: string;
  person: string;
  date: string;
  time: string;
  type: string;
  status: string;
};

export default function AgendaPage() {
  const [notice, setNotice] = useState("");
  const [items, setItems] = useState<AgendaItem[]>([]);
  const [form, setForm] = useState({
    title: "",
    person: "",
    date: "",
    time: "",
    type: "Entrevista",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const candidate = params.get("candidato") || "";
    const job = params.get("empleo") || "";

    if (params.get("nuevo") === "entrevista") {
      setForm((prev) => ({
        ...prev,
        title: job ? `Entrevista · ${job}` : "Entrevista",
        person: candidate,
      }));
    }
  }, []);

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const addItem = () => {
    if (!form.title || !form.date || !form.time) {
      notify("Completá título, fecha y hora.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: form.title,
        person: form.person,
        date: form.date,
        time: form.time,
        type: form.type,
        status: "Pendiente",
      },
    ]);

    notify("Evento agregado a la agenda.");
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7fb", color: "#071a3d" }}>
      {notice ? (
        <div style={{ position: "fixed", right: 20, top: 20, background: "#071a3d", color: "#fff", padding: 12, borderRadius: 8, zIndex: 10 }}>
          {notice}
        </div>
      ) : null}

      <header style={{ background: "#fff", padding: 20, borderBottom: "1px solid #e1e7ed", display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <strong>Agenda WorkCerca</strong>
          <div style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>
            Entrevistas, reuniones, tareas y seguimientos.
          </div>
        </div>

        <button onClick={() => (window.location.href = "/empresa")}>
          Volver a Empresa
        </button>
      </header>

      <section style={{ maxWidth: 1050, margin: "0 auto", padding: 28 }}>
        <div style={{ background: "#071a3d", color: "#fff", borderRadius: 16, padding: 26 }}>
          <div style={{ fontSize: 11, color: "#38d8d3", fontWeight: 800 }}>
            AGENDA CONECTADA
          </div>
          <h1>Que una oportunidad no se pierda por falta de seguimiento.</h1>
          <p style={{ color: "#dce8f2" }}>
            La agenda se conectará con postulantes, mensajes y videollamadas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <section style={{ background: "#fff", border: "1px solid #e1e7ed", borderRadius: 12, padding: 20 }}>
            <h2>Agendar</h2>

            <label style={{ display: "block", marginTop: 10 }}>
              Título
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                style={{ width: "100%", marginTop: 5, padding: 10 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 10 }}>
              Persona / entidad
              <input
                value={form.person}
                onChange={(e) => setForm((prev) => ({ ...prev, person: e.target.value }))}
                style={{ width: "100%", marginTop: 5, padding: 10 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 10 }}>
              Fecha
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                style={{ width: "100%", marginTop: 5, padding: 10 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 10 }}>
              Hora
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                style={{ width: "100%", marginTop: 5, padding: 10 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 10 }}>
              Tipo
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                style={{ width: "100%", marginTop: 5, padding: 10 }}
              >
                <option>Entrevista</option>
                <option>Videollamada</option>
                <option>Reunión</option>
                <option>Tarea</option>
                <option>Recordatorio</option>
              </select>
            </label>

            <button onClick={addItem} style={{ marginTop: 14, padding: "10px 14px" }}>
              Agregar a agenda
            </button>
          </section>

          <section style={{ background: "#fff", border: "1px solid #e1e7ed", borderRadius: 12, padding: 20 }}>
            <h2>Próximos</h2>

            {items.length === 0 ? (
              <p style={{ color: "#718096" }}>Todavía no hay eventos agregados.</p>
            ) : (
              items.map((item) => (
                <article key={item.id} style={{ border: "1px solid #e5eaf0", borderRadius: 10, padding: 12, marginTop: 8 }}>
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    {item.person || "Sin persona asignada"}
                  </div>
                  <div style={{ fontSize: 12, color: "#718096", marginTop: 4 }}>
                    {item.date} · {item.time} · {item.type}
                  </div>
                  <button
                    onClick={() =>
                      (window.location.href = `/videollamadas?candidato=${encodeURIComponent(
                        item.person
                      )}&empleo=${encodeURIComponent(item.title)}`)
                    }
                    style={{ marginTop: 8 }}
                  >
                    Abrir videollamada
                  </button>
                </article>
              ))
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
