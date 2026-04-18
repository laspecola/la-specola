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

      var systemPrompt = "Sei un editorialista italiano rigoroso. Usa SEMPRE web_search per cercare fatti reali e aggiornati prima di rispondere. Fai almeno 3 ricerche web. Scrivi SEMPRE in italiano. Quando ti viene chiesto di rispondere con JSON, rispondi SOLO con JSON valido senza altro testo. Quando ti viene chiesto di scrivere un articolo, segui scrupolosamente le istruzioni del prompt.";

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
      if (!r.ok)
