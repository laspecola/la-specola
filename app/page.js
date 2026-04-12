"use client";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

const SECTIONS = [
  { id:"attualita",name:"Attualità",color:"#1A5276",icon:"🌍" },
  { id:"motori",name:"Motori",color:"#C0392B",icon:"🏎️" },
  { id:"tecnologia",name:"Tecnologia",color:"#5B3FA0",icon:"⚡" },
  { id:"echi",name:"Echi dal Passato",color:"#6B5B4F",icon:"📜" },
];
const AC="#D4930D",TX="#1C1C1C",TS="#555550",TD="#999590",BD="#E4E0DA",LIGHT="#F8F6F1",CARD="#FFFFFF",DARK="#0B1118",DARK2="#111923";

function fDate(d){return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}

function parseLinks(da_seguire){
  if(!da_seguire||!Array.isArray(da_seguire))return[];
  return da_seguire.map(s=>{const p=s.split("|||");return{title:p[0]||"",description:p[1]||""};}).filter(l=>l.title);
}

function SpecolaSVG(){
  const stars=[[70,25,1.5,2.5],[140,55,1,4],[210,20,1.3,3.2],[320,40,0.8,5],[420,15,1.6,2.8],[500,48,0.9,3.8],[580,28,1.4,4.5],[650,65,1.1,2.2],[720,22,0.8,3.6],[50,75,0.7,5.2],[260,68,1,2.9],[460,72,0.8,4.2],[600,85,1.2,3.1],[150,42,0.6,5.5],[380,22,0.9,2.1],[540,58,1.3,4.8],[90,55,0.5,3.5],[480,30,0.7,4.1],[330,80,0.6,2.7],[700,45,0.9,3.9]];
  return(
    <svg viewBox="0 0 800 320" style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="skyG" cx="50%" cy="85%" r="75%"><stop offset="0%" stopColor="#1E3050"/><stop offset="60%" stopColor="#122040"/><stop offset="100%" stopColor="#0C1525"/></radialGradient>
        <linearGradient id="beamG" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor={AC} stopOpacity="0"/><stop offset="30%" stopColor={AC} stopOpacity="0.35"/><stop offset="100%" stopColor={AC} stopOpacity="0.8"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow2"><feGaussianBlur stdDeviation="6" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="towerG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#243B58"/><stop offset="100%" stopColor="#1A2D45"/></linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#skyG)"/>
      <circle cx="650" cy="50" r="18" fill="#E8E4DE" opacity="0.12"/><circle cx="654" cy="46" r="16" fill="url(#skyG)"/>
      {stars.map(([cx,cy,r,d],i)=><circle key={i} cx={cx} cy={cy} r={r} fill={i%4===0?AC:"#E0DCD5"} style={{animation:`twinkle ${d}s ease infinite ${i*0.25}s`}}/>)}
      <path d="M0,275 L0,245 L30,245 L30,225 L50,225 L50,235 L75,235 L75,210 L90,210 L90,235 L115,235 L115,250 L150,250 L150,215 L170,215 L170,210 L185,210 L185,250 L210,250 L210,230 L235,230 L235,240 L275,240 L275,255 L310,255 L310,275" fill="#0F1A28"/>
      <path d="M490,275 L490,255 L510,255 L510,240 L530,240 L530,230 L545,230 L545,235 L570,235 L570,248 L595,248 L595,210 L610,210 L610,245 L635,245 L635,255 L670,255 L670,235 L690,235 L690,218 L710,218 L710,248 L745,248 L745,232 L765,232 L765,255 L800,255 L800,275" fill="#0F1A28"/>
      <rect x="330" y="262" width="140" height="13" rx="2" fill="#1E3050" stroke="#2A4060" strokeWidth="0.5"/>
      <rect x="348" y="155" width="104" height="110" fill="url(#towerG)" stroke="#2A4060" strokeWidth="1" rx="1"/>
      <rect x="348" y="200" width="104" height="3" fill={AC} opacity="0.15"/>
      {[168,190,215,240].map((y,i)=><g key={i}>{[362,384,406,428].map((x,j)=><rect key={j} x={x} y={y} width="12" height="16" rx="1" fill={AC} opacity={0.25+(i===0?.15:0)}/>)}</g>)}
      <rect x="387" y="248" width="26" height="17" rx="2" fill={AC} opacity="0.3"/>
      <path d="M342,157 Q400,90 458,157" fill="#1E3555" stroke="#2A4A6A" strokeWidth="1.5"/>
      <rect x="397" y="100" width="6" height="57" fill={AC} opacity="0.7" rx="1"/>
      <rect x="396" y="98" width="8" height="5" fill={AC} opacity="0.9" rx="1" filter="url(#glow)"/>
      <g style={{transformOrigin:"400px 100px",animation:"beam 7s ease-in-out infinite"}}>
        <polygon points="392,100 280,-10 520,-10 408,100" fill={AC} opacity="0.08" filter="url(#glow2)"/>
        <polygon points="394,100 310,0 490,0 406,100" fill="url(#beamG)" opacity="0.55"/>
        <polygon points="397,100 360,0 440,0 403,100" fill={AC} opacity="0.15"/>
      </g>
      <circle cx="400" cy="100" r="8" fill={AC} opacity="0.5" filter="url(#glow2)"/>
      <circle cx="400" cy="100" r="4" fill={AC} opacity="0.8" filter="url(#glow)"/>
      <rect x="0" y="273" width="800" height="47" fill="#0A1220"/>
      <line x1="0" y1="275" x2="800" y2="275" stroke="#1A2D42" strokeWidth="0.5"/>
      {[100,240,560,700].map((x,i)=><g key={i}><line x1={x} y1="275" x2={x} y2="258" stroke="#1E3050" strokeWidth="1.5"/><circle cx={x} cy="257" r="2.5" fill={AC} opacity="0.5" filter="url(#glow)" style={{animation:`twinkle ${3+i}s ease infinite ${i*0.4}s`}}/></g>)}
    </svg>
  );
}

function SocialIcon({platform,size=18}){
  const p={instagram:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",facebook:"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",x:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",linkedin:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",youtube:"M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"};
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d={p[platform]||""}/></svg>;
}

function ArticleCard({article,featured}){
  const sc=SECTIONS.find(s=>s.id===article.section);
  const links=parseLinks(article.da_seguire);
  const isEchi=article.section==="echi";
  return(
    <div style={{background:isEchi?DARK2:CARD,borderRadius:12,overflow:"hidden",border:`1px solid ${isEchi?"#1E2E40":BD}`,transition:"transform 0.2s,box-shadow 0.2s",cursor:"pointer"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=isEchi?"0 8px 24px rgba(0,0,0,0.4)":"0 8px 24px rgba(0,0,0,0.08)"}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
      <div style={{height:3,background:sc?.color||AC}}/>
      <div style={{padding:featured?"28px 28px 24px":"20px 20px 18px"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:10,fontFamily:"'Orbitron'",fontWeight:600,color:sc?.color,letterSpacing:1.2,textTransform:"uppercase",marginBottom:12}}>
          <span style={{fontSize:14}}>{sc?.icon}</span> {sc?.name}
        </div>
        <h3 style={{fontFamily:"'Orbitron'",fontSize:featured?20:16,fontWeight:700,color:isEchi?"#E8E4DE":TX,lineHeight:1.35,marginBottom:8}}>{article.title}</h3>
        {article.subtitle&&<p style={{fontSize:featured?15:13,color:isEchi?"#8899AA":TS,fontStyle:"italic",lineHeight:1.5,marginBottom:12}}>{article.subtitle}</p>}
        <p style={{fontSize:14,color:isEchi?"#7A8A98":TS,lineHeight:1.8,marginBottom:16,display:"-webkit-box",WebkitLineClamp:featured?6:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{article.body}</p>
        {links.length>0&&<div style={{padding:"12px 14px",background:isEchi?"#0D151F":LIGHT,borderRadius:8,marginBottom:14}}>
          <div style={{fontSize:9,fontFamily:"'Orbitron'",letterSpacing:1.5,color:TD,marginBottom:8,textTransform:"uppercase"}}>Leggi anche</div>
          {links.map((l,i)=><div key={i} style={{fontSize:13,marginBottom:i<links.length-1?5:0,lineHeight:1.4}}><span style={{color:AC,fontWeight:600}}>{l.title}</span>{l.description&&<span style={{color:isEchi?"#667788":TD,marginLeft:6}}>— {l.description}</span>}</div>)}
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11,color:isEchi?"#556677":TD,fontFamily:"'Orbitron'",letterSpacing:.5}}>
          <span>{article.author}</span><span>{article.published_at?fDate(article.published_at):""}</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePage(){
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sec,setSec]=useState("all");

  useEffect(()=>{
    getSupabase().from("articles").select("*").eq("status","published").order("published_at",{ascending:false})
      .then(({data})=>{setArticles(data||[]);setLoading(false);});
  },[]);

  const shown=sec==="all"?articles:articles.filter(a=>a.section===sec);
  const today=fDate(new Date());

  return(
    <div style={{minHeight:"100vh"}}>
      {/* HERO */}
      <div style={{position:"relative",background:DARK,overflow:"hidden"}}>
        <SpecolaSVG/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:2,background:"radial-gradient(ellipse at center,transparent 30%,#0B111880 100%)"}}>
          <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:5,color:AC,textTransform:"uppercase",fontWeight:600,marginBottom:12,animation:"fadeUp 0.8s ease 0.2s both"}}>Osservare oggi per comprendere il domani</div>
          <h1 style={{fontFamily:"'Orbitron'",fontSize:48,fontWeight:900,color:"#F0EDE8",letterSpacing:6,textShadow:`0 0 40px ${AC}33`,animation:"fadeUp 0.8s ease 0.4s both"}}>LA SPECOLA</h1>
          <div style={{fontSize:13,color:"#6A7A8A",marginTop:10,fontWeight:300,letterSpacing:1,animation:"fadeUp 0.8s ease 0.6s both"}}>edizione serale · {today}</div>
        </div>
      </div>

      {/* NAV */}
      <nav style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,background:CARD,borderBottom:`1px solid ${BD}`,position:"sticky",top:0,zIndex:10,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
        {[{id:"all",name:"Tutte",color:AC},...SECTIONS].map(s=>
          <button key={s.id} onClick={()=>setSec(s.id)} style={{padding:"14px 20px",border:"none",background:"transparent",fontFamily:"'Titillium Web'",fontSize:13,fontWeight:600,color:sec===s.id?s.color:TD,borderBottom:`2px solid ${sec===s.id?s.color:"transparent"}`,cursor:"pointer",transition:"all 0.2s",letterSpacing:.3}}>
            {s.id!=="all"&&<span style={{marginRight:5}}>{SECTIONS.find(x=>x.id===s.id)?.icon}</span>}{s.name}
          </button>
        )}
        <div style={{width:1,height:20,background:BD,margin:"0 8px"}}/>
        <button style={{padding:"14px 16px",border:"none",background:"transparent",fontSize:13,fontWeight:400,color:TD,cursor:"pointer"}}>Archivio</button>
        <button style={{padding:"14px 16px",border:"none",background:"transparent",fontSize:13,fontWeight:400,color:TD,cursor:"pointer"}}>Chi siamo</button>
      </nav>

      {/* CONTENT */}
      <main style={{maxWidth:960,margin:"0 auto",padding:"36px 20px 48px"}}>
        {loading?<div style={{textAlign:"center",padding:"60px 20px",color:TD}}><div style={{fontFamily:"'Orbitron'",fontSize:14,letterSpacing:2}}>Caricamento edizione...</div></div>
        :shown.length===0?<div style={{textAlign:"center",padding:"60px 20px"}}><div style={{fontSize:48,marginBottom:16,opacity:.2}}>📜</div><div style={{fontFamily:"'Orbitron'",fontSize:14,color:TS,marginBottom:8}}>Nessun articolo pubblicato</div><div style={{fontSize:13,color:TD}}>L'edizione odierna sarà disponibile in serata</div></div>
        :<>
          {shown.length>0&&<div style={{marginBottom:32,animation:"fadeUp 0.6s ease"}}><ArticleCard article={shown[0]} featured/></div>}
          {shown.length>1&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:20}}>{shown.slice(1).map((a,i)=><div key={a.id} style={{animation:`fadeUp 0.5s ease ${0.1*(i+1)}s both`}}><ArticleCard article={a}/></div>)}</div>}
        </>}
      </main>

      {/* PARTNER */}
      <section style={{background:CARD,borderTop:`1px solid ${BD}`,borderBottom:`1px solid ${BD}`,padding:"32px 20px"}}>
        <div style={{maxWidth:960,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:10,fontFamily:"'Orbitron'",letterSpacing:2,color:TD,textTransform:"uppercase",marginBottom:20}}>Partner</div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:40,flexWrap:"wrap"}}>
            {["Partner 1","Partner 2","Partner 3"].map((p,i)=><div key={i} style={{padding:"12px 28px",border:`1px dashed ${BD}`,borderRadius:8,fontSize:13,color:TD,fontStyle:"italic"}}>{p}</div>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:DARK,padding:"40px 20px 28px",color:"#6A7A8A"}}>
        <div style={{maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:24,borderBottom:"1px solid #1A2D42",flexWrap:"wrap",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:40,height:40,borderRadius:10,background:`linear-gradient(135deg,${AC},#B8860B)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron'",fontSize:18,fontWeight:900,color:"#fff",boxShadow:`0 0 16px ${AC}44`}}>S</div>
              <div><div style={{fontFamily:"'Orbitron'",fontSize:18,fontWeight:800,color:"#E8E4DE",letterSpacing:3}}>LA SPECOLA</div><div style={{fontSize:12,fontStyle:"italic",color:"#556677"}}>Osservare oggi per comprendere il domani</div></div>
            </div>
            <div style={{display:"flex",gap:16,alignItems:"center"}}>
              {["instagram","facebook","x","linkedin","youtube"].map(pl=><a key={pl} href="#" style={{color:"#556677",transition:"color 0.2s",display:"flex",alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.color=AC} onMouseLeave={e=>e.currentTarget.style.color="#556677"}><SocialIcon platform={pl}/></a>)}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:20,flexWrap:"wrap",gap:10,fontSize:11,color:"#445566"}}>
            <div>Blog di analisi e commento — non costituisce testata giornalistica registrata ai sensi della L. 62/2001</div>
            <div style={{display:"flex",gap:20}}><a href="#" style={{color:"#556677"}}>Privacy</a><a href="#" style={{color:"#556677"}}>Cookie</a><a href="#" style={{color:"#556677"}}>Chi siamo</a></div>
          </div>
          <div style={{textAlign:"center",marginTop:20,fontSize:10,color:"#334455",fontFamily:"'Orbitron'",letterSpacing:1}}>© {new Date().getFullYear()} La Specola · Francesco Pasquale</div>
        </div>
      </footer>
    </div>
  );
}
