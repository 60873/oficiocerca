"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import logoHeader from "../workcerca-logo-header.png";

type Conversation = { id:string; name:string; role:string; last:string; unread:number };

const initialConversations: Conversation[] = [
  { id:"1", name:"Usuario Prueba WorkCerca", role:"Postulante · Vendedor/a", last:"Postulación recibida", unread:1 },
  { id:"2", name:"Equipo WorkCerca", role:"Soporte", last:"Tu cuenta está lista.", unread:0 },
];

export default function MensajesPage() {
  const params = useSearchParams();
  const candidate = params.get("candidato") || "";
  const job = params.get("empleo") || "";
  const [selected,setSelected] = useState(candidate ? "candidate" : "1");
  const [message,setMessage] = useState("");
  const [notice,setNotice] = useState("");

  const conversations = useMemo(() => candidate ? [
    { id:"candidate", name:candidate, role:job ? `Postulante · ${job}` : "Postulante WorkCerca", last:"Conversación vinculada a una postulación", unread:0 },
    ...initialConversations
  ] : initialConversations, [candidate,job]);

  const current = conversations.find(c=>c.id===selected) || conversations[0];
  const notify=(t:string)=>{setNotice(t);window.setTimeout(()=>setNotice(""),2400)};
  const send=()=>{if(!message.trim())return;notify("Mensaje preparado. Luego lo guardaremos en Supabase.");setMessage("")};

  return <main className="page">
    {notice && <div className="toast">{notice}</div>}
    <aside className="sidebar">
      <button className="logo" onClick={()=>window.location.href="/"}><img src={logoHeader.src} alt="WorkCerca"/></button>
      <nav>
        <button onClick={()=>window.location.href="/"}>Inicio</button>
        <button onClick={()=>window.location.href="/mi-workcerca"}>Mi WorkCerca</button>
        <button onClick={()=>window.location.href="/empresa"}>Mi Empresa</button>
        <button onClick={()=>window.location.href="/empresa/postulantes"}>Postulantes</button>
        <button className="active">Mensajes</button>
        <button onClick={()=>window.location.href="/videollamadas"}>Videollamadas</button>
        <button onClick={()=>window.location.href="/agenda"}>Agenda</button>
      </nav>
    </aside>
    <section className="main">
      <header className="top">
        <div><strong>Mensajes WorkCerca</strong><span>Conversaciones vinculadas a personas, empleos y oportunidades.</span></div>
        <button onClick={()=>window.location.href="/empresa"}>Volver a Empresa</button>
      </header>
      <div className="content">
        <section className="hero">
          <div><span className="eyebrow">COMUNICACIÓN CENTRALIZADA</span><h1>Hablá dentro de WorkCerca sin perder el contexto.</h1><p>Cada conversación podrá quedar asociada al empleo, solicitud, presupuesto u oportunidad correspondiente.</p></div>
          <div className="heroCard"><strong>Próxima conexión</strong><p>Guardado real en Supabase, leído/no leído y adjuntos.</p></div>
        </section>
        <section className="messaging">
          <aside className="threads">
            <h2>Conversaciones</h2>
            {conversations.map(c=><button key={c.id} className={selected===c.id?"selected":""} onClick={()=>setSelected(c.id)}>
              <div className="avatar">{c.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div>
              <div><strong>{c.name}</strong><span>{c.role}</span><small>{c.last}</small></div>
              {c.unread>0 && <b>{c.unread}</b>}
            </button>)}
          </aside>
          <section className="chat">
            <header>
              <div><strong>{current.name}</strong><span>{current.role}</span></div>
              <div className="chatActions">
                <button onClick={()=>window.location.href=`/agenda?nuevo=entrevista&candidato=${encodeURIComponent(current.name)}&empleo=${encodeURIComponent(job)}`}>Agendar</button>
                <button onClick={()=>window.location.href=`/videollamadas?candidato=${encodeURIComponent(current.name)}&empleo=${encodeURIComponent(job)}`}>Videollamada</button>
              </div>
            </header>
            <div className="messages"><div className="system">Conversación protegida dentro de WorkCerca.</div><div className="incoming">Hola, esta conversación está vinculada a tu proceso en WorkCerca.</div></div>
            <footer><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Escribí un mensaje..."/><button onClick={send}>Enviar</button></footer>
          </section>
        </section>
      </div>
    </section>
    <style jsx>{`
      .page{min-height:100vh;background:#f5f7fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:235px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px;min-height:100vh}.logo{border:0;background:transparent}.logo img{width:185px}.sidebar nav{display:grid;gap:6px;margin-top:24px}.sidebar nav button{border:0;background:transparent;color:#fff;text-align:left;padding:12px;border-radius:8px}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.top{height:68px;background:#fff;border-bottom:1px solid #e1e7ed;padding:0 28px;display:flex;align-items:center;justify-content:space-between}.top span{display:block;font-size:10px;color:#718096}.top>button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px}.content{max-width:1150px;margin:auto;padding:28px}.hero{display:grid;grid-template-columns:1.4fr .6fr;gap:18px;background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:26px}.eyebrow{font-size:9px;color:#38d8d3;font-weight:900}.hero h1{font-size:32px}.hero p{font-size:11px;color:#dce8f2}.heroCard{background:#fff;color:#071a3d;border-radius:12px;padding:18px}.messaging{display:grid;grid-template-columns:330px 1fr;background:#fff;border:1px solid #e1e7ed;border-radius:14px;margin-top:16px;min-height:520px;overflow:hidden}.threads{border-right:1px solid #e7edf2;padding:14px}.threads>button{width:100%;border:0;background:#fff;display:grid;grid-template-columns:40px 1fr auto;gap:9px;text-align:left;padding:10px;border-radius:9px}.threads>button.selected{background:#eef7fb}.threads strong,.threads span,.threads small{display:block}.threads strong{font-size:10px}.threads span,.threads small{font-size:8px;color:#6b7b8d}.threads b{background:#0b8da7;color:#fff;border-radius:999px;padding:3px 7px;font-size:8px}.avatar{width:38px;height:38px;border-radius:50%;background:#e4f4f7;color:#087f93;display:grid;place-items:center;font-size:9px;font-weight:900}.chat{display:grid;grid-template-rows:auto 1fr auto}.chat header{display:flex;justify-content:space-between;padding:16px;border-bottom:1px solid #e7edf2}.chat header span{display:block;font-size:9px;color:#718096}.chatActions{display:flex;gap:6px}.chatActions button{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:7px 9px}.messages{padding:18px;background:#fbfcfd}.system{text-align:center;font-size:8px;color:#8290a0}.incoming{margin-top:20px;max-width:70%;background:#eef4f7;border-radius:10px;padding:12px;font-size:10px}.chat footer{display:flex;gap:8px;padding:12px;border-top:1px solid #e7edf2}.chat textarea{flex:1;border:1px solid #dce3ea;border-radius:8px;padding:10px;min-height:55px}.chat footer button{border:0;background:#071a3d;color:#fff;border-radius:8px;padding:0 18px}.toast{position:fixed;right:20px;top:82px;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;z-index:99}@media(max-width:800px){.page{display:block}.sidebar{width:100%;min-height:0}.hero,.messaging{grid-template-columns:1fr}.threads{border-right:0;border-bottom:1px solid #e7edf2}}
    `}</style>
  </main>
}
