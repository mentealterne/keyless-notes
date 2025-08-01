import { NextRequest, NextResponse } from "next/server";
import { NoteRepo } from "@/db/repos/note.repo";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const repo = new NoteRepo();
  const notes = await repo.list(page, pageSize);

  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.heading || !data.text) {
    return NextResponse.json(
      { error: "Missing heading or text" },
      { status: 400 },
    );
  }

  const repo = new NoteRepo();
  const note = await repo.create({ heading: data.heading, text: data.text });

  return NextResponse.json(note, { status: 201 });
}
