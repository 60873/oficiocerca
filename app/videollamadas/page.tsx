"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logoHeader from "../../workcerca-logo-header.png";
export default function VideollamadasPage() {
  const params = useSearchParams();
  const candidate = params.get("candidato") || "Postulante WorkCerca";
  const job = params.get("empleo") || "Proceso laboral";
  const [notice,setNotice] = useState("");
  const notify=(t:string)=>{setNotice(t);window.setTimeout(()=>setNotice(""),2400)};

  return <main className="page">
    {notice && <div className="toast">{notice}</div>}
    <aside className="sidebar">
      <button className="logo" onClick={()=>window.location.href="/"}><img src={logoHeader.src} alt="WorkCerca"/></button>
      <nav>
        <button onClick={()=>window.location.href="/empresa"}>Mi Empresa</button>
        <button onClick={()=>window.location.href="/empresa/postulantes"}>Postulantes</button>
        <button onClick={()=>window.location.href="/mensajes"}>Mensajes</button>
        <button className="active">Videollamadas</button>
        <button onClick={()=>window.location.href="/agenda"}>Agenda</button>
      </nav>
    </aside>
    <section className="main">
      <header className="top"><div><strong>Videollamadas</strong><span>Entrevistas y reuniones dentro de WorkCerca.</span></div><button onClick={()=>window.location.href="/empresa"}>Volver a Empresa</button></header>
      <div className="content">
        <section className="hero"><div><span className="eyebrow">ENTREVISTA · VIDEOLLAMADA</span><h1>Conectá cara a cara sin salir de WorkCerca.</h1><p>La videollamada quedará asociada al candidato, empleo y agenda correspondiente.</p></div><div className="heroCard"><strong>Privacidad</strong><p>La práctica de entrevista del candidato será privada.</p></div></section>
        <section className="meeting">
          <div className="meetingInfo"><span className="eyebrow dark">REUNIÓN PREPARADA</span><h2>{candidate}</h2><p>{job}</p><div className="meta"><span>Estado: pendiente de agendar</span><span>Modalidad: videollamada WorkCerca</span></div></div>
          <div className="videoMock"><div className="person">WC</div><strong>Sala de videollamada</strong><span>La conexión real se integrará en una siguiente etapa.</span><div className="controls"><button onClick={()=>notify("Micrófono")}>Micrófono</button><button onClick={()=>notify("Cámara")}>Cámara</button><button onClick={()=>notify("Compartir pantalla")}>Compartir</button></div></div>
        </section>
        <section className="actions">
          <button onClick={()=>window.location.href=`/agenda?nuevo=entrevista&candidato=${encodeURIComponent(candidate)}&empleo=${encodeURIComponent(job)}`}>Agendar esta entrevista</button>
          <button onClick={()=>window.location.href=`/mensajes?candidato=${encodeURIComponent(candidate)}&empleo=${encodeURIComponent(job)}`}>Enviar mensaje</button>
          <button onClick={()=>notify("Entrenador de entrevistas IA: próximo módulo.")}>Preparar entrevista con IA</button>
        </section>
      </div>
    </section>
    <style jsx>{`
      .page{min-height:100vh;background:#f5f7fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:235px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent}.logo img{width:185px}.sidebar nav{display:grid;gap:6px;margin-top:24px}.sidebar nav button{border:0;background:transparent;color:#fff;text-align:left;padding:12px;border-radius:8px}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.top{height:68px;background:#fff;border-bottom:1px solid #e1e7ed;padding:0 28px;display:flex;justify-content:space-between;align-items:center}.top span{display:block;font-size:10px;color:#718096}.top button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px}.content{max-width:1050px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.4fr .6fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:26px}.eyebrow{font-size:9px;color:#38d8d3;font-weight:900}.eyebrow.dark{color:#078da8}.hero h1{font-size:32px}.hero p{font-size:11px;color:#dce8f2}.heroCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.meeting{display:grid;grid-template-columns:.8fr 1.2fr;gap:14px;margin-top:16px}.meetingInfo,.videoMock{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:20px}.meetingInfo h2{font-size:22px}.videoMock{min-height:360px;background:#071a3d;color:#fff;display:grid;place-items:center;align-content:center;text-align:center}.person{width:95px;height:95px;border-radius:50%;background:#0a91a8;display:grid;place-items:center;font-size:26px;font-weight:900}.videoMock span{font-size:9px;color:#cbd8e4}.controls{display:flex;gap:8px;margin-top:18px}.controls button,.actions button{border:1px solid #dce3ea;background:#fff;color:#071a3d;border-radius:8px;padding:9px 11px}.actions{display:flex;gap:8px;margin-top:14px}.toast{position:fixed;right:20px;top:82px;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;z-index:99}@media(max-width:800px){.page{display:block}.sidebar{width:100%}.hero,.meeting{grid-template-columns:1fr}.actions{flex-direction:column}}
    `}</style>
  </main>
}
