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

const AC="#D4930D";

function fDate(d){return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
function fShort(d){return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"long",year:"numeric"})}
function fCompact(d){return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"short"})}

/* ═══════════════════════════════════════════════════════
   HERO — compatto, elegante, scuro
   ═══════════════════════════════════════════════════════ */
function Hero(){
  const today=fDate(new Date());
  return(
    <header className="hero">
      <div className="hero-inner">
        <div className="hero-sub">Osservare oggi per comprendere il domani</div>
        <h1 className="hero-title">LA SPECOLA</h1>
        <div className="hero-date">edizione del {today}</div>
      </div>
      {/* Specola tower SVG — minimal */}
      <svg className="hero-svg" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="25" width="40" height="45" fill="#1a2d45" rx="1"/>
        <path d="M36,27 Q60,5 84,27" fill="#1e3555" stroke="#2a4a6a" strokeWidth="0.8"/>
        <rect x="58" y="8" width="4" height="19" fill={AC} opacity="0.8" rx="0.5"/>
        <circle cx="60" cy="8" r="3" fill={AC} opacity="0.6"/>
        {[45,53,61,69].map((x,i)=>[30,42,54].map((y,j)=>
          <rect key={`${i}-${j}`} x={x} y={y} width="5" height="7" rx="0.5" fill={AC} opacity="0.2"/>
        ))}
        <rect x="30" y="68" width="60" height="5" rx="1" fill="#1e3050"/>
        <g style={{transformOrigin:"60px 8px",animation:"beam 7s ease-in-out infinite"}}>
          <polygon points="58,8 45,0 75,0 62,8" fill={AC} opacity="0.15"/>
        </g>
      </svg>
      {/* Stars */}
      <div className="hero-stars">
        {[[8,15],[22,8],[78,12],[92,20],[35,6],[65,18],[50,4],[15,22],[85,7]].map(([l,t],i)=>
          <span key={i} className="star" style={{left:`${l}%`,top:`${t}%`,animationDelay:`${i*0.4}s`,width:i%3===0?3:2,height:i%3===0?3:2}}/>
        )}
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════════════ */
function Nav({sec,setSec,page,goHome,goArchivio,goChiSiamo}){
  return(
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-sections">
          {[{id:"all",name:"Tutte"},...SECTIONS].map(s=>
            <button key={s.id} onClick={()=>{setSec(s.id);goHome()}}
              className={`nav-btn ${page==="home"&&sec===s.id?"active":""}`}
              style={page==="home"&&sec===s.id?{color:SECTIONS.find(x=>x.id===s.id)?.color||AC,borderBottomColor:SECTIONS.find(x=>x.id===s.id)?.color||AC}:{}}>
              {s.id!=="all"&&<span className="nav-icon">{SECTIONS.find(x=>x.id===s.id)?.icon}</span>}
              <span className="nav-label">{s.name}</span>
            </button>
          )}
        </div>
        <div className="nav-pages">
          <button onClick={goArchivio} className={`nav-btn ${page==="archivio"?"active":""}`}>Archivio</button>
          <button onClick={goChiSiamo} className={`nav-btn ${page==="chi-siamo"?"active":""}`}>Chi siamo</button>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════ */
function Sidebar({articles,currentSection,onReadMore}){
  const otherSections = SECTIONS.filter(s=>s.id!==currentSection);
  const otherArticles = otherSections.map(s=>{
    const latest = articles.filter(a=>a.section===s.id&&a.section!=="chisiamo")
      .sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))[0];
    return latest ? {...latest, sc:s} : null;
  }).filter(Boolean);

  return(
    <aside className="sidebar">
      {/* Fonti */}
      <div className="sidebar-block">
        <div className="sidebar-title">Le nostre fonti</div>
        {FONTI.map((f,i)=>
          <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="sidebar-link">{f.name}</a>
        )}
      </div>

      {/* Altre sezioni */}
      {otherArticles.length>0&&(
        <div className="sidebar-block">
          <div className="sidebar-title">Dalle altre sezioni</div>
          {otherArticles.map((a,i)=>(
            <div key={a.id} className="sidebar-article" onClick={()=>onReadMore(a)}>
              <span className="sidebar-section" style={{color:a.sc.color}}>{a.sc.icon} {a.sc.name}</span>
              <div className="sidebar-article-title">{a.title}</div>
              <div className="sidebar-article-date">{fCompact(a.published_at)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Social */}
      <div className="sidebar-block">
        <div className="sidebar-title">Seguici</div>
        <div className="sidebar-social">
          {[{n:"Instagram",u:"#"},{n:"Facebook",u:"#"},{n:"X",u:"#"},{n:"LinkedIn",u:"#"},{n:"YouTube",u:"#"}].map((s,i)=>
            <a key={i} href={s.u} className="social-btn">{s.n.charAt(0)}</a>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTICLE CARD
   ═══════════════════════════════════════════════════════ */
function ArticleCard({article,featured,allArticles,onReadMore}){
  const sc=SECTIONS.find(s=>s.id===article.section);
  const prevArticles = (allArticles||[])
    .filter(a=>a.section===article.section&&a.id!==article.id)
    .filter(a=>new Date(a.published_at)<new Date(article.published_at))
    .sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))
    .slice(0,2);

  return(
    <article className={`card ${featured?"card-featured":""}`} onClick={()=>onReadMore&&onReadMore(article)}>
      <div className="card-accent" style={{background:sc?.color||AC}}/>
      <div className="card-body">
        <div className="card-section" style={{color:sc?.color}}>
          <span>{sc?.icon}</span> {sc?.name}
        </div>
        <h3 className={`card-title ${featured?"card-title-lg":""}`}>{article.title}</h3>
        {article.subtitle&&<p className="card-subtitle">{article.subtitle}</p>}
        <p className="card-excerpt">{article.body}</p>
        {article.audio_url&&(
          <div className="card-audio" onClick={e=>e.stopPropagation()}>
            <span className="card-audio-label">🎵 Ascolta</span>
            <audio controls src={article.audio_url} preload="none"/>
          </div>
        )}
        {prevArticles.length>0&&(
          <div className="card-leggi">
            <div className="card-leggi-title">Leggi anche</div>
            {prevArticles.map(a=>
              <div key={a.id} className="card-leggi-item" onClick={e=>{e.stopPropagation();onReadMore&&onReadMore(a)}}>
                <span className="card-leggi-link">{a.title}</span>
                <span className="card-leggi-date">{fCompact(a.published_at)}</span>
              </div>
            )}
          </div>
        )}
        <div className="card-meta">
          <span className="card-author">{article.author}</span>
          <span className="card-date">{article.published_at?fCompact(article.published_at):""}</span>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════
   ARTICLE FULL PAGE
   ═══════════════════════════════════════════════════════ */
function ArticleFull({article,allArticles,onBack,onReadMore}){
  const sc=SECTIONS.find(s=>s.id===article.section);
  const prevArticles = (allArticles||[])
    .filter(a=>a.section===article.section&&a.id!==article.id)
    .sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))
    .slice(0,2);

  return(
    <div className="page-layout">
      <div className="article-full">
        <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
        <div className="article-section" style={{color:sc?.color}}>{sc?.icon} {sc?.name}</div>
        <h1 className="article-title">{article.title}</h1>
        {article.subtitle&&<p className="article-subtitle">{article.subtitle}</p>}
        <div className="article-meta-bar">
          <span className="article-author">{article.author}</span>
          <span className="article-date">{article.published_at?fDate(article.published_at):""}</span>
        </div>
        <div className="article-body">{article.body}</div>
        {article.audio_url&&(
          <div className="article-audio">
            <div className="article-audio-label">🎵 Ascolta la traccia</div>
            <audio controls src={article.audio_url} preload="none" style={{width:"100%"}}/>
          </div>
        )}
        {prevArticles.length>0&&(
          <div className="article-leggi">
            <div className="article-leggi-title">Leggi anche in {sc?.name}</div>
            {prevArticles.map(a=>
              <div key={a.id} className="article-leggi-item" onClick={()=>onReadMore(a)}>
                <div className="article-leggi-name">{a.title}</div>
                <div className="article-leggi-date">{fShort(a.published_at)}</div>
              </div>
            )}
          </div>
        )}
      </div>
      <Sidebar articles={allArticles} currentSection={article.section} onReadMore={onReadMore}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CHI SIAMO
   ═══════════════════════════════════════════════════════ */
function ChiSiamo({onBack,articles}){
  const chiArt=(articles||[]).find(a=>a.section==="chisiamo");
  const projDesc=chiArt?.body||"La Specola nasce dall'idea di osservare il presente con gli strumenti dell'analisi e del rigore. Ogni sera, editoriali su attualità, motori, tecnologia, arte e storia offrono al lettore una bussola per orientarsi.";
  const edName=chiArt?.title||"Francesco Pasquale";
  const edBio=chiArt?.subtitle||"Analista e osservatore del presente.";
  return(
    <div className="page-single">
      <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
      <h1 className="page-title">Chi siamo</h1>
      <div className="chi-block">
        <h2 className="chi-label">Il progetto</h2>
        <p className="chi-text">{projDesc}</p>
      </div>
      <div className="chi-editor">
        <div className="chi-avatar">FP</div>
        <div className="chi-editor-info">
          <h2 className="chi-label">L'editore</h2>
          <h3 className="chi-name">{edName}</h3>
          <p className="chi-text">{edBio}</p>
        </div>
      </div>
      <div className="chi-legal">Blog di analisi e commento — non costituisce testata giornalistica registrata ai sensi della L. 62/2001.</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ARCHIVIO
   ═══════════════════════════════════════════════════════ */
function Archivio({articles,onBack,onReadMore}){
  const grouped={};
  articles.filter(a=>a.section!=="chisiamo").forEach(a=>{
    const d=a.edition_date||a.published_at?.split("T")[0]||"";
    if(d){if(!grouped[d])grouped[d]=[];grouped[d].push(a)}
  });
  const dates=Object.keys(grouped).sort((a,b)=>b.localeCompare(a));
  return(
    <div className="page-single">
      <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
      <h1 className="page-title">Archivio</h1>
      {dates.length===0?<p className="empty-text">Nessun articolo in archivio.</p>
      :dates.map(d=>(
        <div key={d} className="archive-group">
          <div className="archive-date">{fDate(d)}</div>
          {grouped[d].map(a=>{
            const sc=SECTIONS.find(s=>s.id===a.section);
            return(
              <div key={a.id} className="archive-item" onClick={()=>onReadMore(a)} style={{borderLeftColor:sc?.color||AC}}>
                <span className="archive-section" style={{color:sc?.color}}>{sc?.icon} {sc?.name}</span>
                <div className="archive-title">{a.title}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer({onChiSiamo}){
  return(
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">S</div>
            <div>
              <div className="footer-name">LA SPECOLA</div>
              <div className="footer-motto">Osservare oggi per comprendere il domani</div>
            </div>
          </div>
          <div className="footer-social">
            {["IG","FB","X","Li","YT"].map((s,i)=>
              <a key={i} href="#" className="footer-social-btn">{s}</a>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>Blog di analisi e commento — non costituisce testata giornalistica registrata</span>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Cookie</a>
            <a href="#" onClick={e=>{e.preventDefault();onChiSiamo()}}>Chi siamo</a>
          </div>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} La Specola · Francesco Pasquale</div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function HomePage(){
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sec,setSec]=useState("all");
  const [page,setPage]=useState("home");
  const [currentArticle,setCurrentArticle]=useState(null);

  useEffect(()=>{
    (async()=>{
      const{getSupabase}=await import("@/lib/supabase");
      const sb=getSupabase();
      const{data}=await sb.from("articles").select("*").eq("status","published").order("published_at",{ascending:false});
      setArticles(data||[]);
      setLoading(false);
    })();
  },[]);

  // Mostra articoli di oggi, oppure i più recenti se oggi non c'è nulla
  const todayISO=new Date().toISOString().split("T")[0];
  const realArticles=articles.filter(a=>a.section!=="chisiamo");
  const todayArts=realArticles.filter(a=>a.edition_date===todayISO);
  const displayArts=todayArts.length>0?todayArts:realArticles.slice(0,8);
  const shown=sec==="all"?displayArts:displayArts.filter(a=>a.section===sec);

  const goArticle=a=>{setCurrentArticle(a);setPage("article");window.scrollTo(0,0)};
  const goHome=()=>{setPage("home");setCurrentArticle(null);window.scrollTo(0,0)};
  const goChiSiamo=()=>{setPage("chi-siamo");window.scrollTo(0,0)};
  const goArchivio=()=>{setPage("archivio");window.scrollTo(0,0)};

  if(page==="chi-siamo")return(<div className="site"><ChiSiamo onBack={goHome} articles={articles}/><Footer onChiSiamo={goChiSiamo}/></div>);
  if(page==="archivio")return(<div className="site"><Archivio articles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></div>);
  if(page==="article"&&currentArticle)return(<div className="site"><ArticleFull article={currentArticle} allArticles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></div>);

  return(
    <div className="site">
      <Hero/>
      <Nav sec={sec} setSec={setSec} page={page} goHome={goHome} goArchivio={goArchivio} goChiSiamo={goChiSiamo}/>
      <div className="page-layout">
        <main className="main-content">
          {loading?<div className="loading">Caricamento edizione...</div>
          :shown.length===0?<div className="empty"><div className="empty-icon">📜</div><div className="empty-title">Nessun articolo disponibile</div><div className="empty-text">L'edizione odierna sarà pubblicata in giornata</div></div>
          :<>
            {todayArts.length===0&&realArticles.length>0&&<div className="edition-note">Ultimi articoli pubblicati — l'edizione di oggi sarà disponibile in giornata</div>}
            {shown.length>0&&<ArticleCard article={shown[0]} featured allArticles={articles} onReadMore={goArticle}/>}
            {shown.length>1&&<div className="card-grid">{shown.slice(1).map(a=><ArticleCard key={a.id} article={a} allArticles={articles} onReadMore={goArticle}/>)}</div>}
          </>}
        </main>
        <Sidebar articles={articles} currentSection={sec==="all"?"":sec} onReadMore={goArticle}/>
      </div>
      <Footer onChiSiamo={goChiSiamo}/>
    </div>
  );
}
