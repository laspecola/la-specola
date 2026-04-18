import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function checkAuth(req) {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req) {
  const sb = getServiceClient();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const date = url.searchParams.get("date");
  const isAdmin = checkAuth(req);
  let query = sb.from("articles").select("*").order("created_at", { ascending: false });
  if (!isAdmin) query = query.eq("status", "published");
  else if (status) query = query.eq("status", status);
  if (date) query = query.eq("edition_date", date);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const sb = getServiceClient();
  const body = await req.json();
  const article = {
    edition_date: body.date || new Date().toISOString().split("T")[0],
    section: body.section,
    title: body.title,
    body: body.body,
    subtitle: body.subtitle || "",
    da_seguire: body.links?.map(l => `${l.title}|||${l.description}`) || [],
    author: body.author || "Francesco Pasquale",
    status: body.status || "draft",
    audio_url: body.audio_url || null,
    published_at: body.status === "published" ? new Date().toISOString() : null,
  };
  const { data, error } = await sb.from("articles").insert(article).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const sb = getServiceClient();
  const body = await req.json();
  const { id, ...updates } = body;
  if (updates.links) {
    updates.da_seguire = updates.links.map(l => `${l.title}|||${l.description}`);
    delete updates.links;
  }
  if (updates.status === "published" && !updates.published_at) {
    updates.published_at = new Date().toISOString();
  }
  if (updates.date) { updates.edition_date = updates.date; delete updates.date; }
  if (updates.audio_url === "") updates.audio_url = null;
  delete updates._isNew;
  const { data, error } = await sb.from("articles").update(updates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const sb = getServiceClient();
  const { id } = await req.json();
  const { error } = await sb.from("articles").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
