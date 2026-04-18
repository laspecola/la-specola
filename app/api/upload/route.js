import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  try {
    var formData = await req.formData();
    var file = formData.get("file");
    if (!file) return NextResponse.json({ error: "Nessun file" }, { status: 400 });

    var name = file.name || "audio.mp3";
    var ext = name.split(".").pop().toLowerCase();
    if (ext !== "mp3" && ext !== "wav" && ext !== "ogg" && ext !== "m4a") {
      return NextResponse.json({ error: "Formato non supportato. Usa MP3, WAV, OGG o M4A." }, { status: 400 });
    }

    var bytes = await file.arrayBuffer();
    var buffer = Buffer.from(bytes);

    var fileName = Date.now() + "-" + name.replace(/[^a-zA-Z0-9._-]/g, "_");

    var sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    var result = await sb.storage.from("audio").upload(fileName, buffer, {
      contentType: file.type || "audio/mpeg",
      upsert: false
    });

    if (result.error) {
      return NextResponse.json({ error: "Upload fallito: " + result.error.message }, { status: 500 });
    }

    var publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/audio/" + fileName;

    return NextResponse.json({ url: publicUrl, fileName: fileName });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
