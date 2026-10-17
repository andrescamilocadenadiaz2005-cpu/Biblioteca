import type { Book } from "../../prisma/generated/prisma/client";
import { prisma } from "../lib/prisma";

export function listBooks(): Promise<Book[]> {
  return prisma.book.findMany({ orderBy: { id: "desc" } });
}

export function findBook(id: number): Promise<Book | null> {
  return prisma.book.findUnique({ where: { id } });
}

export function createBook(data: {
  title: string;
  author: string;
  cover: string;
}): Promise<Book> {
  return prisma.book.create({ data });
}

export function updateBook(
  id: number,
  data: { title: string; author: string; cover?: string },
): Promise<Book> {
  return prisma.book.update({ where: { id }, data });
}

export function removeBook(id: number): Promise<Book> {
  return prisma.book.delete({ where: { id } });
}
