"use client";

import { useState } from "react";
import logoHeader from "../../../workcerca-logo-header.png";

type SettingsState = {
  companyName: string;
  category: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  showPhone: boolean;
  showEmail: boolean;
  allowMessages: boolean;
  allowApplications: boolean;
  marketingNotifications: boolean;
  opportunityNotifications: boolean;
  securityNotifications: boolean;
};

export default function EmpresaConfiguracionPage() {
  const [notice, setNotice] = useState("");
  const [settings, setSettings] = useState<SettingsState>({
    companyName: "Empresa Demo WorkCerca",
    category: "Comercio / Servicios",
    location: "Reconquista",
    phone: "",
    email: "",
    website: "",
    description: "Perfil empresarial dentro de WorkCerca.",
    showPhone: false,
    showEmail: true,
    allowMessages: true,
    allowApplications: true,
    marketingNotifications: false,
    opportunityNotifications: true,
    securityNotifications: true,
  });

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const saveSettings = () => {
    notify("Configuración guardada localmente. Luego se conectará con Supabase.");
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
          <button onClick={() => (window.location.href = "/empresa/publicar-empleo")}>＋ Publicar empleo</button>
          <button onClick={() => (window.location.href = "/empresa/candidatos")}>⌕ Buscar candidatos</button>
          <button onClick={() => (window.location.href = "/empresa/postulantes")}>◫ Postulantes</button>
          <button onClick={() => (window.location.href = "/mensajes")}>▱ Mensajes</button>
          <button onClick={() => (window.location.href = "/videollamadas")}>▣ Videollamadas</button>
          <button onClick={() => (window.location.href = "/agenda")}>□ Agenda</button>
          <button onClick={() => (window.location.href = "/empresa/proveedores")}>⌘ Proveedores</button>
          <button onClick={() => (window.location.href = "/empresa/productos-servicios")}>▤ Productos / Servicios</button>
          <button onClick={() => (window.location.href = "/empresa/promociones")}>★ Promociones</button>
          <button onClick={() => (window.location.href = "/empresa/publicidad")}>◎ Publicidad</button>
          <button onClick={() => (window.location.href = "/empresa/estadisticas")}>◉ Estadísticas</button>
          <button className="active">⚙ Configuración</button>
        </nav>

        <div className="trustBox">
          <strong>🛡 Configuración segura</strong>
          <p>Los datos sensibles nunca deben mostrarse por defecto ni utilizarse fuera del propósito informado.</p>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <strong>Configuración de Empresa</strong>
            <span>Administrá perfil, privacidad, notificaciones y seguridad.</span>
          </div>
          <button onClick={() => (window.location.href = "/empresa")}>
            Volver a Mi Empresa
          </button>
        </header>

        <div className="content">
          <section className="hero">
            <div>
              <span className="eyebrow">EMPRESA · CONFIGURACIÓN</span>
              <h1>Tu empresa decide qué mostrar, cómo recibir contactos y qué alertas necesita.</h1>
              <p>
                La configuración debe ser clara y reversible. WorkCerca prioriza privacidad,
                control del usuario y transparencia.
              </p>
            </div>

            <div className="securityCard">
              <span>🛡 Seguridad WorkCerca</span>
              <strong>La verificación no se compra.</strong>
              <p>
                La configuración puede cambiar visibilidad y preferencias, pero nunca modificar
                el nivel de confianza o verificación de una empresa.
              </p>
            </div>
          </section>

          <section className="grid">
            <article className="card">
              <span className="eyebrow dark">PERFIL EMPRESARIAL</span>
              <h2>Datos visibles</h2>

              <label>
                Nombre de empresa
                <input
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, companyName: e.target.value }))
                  }
                />
              </label>

              <label>
                Rubro
                <input
                  value={settings.category}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
              </label>

              <label>
                Ubicación
                <input
                  value={settings.location}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
              </label>

              <label>
                Descripción
                <textarea
                  value={settings.description}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </label>
            </article>

            <article className="card">
              <span className="eyebrow dark">CONTACTO</span>
              <h2>Canales de contacto</h2>

              <label>
                Teléfono
                <input
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="Número de contacto"
                />
              </label>

              <label>
                Correo
                <input
                  value={settings.email}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="empresa@ejemplo.com"
                />
              </label>

              <label>
                Sitio web
                <input
                  value={settings.website}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, website: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </label>

              <div className="switches">
                <label className="switchRow">
                  <input
                    type="checkbox"
                    checked={settings.showPhone}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, showPhone: e.target.checked }))
                    }
                  />
                  <span>Mostrar teléfono públicamente</span>
                </label>

                <label className="switchRow">
                  <input
                    type="checkbox"
                    checked={settings.showEmail}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, showEmail: e.target.checked }))
                    }
                  />
                  <span>Mostrar correo públicamente</span>
                </label>
              </div>
            </article>

            <article className="card">
              <span className="eyebrow dark">INTERACCIONES</span>
              <h2>Cómo pueden contactarte</h2>

              <label className="switchRow">
                <input
                  type="checkbox"
                  checked={settings.allowMessages}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, allowMessages: e.target.checked }))
                  }
                />
                <span>Permitir mensajes dentro de WorkCerca</span>
              </label>

              <label className="switchRow">
                <input
                  type="checkbox"
                  checked={settings.allowApplications}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, allowApplications: e.target.checked }))
                  }
                />
                <span>Permitir postulaciones a empleos activos</span>
              </label>

              <div className="infoBox">
                <strong>Recomendación</strong>
                <p>
                  Para conservar trazabilidad y seguridad, WorkCerca priorizará mensajes y
                  postulaciones dentro de la plataforma.
                </p>
              </div>
            </article>

            <article className="card">
              <span className="eyebrow dark">NOTIFICACIONES</span>
              <h2>Qué querés recibir</h2>

              <label className="switchRow">
                <input
                  type="checkbox"
                  checked={settings.opportunityNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      opportunityNotifications: e.target.checked,
                    }))
                  }
                />
                <span>Oportunidades y coincidencias relevantes</span>
              </label>

              <label className="switchRow">
                <input
                  type="checkbox"
                  checked={settings.securityNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      securityNotifications: e.target.checked,
                    }))
                  }
                />
                <span>Alertas de seguridad y confianza</span>
              </label>

              <label className="switchRow">
                <input
                  type="checkbox"
                  checked={settings.marketingNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      marketingNotifications: e.target.checked,
                    }))
                  }
                />
                <span>Novedades comerciales de WorkCerca</span>
              </label>
            </article>
          </section>

          <section className="verification">
            <div>
              <span className="eyebrow dark">SEGURIDAD Y VERIFICACIÓN</span>
              <h2>Nivel de confianza de la cuenta</h2>
              <p>
                Este estado será administrado por los controles de WorkCerca y no podrá
                modificarse manualmente desde Configuración.
              </p>
            </div>

            <div className="verificationStatus">
              <span>Estado actual</span>
              <strong>Identidad confirmada</strong>
              <small>Ejemplo demostrativo</small>
            </div>
          </section>

          <section className="danger">
            <div>
              <span className="eyebrow dark">CUENTA</span>
              <h2>Acciones sensibles</h2>
              <p>
                Cambiar datos críticos, cerrar una cuenta o modificar responsables deberá
                requerir confirmaciones adicionales.
              </p>
            </div>

            <div className="dangerActions">
              <button onClick={() => notify("Cambio de responsable: requerirá verificación adicional.")}>
                Cambiar responsable
              </button>
              <button onClick={() => notify("Cerrar cuenta: función protegida aún no habilitada.")}>
                Solicitar cierre de cuenta
              </button>
            </div>
          </section>

          <div className="saveBar">
            <button onClick={() => (window.location.href = "/empresa")}>Cancelar</button>
            <button className="primary" onClick={saveSettings}>
              Guardar configuración
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page{min-height:100vh;background:#f6f8fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.page button,.page input,.page textarea{font:inherit}.sidebar{width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent;cursor:pointer}.logo img{width:185px}.sidebar nav{display:grid;gap:5px;margin-top:22px}.sidebar nav button{border:0;background:transparent;color:#fff;padding:11px;border-radius:8px;text-align:left;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#087f99}.trustBox{margin-top:22px;border:1px solid #2e5876;border-radius:11px;padding:13px}.trustBox strong{font-size:10px;color:#38d8d3}.trustBox p{font-size:8px;line-height:1.5;color:#d6e2eb}.main{flex:1;min-width:0}.topbar{min-height:68px;background:#fff;border-bottom:1px solid #e2e8ef;padding:12px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}.topbar strong,.topbar span{display:block}.topbar span{font-size:10px;color:#718096;margin-top:4px}.topbar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px;cursor:pointer}.content{max-width:1160px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.35fr .65fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:28px}.eyebrow{font-size:9px;letter-spacing:.11em;font-weight:900;color:#38d8d3}.eyebrow.dark{color:#078da8}.hero h1{font-size:34px;line-height:1.08;margin:8px 0}.hero p{font-size:11px;color:#dce8f2;line-height:1.6}.securityCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.securityCard>span{font-size:9px;color:#078da8;font-weight:900}.securityCard strong{display:block;font-size:15px;margin:8px 0}.securityCard p{font-size:9px;color:#617287}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}.card,.verification,.danger{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:18px}.card h2,.verification h2,.danger h2{font-size:19px;margin:4px 0 14px}.card label{display:block;font-size:9px;font-weight:700;margin-top:10px}.card input[type="text"],.card input:not([type]),.card input[type="email"],.card textarea{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.card textarea{min-height:90px}.switches{margin-top:14px}.switchRow{display:flex!important;align-items:center;gap:8px;font-size:9px!important;font-weight:600!important;margin-top:10px!important}.switchRow input{width:auto!important;margin:0!important}.infoBox{margin-top:14px;background:#eefafd;border:1px solid #cde8ec;border-radius:9px;padding:11px}.infoBox strong{font-size:9px;color:#087f93}.infoBox p{font-size:8px;color:#53677b;line-height:1.5;margin-bottom:0}.verification,.danger{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-top:14px}.verification p,.danger p{font-size:9px;color:#53677b;line-height:1.5;max-width:700px}.verificationStatus{min-width:220px;background:#eefafd;border:1px solid #cde8ec;border-radius:10px;padding:13px}.verificationStatus span,.verificationStatus strong,.verificationStatus small{display:block}.verificationStatus span{font-size:8px;color:#718096}.verificationStatus strong{font-size:12px;color:#087f93;margin:5px 0}.verificationStatus small{font-size:7px;color:#8290a0}.dangerActions{display:flex;gap:8px;flex-wrap:wrap}.dangerActions button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:9px 11px;cursor:pointer}.saveBar{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}.saveBar button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:10px 14px;cursor:pointer}.saveBar .primary{border:0;background:#071a3d;color:#fff}.toast{position:fixed;right:20px;top:82px;z-index:100;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;font-size:10px}@media(max-width:900px){.hero,.grid{grid-template-columns:1fr}.verification,.danger{align-items:flex-start;flex-direction:column}.verificationStatus{width:100%}}@media(max-width:700px){.page{display:block}.sidebar{width:100%;min-height:0}.content{padding:14px}}
      `}</style>
    </main>
  );
}
