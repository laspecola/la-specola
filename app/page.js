"use client";
import { useState, useEffect } from "react";

const SECTIONS = [
  { id:"attualita", name:"Attualità", cls:"att" },
  { id:"motori", name:"Motori", cls:"mot" },
  { id:"tecnologia", name:"Tecnologia", cls:"tec" },
  { id:"officina", name:"L'Officina delle Arti", cls:"off" },
  { id:"crocevia", name:"Crocevia", cls:"cro" },
  { id:"echi", name:"Echi dal Passato", cls:"echi" },
];
const FONTI = [
  { name:"ANSA", url:"https://www.ansa.it" },
  { name:"Corriere della Sera", url:"https://www.corriere.it" },
  { name:"Repubblica", url:"https://www.repubblica.it" },
  { name:"Il Sole 24 Ore", url:"https://www.ilsole24ore.com" },
  { name:"Sky TG24", url:"https://tg24.sky.it" },
  { name:"Il Post", url:"https://www.ilpost.it" },
];

function secOf(id){ return SECTIONS.find(s=>s.id===id); }
function fDate(d){ return new Date(d).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"}); }
function fShort(d){ return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"long",year:"numeric"}); }
function fCompact(d){ return new Date(d).toLocaleDateString("it-IT",{day:"numeric",month:"short"}); }

/* ═══ LOGO ═══ */
function Logo({className}){
  return(
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="La Specola">
      <circle cx="50" cy="50" r="47" fill="none" stroke="#B08428" strokeWidth="1.5" opacity="0.45"/>
      <circle cx="24" cy="28" r="1.4" fill="#F6F3EC" opacity="0.8"/>
      <circle cx="76" cy="34" r="1.1" fill="#B08428"/>
      <circle cx="72" cy="20" r="1" fill="#F6F3EC" opacity="0.6"/>
      <circle cx="28" cy="44" r="1" fill="#B08428" opacity="0.7"/>
      <path d="M40,84 L42,40 L58,40 L60,84 Z" fill="#B08428" opacity="0.92"/>
      <rect x="37" y="38" width="26" height="4" rx="1" fill="#B08428"/>
      <path d="M42,38 A8,8 0 0 1 58,38 Z" fill="#F6F3EC"/>
      <rect x="49" y="25" width="2" height="13" fill="#14161A"/>
      <circle cx="50" cy="29" r="2" fill="#B08428"/>
      <rect x="47.5" y="50" width="5" height="7" rx="1" fill="#14161A" opacity="0.55"/>
      <rect x="47.5" y="62" width="5" height="7" rx="1" fill="#14161A" opacity="0.55"/>
      <rect x="34" y="84" width="32" height="5" rx="1" fill="#B08428"/>
      <rect x="38" y="89" width="24" height="3" rx="1" fill="#B08428" opacity="0.6"/>
    </svg>
  );
}

/* ═══ MASTHEAD ═══ */
function Masthead(){
  const today=new Date();
  const weekday=today.toLocaleDateString("it-IT",{weekday:"long"});
  return(
    <header className="masthead">
      <div className="mast-rule">Edizione di {weekday}</div>
      <div className="mast-brand">
        <Logo className="mast-logo"/>
        <div className="mast-title">La Specola</div>
      </div>
      <div className="mast-sub">Osservare l'oggi per comprendere il domani</div>
      <div className="mast-date">{fShort(today)}</div>
    </header>
  );
}

/* ═══ NAV ═══ */
function Nav({sec,setSec,page,goHome,goArchivio,goChiSiamo}){
  return(
    <nav className="nav">
      <div className="nav-inner">
        <button onClick={()=>{setSec("all");goHome()}} className={`nav-btn ${page==="home"&&sec==="all"?"active":""}`}>Tutte</button>
        {SECTIONS.map(s=>
          <button key={s.id} onClick={()=>{setSec(s.id);goHome()}} className={`nav-btn sec-${s.cls} ${page==="home"&&sec===s.id?"active":""}`}>{s.name}</button>
        )}
        <button onClick={goArchivio} className={`nav-btn ${page==="archivio"?"active":""}`}>Archivio</button>
        <button onClick={goChiSiamo} className={`nav-btn ${page==="chi-siamo"?"active":""}`}>Chi siamo</button>
      </div>
    </nav>
  );
}

/* ═══ SIDEBAR ═══ */
function Sidebar({articles,currentSection,onReadMore}){
  const others=SECTIONS.filter(s=>s.id!==currentSection).map(s=>{
    const latest=articles.filter(a=>a.section===s.id).sort((a,b)=>new Date(b.published_at)-new Date(a.published_at))[0];
    return latest?{...latest,sc:s}:null;
  }).filter(Boolean);
  return(
    <aside className="aside">
      {others.length>0&&(
        <div className="aside-block">
          <div className="aside-h">Dalle altre sezioni</div>
          {others.map(a=>(
            <div key={a.id} className="aside-item" onClick={()=>onReadMore(a)}>
              <span className={`aside-kicker k-${a.sc.cls}`}>{a.sc.name}</span>
              <div className="aside-t">{a.title}</div>
              <div className="aside-date">{fCompact(a.published_at)}</div>
            </div>
          ))}
        </div>
      )}
      <div className="aside-block">
        <div className="aside-h">Le nostre fonti</div>
        {FONTI.map((f,i)=><a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="fonte">{f.name}</a>)}
      </div>
      <div className="aside-block">
        <div className="aside-h">Seguici</div>
        <div className="social-row">
          {["IG","FB","X","Li","YT"].map((s,i)=><a key={i} href="#" className="social-btn">{s}</a>)}
        </div>
      </div>
    </aside>
  );
}

/* ═══ MEDIA TAGS (card) ═══ */
function MediaTags({article}){
  const tags=[];
  if(article.audio_url)tags.push("Audio");
  if(article.video_url)tags.push("Video");
  if(tags.length===0)return null;
  return <div className="media-tags">{tags.map((t,i)=><span key={i} className="media-tag">{t}</span>)}</div>;
}

/* ═══ LEAD ARTICLE ═══ */
function Lead({article,onReadMore}){
  const sc=secOf(article.section);
  return(
    <article className="lead fade" onClick={()=>onReadMore(article)}>
      {article.image_url&&<img className="lead-img" src={article.image_url} alt=""/>}
      <span className={`kicker k-${sc?.cls}`}>{sc?.name}</span>
      <h1 className="lead-title">{article.title}</h1>
      {article.subtitle&&<p className="lead-deck">{article.subtitle}</p>}
      <p className="lead-body">{article.body}</p>
      <MediaTags article={article}/>
      <div className="byline"><b>{article.author}</b> · {fCompact(article.published_at)}</div>
    </article>
  );
}

/* ═══ CARD ═══ */
function Card({article,onReadMore}){
  const sc=secOf(article.section);
  return(
    <article className="card fade" onClick={()=>onReadMore(article)}>
      {article.image_url&&<img className="card-img" src={article.image_url} alt=""/>}
      <span className={`kicker k-${sc?.cls}`}>{sc?.name}</span>
      <h3 className="card-title">{article.title}</h3>
      {article.subtitle&&<p className="card-deck">{article.subtitle}</p>}
      <p className="card-excerpt">{article.body}</p>
      <MediaTags article={article}/>
      <div className="byline"><b>{article.author}</b> · {fCompact(article.published_at)}</div>
    </article>
  );
}

/* ═══ FULL ARTICLE ═══ */
function ArticleFull({article,allArticles,onBack,onReadMore}){
  const sc=secOf(article.section);
  const prev=(allArticles||[])
    .filter(a=>a.section===article.section&&a.id!==article.id&&a.section!=="chisiamo")
    .sort((a,b)=>new Date(b.published_at)-new Date(a.published_at)).slice(0,3);
  return(
    <div className="wrap">
      <div className="main">
        <div className="article fade">
          <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
          {article.image_url&&<img className="article-img" src={article.image_url} alt=""/>}
          <span className={`kicker k-${sc?.cls}`}>{sc?.name}</span>
          <h1 className="article-title">{article.title}</h1>
          {article.subtitle&&<p className="article-deck">{article.subtitle}</p>}
          <div className="article-meta"><b>{article.author}</b><span>{fDate(article.published_at)}</span></div>
          <div className="article-body">{article.body}</div>
          {article.audio_url&&(
            <div className="media-block">
              <div className="media-label">Ascolta la traccia</div>
              <audio controls src={article.audio_url} preload="none"/>
            </div>
          )}
          {article.video_url&&(
            <div className="media-block">
              <div className="media-label">Guarda il video</div>
              <video controls src={article.video_url} preload="none"/>
            </div>
          )}
          {prev.length>0&&(
            <div className="leggi">
              <div className="leggi-h">Leggi anche in {sc?.name}</div>
              {prev.map(a=>(
                <div key={a.id} className="leggi-item" onClick={()=>onReadMore(a)}>
                  <div className="leggi-name">{a.title}</div>
                  <div className="leggi-date">{fShort(a.published_at)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Sidebar articles={allArticles} currentSection={article.section} onReadMore={onReadMore}/>
    </div>
  );
}

/* ═══ CHI SIAMO ═══ */
function ChiSiamo({onBack,articles}){
  const chiArt=(articles||[]).find(a=>a.section==="chisiamo");
  const projDesc=chiArt?.body||"La Specola nasce dall'idea di osservare il presente con gli strumenti dell'analisi e del rigore.";
  const edName=chiArt?.title||"Francesco Pasquale";
  const edBio=chiArt?.subtitle||"Analista e osservatore del presente.";
  return(
    <div className="single fade">
      <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
      <h1 className="page-title">Chi siamo</h1>
      <div className="chi-block">
        <div className="chi-label">Il progetto</div>
        <p className="chi-text">{projDesc}</p>
      </div>
      <div className="chi-editor">
        <div className="chi-avatar">FP</div>
        <div className="chi-editor-info">
          <div className="chi-label">L'editore</div>
          <h3 className="chi-name">{edName}</h3>
          <p className="chi-text">{edBio}</p>
        </div>
      </div>
      <div className="chi-legal">Blog di analisi e commento — non costituisce testata giornalistica registrata ai sensi della L. 62/2001.</div>
    </div>
  );
}

/* ═══ ARCHIVIO ═══ */
function Archivio({articles,onBack,onReadMore}){
  const grouped={};
  articles.filter(a=>a.section!=="chisiamo").forEach(a=>{
    const d=a.edition_date||a.published_at?.split("T")[0]||"";
    if(d){if(!grouped[d])grouped[d]=[];grouped[d].push(a);}
  });
  const dates=Object.keys(grouped).sort((a,b)=>b.localeCompare(a));
  return(
    <div className="single fade">
      <button className="back-btn" onClick={onBack}>← Torna alla homepage</button>
      <h1 className="page-title">Archivio</h1>
      {dates.length===0?<p className="empty-text">Nessun articolo in archivio.</p>
      :dates.map(d=>(
        <div key={d} className="archive-group">
          <div className="archive-date">{fDate(d)}</div>
          {grouped[d].map(a=>{
            const sc=secOf(a.section);
            return(
              <div key={a.id} className="archive-item" onClick={()=>onReadMore(a)}>
                <span className={`aside-kicker k-${sc?.cls}`}>{sc?.name}</span>
                <div className="archive-title">{a.title}</div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ═══ FOOTER ═══ */
function Footer({onChiSiamo}){
  return(
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo className="footer-logo"/>
            <div>
              <div className="footer-name">La Specola</div>
              <div className="footer-motto">Osservare l'oggi per comprendere il domani</div>
            </div>
          </div>
          <div className="footer-social">
            {["IG","FB","X","Li","YT"].map((s,i)=><a key={i} href="#" className="footer-social-btn">{s}</a>)}
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

/* ═══ MAIN ═══ */
export default function HomePage(){
  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sec,setSec]=useState("all");
  const [page,setPage]=useState("home");
  const [current,setCurrent]=useState(null);

  useEffect(()=>{
    (async()=>{
      const{getSupabase}=await import("@/lib/supabase");
      const sb=getSupabase();
      const{data}=await sb.from("articles").select("*").eq("status","published").order("published_at",{ascending:false});
      setArticles(data||[]);
      setLoading(false);
    })();
  },[]);

  const todayISO=new Date().toISOString().split("T")[0];
  const real=articles.filter(a=>a.section!=="chisiamo");
  const todayArts=real.filter(a=>a.edition_date===todayISO);
  const display=todayArts.length>0?todayArts:real.slice(0,9);
  const shown=sec==="all"?display:display.filter(a=>a.section===sec);

  const goArticle=a=>{setCurrent(a);setPage("article");window.scrollTo(0,0);};
  const goHome=()=>{setPage("home");setCurrent(null);window.scrollTo(0,0);};
  const goChiSiamo=()=>{setPage("chi-siamo");window.scrollTo(0,0);};
  const goArchivio=()=>{setPage("archivio");window.scrollTo(0,0);};

  if(page==="chi-siamo")return(<><Masthead/><Nav sec={sec} setSec={setSec} page={page} goHome={goHome} goArchivio={goArchivio} goChiSiamo={goChiSiamo}/><ChiSiamo onBack={goHome} articles={articles}/><Footer onChiSiamo={goChiSiamo}/></>);
  if(page==="archivio")return(<><Masthead/><Nav sec={sec} setSec={setSec} page={page} goHome={goHome} goArchivio={goArchivio} goChiSiamo={goChiSiamo}/><Archivio articles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></>);
  if(page==="article"&&current)return(<><Masthead/><Nav sec={sec} setSec={setSec} page={page} goHome={goHome} goArchivio={goArchivio} goChiSiamo={goChiSiamo}/><ArticleFull article={current} allArticles={articles} onBack={goHome} onReadMore={goArticle}/><Footer onChiSiamo={goChiSiamo}/></>);

  return(
    <>
      <Masthead/>
      <Nav sec={sec} setSec={setSec} page={page} goHome={goHome} goArchivio={goArchivio} goChiSiamo={goChiSiamo}/>
      <div className="wrap">
        <main className="main">
          {loading?<div className="loading">Caricamento edizione…</div>
          :shown.length===0?<div className="empty"><div className="empty-title">Nessun articolo disponibile</div><div className="empty-text">L'edizione odierna sarà pubblicata in giornata</div></div>
          :<>
            {todayArts.length===0&&real.length>0&&<div className="note">Ultimi articoli pubblicati — l'edizione di oggi sarà disponibile in giornata</div>}
            {shown.length>0&&<Lead article={shown[0]} onReadMore={goArticle}/>}
            {shown.length>1&&<div className="grid">{shown.slice(1).map(a=><Card key={a.id} article={a} onReadMore={goArticle}/>)}</div>}
          </>}
        </main>
        <Sidebar articles={articles} currentSection={sec==="all"?"":sec} onReadMore={goArticle}/>
      </div>
      <Footer onChiSiamo={goChiSiamo}/>
    </>
  );
}
