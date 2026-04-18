"use client";
import { useState, useEffect } from "react";

const SECTIONS = [
  { id:"attualita",name:"Attualità",color:"#1A5276",icon:"🌍" },
  { id:"motori",name:"Motori",color:"#C0392B",icon:"🏎️" },
  { id:"tecnologia",name:"Tecnologia",color:"#5B3FA0",icon:"⚡" },
  { id:"officina",name:"L'Officina delle Arti",color:"#8E44AD",icon:"🎭" },
  { id:"crocevia",name:"Crocevia",color:"#2E86C1",icon:"🧭" },
  { id:"echi",name:"Echi dal Passato",color:"#6B5B4F",icon:"📜" },
];
const FONTI = [
  { name:"ANSA", url:"https://www.ansa.it" },
  { name:"Corriere della Sera", url:"https://www.corriere.it" },
  { name:"Repubblica", url:"https://www.repubblica.it" },
  { name:"Il Sole 24 Ore", url:"https://www.ilsole24ore.com" },
  { name:"Sky TG24", url:"https://tg24.sky.it" },
  { name:"Gazzetta dello Sport", url:"https://www.gazzetta.it" },
  { name:"Il Post", url:"https://www.ilpost.it" },
];
const AC="#D4930D",TX="#1C1C1C",TS="#555550",TD="#999590",BD="#E4E0DA",LIGHT="#F8F6F1",CARD="#FFFFFF",DARK="#0B1118",DARK2="#111923";

function fDate(d){return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function fShort(d){return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"long",year:"numeric"})}
function fCompact(d){return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"short"})}

// ── Specola SVG COMPATTA ──
function SpecolaSVG(){
  const stars=[[70,15,1.2,2.5],[140,35,0.8,4],[210,12,1,3.2],[320,28,0.6,5],[420,8,1.3,2.8],[500,32,0.7,3.8],[580,18,1.1,4.5],[650,40,0.9,2.2],[720,14,0.6,3.6],[50,48,0.5,5.2],[260,42,0.8,2.9],[460,45,0.6,4.2],[380,10,0.7,2.1],[540,38,1,4.8]];
  return(
    <svg viewBox="0 0 800 180" style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="skyG" cx="50%" cy="90%" r="75%"><stop offset="0%" stopColor="#1E3050"/><stop offset="60%" stopColor="#122040"/><stop offset="100%" stopColor="#0C1525"/></radialGradient>
        <linearGradient id="beamG" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={AC} stopOpacity="0"/><stop offset="40%" stopColor={AC} stopOpacity="0.4"/><stop offset="100%" stopColor={AC} stopOpacity="0.9"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow2"><feGaussianBlur stdDeviation="4" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="towerG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#243B58"/><stop offset="100%" stopColor="#1A2D45"/></linearGradient>
      </defs>
      <rect width="800" height="180" fill="url(#skyG)"/>
      {stars.map(([cx,cy,r,d],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={i%4===0?AC:"#E0DCD5"} style={{animation:`twinkle ${d}s ease infinite ${i*0.25}s`}}/>)}
      <path d="M0,155 L0,140 L30,140 L30,125 L50,125 L50,135 L75,135 L75,115 L90,115 L90,135 L115,135 L115,145 L150,145 L150,120 L170,120 L170,115 L185,115 L185,145 L210,145 L210,130 L240,130 L240,140 L280,140 L280,155" fill="#0F1A28"/>
      <path d="M520,155 L520,140 L540,140 L540,130 L555,130 L555,135 L580,135 L580,115 L595,115 L595,140 L630,140 L630,145 L660,145 L660,130 L680,130 L680,120 L700,120 L700,140 L740,140 L740,130 L760,130 L760,145 L800,145 L800,155" fill="#0F1A28"/>
      <rect x="355" y="145" width="90" height="10" rx="1" fill="#1E3050"/>
      <rect x="365" y="75" width="70" height="72" fill="url(#towerG)" stroke="#2A4060" strokeWidth="0.8" rx="1"/>
      <rect x="365" y="110" width="70" height="2" fill={AC} opacity="0.15"/>
      {[85,100,115,130].map((y,i)=><g key={i}>{[373,388,403,418].map((x,j)=><rect key={j} x={x} y={y} width="8" height="10" rx="0.5" fill={AC} opacity={0.2+(i===0?.1:0)}/>)}</g>)}
      <path d="M360,77 Q400,40 440,77" fill="#1E3555" stroke="#2A4A6A" strokeWidth="1"/>
      <rect x="397" y="48" width="5" height="29" fill={AC} opacity="0.7" rx="1"/>
      <rect x="396" y="46" width="7" height="4" fill={AC} opacity="0.9" rx="1" filter="url(#glow)"/>
      <g style={{transformOrigin:"400px 48px",animation:"beam 7s ease-in-out infinite"}}>
        <polygon points="396,48 340,0 460,0 404,48" fill="url(#beamG)" opacity="0.5"/>
        <polygon points="398,48 365,0 435,0 402,48" fill={AC} opacity="0.12"/>
      </g>
      <circle cx="400" cy="48" r="5" fill={AC} opacity="0.5" filter="url(#glow2)"/>
      <circle cx="400" cy="48" r="3" fill={AC} opacity="0.8" filter="url(#glow)"/>
      <rect x="0" y="153" width="800" height="27" fill="#0A1220"/>
      <line x1="0" y1="155" x2="800" y2="155" stroke="#1A2D42" strokeWidth="0.5"/>
    </svg>
  );
}

function SocialIcon({platform,size=18}){
  const p={instagram:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",facebook:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",x:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",linkedin:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",youtube:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"};
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d={p[platform]||""}/></svg>;
}

// ── Sidebar ──
function Sidebar({articles,currentSection,onReadMore}){
  // Articoli dalle ALTRE sezioni (ultimi 1 per sezione)
  const otherSections = SECTIONS.filter(s=>s.id!==currentSection);
  const otherArticles = otherSections.map(s=>{
    const latest = articles.filter(a=>a.section===s.id).sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))[0];
    return latest ? {...latest, secColor:s.color, secIcon:s.icon, secName:s.name} : null;
  }).filter(Boolean);

  return(
    <aside style={{width:260,flexShrink:0}}>
      {/* Fonti */}
      <div style={{background:CARD,borderRadius:10,border:`1px solid ${BD}`,padding:"16px 18px",marginBottom:16}}>
        <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:1.5,color:AC,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>Le nostre fonti</div>
        {FONTI.map((f,i)=>(
          <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" style={{display:"block",fontSize:13,color:TS,padding:"5px 0",borderBottom:i<FONTI.length-1?`1px solid ${LIGHT}`:"none",transition:"color 0.15s",textDecoration:"none"}}
            onMouseEnter={e=>e.currentTarget.style.color=AC}
            onMouseLeave={e=>e.currentTarget.style.color=TS}
          >{f.name}</a>
        ))}
      </div>

      {/* Dalle altre sezioni */}
      {otherArticles.length>0&&(
        <div style={{background:CARD,borderRadius:10,border:`1px solid ${BD}`,padding:"16px 18px",marginBottom:16}}>
          <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:1.5,color:AC,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>Dalle altre sezioni</div>
          {otherArticles.map((a,i)=>(
            <div key={a.id} onClick={()=>onReadMore(a)} style={{padding:"8px 0",borderBottom:i<otherArticles.length-1?`1px solid ${LIGHT}`:"none",cursor:"pointer"}}>
              <div style={{fontSize:10,fontFamily:"'Orbitron'",color:a.secColor,fontWeight:600,marginBottom:3}}>{a.secIcon} {a.secName}</div>
              <div style={{fontSize:13,color:TX,fontWeight:600,lineHeight:1.35}}>{a.title}</div>
              <div style={{fontSize:11,color:TD,marginTop:2}}>{fCompact(a.published_at)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Social */}
      <div style={{background:CARD,borderRadius:10,border:`1px solid ${BD}`,padding:"16px 18px"}}>
        <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:1.5,color:AC,textTransform:"uppercase",marginBottom:12,fontWeight:600}}>Seguici</div>
        <div style={{display:"flex",gap:12}}>
          {["instagram","facebook","x","linkedin","youtube"].map(pl=>(
            <a key={pl} href="#" style={{width:34,height:34,borderRadius:8,background:LIGHT,display:"flex",alignItems:"center",justifyContent:"center",color:TD,transition:"all 0.2s",textDecoration:"none"}}
              onMouseEnter={e=>{e.currentTarget.style.background=AC;e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background=LIGHT;e.currentTarget.style.color=TD}}
            ><SocialIcon platform={pl} size={16}/></a>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ── Article Card ──
function ArticleCard({article,featured,allArticles,onReadMore}){
  const sc=SECTIONS.find(s=>s.id===article.section);
  const isEchi=article.section==="echi";
  const prevArticles = (allArticles||[])
    .filter(a => a.section === article.section && a.id !== article.id)
    .filter(a => new Date(a.published_at) < new Date(article.published_at))
    .sort((a,b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0,2);

  return(
    <div style={{background:isEchi?DARK2:CARD,borderRadius:12,overflow:"hidden",border:`1px solid ${isEchi?"#1E2E40":BD}`,transition:"transform 0.2s,box-shadow 0.2s",cursor:"pointer"}}
      onClick={()=>onReadMore&&onReadMore(article)}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=isEchi?"0 8px 24px rgba(0,0,0,0.4)":"0 8px 24px rgba(0,0,0,0.08)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
      <div style={{height:3,background:sc?.color||AC}}/>
      <div style={{padding:featured?"24px 24px 20px":"16px 18px 14px"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontFamily:"'Orbitron'",fontWeight:600,color:sc?.color,letterSpacing:1.2,textTransform:"uppercase",marginBottom:10}}>
          <span style={{fontSize:13}}>{sc?.icon}</span> {sc?.name}
        </div>
        <h3 style={{fontFamily:"'Orbitron'",fontSize:featured?18:15,fontWeight:700,color:isEchi?"#E8E4DE":TX,lineHeight:1.35,marginBottom:6}}>{article.title}</h3>
        {article.subtitle&&<p style={{fontSize:featured?14:12,color:isEchi?"#8899AA":TS,fontStyle:"italic",lineHeight:1.5,marginBottom:10}}>{article.subtitle}</p>}
        <p style={{fontSize:13,color:isEchi?"#7A8A98":TS,lineHeight:1.7,marginBottom:14,display:"-webkit-box",WebkitLineClamp:featured?5:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{article.body}</p>
        {prevArticles.length>0&&<div style={{padding:"10px 12px",background:isEchi?"#0D151F":LIGHT,borderRadius:8,marginBottom:12}}>
          <div style={{fontSize:9,fontFamily:"'Orbitron'",letterSpacing:1.5,color:TD,marginBottom:6,textTransform:"uppercase"}}>Leggi anche</div>
          {prevArticles.map((a,i)=><div key={a.id} onClick={e=>{e.stopPropagation();onReadMore&&onReadMore(a)}} style={{fontSize:12,marginBottom:i<prevArticles.length-1?4:0,lineHeight:1.4,cursor:"pointer"}}>
            <span style={{color:AC,fontWeight:600}}>{a.title}</span>
            <span style={{color:isEchi?"#667788":TD,marginLeft:6}}>— {fCompact(a.published_at)}</span>
          </div>)}
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:10,color:isEchi?"#556677":TD,fontFamily:"'Orbitron'",letterSpacing:.5}}>
          <span>{article.author}</span><span>{article.published_at?fCompact(article.published_at):""}</span>
        </div>
      </div>
    </div>
  );
}

// ── Articolo completo ──
function ArticleFull({article,allArticles,onBack,onReadMore}){
  const sc=SECTIONS.find(s=>s.id===article.section);
  const prevArticles = (allArticles||[])
    .filter(a => a.section === article.section && a.id !== article.id)
    .sort((a,b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0,2);
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"32px 20px 48px",animation:"fadeUp 0.4s ease",display:"flex",gap:32}}>
      <div style={{flex:1,minWidth:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:AC,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:20,display:"flex",alignItems:"center",gap:6}}>← Torna alla homepage</button>
        <div style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontFamily:"'Orbitron'",fontWeight:600,color:sc?.color,letterSpacing:1.2,textTransform:"uppercase",marginBottom:14}}><span style={{fontSize:14}}>{sc?.icon}</span> {sc?.name}</div>
        <h1 style={{fontFamily:"'Orbitron'",fontSize:26,fontWeight:800,color:TX,lineHeight:1.3,marginBottom:8}}>{article.title}</h1>
        {article.subtitle&&<p style={{fontSize:16,color:TS,fontStyle:"italic",lineHeight:1.5,marginBottom:14}}>{article.subtitle}</p>}
        <div style={{display:"flex",alignItems:"center",gap:16,fontSize:12,color:TD,marginBottom:28,paddingBottom:14,borderBottom:`1px solid ${BD}`}}>
          <span style={{fontWeight:600,color:TS}}>{article.author}</span><span>{article.published_at?fDate(article.published_at):""}</span>
        </div>
        <div style={{fontSize:16,color:TX,lineHeight:2,whiteSpace:"pre-wrap",marginBottom:36}}>{article.body}</div>
        {prevArticles.length>0&&<div style={{padding:"18px 22px",background:LIGHT,borderRadius:12,border:`1px solid ${BD}`}}>
          <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:1.5,color:TD,marginBottom:10,textTransform:"uppercase"}}>Leggi anche in {sc?.name}</div>
          {prevArticles.map((a,i)=><div key={a.id} onClick={()=>onReadMore(a)} style={{padding:"10px 0",borderBottom:i<prevArticles.length-1?`1px solid ${BD}`:"none",cursor:"pointer"}}>
            <div style={{fontSize:15,fontWeight:600,color:TX,marginBottom:2}}>{a.title}</div>
            <div style={{fontSize:12,color:TD}}>{fShort(a.published_at)}</div>
          </div>)}
        </div>}
      </div>
      <Sidebar articles={allArticles} currentSection={article.section} onReadMore={onReadMore}/>
    </div>
  );
}

// ── Chi siamo ──
function ChiSiamo({onBack,articles}){
  const chiArt = (articles||[]).find(a=>a.section==="chisiamo");
  const projDesc = chiArt?.body || "La Specola nasce dall'idea di osservare il presente con gli strumenti dell'analisi e del rigore. Ogni sera, editoriali su attualità, motori, tecnologia, arte e storia offrono al lettore una bussola per orientarsi nel flusso delle notizie.";
  const edName = chiArt?.title || "Francesco Pasquale";
  const edBio = chiArt?.subtitle || "Analista e osservatore del presente. Appassionato di tecnologia, motori e storia, crede che comprendere il passato sia il modo migliore per leggere il futuro.";
  return(
    <div style={{maxWidth:720,margin:"0 auto",padding:"40px 20px",animation:"fadeUp 0.4s ease"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:AC,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28,display:"flex",alignItems:"center",gap:6}}>← Torna alla homepage</button>
      <h1 style={{fontFamily:"'Orbitron'",fontSize:26,fontWeight:800,color:TX,letterSpacing:2,marginBottom:28}}>Chi siamo</h1>
      <div style={{background:CARD,borderRadius:12,border:`1px solid ${BD}`,padding:28,marginBottom:24}}>
        <h2 style={{fontFamily:"'Orbitron'",fontSize:14,fontWeight:700,color:AC,letterSpacing:1,marginBottom:14}}>Il progetto</h2>
        <p style={{fontSize:15,color:TS,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{projDesc}</p>
      </div>
      <div style={{background:CARD,borderRadius:12,border:`1px solid ${BD}`,padding:28,display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
        <div style={{width:90,height:90,borderRadius:"50%",background:`linear-gradient(135deg,${AC},#B8860B)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:32,fontWeight:900,color:"#fff",flexShrink:0}}>FP</div>
        <div style={{flex:1,minWidth:220}}>
          <h2 style={{fontFamily:"'Orbitron'",fontSize:14,fontWeight:700,color:AC,letterSpacing:1,marginBottom:6}}>L'editore</h2>
          <h3 style={{fontSize:18,fontWeight:700,color:TX,marginBottom:10}}>{edName}</h3>
          <p style={{fontSize:15,color:TS,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{edBio}</p>
        </div>
      </div>
      <div style={{marginTop:24,padding:"14px 18px",background:LIGHT,borderRadius:8,fontSize:12,color:TD,lineHeight:1.6}}>
        Blog di analisi e commento — non costituisce testata giornalistica registrata ai sensi della L. 62/2001.
      </div>
    </div>
  );
}

// ── Archivio ──
function Archivio({articles,onBack,onReadMore}){
  const grouped={};
  articles.forEach(a=>{const d=a.edition_date||a.published_at?.split("T")[0]||"";if(d){if(!grouped[d])grouped[d]=[];grouped[d].push(a)}});
  const dates=Object.keys(grouped).sort((a,b)=>b.localeCompare(a));
  return(
    <div style={{maxWidth:720,margin:"0 auto",padding:"40px 20px",animation:"fadeUp 0.4s ease"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:AC,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:28,display:"flex",alignItems:"center",gap:6}}>← Torna alla homepage</button>
      <h1 style={{fontFamily:"'Orbitron'",fontSize:26,fontWeight:800,color:TX,letterSpacing:2,marginBottom:28}}>Archivio</h1>
      {dates.length===0?<p style={{color:TD}}>Nessun articolo in archivio.</p>
      :dates.map(d=>(
        <div key={d} style={{marginBottom:28}}>
          <div style={{fontSize:11,fontFamily:"'Orbitron'",letterSpacing:1.5,color:AC,textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:AC}}/>{fDate(d)}<span style={{flex:1,height:1,background:BD}}/>
          </div>
          {grouped[d].map(a=>{const sc=SECTIONS.find(s=>s.id===a.section);return(
            <div key={a.id} onClick={()=>onReadMore(a)} style={{background:CARD,borderRadius:10,padding:"12px 16px",border:`1px solid ${BD}`,marginBottom:5,cursor:"pointer",borderLeft:`3px solid ${sc?.color||BD}`,transition:"box-shadow 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 2px 10px rgba(0,0,0,0.06)"}onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}><span style={{fontSize:10,fontFamily:"'Orbitron'",fontWeight:600,color:sc?.color}}>{sc?.icon} {sc?.name}</span></div>
              <div style={{fontSize:14,fontWeight:700,color:TX}}>{a.title}</div>
            </div>
          )})}
        </div>
      ))}
    </div>
  );
}

// ── Footer ──
function Footer({onChiSiamo}){
  return(
    <footer style={{background:DARK,padding:"36px 20px 24px",color:"#6A7A8A"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:20,borderBottom:"1px solid #1A2D42",flexWrap:"wrap",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:8,background:`linear-gradient(135deg,${AC},#B8860B)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:16,fontWeight:900,color:"#fff",boxShadow:`0 0 12px ${AC}44`}}>S</div>
            <div><div style={{fontFamily:"'Orbitron'",fontSize:16,fontWeight:800,color:"#E8E4DE",letterSpacing:3}}>LA SPECOLA</div><div style={{fontSize:11,fontStyle:"italic",color:"#556677"}}>Osservare oggi per comprendere il domani</div></div>
          </div>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            {["instagram","facebook","x","linkedin","youtube"].map(pl=><a key={pl} href="#" style={{color:"#556677",transition:"color 0.2s",display:"flex",alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.color=AC} onMouseLeave={e=>e.currentTarget.style.color="#556677"}><SocialIcon platform={pl}/></a>)}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:16,flexWrap:"wrap",gap:8,fontSize:11,color:"#445566"}}>
          <div>Blog di analisi e commento — non costituisce testata giornalistica registrata</div>
          <div style={{display:"flex",gap:18}}><a href="#" style={{color:"#556677"}}>Privacy</a><a href="#" style={{color:"#556677"}}>Cookie</a><a href="#" onClick={e=>{e.preventDefault();onChiSiamo()}} style={{color:"#556677",cursor:"pointer"}}>Chi siamo</a></div>
        </div>
        <div style={{textAlign:"center",marginTop:16,fontSize:10,color:"#334455",fontFamily:"'Orbitron'",letterSpacing:1}}>© {new Date().getFullYear()} La Specola · Francesco Pasquale</div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════
//  MAIN
// ══════════════════════════════════════

export default function HomePage(){
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sec,setSec]=useState("all");
  const [page,setPage]=useState("home");
  const [currentArticle,setCurrentArticle]=useState(null);

  useEffect(()=>{
    const run=async()=>{
      const { getSupabase } = await import("@/lib/supabase");
      const sb=getSupabase();
      const artRes = await sb.from("articles").select("*").eq("status","published").order("published_at",{ascending:false});
      setArticles(artRes.data||[]);
      setLoading(false);
    };
    run();
  },[]);

  const todayISO=new Date().toISOString().split("T")[0];
  const todayArticles=articles.filter(a=>a.edition_date===todayISO&&a.section!=="chisiamo");
  const shown=sec==="all"?todayArticles:todayArticles.filter(a=>a.section===sec);
  const today=fDate(new Date());
  const goArticle=(a)=>{setCurrentArticle(a);setPage("article");window.scrollTo(0,0)};
  const goHome=()=>{setPage("home");setCurrentArticle(null);window.scrollTo(0,0)};
  const goChiSiamo=()=>{setPage("chi-siamo");window.scrollTo(0,0)};
  const goArchivio=()=>{setPage("archivio");window.scrollTo(0,0)};

  if(page==="chi-siamo")return(<div style={{minHeight:"100vh"}}><ChiSiamo onBack={goHome} articles={articles}/><Footer onChiSiamo={goChiSiamo}/></div>);
  if(page==="archivio")return(<div style={{minHeight:"100vh"}}><Archivio articles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></div>);
  if(page==="article"&&currentArticle)return(<div style={{minHeight:"100vh"}}><ArticleFull article={currentArticle} allArticles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></div>);

  return(
    <div style={{minHeight:"100vh"}}>
      {/* HERO — compatto */}
      <div style={{position:"relative",background:DARK,overflow:"hidden"}}>
        <SpecolaSVG/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:2,background:"radial-gradient(ellipse at center,transparent 30%,#0B111880 100%)"}}>
          <div style={{fontSize:9,fontFamily:"'Orbitron'",letterSpacing:4,color:AC,textTransform:"uppercase",fontWeight:600,marginBottom:8,animation:"fadeUp 0.6s ease 0.2s both"}}>Osservare oggi per comprendere il domani</div>
          <h1 style={{fontFamily:"'Orbitron'",fontSize:36,fontWeight:900,color:"#F0EDE8",letterSpacing:5,textShadow:`0 0 30px ${AC}33`,animation:"fadeUp 0.6s ease 0.3s both"}}>LA SPECOLA</h1>
          <div style={{fontSize:11,color:"#6A7A8A",marginTop:6,fontWeight:300,letterSpacing:1,animation:"fadeUp 0.6s ease 0.4s both"}}>edizione serale · {today}</div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,background:CARD,borderBottom:`1px solid ${BD}`,position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 8px rgba(0,0,0,0.04)",flexWrap:"wrap"}}>
        {[{id:"all",name:"Tutte",color:AC},...SECTIONS].map(s=>
          <button key={s.id} onClick={()=>{setSec(s.id);setPage("home")}} style={{padding:"12px 16px",border:"none",background:"transparent",fontFamily:"'Titillium Web'",fontSize:13,fontWeight:600,color:page==="home"&&sec===s.id?s.color:TD,borderBottom:`2px solid ${page==="home"&&sec===s.id?s.color:"transparent"}`,cursor:"pointer",transition:"all 0.2s"}}>
            {s.id!=="all"&&<span style={{marginRight:4}}>{SECTIONS.find(x=>x.id===s.id)?.icon}</span>}{s.name}
          </button>
        )}
        <div style={{width:1,height:18,background:BD,margin:"0 6px"}}/>
        <button onClick={goArchivio} style={{padding:"12px 14px",border:"none",background:"transparent",fontSize:12,fontWeight:page==="archivio"?600:400,color:page==="archivio"?AC:TD,cursor:"pointer",borderBottom:`2px solid ${page==="archivio"?AC:"transparent"}`}}>Archivio</button>
        <button onClick={goChiSiamo} style={{padding:"12px 14px",border:"none",background:"transparent",fontSize:12,fontWeight:page==="chi-siamo"?600:400,color:page==="chi-siamo"?AC:TD,cursor:"pointer",borderBottom:`2px solid ${page==="chi-siamo"?AC:"transparent"}`}}>Chi siamo</button>
      </nav>

      {/* CONTENT con SIDEBAR */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 20px 40px",display:"flex",gap:28,alignItems:"flex-start"}}>
        {/* Main */}
        <main style={{flex:1,minWidth:0}}>
          {loading?<div style={{textAlign:"center",padding:"50px 20px",color:TD}}><div style={{fontFamily:"'Orbitron'",fontSize:14,letterSpacing:2}}>Caricamento...</div></div>
          :shown.length===0?<div style={{textAlign:"center",padding:"50px 20px"}}><div style={{fontSize:40,marginBottom:12,opacity:.2}}>📜</div><div style={{fontFamily:"'Orbitron'",fontSize:14,color:TS}}>Nessun articolo pubblicato</div><div style={{fontSize:13,color:TD,marginTop:6}}>L'edizione odierna sarà disponibile in serata</div></div>
          :<>
            {shown.length>0&&<div style={{marginBottom:24,animation:"fadeUp 0.5s ease"}}><ArticleCard article={shown[0]} featured allArticles={articles} onReadMore={goArticle}/></div>}
            {shown.length>1&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16}}>{shown.slice(1).map((a,i)=><div key={a.id} style={{animation:`fadeUp 0.4s ease ${0.08*(i+1)}s both`}}><ArticleCard article={a} allArticles={articles} onReadMore={goArticle}/></div>)}</div>}
          </>}
        </main>
        {/* Sidebar — solo su desktop */}
        <div style={{display:"block"}}>
          <Sidebar articles={articles} currentSection={sec==="all"?"":sec} onReadMore={goArticle}/>
        </div>
      </div>

      {/* PARTNER */}
      <section style={{background:CARD,borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`,padding:"28px 20px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:2,color:TD,textTransform:"uppercase",marginBottom:16}}>Partner</div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:32,flexWrap:"wrap"}}>
            {["Partner 1","Partner 2","Partner 3"].map((p,i)=><div key={i} style={{padding:"10px 24px",border:`1px dashed ${BD}`,borderRadius:8,fontSize:13,color:TD,fontStyle:"italic"}}>{p}</div>)}
          </div>
        </div>
      </section>

      <Footer onChiSiamo={goChiSiamo}/>
    </div>
  );
}
