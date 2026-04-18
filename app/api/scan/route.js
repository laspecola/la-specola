import { NextResponse } from "next/server";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  var body = await req.json();
  var prompt = body.prompt;
  var model = body.model;

  try {
    if (model === "claude" || !model) {
      var key = process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("ANTHROPIC_API_KEY non configurata");

      var systemPrompt = "Sei un editorialista italiano di alto livello, rigoroso e analitico. REGOLE FONDAMENTALI: (1) Usa SEMPRE web_search per cercare fatti reali e aggiornati — fai almeno 3-4 ricerche. (2) Scrivi SEMPRE in italiano. (3) Gli articoli devono essere MINIMO 800 parole. (4) Separa SEMPRE fatti da inferenze da giudizi. (5) Non attribuire MAI intenzioni o strategie ai protagonisti come fatti acquisiti. (6) Non usare MAI linguaggio rivelatorio, retorica da editoriale, chiuse ad effetto o cliché giornalistici. (7) Metti alla prova la tua tesi: esponi contraddizioni e limiti. Scrivi per spiegare, non per impressionare.";

      var r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: prompt }],
          tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }]
        })
      });
      if (!r.ok) {
        var errText = await r.text();
        throw new Error("Claude API " + r.status + ": " + errText.substring(0, 300));
      }
      var d = await r.json();
      var text = "";
      if (d.content) {
        for (var i = 0; i < d.content.length; i++) {
          if (d.content[i].type === "text") {
            text += d.content[i].text + "\n";
          }
        }
      }
      return NextResponse.json({ text: text.trim() });
    }

    if (model === "gemini") {
      var key = process.env.GEMINI_API_KEY;
      if (!key) throw new Error("GEMINI_API_KEY non configurata");
      var r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }]
        })
      });
      if (!r.ok) throw new Error("Gemini API " + r.status);
      var d = await r.json();
      var parts = d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts ? d.candidates[0].content.parts : [];
      var text = parts.map(function(p) { return p.text || ""; }).join("\n");
      return NextResponse.json({ text: text });
    }

    if (model === "chatgpt") {
      var key = process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OPENAI_API_KEY non configurata");
      var r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: "Oggi e il " + new Date().toISOString().split("T")[0] + ". Cerca notizie di oggi.\n\n" + prompt }],
          max_tokens: 1500
        })
      });
      if (!r.ok) throw new Error("OpenAI API " + r.status);
      var d = await r.json();
      var text = d.choices && d.choices[0] && d.choices[0].message ? d.choices[0].message.content : "";
      return NextResponse.json({ text: text });
    }

    throw new Error("Modello non supportato");
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
