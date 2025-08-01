import { NextRequest, NextResponse } from "next/server";
import { NoteRepo } from "@/db/repos/note.repo";
import { createResponse } from "@/lib/http/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const repo = new NoteRepo();
    const notes = await repo.list(page, pageSize);

    return NextResponse.json(createResponse(notes, null), { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(createResponse(null, error), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.heading || !data.text) {
      return NextResponse.json(
        { error: "Missing heading or text" },
        { status: 400 },
      );
    }

    const repo = new NoteRepo();
    const note = await repo.create({ heading: data.heading, text: data.text });

    return NextResponse.json(createResponse(note, null), { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(createResponse(null, error), { status: 500 });
  }
}
