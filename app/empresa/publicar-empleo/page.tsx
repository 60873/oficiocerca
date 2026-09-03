"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
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

type Business = {
  id: string;
  nombre: string | null;
  ciudad: string | null;
  zona: string | null;
  activo: boolean | null;
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export default function PublicarEmpleoPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [notice, setNotice] = useState("");
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedId, setPublishedId] = useState("");

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [businessesLoading, setBusinessesLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  const selectedBusiness = useMemo(
    () =>
      businesses.find(
        (business) => business.id === selectedBusinessId
      ) || null,
    [businesses, selectedBusinessId]
  );

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2600);
  };

  useEffect(() => {
    let active = true;

    const loadOwnBusinesses = async () => {
      if (!supabase) {
        if (active) {
          setBusinessesLoading(false);
          setSessionReady(true);
        }
        return;
      }

      try {
        const { data: userData, error: userError } =
          await supabase.auth.getUser();

        if (userError) throw userError;

        const userId = userData.user?.id || "";

        if (!userId) {
          if (active) {
            setSignedIn(false);
            setBusinesses([]);
            setSelectedBusinessId("");
          }
          return;
        }

        if (active) setSignedIn(true);

        const { data, error } = await supabase
          .from("businesses")
          .select("id,nombre,ciudad,zona,activo")
          .eq("user_id", userId)
          .eq("activo", true)
          .order("created_at", { ascending: true });

        if (error) throw error;

        const ownBusinesses = (data || []) as Business[];

        if (active) {
          setBusinesses(ownBusinesses);
          setSelectedBusinessId((current) => {
            if (
              current &&
              ownBusinesses.some(
                (business) => business.id === current
              )
            )
              return current;

            return ownBusinesses.length === 1
              ? ownBusinesses[0].id
              : "";
          });
        }
      } catch (error) {
        console.error(error);
        if (active)
          notify(
            "No pudimos cargar tus empresas. Intentá nuevamente."
          );
      } finally {
        if (active) {
          setBusinessesLoading(false);
          setSessionReady(true);
        }
      }
    };

    loadOwnBusinesses();

    return () => {
      active = false;
    };
  }, []);

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const saveJob = async (status: "draft" | "active") => {
    if (!supabase) {
      notify(
        "WorkCerca no pudo iniciar esta sección. Volvé a intentar más tarde."
      );
      return;
    }

    if (!signedIn) {
      notify(
        "Iniciá sesión antes de guardar una búsqueda laboral."
      );
      return;
    }

    if (!selectedBusiness) {
      notify("Elegí la empresa que publica esta oportunidad.");
      return;
    }

    if (!form.puesto.trim()) {
      notify(
        "Completá al menos el nombre del puesto para guardar el borrador."
      );
      return;
    }

    if (
      status === "active" &&
      (!form.descripcion.trim() || !form.ubicacion.trim())
    ) {
      notify(
        "Completá descripción y ubicación antes de publicar."
      );
      return;
    }

    try {
      setPublishing(true);

      const { data, error } = await supabase
        .from("jobs")
        .insert({
          business_id: selectedBusiness.id,
          company_name:
            selectedBusiness.nombre?.trim() ||
            "Empresa WorkCerca",
          company_verified: false,
          title: form.puesto.trim(),
          description:
            form.descripcion.trim() ||
            "Borrador pendiente de completar",
          location:
            form.ubicacion.trim() ||
            selectedBusiness.ciudad?.trim() ||
            "Ubicación pendiente",
          modality: form.modalidad,
          schedule: form.jornada,
          requirements: form.requisitos.trim() || null,
          experience: form.experiencia.trim() || null,
          salary: form.salario.trim() || null,
          closing_date: form.cierre || null,
          contact: form.contacto.trim() || null,
          status,
        })
        .select("id")
        .single();

      if (error) throw error;

      setPublishedId(data?.id || "");

      if (status === "active") {
        setPublished(true);
        notify(
          "Búsqueda publicada y guardada en WorkCerca."
        );
      } else {
        notify(
          "Borrador guardado en WorkCerca. Podrás retomarlo más adelante."
        );
      }
    } catch (error) {
      console.error(error);
      notify(
        status === "active"
          ? "No pudimos publicar el empleo. Intentá nuevamente."
          : "No pudimos guardar el borrador. Intentá nuevamente."
      );
    } finally {
      setPublishing(false);
    }
  };

  const saveDraft = () => saveJob("draft");
  const publish = () => saveJob("active");

  if (!sessionReady || businessesLoading) {
    return (
      <main className="loadingPage">
        <strong>WorkCerca</strong>
        <p>Cargando tu empresa...</p>
        <style jsx>{`
          .loadingPage {
            min-height: 100vh;
            display: grid;
            place-content: center;
            text-align: center;
            font-family: Inter, Arial, sans-serif;
            background: #f6f8fb;
            color: #071a3d;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="jobPublishPage">
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button
          className="logo"
          onClick={() => (window.location.href = "/")}
        >
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>

        <div className="profile">
          <div className="avatar">E</div>
          <div>
            <strong>
              {selectedBusiness?.nombre ||
                "Mi Empresa WorkCerca"}
            </strong>
            <span>
              {selectedBusiness
                ? "Empresa vinculada a tu cuenta"
                : "Seleccioná una empresa"}
            </span>
          </div>
        </div>

        <nav>
          <button
            onClick={() => (window.location.href = "/")}
          >
            ⌂ <span>Inicio</span>
          </button>

          <button
            onClick={() =>
              (window.location.href = "/mi-workcerca")
            }
          >
            ▣ <span>Mi WorkCerca</span>
          </button>

          <button
            onClick={() =>
              (window.location.href = "/empresa")
            }
          >
            ▦ <span>Mi Empresa</span>
          </button>

          <button className="active">
            ＋ <span>Publicar empleo</span>
          </button>

          <button
            onClick={() =>
              (window.location.href = "/busco-trabajo")
            }
          >
            💼 <span>Busco trabajo / CV</span>
          </button>
        </nav>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Publicar empleo</strong>
            <span>
              Creá una búsqueda laboral clara y conectala con
              candidatos WorkCerca.
            </span>
          </div>

          <div className="topActions">
            <button
              onClick={() =>
                (window.location.href = "/empresa")
              }
            >
              Volver a Mi Empresa
            </button>

            <button
              disabled={publishing}
              onClick={saveDraft}
            >
              Guardar borrador
            </button>
          </div>
        </header>

        <div className="content">
          {!signedIn && (
            <section className="warningCard">
              <strong>
                Ingresá para publicar desde tu empresa
              </strong>
              <p>
                WorkCerca necesita identificar la cuenta
                responsable antes de guardar una búsqueda
                laboral.
              </p>
            </section>
          )}

          {signedIn && businesses.length > 1 && (
            <section className="businessSelector">
              <label>
                Empresa que publica
                <select
                  value={selectedBusinessId}
                  onChange={(e) =>
                    setSelectedBusinessId(e.target.value)
                  }
                >
                  <option value="">
                    Seleccioná una empresa
                  </option>

                  {businesses.map((business) => (
                    <option
                      key={business.id}
                      value={business.id}
                    >
                      {business.nombre ||
                        "Empresa sin nombre"}
                    </option>
                  ))}
                </select>
              </label>
            </section>
          )}

          <section className="hero">
            <div>
              <span className="eyebrow">
                EMPRESA · OPORTUNIDAD LABORAL
              </span>

              <h1>
                Publicá una búsqueda y dejá que WorkCerca
                encuentre coincidencias.
              </h1>

              <p>
                La información que cargues alimentará el Motor
                WorkCerca para mostrar la oportunidad a personas
                compatibles y ayudarte a descubrir candidatos
                relevantes.
              </p>
            </div>

            <div className="aiCard">
              <span>✦ Motor IA WorkCerca</span>
              <strong>La IA no inventa candidatos.</strong>
              <p>
                Compara lo que tu empresa necesita con
                información real de perfiles y CV WorkCerca.
              </p>
            </div>
          </section>

          {published ? (
            <section className="successCard">
              <div className="successIcon">✓</div>

              <div>
                <span className="eyebrow dark">
                  PUBLICACIÓN CREADA
                </span>

                <h2>{form.puesto}</h2>

                <p>
                  {form.ubicacion} · {form.modalidad} ·{" "}
                  {form.jornada}
                </p>

                <p>
                  La búsqueda quedó guardada en WorkCerca y
                  preparada para aparecer en las oportunidades
                  laborales correspondientes.
                </p>

                {publishedId && (
                  <small className="publishedId">
                    ID de publicación: {publishedId}
                  </small>
                )}

                <div className="successActions">
                  <button
                    onClick={() =>
                      (window.location.href = "/empresa")
                    }
                  >
                    Volver a Mi Empresa
                  </button>

                  <button
                    onClick={() => setPublished(false)}
                  >
                    Editar publicación
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="formCard">
                <div className="sectionTitle">
                  <div>
                    <span className="eyebrow dark">
                      DATOS PRINCIPALES
                    </span>
                    <h2>Información del puesto</h2>
                  </div>
                </div>

                <div className="grid2">
                  <label>
                    Puesto *
                    <input
                      value={form.puesto}
                      onChange={(e) =>
                        update("puesto", e.target.value)
                      }
                      placeholder="Ej.: Auxiliar administrativo/a"
                    />
                  </label>

                  <label>
                    Ubicación *
                    <input
                      value={form.ubicacion}
                      onChange={(e) =>
                        update("ubicacion", e.target.value)
                      }
                      placeholder="Ej.: Reconquista, Santa Fe"
                    />
                  </label>

                  <label>
                    Modalidad
                    <select
                      value={form.modalidad}
                      onChange={(e) =>
                        update("modalidad", e.target.value)
                      }
                    >
                      <option>Presencial</option>
                      <option>Híbrido</option>
                      <option>Remoto</option>
                    </select>
                  </label>

                  <label>
                    Jornada
                    <select
                      value={form.jornada}
                      onChange={(e) =>
                        update("jornada", e.target.value)
                      }
                    >
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
                    onChange={(e) =>
                      update("descripcion", e.target.value)
                    }
                    placeholder="Contá qué tareas realizará la persona, qué responsabilidades tendrá y qué ofrece la empresa."
                  />
                </label>
              </section>

              <section className="formCard">
                <span className="eyebrow dark">
                  PERFIL BUSCADO
                </span>
                <h2>Requisitos y experiencia</h2>

                <label className="block">
                  Requisitos
                  <textarea
                    value={form.requisitos}
                    onChange={(e) =>
                      update("requisitos", e.target.value)
                    }
                    placeholder="Secundario completo, conocimientos de PC, disponibilidad horaria..."
                  />
                </label>

                <label className="block">
                  Experiencia
                  <textarea
                    value={form.experiencia}
                    onChange={(e) =>
                      update("experiencia", e.target.value)
                    }
                    placeholder="Experiencia deseable / primer empleo / años en tareas similares..."
                  />
                </label>
              </section>

              <section className="formCard">
                <span className="eyebrow dark">
                  CONDICIONES
                </span>
                <h2>Datos complementarios</h2>

                <div className="grid2">
                  <label>
                    Salario o rango salarial
                    <input
                      value={form.salario}
                      onChange={(e) =>
                        update("salario", e.target.value)
                      }
                      placeholder="Opcional"
                    />
                  </label>

                  <label>
                    Fecha de cierre
                    <input
                      type="date"
                      value={form.cierre}
                      onChange={(e) =>
                        update("cierre", e.target.value)
                      }
                    />
                  </label>

                  <label className="full">
                    Contacto o responsable
                    <input
                      value={form.contacto}
                      onChange={(e) =>
                        update("contacto", e.target.value)
                      }
                      placeholder="RRHH / rrhh@empresa.com"
                    />
                  </label>
                </div>
              </section>

              <section className="previewCard">
                <span className="eyebrow dark">
                  VISTA PREVIA
                </span>
                <h2>
                  Así verá la oportunidad un candidato.
                </h2>
                <h3>
                  {form.puesto || "Título del puesto"}
                </h3>
                <p>
                  {form.ubicacion || "Ubicación"} ·{" "}
                  {form.modalidad} · {form.jornada}
                </p>
                <p>
                  {form.descripcion ||
                    "La descripción de la búsqueda aparecerá aquí."}
                </p>
              </section>

              <section className="bottomActions">
                <button
                  className="secondary"
                  onClick={() =>
                    (window.location.href = "/empresa")
                  }
                >
                  Cancelar
                </button>

                <button
                  className="secondary"
                  disabled={publishing}
                  onClick={saveDraft}
                >
                  Guardar borrador
                </button>

                <button
                  className="primary"
                  disabled={publishing}
                  onClick={publish}
                >
                  {publishing
                    ? "Publicando..."
                    : "Publicar empleo"}
                </button>
              </section>
            </>
          )}
        </div>
      </section>

      <style jsx>{`
        .jobPublishPage {
          min-height: 100vh;
          background: #f6f8fb;
          color: #071a3d;
          font-family: Inter, Arial, sans-serif;
          display: flex;
        }
        .jobPublishPage * {
          box-sizing: border-box;
        }
        .sidebar {
          width: 245px;
          min-height: 100vh;
          background: linear-gradient(180deg, #03142e, #00254b);
          color: #fff;
          padding: 22px 16px;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: auto;
        }
        .logo {
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .logo img {
          width: 190px;
        }
        .profile {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 18px 6px;
        }
        .profile strong {
          display: block;
        }
        .avatar {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #0a9aae;
          display: grid;
          place-items: center;
          font-weight: 900;
        }
        .profile span {
          display: block;
          color: #21d8d2;
          font-size: 9px;
        }
        .sidebar nav {
          display: grid;
          gap: 5px;
        }
        .sidebar nav button {
          border: 0;
          background: transparent;
          color: #fff;
          border-radius: 9px;
          padding: 11px;
          text-align: left;
          cursor: pointer;
        }
        .sidebar nav button.active,
        .sidebar nav button:hover {
          background: #087f99;
        }
        .main {
          flex: 1;
          min-width: 0;
        }
        .topbar {
          background: #fff;
          border-bottom: 1px solid #e2e8ef;
          padding: 18px 28px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        .topbar span {
          display: block;
          font-size: 10px;
          color: #718096;
        }
        .topActions {
          display: flex;
          gap: 8px;
        }
        .topActions button,
        .secondary,
        .successActions button {
          border: 1px solid #dce3ea;
          background: #fff;
          border-radius: 8px;
          padding: 8px 11px;
          cursor: pointer;
        }
        .content {
          max-width: 1050px;
          margin: auto;
          padding: 28px;
        }
        .warningCard,
        .businessSelector {
          background: #fff;
          border: 1px solid #dce3ea;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }
        .businessSelector label {
          font-size: 11px;
          font-weight: 800;
        }
        .businessSelector select {
          display: block;
          width: 100%;
          margin-top: 7px;
          padding: 10px;
          border: 1px solid #dce3ea;
          border-radius: 8px;
        }
        .hero {
          display: grid;
          grid-template-columns: 1.4fr 0.7fr;
          gap: 18px;
          background: linear-gradient(135deg, #071a3d, #073c61);
          color: #fff;
          border-radius: 16px;
          padding: 28px;
        }
        .eyebrow {
          font-size: 9px;
          font-weight: 900;
          color: #36dad5;
        }
        .eyebrow.dark {
          color: #078da8;
        }
        .hero h1 {
          font-size: 34px;
          margin: 14px 0;
        }
        .hero p {
          font-size: 11px;
          color: #dce8f2;
        }
        .aiCard {
          background: #fff;
          color: #071a3d;
          border-radius: 12px;
          padding: 18px;
        }
        .aiCard strong {
          display: block;
          margin: 8px 0;
        }
        .formCard,
        .previewCard,
        .successCard {
          background: #fff;
          border: 1px solid #e1e7ed;
          border-radius: 13px;
          padding: 20px;
          margin-top: 16px;
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .grid2 label,
        .block {
          font-size: 10px;
          font-weight: 700;
        }
        .grid2 input,
        .grid2 select,
        .block textarea {
          width: 100%;
          border: 1px solid #dce3ea;
          border-radius: 8px;
          padding: 10px;
          margin-top: 5px;
        }
        .grid2 .full {
          grid-column: 1 / -1;
        }
        .block {
          display: block;
          margin-top: 12px;
        }
        .block textarea {
          min-height: 120px;
          resize: vertical;
        }
        .bottomActions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin: 18px 0;
        }
        .primary {
          border: 0;
          background: #071a3d;
          color: #fff;
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
        }
        .primary:disabled,
        button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }
        .successCard {
          display: flex;
          gap: 18px;
        }
        .successIcon {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #e4f8ef;
          color: #14815b;
          display: grid;
          place-items: center;
          font-size: 24px;
          flex: 0 0 auto;
        }
        .successActions {
          display: flex;
          gap: 8px;
          margin-top: 14px;
        }
        .publishedId {
          display: block;
          margin-top: 8px;
          color: #6b7b8e;
          font-size: 8px;
        }
        .toast {
          position: fixed;
          right: 20px;
          top: 82px;
          background: #071a3d;
          color: #fff;
          border-radius: 9px;
          padding: 12px 17px;
          z-index: 100;
        }

        @media (max-width: 760px) {
          .jobPublishPage {
            display: block;
          }
          .sidebar {
            position: relative;
            width: 100%;
            height: auto;
          }
          .hero {
            grid-template-columns: 1fr;
          }
          .grid2 {
            grid-template-columns: 1fr;
          }
          .topbar {
            flex-direction: column;
          }
        }
      `}</style>
    </main>
  );
}
