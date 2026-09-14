"use client";

import { useRouter } from "next/navigation";
import logoHeader from "../../workcerca-logo-header.png";

type EmpresaSection =
  | "inicio"
  | "publicar"
  | "postulantes"
  | "candidatos"
  | "entrevistas"
  | "productos"
  | "promociones"
  | "proveedores"
  | "publicidad"
  | "estadisticas"
  | "configuracion";

export default function EmpresaSidebar({ active }: { active: EmpresaSection }) {
  const router = useRouter();
  const go = (path: string) => router.push(path);
  const item = (key: EmpresaSection, icon: string, label: string, path: string) => (
    <button className={active === key ? "active" : ""} onClick={() => go(path)}>
      <span aria-hidden="true">{icon}</span><span>{label}</span>
    </button>
  );

  return (
    <aside className="empresaSidebar">
      <button className="logo" onClick={() => go("/")} aria-label="Ir al inicio de WorkCerca">
        <img src={logoHeader.src} alt="WorkCerca" />
      </button>

      <div className="profile">
        <div className="avatar">E</div>
        <div><strong>Mi Empresa WorkCerca</strong><span>Panel de empresa</span></div>
      </div>

      <nav aria-label="Funciones de Mi Empresa">
        <p>EMPRESA</p>
        {item("inicio", "▦", "Mi Empresa", "/empresa")}

        <p>TALENTO Y EMPLEO</p>
        {item("publicar", "＋", "Publicar empleo", "/empresa/publicar-empleo")}
        {item("postulantes", "◫", "Postulantes", "/empresa/postulantes")}
        {item("candidatos", "⌕", "Buscar candidatos", "/empresa/candidatos")}
        {item("entrevistas", "🎙", "Entrevistas", "/empresa/entrevistas")}

        <p>COMUNICACIÓN</p>
        <button onClick={() => go("/mensajes?origen=empresa")}><span>▱</span><span>Mensajes</span></button>
        <button onClick={() => go("/agenda?origen=empresa")}><span>□</span><span>Agenda</span></button>
        <button onClick={() => go("/videollamadas?origen=empresa")}><span>▣</span><span>Videollamadas</span></button>

        <p>NEGOCIO</p>
        {item("productos", "▤", "Productos / Servicios", "/empresa/productos-servicios")}
        {item("promociones", "％", "Promociones", "/empresa/promociones")}
        {item("proveedores", "◇", "Proveedores", "/empresa/proveedores")}
        {item("publicidad", "◉", "Publicidad", "/empresa/publicidad")}

        <p>GESTIÓN</p>
        {item("estadisticas", "▥", "Estadísticas", "/empresa/estadisticas")}
        {item("configuracion", "⚙", "Configuración", "/empresa/configuracion")}
      </nav>

      <button className="contextSwitch" onClick={() => go("/mi-workcerca")}>
        Cambiar a Mi WorkCerca
      </button>

      <style jsx>{`
        .empresaSidebar{width:240px;min-width:240px;min-height:100vh;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;font-family:Inter,Arial,sans-serif;box-sizing:border-box}
        .logo{border:0;background:transparent;cursor:pointer;padding:0 4px}.logo img{width:185px;max-width:100%}
        .profile{display:flex;gap:10px;align-items:center;margin:20px 0 14px;padding:12px 8px;border-top:1px solid #294764;border-bottom:1px solid #294764}
        .avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#e7f5f8;color:#087e92;font-weight:900}
        .profile strong,.profile span{display:block}.profile strong{font-size:10px}.profile span{font-size:8px;color:#b8c9d8;margin-top:3px}
        nav{display:grid;gap:3px}nav p{margin:13px 9px 4px;font-size:7px;letter-spacing:.13em;color:#7fa2bd;font-weight:900}
        nav button{border:0;background:transparent;color:#fff;padding:9px 10px;border-radius:8px;text-align:left;font-size:10px;cursor:pointer;display:flex;align-items:center;gap:8px;width:100%}
        nav button:hover,nav button.active{background:#087f99}.contextSwitch{width:100%;margin-top:18px;border:1px solid #3b6684;background:transparent;color:#d9e8f2;border-radius:8px;padding:10px;font-size:9px;cursor:pointer}
        @media(max-width:700px){.empresaSidebar{width:100%;min-width:0;min-height:0}.profile{margin-bottom:8px}nav{grid-template-columns:1fr 1fr}nav p{grid-column:1/-1}}
      `}</style>
    </aside>
  );
}
