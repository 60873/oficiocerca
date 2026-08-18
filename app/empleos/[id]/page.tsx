"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import logoHeader from "../../../workcerca-logo-header.png";

type JobRecord = {
  id: string;
  company_name: string;
  company_verified: boolean;
  title: string;
  description: string;
  location: string;
  modality: string;
  schedule: string;
  requirements: string | null;
  experience: string | null;
  salary: string | null;
  closing_date: string | null;
  contact: string | null;
  status: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function EmpleoDetallePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [job, setJob] = useState<JobRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2800);
  };

  useEffect(() => {
    const loadJob = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setJob(data as JobRecord);
      } catch (error: any) {
        notify(error?.message || "No pudimos cargar la oportunidad.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const canApply = useMemo(
    () => applicant.name.trim() && applicant.email.trim(),
    [applicant]
  );

  const apply = async () => {
    if (!job) return;
    if (!canApply) {
      notify("Completá tu nombre y correo antes de postularte.");
      return;
    }

    try {
      setApplying(true);
      const { error } = await supabase.from("applications").insert({
        job_id: job.id,
        applicant_name: applicant.name.trim(),
        applicant_email: applicant.email.trim().toLowerCase(),
        applicant_phone: applicant.phone.trim() || null,
        applicant_city: applicant.city.trim() || null,
        cv_source: "WorkCerca",
        status: "enviada",
      });

      if (error) {
        if (error.code === "23505") {
          notify("Ya te postulaste a esta oportunidad.");
          setApplied(true);
          return;
        }
        throw error;
      }

      setApplied(true);
      notify("Postulación enviada a la empresa.");
    } catch (error: any) {
      console.error(error);
      notify(error?.message || "No pudimos enviar la postulación.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <main className="loading">Cargando oportunidad WorkCerca...</main>;
  }

  if (!job) {
    return (
      <main className="loading">
        <h1>No encontramos esta oportunidad.</h1>
        <button onClick={() => (window.location.href = "/busco-trabajo")}>Volver a Busco trabajo</button>
      </main>
    );
  }

  return (
    <main className="jobPage">
      {notice && <div className="toast">{notice}</div>}

      <aside className="sidebar">
        <button className="logo" onClick={() => (window.location.href = "/")}>
          <img src={logoHeader.src} alt="WorkCerca" />
        </button>
        <div className="profile">
          <div className="avatar">MR</div>
          <div><strong>Mi perfil laboral</strong><span>WorkCerca</span></div>
        </div>
        <nav>
          <button onClick={() => (window.location.href = "/")}>⌂ <span>Inicio</span></button>
          <button onClick={() => (window.location.href = "/mi-workcerca")}>▣ <span>Mi WorkCerca</span></button>
          <button className="active" onClick={() => (window.location.href = "/busco-trabajo")}>💼 <span>Busco trabajo</span></button>
          <button onClick={() => notify("Mis postulaciones")}>◫ <span>Mis postulaciones</span></button>
          <button onClick={() => notify("Mensajes")}>▱ <span>Mensajes</span></button>
          <button onClick={() => notify("Agenda")}>□ <span>Agenda</span></button>
        </nav>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Oportunidad laboral</strong>
            <span>Información publicada por una empresa dentro de WorkCerca.</span>
          </div>
          <div className="topActions">
            <button onClick={() => (window.location.href = "/busco-trabajo")}>Volver a Busco trabajo</button>
            <button onClick={() => (window.location.href = "/mi-workcerca")}>Mi WorkCerca</button>
          </div>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">OPORTUNIDAD WORKCERCA</span>
              <h1>{job.title}</h1>
              <p>{job.company_name}{job.company_verified ? " ✓ Empresa verificada" : ""}</p>
              <div className="chips">
                <span>{job.location}</span>
                <span>{job.modality}</span>
                <span>{job.schedule}</span>
              </div>
            </div>
            <div className="trustCard">
              <span>WorkCerca Confianza</span>
              <strong>Información clara y trazable.</strong>
              <p>La empresa publica la búsqueda y WorkCerca muestra sus datos sin inventar requisitos.</p>
            </div>
          </section>

          <div className="twoCol">
            <section className="card">
              <span className="eyebrow dark">DESCRIPCIÓN</span>
              <h2>Sobre el puesto</h2>
              <p>{job.description}</p>

              <div className="detailGrid">
                <div><b>Requisitos</b><span>{job.requirements || "No informados"}</span></div>
                <div><b>Experiencia</b><span>{job.experience || "No informada"}</span></div>
                <div><b>Salario</b><span>{job.salary || "No informado"}</span></div>
                <div><b>Fecha de cierre</b><span>{job.closing_date || "Sin fecha definida"}</span></div>
              </div>

              {job.contact && (
                <div className="contactBox">
                  <b>Contacto informado por la empresa</b>
                  <span>{job.contact}</span>
                </div>
              )}
            </section>

            <section className="card applicationCard">
              <span className="eyebrow dark">POSTULACIÓN</span>
              <h2>Postularme con WorkCerca</h2>
              <p>
                Para esta primera versión conectamos tu postulación directamente con la empresa.
                Más adelante tomaremos automáticamente tus datos y CV WorkCerca.
              </p>

              {applied ? (
                <div className="success">
                  <strong>✓ Postulación enviada</strong>
                  <span>La empresa ya puede verla dentro de WorkCerca.</span>
                  <button onClick={() => (window.location.href = "/busco-trabajo")}>Ver más oportunidades</button>
                </div>
              ) : (
                <div className="form">
                  <label>Nombre y apellido *
                    <input
                      value={applicant.name}
                      onChange={(e) => setApplicant((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Tu nombre completo"
                    />
                  </label>
                  <label>Correo *
                    <input
                      type="email"
                      value={applicant.email}
                      onChange={(e) => setApplicant((p) => ({ ...p, email: e.target.value }))}
                      placeholder="correo@ejemplo.com"
                    />
                  </label>
                  <label>Teléfono
                    <input
                      value={applicant.phone}
                      onChange={(e) => setApplicant((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="WhatsApp o teléfono"
                    />
                  </label>
                  <label>Ciudad
                    <input
                      value={applicant.city}
                      onChange={(e) => setApplicant((p) => ({ ...p, city: e.target.value }))}
                      placeholder="Tu ciudad"
                    />
                  </label>
                  <button className="applyBtn" disabled={applying} onClick={apply}>
                    {applying ? "Enviando postulación..." : "Postularme"}
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      <style jsx>{`
        .jobPage{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.jobPage *{box-sizing:border-box}.loading{min-height:100vh;display:grid;place-items:center;font-family:Arial;color:#071a3d}.sidebar{width:245px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;min-height:100vh;position:sticky;top:0;height:100vh}.logo{border:0;background:transparent}.logo img{width:190px}.profile{display:flex;gap:10px;align-items:center;padding:18px 6px}.avatar{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:#0a91a8;font-weight:900}.profile span{display:block;color:#27d8d1;font-size:9px}.sidebar nav{display:grid;gap:5px}.sidebar nav button{border:0;background:transparent;color:#fff;border-radius:9px;padding:11px;text-align:left}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.topbar{background:#fff;border-bottom:1px solid #e1e7ed;padding:18px 28px;display:flex;justify-content:space-between}.topbar span{display:block;font-size:10px;color:#718096}.topActions{display:flex;gap:8px}.topActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 11px}.content{max-width:1080px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.4fr .7fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.12em;color:#36dad5;font-weight:900}.eyebrow.dark{color:#078da8}.hero h1{font-size:36px;margin:8px 0}.hero p{color:#dce8f2}.chips{display:flex;flex-wrap:wrap;gap:8px}.chips span{background:#ffffff18;border:1px solid #ffffff2d;border-radius:999px;padding:7px 10px;font-size:9px}.trustCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.trustCard>span{color:#078da8;font-size:9px;font-weight:900}.trustCard strong{display:block;margin:8px 0}.trustCard p{font-size:10px;color:#66778a}.twoCol{display:grid;grid-template-columns:1.15fr .85fr;gap:16px;margin-top:16px}.card{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:20px}.card h2{font-size:22px}.card>p{font-size:10px;line-height:1.7;color:#53677b}.detailGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}.detailGrid div{background:#f8fafc;border-radius:8px;padding:11px}.detailGrid b,.detailGrid span{display:block}.detailGrid b{font-size:9px}.detailGrid span{font-size:9px;color:#607185;margin-top:4px}.contactBox{margin-top:12px;border:1px solid #dfe7ee;border-radius:8px;padding:11px}.contactBox b,.contactBox span{display:block;font-size:9px}.contactBox span{color:#5c6f83;margin-top:4px}.form{display:grid;gap:10px}.form label{font-size:9px;font-weight:700}.form input{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:4px}.applyBtn{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:11px;font-weight:800}.applyBtn:disabled{opacity:.55}.success{background:#edf9f4;border:1px solid #cdebdc;border-radius:10px;padding:14px;display:grid;gap:7px}.success strong{color:#16775a}.success span{font-size:9px;color:#5b6e7f}.success button{justify-self:start;border:0;background:#071a3d;color:#fff;border-radius:7px;padding:8px 10px}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px}
        @media(max-width:800px){.jobPage{display:block}.sidebar{width:100%;height:auto;min-height:0;position:relative}.hero,.twoCol{grid-template-columns:1fr}.detailGrid{grid-template-columns:1fr}}
      `}</style>
    </main>
  );
}
