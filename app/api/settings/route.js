import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function checkAuth(req) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function GET(req) {
  try {
    var sb = getServiceClient();
    var result = await sb.from("site_settings").select("*");
    if (result.error) {
      return NextResponse.json({ error: "DB error: " + result.error.message }, { status: 500 });
    }
    var settings = {};
    (result.data || []).forEach(function(r) { settings[r.key] = r.value; });
    return NextResponse.json(settings);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  try {
    var sb = getServiceClient();
    var body = await req.json();
    var keys = Object.keys(body);
    var errors = [];

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = body[key] || "";

      var result = await sb.from("site_settings")
        .upsert({ key: key, value: value }, { onConflict: "key" });

      if (result.error) {
        errors.push(key + ": " + result.error.message);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
