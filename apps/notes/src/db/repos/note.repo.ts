import { prisma } from "@/lib/prisma-client";
import { Note, Prisma } from "@prisma/client";
import { NotesListResponse } from "@/lib/http/notes";

// In a prod scenario I'd also separate repo interface and implementation
export class NoteRepo {
  async getByID(id: string): Promise<Note | null> {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  async list(page = 1, pageSize = 10): Promise<NotesListResponse> {
    const [notes, total] = await Promise.all([
      prisma.note.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { lastUpdated: "desc" },
      }),
      prisma.note.count(),
    ]);

    return {
      notes,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async remove(id: string) {
    return prisma.note.delete({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.NoteUpdateInput) {
    return prisma.note.update({
      where: { id },
      data: {
        text: data.text,
        heading: data.heading,
      },
    });
  }

  async create(data: { heading: string; text: string }) {
    return prisma.note.create({
      data,
    });
  }
}
