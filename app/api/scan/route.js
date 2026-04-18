import { NextResponse } from "next/server";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const body = await req.json();
  const prompt = body.prompt;
  const model = body.model;

  try {
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

    if (model === "claude" || !model) {
      var key = process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("ANTHROPIC_API_KEY non configurata");
      var r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
          tools: [{ type: "web_search_20250305", name: "web_search" }]
        })
      });
      if (!r.ok) throw new Error("Claude API " + r.status);
      var d = await r.json();
      var text = d.content ? d.content.filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("\n") : "";
      return NextResponse.json({ text: text });
    }

    throw new Error("Modello non supportato");
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
