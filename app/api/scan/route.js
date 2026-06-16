import { NextResponse } from "next/server";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  var body = await req.json();
  var prompt = body.prompt;
  var model = body.model;
  var useSearch = body.search !== false;

  try {
    if (model === "claude" || !model) {
      var key = process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("ANTHROPIC_API_KEY non configurata");

      var systemPrompt = useSearch
        ? "Sei un editorialista italiano rigoroso e autorevole. Usa SEMPRE web_search per cercare fatti reali e aggiornati prima di rispondere: fai almeno 3-4 ricerche su testate giornalistiche affidabili (ANSA, Corriere della Sera, Repubblica, Il Sole 24 Ore, Sky TG24). Scrivi SEMPRE in italiano. Per ogni fatto, dichiarazione e dato indica la testata che lo ha pubblicato. Usa SOLO fonti reali trovate sul web: non inventare MAI testate, virgolettati o dati. Quando ti viene chiesto JSON, rispondi SOLO con JSON valido senza altro testo."
        : "Sei un editorialista italiano rigoroso e autorevole. Scrivi SEMPRE in italiano basandoti ESCLUSIVAMENTE sui fatti e sulle fonti forniti nel prompt. Attribuisci ogni fatto e ogni dichiarazione alla testata indicata, citandola per nome nel testo; non inventare MAI testate, virgolettati o dati non presenti. Oltre a riferire la notizia, fornisci una chiave di lettura argomentata, distinguendo i fatti dalle tue interpretazioni. Segui scrupolosamente le istruzioni del prompt.";

      var apiBody = {
        model: "claude-sonnet-4-6",
        max_tokens: useSearch ? 4096 : 8192,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt }]
      };

      if (useSearch) {
        apiBody.tools = [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }];
      }

      var r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(apiBody)
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
      var gBody = { contents: [{ parts: [{ text: prompt }] }] };
      if (useSearch) gBody.tools = [{ google_search: {} }];
      var r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gBody)
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
          messages: [{ role: "user", content: prompt }],
          max_tokens: 3000
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
