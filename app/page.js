import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// GET: fetch all settings
export async function GET(req) {
  var sb = getServiceClient();
  var result = await sb.from("site_settings").select("*");
  if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
  var settings = {};
  (result.data || []).forEach(function(r) { settings[r.key] = r.value; });
  return NextResponse.json(settings);
}

// PUT: update settings (admin only)
export async function PUT(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  var sb = getServiceClient();
  var body = await req.json();
  var keys = Object.keys(body);
  
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = body[key];
    // Upsert: update if exists, insert if not
    var existing = await sb.from("site_settings").select("key").eq("key", key).single();
    if (existing.data) {
      await sb.from("site_settings").update({ value: value }).eq("key", key);
    } else {
      await sb.from("site_settings").insert({ key: key, value: value });
    }
  }
  
  return NextResponse.json({ ok: true });
}
