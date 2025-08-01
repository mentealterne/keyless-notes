import { prisma } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

// In a prod scenario I'd also separate repo interface and implementation
export class NoteRepo {
  async getByID(id: string) {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  async list(page = 1, pageSize = 10) {
    const [data, total] = await Promise.all([
      prisma.note.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { lastUpdated: "desc" },
      }),
      prisma.note.count(),
    ]);

    return {
      data,
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
      data,
    });
  }

  async create(data: { heading: string; text: string }) {
    return prisma.note.create({
      data,
    });
  }
}
