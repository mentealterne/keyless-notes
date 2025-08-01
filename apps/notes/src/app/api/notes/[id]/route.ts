import { NextRequest, NextResponse } from "next/server";
import { NoteRepo } from "@/db/repos/note.repo";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const repo = new NoteRepo();
  const note = await repo.getByID(params.id);

  if (!note) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = await req.json();
  const repo = new NoteRepo();

  const updated = await repo.update(params.id, data);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const repo = new NoteRepo();
  await repo.remove(params.id);
  return new Response(null, { status: 204 });
}
