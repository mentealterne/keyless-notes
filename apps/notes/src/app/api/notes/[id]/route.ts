import { NextRequest, NextResponse } from "next/server";
import { NoteRepo } from "@/db/repos/note.repo";
import { createResponse } from "@/lib/http/response";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const repo = new NoteRepo();
    const note = await repo.getByID(params.id);

    if (!note) {
      return NextResponse.json(createResponse(null, "Note not found"), {
        status: 404,
      });
    }

    return NextResponse.json(createResponse(note, null), { status: 200 });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(createResponse(null, error), { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;

    const data = await req.json();
    const repo = new NoteRepo();

    const updated = await repo.update(params.id, data);
    return NextResponse.json(createResponse(updated, null), { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(createResponse(null, error), { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const repo = new NoteRepo();
    await repo.remove(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(createResponse(null, error), { status: 500 });
  }
}
