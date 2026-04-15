import { NextResponse } from "next/server";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { prompt, model } = await req.json();

  try {
    if (model === "claude" || !model) {
      const key = process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("ANTHROPIC_API_KEY non configurata");
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1500,
          messages: [{ role: "user", content: prompt }],
          tools: [{ type: "web_search_20250305", name: "web_search" }],
        }),
      });
      if (!r.ok) throw new Error("Claude API " + r.status + ": " + (await r.text()).substring(0, 200));
      const d = await r.json();
      const text = (d.content || []).filter(function(b) { return b.type === "text"; }).map(function(b) { return b.text; }).join("\n");
      return NextResponse.json({ text: text });
    }

    if (model === "gemini") {
      const key = process.env.GEMINI_API_KEY;
      if (!key) throw new Error("GEMINI_API_KEY non configurata");
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + key, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
        }),
      });
      if (!r.ok) throw new Error("Gemini API " + r.status + ": " + (await r.text()).substring(0, 200));
      const d = await r.json();
      const text = ((d.candidates || [])[0] || {}).content;
      const parts = text ? text.parts || [] : [];
      const out = parts.map(function(p) { return p.text || ""; }).join("\n");
      return NextResponse.json({ text: out });
    }

    if (model === "chatgpt") {
      const key = process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OPENAI_API_KEY non configurata");
      const today = new Date().toISOString().split("T")[0];
      const searchPrompt = "Oggi e' il " + today + ". Cerca le notizie principali di oggi sui maggiori quotidiani e siti di news italiani e internazionali.\n\n" + prompt;
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
        body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: searchPrompt }], max_tokens: 1500 }),
      });
      if (!r.ok) throw new Error("OpenAI API " + r.status + ": " + (await r.text()).substring(0, 200));
      const d = await r.json();
      const text = ((d.choices || [])[0] || {}).message;
      return NextResponse.json({ text: text ? text.content || "" : "" });
    }

    throw new Error("Modello non supportato");
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
