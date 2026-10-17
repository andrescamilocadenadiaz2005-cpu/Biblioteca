import type { Book } from "../../prisma/generated/prisma/client";
import { CoverError, coverUrl, filenameFromCoverUrl, removeCover, storeCover } from "../storage/covers";
import * as books from "../repositories/books.repository";

export class BooksServiceError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "BooksServiceError";
  }
}

export type BookResponse = Omit<Book, "cover"> & { cover: string };

function toBookResponse(book: Book): BookResponse {
  return { ...book, cover: coverUrl(book.cover) };
}

function requiredText(form: FormData, field: "title" | "author"): string {
  const value = form.get(field);
  if (typeof value !== "string") {
    throw new BooksServiceError(`El campo ${field} es obligatorio.`, 400);
  }

  const normalized = value.trim();
  if (!normalized) {
    throw new BooksServiceError(`El campo ${field} es obligatorio.`, 400);
  }
  if (normalized.length > 255) {
    throw new BooksServiceError(`El campo ${field} no puede superar 255 caracteres.`, 400);
  }

  return normalized;
}

function optionalImage(form: FormData): File | null {
  const value = form.get("cover");
  if (value === null) return null;
  if (typeof value === "string" || typeof File === "undefined" || !(value instanceof File)) {
    throw new BooksServiceError("Selecciona un archivo de imagen válido para la portada.", 400);
  }

  return value;
}

async function parseForm(request: Request): Promise<FormData> {
  try {
    return await request.formData();
  } catch {
    throw new BooksServiceError("El formulario enviado no es válido.", 400);
  }
}

function bookIdFrom(value: string): number {
  if (!/^\d+$/.test(value)) {
    throw new BooksServiceError("El identificador del libro no es válido.", 400);
  }

  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new BooksServiceError("El identificador del libro no es válido.", 400);
  }

  return id;
}

function isMissingRecord(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2025";
}

async function cleanupCover(filename: string): Promise<void> {
  try {
    await removeCover(filename);
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error("No se pudo eliminar un archivo de portada obsoleto.", error);
    }
  }
}

async function saveCover(file: File): Promise<string> {
  try {
    return await storeCover(file);
  } catch (error) {
    if (error instanceof CoverError) {
      throw new BooksServiceError(error.message, 400);
    }
    throw error;
  }
}

export async function listBooks(): Promise<BookResponse[]> {
  return (await books.listBooks()).map(toBookResponse);
}

export async function getBook(idValue: string): Promise<BookResponse> {
  const book = await books.findBook(bookIdFrom(idValue));
  if (!book) throw new BooksServiceError("No se encontró el libro solicitado.", 404);
  return toBookResponse(book);
}

export async function createBook(request: Request): Promise<BookResponse> {
  const form = await parseForm(request);
  const title = requiredText(form, "title");
  const author = requiredText(form, "author");
  const coverFile = optionalImage(form);
  if (!coverFile) {
    throw new BooksServiceError("La portada es obligatoria.", 400);
  }

  const filename = await saveCover(coverFile);
  try {
    return toBookResponse(await books.createBook({ title, author, cover: filename }));
  } catch (error) {
    await cleanupCover(filename);
    throw error;
  }
}

export async function updateBook(idValue: string, request: Request): Promise<BookResponse> {
  const id = bookIdFrom(idValue);
  const current = await books.findBook(id);
  if (!current) throw new BooksServiceError("No se encontró el libro solicitado.", 404);

  const form = await parseForm(request);
  const title = requiredText(form, "title");
  const author = requiredText(form, "author");
  const coverFile = optionalImage(form);
  const newFilename = coverFile ? await saveCover(coverFile) : undefined;

  try {
    const updated = await books.updateBook(id, {
      title,
      author,
      ...(newFilename ? { cover: newFilename } : {}),
    });

    if (newFilename) await cleanupCover(current.cover);
    return toBookResponse(updated);
  } catch (error) {
    if (newFilename) await cleanupCover(newFilename);
    if (isMissingRecord(error)) throw new BooksServiceError("No se encontró el libro solicitado.", 404);
    throw error;
  }
}

export async function deleteBook(idValue: string): Promise<void> {
  const id = bookIdFrom(idValue);
  const current = await books.findBook(id);
  if (!current) throw new BooksServiceError("No se encontró el libro solicitado.", 404);

  try {
    await books.removeBook(id);
  } catch (error) {
    if (isMissingRecord(error)) throw new BooksServiceError("No se encontró el libro solicitado.", 404);
    throw error;
  }

  await cleanupCover(current.cover);
}

export function parseBookId(value: string): number {
  return bookIdFrom(value);
}

export { coverUrl, filenameFromCoverUrl };
