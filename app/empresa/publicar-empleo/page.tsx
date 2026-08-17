"use client";

import { useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type FormData = {
  puesto: string;
  descripcion: string;
  ubicacion: string;
  modalidad: string;
  jornada: string;
  requisitos: string;
  experiencia: string;
  salario: string;
  cierre: string;
  contacto: string;
};

const initialForm: FormData = {
  puesto: "",
  descripcion: "",
  ubicacion: "",
  modalidad: "Presencial",
  jornada: "Full time",
  requisitos: "",
  experiencia: "",
  salario: "",
  cierre: "",
  contacto: "",
};

export default function PublicarEmpleoPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [notice, setNotice] = useState("");
  const [published, setPublished] = useState(false);

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const saveDraft = () => notify("Borrador guardado. Podrás retomarlo más adelante.");

  const publish = () => {
    if (!form.puesto.trim() || !form.descripcion.trim() || !form.ubicacion.trim()) {
      notify("Completá puesto, descripción y ubicación antes de publicar.");
      return;
    }
    setPublished(true);
    notify("Búsqueda publicada en WorkCerca.");
  };

  return (
    <main className="jobPublishPage">
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="profile">
          <div className="avatar">E</div>
          <div>
            <strong>Empresa Demo WorkCerca</strong>
            <span>Empresa verificada ✓</span>
          </div>
        </div>

        <nav>
          <button onClick={() => (window.location.href = "/")}>⌂ <span>Inicio</span></button>
          <button onClick={() => (window.location.href = "/mi-workcerca")}>▣ <span>Mi WorkCerca</span></button>
          <button onClick={() => (window.location.href = "/empresa")}>▦ <span>Mi Empresa</span></button>
          <button className="active">＋ <span>Publicar empleo</span></button>
          <button onClick={() => (window.location.href = "/busco-trabajo")}>💼 <span>Busco trabajo / CV</span></button>
          <button onClick={() => notify("Buscar candidatos")}>⌕ <span>Buscar candidatos</span></button>
          <button onClick={() => notify("Postulantes")}>◫ <span>Postulantes</span></button>
          <button onClick={() => notify("Mensajes")}>▱ <span>Mensajes</span></button>
          <button onClick={() => notify("Videollamadas")}>▣ <span>Videollamadas</span></button>
          <button onClick={() => notify("Agenda")}>□ <span>Agenda</span></button>
        </nav>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Publicar empleo</strong>
            <span>Creá una búsqueda laboral clara y conectala con candidatos WorkCerca.</span>
          </div>
          <div className="topActions">
            <button onClick={() => (window.location.href = "/empresa")}>Volver a Mi Empresa</button>
            <button onClick={saveDraft}>Guardar borrador</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · OPORTUNIDAD LABORAL</span>
              <h1>Publicá una búsqueda y dejá que WorkCerca encuentre coincidencias.</h1>
              <p>
                La información que cargues alimentará el Motor WorkCerca para mostrar la oportunidad
                a personas compatibles y ayudarte a descubrir candidatos relevantes.
              </p>
            </div>
            <div className="aiCard">
              <span>✦ Motor IA WorkCerca</span>
              <strong>La IA no inventa candidatos.</strong>
              <p>
                Compara lo que tu empresa necesita con información real de perfiles y CV WorkCerca.
              </p>
            </div>
          </section>

          {published ? (
            <section className="successCard">
              <div className="successIcon">✓</div>
              <div>
                <span className="eyebrow dark">PUBLICACIÓN CREADA</span>
                <h2>{form.puesto}</h2>
                <p>{form.ubicacion} · {form.modalidad} · {form.jornada}</p>
                <p>
                  La búsqueda quedó preparada para aparecer en Busco trabajo y para alimentar
                  recomendaciones de candidatos dentro de Empresa.
                </p>
                <div className="successActions">
                  <button onClick={() => (window.location.href = "/empresa")}>Volver a Mi Empresa</button>
                  <button onClick={() => setPublished(false)}>Editar publicación</button>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="formCard">
                <div className="sectionTitle">
                  <div>
                    <span className="eyebrow dark">DATOS PRINCIPALES</span>
                    <h2>Información del puesto</h2>
                  </div>
                  <span className="required">* Campos principales</span>
                </div>

                <div className="grid2">
                  <label>
                    Puesto *
                    <input
                      value={form.puesto}
                      onChange={(e) => update("puesto", e.target.value)}
                      placeholder="Ej.: Auxiliar administrativo/a"
                    />
                  </label>

                  <label>
                    Ubicación *
                    <input
                      value={form.ubicacion}
                      onChange={(e) => update("ubicacion", e.target.value)}
                      placeholder="Ej.: Reconquista, Santa Fe"
                    />
                  </label>

                  <label>
                    Modalidad
                    <select value={form.modalidad} onChange={(e) => update("modalidad", e.target.value)}>
                      <option>Presencial</option>
                      <option>Híbrido</option>
                      <option>Remoto</option>
                    </select>
                  </label>

                  <label>
                    Jornada
                    <select value={form.jornada} onChange={(e) => update("jornada", e.target.value)}>
                      <option>Full time</option>
                      <option>Part time</option>
                      <option>Por turnos</option>
                      <option>Temporal</option>
                      <option>Eventual</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  Descripción del puesto *
                  <textarea
                    value={form.descripcion}
                    onChange={(e) => update("descripcion", e.target.value)}
                    placeholder="Contá qué tareas realizará la persona, qué responsabilidades tendrá y qué ofrece la empresa."
                  />
                </label>

                <button
                  className="aiHelp"
                  onClick={() =>
                    notify("La IA podrá ayudarte a ordenar y redactar mejor la publicación sin inventar requisitos.")
                  }
                >
                  ✦ Ayudarme a redactar con IA
                </button>
              </section>

              <section className="formCard">
                <div className="sectionTitle">
                  <div>
                    <span className="eyebrow dark">PERFIL BUSCADO</span>
                    <h2>Requisitos y experiencia</h2>
                  </div>
                </div>

                <label className="block">
                  Requisitos
                  <textarea
                    value={form.requisitos}
                    onChange={(e) => update("requisitos", e.target.value)}
                    placeholder="Ej.: secundario completo, conocimientos de PC, buena comunicación, disponibilidad horaria..."
                  />
                </label>

                <label className="block">
                  Experiencia
                  <textarea
                    value={form.experiencia}
                    onChange={(e) => update("experiencia", e.target.value)}
                    placeholder="Ej.: experiencia deseable, no excluyente / primer empleo / 2 años en tareas similares..."
                  />
                </label>
              </section>

              <section className="formCard">
                <div className="sectionTitle">
                  <div>
                    <span className="eyebrow dark">CONDICIONES</span>
                    <h2>Datos complementarios</h2>
                  </div>
                </div>

                <div className="grid2">
                  <label>
                    Salario o rango salarial
                    <input
                      value={form.salario}
                      onChange={(e) => update("salario", e.target.value)}
                      placeholder="Opcional"
                    />
                  </label>

                  <label>
                    Fecha de cierre
                    <input
                      type="date"
                      value={form.cierre}
                      onChange={(e) => update("cierre", e.target.value)}
                    />
                  </label>

                  <label className="full">
                    Contacto o responsable
                    <input
                      value={form.contacto}
                      onChange={(e) => update("contacto", e.target.value)}
                      placeholder="Ej.: Recursos Humanos / rrhh@empresa.com"
                    />
                  </label>
                </div>
              </section>

              <section className="previewCard">
                <div className="previewHead">
                  <div>
                    <span className="eyebrow dark">VISTA PREVIA</span>
                    <h2>Así verá la oportunidad un candidato.</h2>
                  </div>
                  <span className="status">Borrador</span>
                </div>

                <div className="previewJob">
                  <div>
                    <span className="companyTag">Empresa verificada ✓</span>
                    <h3>{form.puesto || "Título del puesto"}</h3>
                    <p>{form.ubicacion || "Ubicación"} · {form.modalidad} · {form.jornada}</p>
                  </div>
                  <button onClick={() => notify("Vista del candidato")}>Vista candidato</button>
                </div>

                <p className="previewDesc">
                  {form.descripcion || "La descripción de la búsqueda aparecerá aquí."}
                </p>

                <div className="previewMeta">
                  <span><b>Requisitos:</b> {form.requisitos || "A definir"}</span>
                  <span><b>Experiencia:</b> {form.experiencia || "A definir"}</span>
                  <span><b>Salario:</b> {form.salario || "No informado"}</span>
                </div>
              </section>

              <section className="bottomActions">
                <button className="secondary" onClick={() => (window.location.href = "/empresa")}>Cancelar</button>
                <button className="secondary" onClick={saveDraft}>Guardar borrador</button>
                <button className="primary" onClick={publish}>Publicar empleo</button>
              </section>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .jobPublishPage{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.jobPublishPage *{box-sizing:border-box}.jobPublishPage button,.jobPublishPage input,.jobPublishPage textarea,.jobPublishPage select{font:inherit}.sidebar{width:245px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;position:sticky;top:0;height:100vh;overflow:auto;flex:none}.logo{border:0;background:transparent;padding:0 4px 22px;cursor:pointer}.logo img{width:190px;height:auto}.profile{display:flex;gap:10px;align-items:center;padding:8px 6px 22px}.avatar{width:46px;height:46px;border-radius:50%;background:#0a9aae;display:grid;place-items:center;font-size:18px;font-weight:900}.profile strong,.profile span{display:block}.profile strong{font-size:12px}.profile span{font-size:9px;color:#21d8d2;margin-top:4px}.sidebar nav{display:grid;gap:5px}.sidebar nav button{border:0;background:transparent;color:#fff;border-radius:9px;padding:11px 12px;text-align:left;display:flex;gap:9px;align-items:center;cursor:pointer;font-size:10px}.sidebar nav button span{flex:1}.sidebar nav button:hover,.sidebar nav button.active{background:linear-gradient(90deg,#0799ba,#08758d)}.main{flex:1;min-width:0}.topbar{height:68px;background:#fff;border-bottom:1px solid #e2e8ef;display:flex;justify-content:space-between;align-items:center;padding:0 28px;position:sticky;top:0;z-index:20}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:3px}.topActions{display:flex;gap:8px}.topActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 11px;color:#17314e;font-size:9px;cursor:pointer}.content{max-width:1050px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.4fr .7fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.12em;font-weight:900;color:#36dad5}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:9px 0}.hero p{font-size:11px;line-height:1.6;color:#dce8f2}.aiCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.aiCard span{font-size:9px;color:#078da8;font-weight:900}.aiCard strong{display:block;font-size:15px;margin:8px 0}.aiCard p{font-size:10px;color:#627389}.formCard,.previewCard,.successCard{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:20px;margin-top:16px}.sectionTitle,.previewHead{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:15px}.sectionTitle h2,.previewHead h2,.successCard h2{font-size:22px;margin:4px 0}.required{font-size:8px;color:#8190a0}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}.grid2 label,.block{font-size:10px;font-weight:700;color:#31465e}.grid2 input,.grid2 select,.block textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px;background:#fff;outline:0}.grid2 .full{grid-column:1/-1}.block{display:block;margin-top:12px}.block textarea{min-height:125px;resize:vertical}.aiHelp{margin-top:12px;border:1px solid #a7dfe4;background:#f2fcfd;color:#087e91;border-radius:8px;padding:9px 12px;font-size:9px;cursor:pointer}.previewHead .status{background:#fff4dc;color:#96661a;border-radius:20px;padding:5px 9px;font-size:8px;font-weight:800}.previewJob{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;border-bottom:1px solid #e7edf2;padding-bottom:15px}.companyTag{font-size:8px;color:#078da8;font-weight:800}.previewJob h3{font-size:19px;margin:5px 0}.previewJob p{font-size:9px;color:#67798d;margin:0}.previewJob button{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:7px 9px;font-size:8px}.previewDesc{font-size:10px;line-height:1.6;color:#53677b}.previewMeta{display:grid;gap:6px;background:#f7f9fb;border-radius:8px;padding:11px;font-size:9px;color:#53677b}.bottomActions{display:flex;justify-content:flex-end;gap:8px;margin:18px 0}.secondary,.primary{border-radius:8px;padding:10px 14px;font-size:10px;cursor:pointer}.secondary{border:1px solid #dce3ea;background:#fff;color:#17314e}.primary{border:0;background:#071a3d;color:#fff}.successCard{display:flex;gap:18px;align-items:flex-start}.successIcon{width:58px;height:58px;border-radius:50%;background:#e4f8ef;color:#14815b;display:grid;place-items:center;font-size:24px;font-weight:900}.successCard p{font-size:10px;line-height:1.6;color:#5d6f83}.successActions{display:flex;gap:8px;margin-top:12px}.successActions button{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:8px 10px;font-size:9px}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px;box-shadow:0 12px 30px #0003}
        @media(max-width:900px){.sidebar{width:210px}.hero{grid-template-columns:1fr}}
        @media(max-width:720px){.jobPublishPage{display:block}.sidebar{position:relative;width:100%;height:auto;min-height:0}.sidebar nav{grid-template-columns:1fr 1fr}.topbar{position:relative;height:auto;padding:12px}.content{padding:14px}.hero h1{font-size:28px}.grid2{grid-template-columns:1fr}.grid2 .full{grid-column:auto}.topActions{flex-wrap:wrap}.successCard{flex-direction:column}}
      `}</style>
    </main>
  );
}
