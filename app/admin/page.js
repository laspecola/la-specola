"use client";
import { useState, useEffect } from "react";

const SECTIONS=[{id:"attualita",name:"Attualità",color:"#1A5276",icon:"🌍",desc:"politica, economia, società"},{id:"motori",name:"Motori",color:"#C0392B",icon:"🏎️",desc:"auto, moto, mercato"},{id:"tecnologia",name:"Tecnologia",color:"#5B3FA0",icon:"⚡",desc:"tech, AI, innovazione"},{id:"echi",name:"Echi dal Passato",color:"#6B5B4F",icon:"📜",desc:"storia e attualità"}];
const MODELS=[{id:"claude",name:"Claude",icon:"🟣"},{id:"gemini",name:"Gemini",icon:"🔵"},{id:"chatgpt",name:"ChatGPT",icon:"🟢"}];
const AC="#D4930D",BG="#F5F3EF",BW="#FFFFFF",BWM="#FAF8F5",BD="#E0DCD5",BDL="#EBE8E3",TX="#1A1A1A",TS="#5A5650",TD="#9A9590",DG="#C0392B",OK="#27AE60";
const ST={draft:{bg:"#F0EDE8",c:"#8A8580",l:"Bozza",d:"○"},published:{bg:"#E8F5E9",c:OK,l:"Pubblicato",d:"●"}};

function uid(){return Date.now().toString(36)+Math.random().toString(36).substr(2,6)}
function tod(){return new Date().toISOString().split("T")[0]}
function fD(d){return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function fS(d){return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"short"})}
function fT(d){return new Date(d).toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})}

function Badge({status}){const s=ST[status]||ST.draft;return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:20,background:s.bg,color:s.c,fontSize:11,fontWeight:600,fontFamily:"'Orbitron'"}}><span style={{fontSize:8}}>{s.d}</span>{s.l}</span>}
function Pill({id,small}){const s=SECTIONS.find(x=>x.id===id);if(!s)return null;return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:small?"2px 8px":"4px 12px",borderRadius:20,background:s.color+"10",color:s.color,fontSize:small?10:12,fontWeight:600,fontFamily:"'Orbitron'",border:`1px solid ${s.color}20`}}>{s.icon} {s.name}</span>}
function Btn({children,onClick,v="def",disabled,small,style:sx,...p}){
  const b={padding:small?"7px 14px":"11px 22px",borderRadius:8,border:"none",fontWeight:600,fontSize:small?12:13,cursor:disabled?"not-allowed":"pointer",transition:"all 0.2s",opacity:disabled?.5:1,display:"inline-flex",alignItems:"center",gap:6};
  const vs={def:{background:BD,color:TX},pri:{background:AC,color:"#fff",boxShadow:`0 2px 8px ${AC}44`},dan:{background:"#FDE8E8",color:DG},ok:{background:"#E8F5E9",color:OK,border:`1px solid ${OK}22`},gh:{background:"transparent",color:TS,border:`1px solid ${BD}`},gold:{background:`linear-gradient(135deg,${AC},#B8860B)`,color:"#fff",boxShadow:`0 2px 12px ${AC}55`,fontFamily:"'Orbitron'",letterSpacing:.5}};
  return <button onClick={disabled?undefined:onClick} style={{...b,...vs[v],...sx}} {...p}>{children}</button>;
}
function Spinner({label}){return <div style={{textAlign:"center",padding:"44px 20px",background:BW,borderRadius:12,border:`1px solid ${BD}`,animation:"fadeUp 0.3s ease"}}><div style={{width:44,height:44,margin:"0 auto 14px",border:`3px solid ${BD}`,borderTopColor:AC,borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/><div style={{fontFamily:"'Orbitron'",fontSize:12,color:AC,letterSpacing:1}}>{label}</div></div>}
function Lab({children}){return <div style={{fontSize:11,color:TD,fontFamily:"'Orbitron'",letterSpacing:1.5,marginBottom:10,textTransform:"uppercase"}}>{children}</div>}

function parseLinks(da_seguire){if(!da_seguire||!Array.isArray(da_seguire))return[];return da_seguire.map(s=>{const p=s.split("|||");return{title:p[0]||"",description:p[1]||""};}).filter(l=>l.title)}
function serializeLinks(links){return(links||[]).filter(l=>l.title?.trim()).map(l=>`${l.title}|||${l.description||""}`)}

// ═══════════════════════════════
// LOGIN
// ═══════════════════════════════
function Login({onLogin}){
  const [pw,setPw]=useState("");const [err,setErr]=useState("");const [loading,setLoading]=useState(false);
  const submit=async()=>{
    setLoading(true);setErr("");
    const r=await fetch("/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw})});
    const d=await r.json();
    if(d.ok)onLogin(pw);else{setErr("Password errata");setLoading(false);}
  };
  return(
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:BW,borderRadius:16,padding:40,border:`1px solid ${BD}`,maxWidth:380,width:"100%",textAlign:"center"}}>
        <div style={{width:56,height:56,borderRadius:14,background:`linear-gradient(135deg,${AC},#B8860B)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:22,fontWeight:900,color:"#fff",margin:"0 auto 16px"}}>S</div>
        <h1 style={{fontFamily:"'Orbitron'",fontSize:20,fontWeight:700,color:TX,letterSpacing:2,marginBottom:4}}>LA SPECOLA</h1>
        <p style={{fontSize:12,color:TD,marginBottom:28}}>Pannello Amministrativo</p>
        <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} type="password" placeholder="Password" style={{width:"100%",padding:"12px 16px",borderRadius:8,border:`1px solid ${BD}`,background:BWM,color:TX,fontSize:14,outline:"none",marginBottom:12,textAlign:"center"}}/>
        {err&&<div style={{color:DG,fontSize:12,marginBottom:12}}>{err}</div>}
        <Btn v="gold" onClick={submit} disabled={loading||!pw} style={{width:"100%",justifyContent:"center",padding:14}}>{loading?"Accesso...":"Accedi"}</Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════
// MAIN ADMIN APP
// ═══════════════════════════════
function AdminApp({password}){
  const [arts,setArts]=useState([]);
  const [view,setView]=useState("dashboard");
  const [ed,setEd]=useState(null);
  const [loading,setLoading]=useState(true);
  const [toast,setToast]=useState(null);
  const fl=(m,t)=>{setToast({m,t});setTimeout(()=>setToast(null),3000)};
  const headers={"Content-Type":"application/json","x-admin-password":password};

  const fetchArts=async()=>{
    const r=await fetch("/api/articles",{headers});
    const d=await r.json();
    setArts(Array.isArray(d)?d:[]);setLoading(false);
  };
  useEffect(()=>{fetchArts()},[]);

  const saveArt=async(article)=>{
    const isNew=!article.id||article._isNew;
    const method=isNew?"POST":"PUT";
    const body={...article,links:article.links,date:article.edition_date||article.date||tod()};
    const r=await fetch("/api/articles",{method,headers,body:JSON.stringify(body)});
    const d=await r.json();
    if(d.error){fl("Errore: "+d.error,"err");return;}
    await fetchArts();setEd(null);
    fl(article.status==="published"?"Pubblicato! 🚀":"Bozza salvata");
  };

  const delArt=async(id)=>{
    await fetch("/api/articles",{method:"DELETE",headers,body:JSON.stringify({id})});
    await fetchArts();setEd(null);fl("Eliminato","err");
  };

  const scanAI=async(prompt,model)=>{
    const r=await fetch("/api/scan",{method:"POST",headers,body:JSON.stringify({prompt,model})});
    const d=await r.json();
    if(d.error)throw new Error(d.error);
    return d.text;
  };

  // ── Scanner ──
  function ScannerView(){
    const [sec,setSec]=useState(null);
    const [focus,setFocus]=useState("");
    const [model,setModel]=useState("claude");
    const [step,setStep]=useState("idle");
    const [echiSrc,setEchiSrc]=useState(null);
    const [titles,setTitles]=useState([]);
    const [selTitle,setSelTitle]=useState(null);
    const [result,setResult]=useState(null);
    const [err,setErr]=useState(null);
    const s=SECTIONS.find(x=>x.id===sec);
    const reset=()=>{setStep("idle");setTitles([]);setEchiSrc(null);setSelTitle(null);setResult(null);setErr(null)};
    const todayArts=arts.filter(a=>a.edition_date===tod());
    const todayNonEchi=todayArts.filter(a=>a.section!=="echi"&&a.title);
    const bySection={};todayNonEchi.forEach(a=>{if(!bySection[a.section])bySection[a.section]=[];bySection[a.section].push(a)});
    const secsWith=Object.keys(bySection);

    const pj=(t)=>{let c=t.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim();const fb=c.search(/[\[{]/);if(fb>0)c=c.substring(fb);const lb=Math.max(c.lastIndexOf("}"),c.lastIndexOf("]"));if(lb>0)c=c.substring(0,lb+1);try{return JSON.parse(c)}catch{}const m=c.match(/\[[\s\S]*\]/);if(m)try{return JSON.parse(m[0])}catch{}return null};
    const parseArt=(t,ft)=>{const tag=n=>{const m=t.match(new RegExp(`<${n}>([\\s\\S]*?)</${n}>`,"i"));return m?m[1].trim():""};const b=tag("CORPO");if(b){const l1=tag("LINK1"),l2=tag("LINK2");const pl=r=>{if(!r)return null;const p=r.split("|||").map(s=>s.trim());return p.length>=2?{title:p[0],description:p[1]}:{title:r,description:""}};return{title:tag("TITOLO")||ft,subtitle:tag("SOTTOTITOLO"),body:b.replace(/^di\s+Francesco\s+Pasquale\s*/i,"").trim(),links:[pl(l1),pl(l2)].filter(Boolean)}}const p=pj(t);if(p&&p.body)return{title:p.title||ft,subtitle:p.subtitle||"",body:p.body.replace(/^di\s+Francesco\s+Pasquale\s*/i,"").trim(),links:p.links||[]};return{title:ft,subtitle:"",body:t.replace(/^di\s+Francesco\s+Pasquale\s*/i,"").trim(),links:[]}};
    const artPrompt=`\nUSA QUESTO FORMATO:\n<TITOLO>Titolo</TITOLO>\n<SOTTOTITOLO>Sottotitolo</SOTTOTITOLO>\n<CORPO>\nTesto 300-500 parole\n</CORPO>\n<LINK1>Titolo link 1 ||| Descrizione</LINK1>\n<LINK2>Titolo link 2 ||| Descrizione</LINK2>`;

    const startRegular=async()=>{setStep("load_titles");setErr(null);try{const t=await scanAI(`Redattore de "La Specola". Cerca notizie di OGGI per "${s.name}" (${s.desc}).${focus.trim()?` Focus: ${focus}`:""}\nProponi 4 titoli con angoli diversi.\nSOLO JSON: [{"title":"Titolo","angle":"Taglio (1 riga)"}]`,model);const p=pj(t);if(p&&Array.isArray(p)&&p.length>0){setTitles(p.slice(0,4));setStep("titles")}else{setErr("Errore titoli.");setStep("idle")}}catch(e){setErr(e.message);setStep("idle")}};

    const startEchi=()=>setStep("echi_pick");
    const echiPick=async(sId)=>{setEchiSrc(sId);setStep("load_titles");setErr(null);const src=bySection[sId]||[];const ctx=src.map(a=>`Titolo: ${a.title}\nTesto: ${a.body?.substring(0,500)}`).join("\n---\n");const sn=SECTIONS.find(x=>x.id===sId)?.name;try{const t=await scanAI(`Rubrica "Echi dal Passato" de La Specola.\nArticoli di oggi sezione "${sn}":\n${ctx}\nProponi 4 titoli storici collegati.${focus.trim()?` Focus: ${focus}`:""}\nSOLO JSON: [{"title":"Titolo","angle":"Taglio + periodo storico"}]`,model);const p=pj(t);if(p&&Array.isArray(p)&&p.length>0){setTitles(p.slice(0,4));setStep("titles")}else{setErr("Errore titoli.");setStep("echi_pick")}}catch(e){setErr(e.message);setStep("echi_pick")}};

    const generate=async(tObj)=>{setSelTitle(tObj);setStep("generating");setErr(null);const isE=sec==="echi";let ctx="";if(isE&&echiSrc){const src=bySection[echiSrc]||[];ctx=`\nArticolo di riferimento: ${src.map(a=>`"${a.title}"`).join(", ")}`}try{const t=await scanAI(`Redattore de "La Specola", sezione "${s.name}".\nTitolo: "${tObj.title}" — ${tObj.angle}${ctx}${focus.trim()?`\nFocus: ${focus}`:""}\nScrivi editoriale 300-500 parole, italiano, autorevole.\n${isE?"Stile narrativo, collega passato e presente.":"Analisi ragionata."}\nNON includere firma.\n${artPrompt}`,model);const parsed=parseArt(t,tObj.title);setResult({...parsed,section:sec});setStep("preview")}catch(e){setErr(e.message);setStep("titles")}};

    const accept=()=>{if(!result)return;const a={_isNew:true,edition_date:tod(),section:result.section,title:result.title,subtitle:result.subtitle||"",body:result.body,links:result.links||[],status:"draft",author:"Francesco Pasquale"};setEd(a);setView("dashboard");reset()};
    const isLoading=step==="load_titles"||step==="generating";

    return(
      <div style={{animation:"fadeUp 0.3s ease"}}>
        <Lab>Sezione</Lab>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>{SECTIONS.map(x=><button key={x.id} onClick={()=>{setSec(x.id);reset()}} style={{padding:"10px 18px",borderRadius:10,cursor:"pointer",border:`2px solid ${sec===x.id?x.color:BD}`,background:sec===x.id?x.color+"0D":BW,color:sec===x.id?x.color:TS,fontWeight:600,fontSize:14,transition:"all 0.2s",display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{x.icon}</span>{x.name}</button>)}</div>
        <Lab>Modello AI</Lab>
        <div style={{display:"flex",gap:6,marginBottom:20}}>{MODELS.map(m=><button key={m.id} onClick={()=>setModel(m.id)} style={{padding:"8px 16px",borderRadius:8,cursor:"pointer",border:`1px solid ${model===m.id?AC:BD}`,background:model===m.id?AC+"12":BW,color:model===m.id?AC:TS,fontWeight:600,fontSize:13,display:"flex",alignItems:"center",gap:6}}><span>{m.icon}</span>{m.name}</button>)}</div>
        <Lab>Focus <span style={{color:BD}}>(opzionale)</span></Lab>
        <input value={focus} onChange={e=>setFocus(e.target.value)} placeholder="Es. dazi USA-Cina..." style={{width:"100%",padding:"11px 16px",borderRadius:8,border:`1px solid ${BD}`,background:BW,color:TX,fontSize:14,outline:"none",marginBottom:20}}/>
        {sec==="echi"&&step==="idle"&&<div style={{marginBottom:20,padding:16,background:BWM,borderRadius:10,border:`1px solid ${BDL}`}}><Lab>📜 Articoli di oggi come base</Lab>{secsWith.length>0?todayNonEchi.map((a,i)=>{const sc=SECTIONS.find(x=>x.id===a.section);return <div key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,marginBottom:4}}><span style={{color:sc?.color,fontSize:10}}>●</span><span style={{color:sc?.color,fontWeight:600,fontSize:11}}>{sc?.name}</span><span>{a.title}</span></div>}):<div style={{fontSize:13,color:DG}}>⚠ Crea prima un articolo nelle altre sezioni</div>}</div>}
        {step==="idle"&&<Btn v="gold" onClick={()=>{if(!sec)return;sec==="echi"?startEchi():startRegular()}} disabled={!sec||(sec==="echi"&&secsWith.length===0)} style={{width:"100%",justifyContent:"center",padding:14,fontSize:15,borderRadius:10}}>◉ Avvia Scanner</Btn>}
        {isLoading&&<Spinner label={step==="load_titles"?"GENERO TITOLI...":"SCRIVO L'EDITORIALE..."}/>}
        {err&&<div style={{padding:14,background:"#FDE8E8",borderRadius:10,marginTop:16,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}><span style={{color:DG,fontSize:13,flex:1}}>⚠ {err}</span><Btn small v="gh" onClick={()=>{setErr(null);setStep("idle")}}>Riprova</Btn></div>}
        {step==="echi_pick"&&<div style={{marginTop:20,animation:"fadeUp 0.4s ease"}}><Lab>📜 Scegli la sezione sorgente</Lab>{secsWith.map(sId=>{const sc=SECTIONS.find(x=>x.id===sId);return <button key={sId} onClick={()=>echiPick(sId)} style={{display:"block",width:"100%",padding:"16px 20px",borderRadius:10,border:`1px solid ${BD}`,background:BW,cursor:"pointer",textAlign:"left",marginBottom:8,borderLeft:`3px solid ${sc?.color}`}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:20}}>{sc?.icon}</span><span style={{fontWeight:700,fontSize:16,color:sc?.color}}>{sc?.name}</span></div>{bySection[sId].map((a,i)=><div key={i} style={{fontSize:13,color:TS,paddingLeft:30}}>• {a.title}</div>)}</button>})}<Btn small v="gh" onClick={reset}>✗ Annulla</Btn></div>}
        {step==="titles"&&<div style={{marginTop:20,animation:"fadeUp 0.4s ease"}}><Lab>{s?.icon} Scegli il titolo</Lab>{titles.map((t,i)=><button key={i} onClick={()=>generate(t)} style={{display:"block",width:"100%",padding:"14px 18px",borderRadius:10,border:`1px solid ${BD}`,background:BW,cursor:"pointer",textAlign:"left",marginBottom:8,borderLeft:`3px solid ${s?.color||AC}`}}><div style={{fontWeight:700,fontSize:15,color:TX,marginBottom:4}}>{t.title}</div><div style={{fontSize:12,color:TD}}>{t.angle}</div></button>)}<div style={{marginTop:12,display:"flex",gap:8}}><Btn small v="gh" onClick={()=>{setStep(sec==="echi"?"echi_pick":"idle");setTitles([])}}>← Indietro</Btn><Btn small v="gh" onClick={sec==="echi"?()=>echiPick(echiSrc):startRegular}>↻ Rigenera</Btn><Btn small v="gh" onClick={reset}>✗ Annulla</Btn></div></div>}
        {step==="preview"&&result&&<div style={{marginTop:20,animation:"fadeUp 0.4s ease",background:BW,borderRadius:12,border:`1px solid ${BD}`,overflow:"hidden"}}><div style={{padding:"14px 24px",background:BWM,borderBottom:`1px solid ${BD}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><Pill id={result.section}/><Badge status="draft"/></div><span style={{fontSize:11,color:TD,fontFamily:"'Orbitron'"}}>ANTEPRIMA</span></div><div style={{padding:24}}><h3 style={{fontFamily:"'Orbitron'",fontSize:20,color:TX,marginBottom:6,lineHeight:1.35,fontWeight:700}}>{result.title}</h3>{result.subtitle&&<p style={{color:TS,fontSize:15,marginBottom:16,fontStyle:"italic"}}>{result.subtitle}</p>}<div style={{color:TS,fontSize:14,lineHeight:1.9,maxHeight:240,overflowY:"auto",whiteSpace:"pre-wrap",marginBottom:20}}>{result.body}</div><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><Btn v="pri" onClick={accept}>✓ Accetta e modifica</Btn><Btn v="gh" onClick={()=>{setStep("titles");setResult(null)}}>← Altro titolo</Btn><Btn v="gh" onClick={()=>generate(selTitle)}>↻ Rigenera</Btn><Btn v="gh" onClick={reset}>✗ Scarta</Btn></div></div></div>}
      </div>
    );
  }

  // ── Editor ──
  function EditorView(){
    const a=ed;
    const [title,setTitle]=useState(a.title||"");
    const [sub,setSub]=useState(a.subtitle||"");
    const [body,setBody]=useState(a.body||"");
    const [sec,setSec]=useState(a.section||"attualita");
    const [links,setLinks]=useState(()=>{const l=[...(a.links||parseLinks(a.da_seguire)||[])];while(l.length<2)l.push({title:"",description:""});return l});
    const [saving,setSaving]=useState(false);
    const w=body.trim().split(/\s+/).filter(Boolean).length;
    const sc=SECTIONS.find(x=>x.id===sec);
    const doSave=async(st)=>{setSaving(true);await saveArt({...a,title,subtitle:sub,body,section:sec,links:links.filter(l=>l.title.trim()),status:st});setSaving(false)};
    const uL=(i,f,v)=>{const n=[...links];n[i]={...n[i],[f]:v};setLinks(n)};
    return(
      <div style={{animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,paddingBottom:16,borderBottom:`1px solid ${BD}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><Btn small v="gh" onClick={()=>setEd(null)}>← Indietro</Btn><Badge status={a.status||"draft"}/></div>
          <div style={{display:"flex",gap:8}}>{a.id&&<Btn small v="dan" onClick={()=>delArt(a.id)}>🗑</Btn>}<Btn small v="gh" onClick={()=>doSave("draft")} disabled={saving}>{saving?"...":"💾 Salva"}</Btn><Btn v="ok" onClick={()=>doSave("published")} disabled={saving}>{saving?"...":"🚀 Pubblica"}</Btn></div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>{SECTIONS.map(x=><button key={x.id} onClick={()=>setSec(x.id)} style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${sec===x.id?x.color:BD}`,background:sec===x.id?x.color+"0D":"transparent",color:sec===x.id?x.color:TD,cursor:"pointer",fontWeight:600,fontSize:12}}>{x.icon} {x.name}</button>)}</div>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Titolo" style={{width:"100%",padding:"12px 0",border:"none",borderBottom:`2px solid ${sc?.color||BD}`,background:"transparent",color:TX,fontFamily:"'Orbitron'",fontSize:22,fontWeight:700,outline:"none",marginBottom:12}}/>
        <input value={sub} onChange={e=>setSub(e.target.value)} placeholder="Sottotitolo" style={{width:"100%",padding:"8px 0",border:"none",borderBottom:`1px solid ${BDL}`,background:"transparent",color:TS,fontSize:16,fontStyle:"italic",outline:"none",marginBottom:24}}/>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Scrivi l'editoriale..." style={{width:"100%",minHeight:320,padding:20,borderRadius:10,border:`1px solid ${BD}`,background:BW,color:TX,fontSize:15,lineHeight:1.85,resize:"vertical",outline:"none",marginBottom:6}}/>
        <div style={{display:"flex",justifyContent:"flex-end",gap:14,marginBottom:24,fontSize:11,color:TD,fontFamily:"'Orbitron'"}}><span>{w} parole</span><span style={{color:w>=300&&w<=500?OK:w>500?DG:AC}}>{w<300?`mancano ${300-w}`:w>500?`${w-500} in eccesso`:"✓ ok"}</span></div>
        <Lab>Link correlati</Lab>
        {links.map((l,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8,padding:12,background:BWM,borderRadius:8,border:`1px solid ${BDL}`}}><span style={{width:24,height:24,borderRadius:"50%",background:AC+"18",color:AC,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:10,fontWeight:700,flexShrink:0}}>{i+1}</span><div style={{flex:1}}><input value={l.title} onChange={e=>uL(i,"title",e.target.value)} placeholder="Titolo link" style={{width:"100%",padding:"4px 0",border:"none",background:"transparent",color:TX,fontSize:14,fontWeight:600,outline:"none"}}/><input value={l.description} onChange={e=>uL(i,"description",e.target.value)} placeholder="Descrizione" style={{width:"100%",padding:"2px 0",border:"none",background:"transparent",color:TD,fontSize:13,outline:"none"}}/></div></div>)}
        <div style={{padding:14,background:BWM,borderRadius:8,border:`1px solid ${BDL}`,display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:16}}><div><span style={{fontSize:10,color:TD,fontFamily:"'Orbitron'",letterSpacing:1}}>AUTORE</span><div style={{fontSize:15,color:TX,fontWeight:600,marginTop:2}}>Francesco Pasquale</div></div><div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${AC},${sc?.color||BD})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:13,fontWeight:700,color:"#fff"}}>FP</div></div>
      </div>
    );
  }

  // ── Dashboard ──
  function DashView(){
    const [fS,setFS]=useState("all");const [fSt,setFSt]=useState("all");
    const fl2=arts.filter(a=>fS==="all"||a.section===fS).filter(a=>fSt==="all"||a.status===fSt).sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
    const gr={};fl2.forEach(a=>{const k=a.edition_date||tod();if(!gr[k])gr[k]=[];gr[k].push(a)});const ds=Object.keys(gr).sort((a,b)=>b.localeCompare(a));
    const st=[{l:"Totale",v:arts.length,c:TX},{l:"Oggi",v:arts.filter(a=>a.edition_date===tod()).length,c:AC},{l:"Bozze",v:arts.filter(a=>a.status==="draft").length,c:TD},{l:"Online",v:arts.filter(a=>a.status==="published").length,c:OK}];
    return(
      <div style={{animation:"fadeUp 0.3s ease"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:24}}>{st.map((x,i)=><div key={i} style={{background:BW,borderRadius:10,padding:"14px 10px",border:`1px solid ${BD}`,textAlign:"center"}}><div style={{fontFamily:"'Orbitron'",fontSize:26,fontWeight:800,color:x.c}}>{x.v}</div><div style={{fontSize:10,color:TD,fontFamily:"'Orbitron'",letterSpacing:1,marginTop:4,textTransform:"uppercase"}}>{x.l}</div></div>)}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{[{id:"all",name:"Tutte",color:AC,icon:""},...SECTIONS].map(x=><button key={x.id} onClick={()=>setFS(x.id)} style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${fS===x.id?x.color:BD}`,background:fS===x.id?x.color+"10":"transparent",color:fS===x.id?x.color:TD,cursor:"pointer",fontSize:11,fontWeight:600}}>{x.icon}{x.icon?" ":""}{x.name}</button>)}</div>
          <div style={{display:"flex",gap:4}}>{[{k:"all",l:"Tutti"},{k:"draft",l:"Bozze"},{k:"published",l:"Online"}].map(x=><button key={x.k} onClick={()=>setFSt(x.k)} style={{padding:"5px 10px",borderRadius:20,border:`1px solid ${fSt===x.k?AC:BD}`,background:fSt===x.k?AC+"10":"transparent",color:fSt===x.k?AC:TD,cursor:"pointer",fontSize:10,fontWeight:600,fontFamily:"'Orbitron'"}}>{x.l.toUpperCase()}</button>)}</div>
        </div>
        <Btn v="gh" onClick={()=>setEd({_isNew:true,section:"attualita",title:"",subtitle:"",body:"",links:[{title:"",description:""},{title:"",description:""}],status:"draft",author:"Francesco Pasquale",edition_date:tod()})} style={{width:"100%",justifyContent:"center",padding:12,marginBottom:24,borderStyle:"dashed"}}>＋ Nuovo articolo</Btn>
        {ds.length===0?<div style={{textAlign:"center",padding:"50px 20px",color:TD}}><div style={{fontSize:40,opacity:.3}}>📝</div><div style={{fontFamily:"'Orbitron'",fontSize:13,color:TS,marginTop:8}}>Nessun articolo</div></div>
        :ds.map(d=><div key={d} style={{marginBottom:24}}><div style={{fontSize:10,color:TD,fontFamily:"'Orbitron'",letterSpacing:1.5,marginBottom:8,textTransform:"uppercase",display:"flex",alignItems:"center",gap:8}}><span style={{width:6,height:6,borderRadius:"50%",background:d===tod()?AC:BD}}/>{d===tod()?"Oggi":fD(d)}<span style={{flex:1,height:1,background:BD}}/></div>{gr[d].map(a=>{const c=SECTIONS.find(x=>x.id===a.section);return <div key={a.id} onClick={()=>setEd({...a,links:parseLinks(a.da_seguire)})} style={{background:BW,borderRadius:10,padding:"14px 18px",border:`1px solid ${BD}`,marginBottom:6,cursor:"pointer",transition:"all 0.15s",borderLeft:`3px solid ${c?.color||BD}`}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}><div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><Pill id={a.section} small/><Badge status={a.status}/></div><div style={{fontFamily:"'Orbitron'",fontSize:13,fontWeight:600,color:TX,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{a.title||"Senza titolo"}</div></div><div style={{fontSize:11,color:TD,whiteSpace:"nowrap"}}>{a.updated_at?fT(a.updated_at):""}</div></div></div>})}</div>)}
      </div>
    );
  }

  if(loading)return <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><div style={{fontFamily:"'Orbitron'",fontSize:22,fontWeight:800,color:AC,letterSpacing:3}}>LA SPECOLA</div><div style={{color:TD,fontSize:13,marginTop:8}}>Caricamento...</div></div>;

  return(
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'Titillium Web',sans-serif",color:TX}}>
      {toast&&<div style={{position:"fixed",top:16,right:16,zIndex:999,padding:"12px 22px",borderRadius:10,background:toast.t==="err"?DG:OK,color:"#fff",fontWeight:600,fontSize:14,animation:"fadeUp 0.3s ease",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>{toast.m}</div>}
      <header style={{background:BW,borderBottom:`1px solid ${BD}`,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:58}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${AC},#B8860B)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:13,fontWeight:900,color:"#fff"}}>S</div><div><span style={{fontFamily:"'Orbitron'",fontSize:14,fontWeight:700,letterSpacing:2}}>LA SPECOLA</span><span style={{fontSize:10,color:TD,marginLeft:10}}>Admin</span></div></div>
        <nav style={{display:"flex",gap:2,height:"100%"}}>{[{id:"dashboard",l:"Dashboard",ic:"◫"},{id:"scanner",l:"Scanner",ic:"◎"}].map(n=><button key={n.id} onClick={()=>{setView(n.id);setEd(null)}} style={{padding:"0 16px",border:"none",background:"transparent",color:view===n.id&&!ed?AC:TD,fontFamily:"'Orbitron'",fontSize:10,fontWeight:600,letterSpacing:1,cursor:"pointer",borderBottom:`2px solid ${view===n.id&&!ed?AC:"transparent"}`,display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:14}}>{n.ic}</span>{n.l.toUpperCase()}</button>)}</nav>
        <div style={{fontSize:11,color:TD,fontFamily:"'Orbitron'"}}>{fS(new Date())}</div>
      </header>
      <main style={{maxWidth:860,margin:"0 auto",padding:"28px 20px 50px"}}>
        {ed?<EditorView/>:view==="scanner"?<><div style={{marginBottom:24,display:"flex",alignItems:"center",gap:12}}><div style={{width:42,height:42,borderRadius:10,background:AC+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:`1px solid ${AC}22`}}>◎</div><div><h2 style={{fontFamily:"'Orbitron'",fontSize:17,fontWeight:700}}>Scanner</h2><p style={{fontSize:13,color:TD,marginTop:1}}>Genera bozze con AI</p></div></div><ScannerView/></>:<><div style={{marginBottom:24,display:"flex",alignItems:"center",gap:12}}><div style={{width:42,height:42,borderRadius:10,background:AC+"12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:`1px solid ${AC}22`}}>◫</div><div><h2 style={{fontFamily:"'Orbitron'",fontSize:17,fontWeight:700}}>Dashboard</h2><p style={{fontSize:13,color:TD,marginTop:1}}>Gestisci i tuoi articoli</p></div></div><DashView/></>}
      </main>
      <footer style={{textAlign:"center",padding:"16px",borderTop:`1px solid ${BD}`,fontSize:11,color:TD,fontStyle:"italic"}}>La Specola — Osservare oggi per comprendere il domani</footer>
    </div>
  );
}

export default function AdminPage(){
  const [pw,setPw]=useState(null);
  if(!pw)return <Login onLogin={setPw}/>;
  return <AdminApp password={pw}/>;
}
