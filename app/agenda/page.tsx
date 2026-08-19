"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logoHeader from "../workcerca-logo-header.png";

type AgendaItem = { id:string; title:string; person:string; date:string; time:string; type:string; status:string };

export default function AgendaPage() {
  const params = useSearchParams();
  const candidate = params.get("candidato") || "";
  const job = params.get("empleo") || "";
  const [notice,setNotice] = useState("");
  const [items,setItems] = useState<AgendaItem[]>([{id:"1",title:"Revisión de postulaciones",person:"Equipo RRHH",date:"2026-08-20",time:"10:00",type:"Tarea",status:"Pendiente"}]);
  const [form,setForm] = useState({title:params.get("nuevo")==="entrevista"?`Entrevista${job?` · ${job}`:""}`:"",person:candidate,date:"",time:"",type:"Entrevista"});
  const notify=(t:string)=>{setNotice(t);window.setTimeout(()=>setNotice(""),2400)};
  const add=()=>{if(!form.title||!form.date||!form.time){notify("Completá título, fecha y hora.");return;}setItems(prev=>[...prev,{id:String(Date.now()),...form,status:"Pendiente"}]);notify("Evento agregado a la agenda local.")};

  return <main className="page">
    {notice && <div className="toast">{notice}</div>}
    <aside className="sidebar">
      <button className="logo" onClick={()=>window.location.href="/"}><img src={logoHeader.src} alt="WorkCerca"/></button>
      <nav>
        <button onClick={()=>window.location.href="/empresa"}>Mi Empresa</button>
        <button onClick={()=>window.location.href="/empresa/postulantes"}>Postulantes</button>
        <button onClick={()=>window.location.href="/mensajes"}>Mensajes</button>
        <button onClick={()=>window.location.href="/videollamadas"}>Videollamadas</button>
        <button className="active">Agenda</button>
      </nav>
    </aside>
    <section className="main">
      <header className="top"><div><strong>Agenda WorkCerca</strong><span>Entrevistas, reuniones, tareas y seguimientos.</span></div><button onClick={()=>window.location.href="/empresa"}>Volver a Empresa</button></header>
      <div className="content">
        <section className="hero"><div><span className="eyebrow">AGENDA CONECTADA</span><h1>Que una oportunidad no se pierda por falta de seguimiento.</h1><p>La agenda se conectará con postulantes, mensajes, videollamadas, municipios, instituciones y solicitudes.</p></div></section>
        <div className="twoCol">
          <section className="card">
            <span className="eyebrow dark">NUEVO EVENTO</span><h2>Agendar</h2>
            <label>Título<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ej.: Entrevista Vendedor/a"/></label>
            <label>Persona / entidad<input value={form.person} onChange={e=>setForm({...form,person:e.target.value})} placeholder="Nombre"/></label>
            <div className="grid2"><label>Fecha<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Hora<input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></label></div>
            <label>Tipo<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Entrevista</option><option>Videollamada</option><option>Reunión</option><option>Tarea</option><option>Recordatorio</option></select></label>
            <button className="primary" onClick={add}>Agregar a agenda</button>
          </section>
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import logoHeader from "../workcerca-logo-header.png";

type AgendaItem = { id:string; title:string; person:string; date:string; time:string; type:string; status:string };

export default function AgendaPage() {
  const params = useSearchParams();
  const candidate = params.get("candidato") || "";
  const job = params.get("empleo") || "";
  const [notice,setNotice] = useState("");
  const [items,setItems] = useState<AgendaItem[]>([{id:"1",title:"Revisión de postulaciones",person:"Equipo RRHH",date:"2026-08-20",time:"10:00",type:"Tarea",status:"Pendiente"}]);
  const [form,setForm] = useState({title:params.get("nuevo")==="entrevista"?`Entrevista${job?` · ${job}`:""}`:"",person:candidate,date:"",time:"",type:"Entrevista"});
  const notify=(t:string)=>{setNotice(t);window.setTimeout(()=>setNotice(""),2400)};
  const add=()=>{if(!form.title||!form.date||!form.time){notify("Completá título, fecha y hora.");return;}setItems(prev=>[...prev,{id:String(Date.now()),...form,status:"Pendiente"}]);notify("Evento agregado a la agenda local.")};

  return <main className="page">
    {notice && <div className="toast">{notice}</div>}
    <aside className="sidebar">
      <button className="logo" onClick={()=>window.location.href="/"}><img src={logoHeader.src} alt="WorkCerca"/></button>
      <nav>
        <button onClick={()=>window.location.href="/empresa"}>Mi Empresa</button>
        <button onClick={()=>window.location.href="/empresa/postulantes"}>Postulantes</button>
        <button onClick={()=>window.location.href="/mensajes"}>Mensajes</button>
        <button onClick={()=>window.location.href="/videollamadas"}>Videollamadas</button>
        <button className="active">Agenda</button>
      </nav>
    </aside>
    <section className="main">
      <header className="top"><div><strong>Agenda WorkCerca</strong><span>Entrevistas, reuniones, tareas y seguimientos.</span></div><button onClick={()=>window.location.href="/empresa"}>Volver a Empresa</button></header>
      <div className="content">
        <section className="hero"><div><span className="eyebrow">AGENDA CONECTADA</span><h1>Que una oportunidad no se pierda por falta de seguimiento.</h1><p>La agenda se conectará con postulantes, mensajes, videollamadas, municipios, instituciones y solicitudes.</p></div></section>
        <div className="twoCol">
          <section className="card">
            <span className="eyebrow dark">NUEVO EVENTO</span><h2>Agendar</h2>
            <label>Título<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ej.: Entrevista Vendedor/a"/></label>
            <label>Persona / entidad<input value={form.person} onChange={e=>setForm({...form,person:e.target.value})} placeholder="Nombre"/></label>
            <div className="grid2"><label>Fecha<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label><label>Hora<input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></label></div>
            <label>Tipo<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Entrevista</option><option>Videollamada</option><option>Reunión</option><option>Tarea</option><option>Recordatorio</option></select></label>
            <button className="primary" onClick={add}>Agregar a agenda</button>
          </section>
          <section className="card">
            <span className="eyebrow dark">PRÓXIMOS</span><h2>Agenda</h2>
            <div className="items">{items.map(i=><article key={i.id}>
              <div className="date"><strong>{i.date.slice(8,10)}</strong><span>{i.date.slice(5,7)}</span></div>
              <div><span className="tag">{i.type}</span><h3>{i.title}</h3><p>{i.person||"Sin persona asignada"} · {i.time}</p></div>
              <b>{i.status}</b>
              <button onClick={()=>window.location.href=`/videollamadas?candidato=${encodeURIComponent(i.person)}&empleo=${encodeURIComponent(i.title)}`}>Abrir</button>
            </article>)}</div>
          </section>
        </div>
      </div>
    </section>
    <style jsx>{`
      .page{min-height:100vh;background:#f5f7fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:235px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent}.logo img{width:185px}.sidebar nav{display:grid;gap:6px;margin-top:24px}.sidebar nav button{border:0;background:transparent;color:#fff;text-align:left;padding:12px;border-radius:8px}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.top{height:68px;background:#fff;border-bottom:1px solid #e1e7ed;padding:0 28px;display:flex;justify-content:space-between;align-items:center}.top span{display:block;font-size:10px;color:#718096}.top button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px}.content{max-width:1050px;margin:auto;padding:28px}.hero{background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:26px}.eyebrow{font-size:9px;color:#38d8d3;font-weight:900}.eyebrow.dark{color:#078da8}.hero h1{font-size:32px}.hero p{font-size:11px;color:#dce8f2}.twoCol{display:grid;grid-template-columns:.85fr 1.15fr;gap:14px;margin-top:16px}.card{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:20px}.card label{display:block;font-size:9px;font-weight:700;margin-top:10px}.card input,.card select{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.primary{margin-top:14px;border:0;background:#071a3d;color:#fff;border-radius:8px;padding:10px 14px}.items{display:grid;gap:8px}.items article{display:grid;grid-template-columns:48px 1fr auto auto;gap:10px;align-items:center;border:1px solid #e5eaf0;border-radius:10px;padding:10px}.date{width:44px;height:44px;border-radius:9px;background:#eef7fb;display:grid;place-items:center}.tag{font-size:7px;color:#078da8;font-weight:900}.items h3{font-size:10px}.items p{font-size:8px;color:#69798b}.items button{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:7px 9px}.toast{position:fixed;right:20px;top:82px;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;z-index:99}@media(max-width:800px){.page{display:block}.sidebar{width:100%}.twoCol,.grid2{grid-template-columns:1fr}.items article{grid-template-columns:48px 1fr}}
    `}</style>
  </main>
}          <section className="card">
            <span className="eyebrow dark">PRÓXIMOS</span><h2>Agenda</h2>
            <div className="items">{items.map(i=><article key={i.id}>
              <div className="date"><strong>{i.date.slice(8,10)}</strong><span>{i.date.slice(5,7)}</span></div>
              <div><span className="tag">{i.type}</span><h3>{i.title}</h3><p>{i.person||"Sin persona asignada"} · {i.time}</p></div>
              <b>{i.status}</b>
              <button onClick={()=>window.location.href=`/videollamadas?candidato=${encodeURIComponent(i.person)}&empleo=${encodeURIComponent(i.title)}`}>Abrir</button>
            </article>)}</div>
          </section>
        </div>
      </div>
    </section>
    <style jsx>{`
      .page{min-height:100vh;background:#f5f7fb;color:#071a3d;font-family:Inter,Arial,sans-serif;display:flex}.page *{box-sizing:border-box}.sidebar{width:235px;background:linear-gradient(180deg,#03142e,#00254b);color:#fff;padding:22px 16px}.logo{border:0;background:transparent}.logo img{width:185px}.sidebar nav{display:grid;gap:6px;margin-top:24px}.sidebar nav button{border:0;background:transparent;color:#fff;text-align:left;padding:12px;border-radius:8px}.sidebar nav button.active,.sidebar nav button:hover{background:#087f99}.main{flex:1}.top{height:68px;background:#fff;border-bottom:1px solid #e1e7ed;padding:0 28px;display:flex;justify-content:space-between;align-items:center}.top span{display:block;font-size:10px;color:#718096}.top button{border:1px solid #dce3ea;background:#fff;border-radius:8px;padding:8px 10px}.content{max-width:1050px;margin:auto;padding:28px}.hero{background:linear-gradient(135deg,#071a3d,#073c61);color:#fff;border-radius:16px;padding:26px}.eyebrow{font-size:9px;color:#38d8d3;font-weight:900}.eyebrow.dark{color:#078da8}.hero h1{font-size:32px}.hero p{font-size:11px;color:#dce8f2}.twoCol{display:grid;grid-template-columns:.85fr 1.15fr;gap:14px;margin-top:16px}.card{background:#fff;border:1px solid #e1e7ed;border-radius:13px;padding:20px}.card label{display:block;font-size:9px;font-weight:700;margin-top:10px}.card input,.card select{width:100%;border:1px solid #dce3ea;border-radius:8px;padding:10px;margin-top:5px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.primary{margin-top:14px;border:0;background:#071a3d;color:#fff;border-radius:8px;padding:10px 14px}.items{display:grid;gap:8px}.items article{display:grid;grid-template-columns:48px 1fr auto auto;gap:10px;align-items:center;border:1px solid #e5eaf0;border-radius:10px;padding:10px}.date{width:44px;height:44px;border-radius:9px;background:#eef7fb;display:grid;place-items:center}.tag{font-size:7px;color:#078da8;font-weight:900}.items h3{font-size:10px}.items p{font-size:8px;color:#69798b}.items button{border:1px solid #dce3ea;background:#fff;border-radius:7px;padding:7px 9px}.toast{position:fixed;right:20px;top:82px;background:#071a3d;color:#fff;border-radius:9px;padding:12px 17px;z-index:99}@media(max-width:800px){.page{display:block}.sidebar{width:100%}.twoCol,.grid2{grid-template-columns:1fr}.items article{grid-template-columns:48px 1fr}}
    `}</style>
  </main>
}
