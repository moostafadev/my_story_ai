import { prisma } from "@/lib/prisma";
import { CreatePdfInput, UpdatePdfInput } from "./types";

export class PdfService {
  static async createPdf(data: CreatePdfInput) {
    return prisma.pdf.create({ data });
  }

  static async getPdfById(id: string) {
    return prisma.pdf.findUnique({
      where: { id },
      include: { story: true },
    });
  }

  static async updatePdf(id: string, data: UpdatePdfInput) {
    return prisma.pdf.update({ where: { id }, data });
  }

  static async deletePdf(id: string) {
    return prisma.pdf.delete({ where: { id } });
  }
}
