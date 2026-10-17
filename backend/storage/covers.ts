import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const COVER_DIRECTORY = path.resolve(process.cwd(), "storage", "covers");
const MAX_COVER_BYTES = 5 * 1024 * 1024;
const COVER_PREFIX = "/api/covers/";
const FILENAME_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|gif|webp)$/;

export class CoverError extends Error {}

type ImageFormat = { extension: "jpg" | "png" | "gif" | "webp"; contentType: string };

function detectImageFormat(bytes: Buffer): ImageFormat | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { extension: "jpg", contentType: "image/jpeg" };
  }

  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { extension: "png", contentType: "image/png" };
  }

  const gifHeader = bytes.subarray(0, 6).toString("ascii");
  if (gifHeader === "GIF87a" || gifHeader === "GIF89a") {
    return { extension: "gif", contentType: "image/gif" };
  }

  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") {
    return { extension: "webp", contentType: "image/webp" };
  }

  return null;
}

function safeFilename(filename: string): string {
  if (!FILENAME_PATTERN.test(filename)) {
    throw new CoverError("La referencia de portada no es válida.");
  }

  return filename;
}

export function coverUrl(filename: string): string {
  return `${COVER_PREFIX}${safeFilename(filename)}`;
}

export function filenameFromCoverUrl(coverUrlValue: string): string {
  if (!coverUrlValue.startsWith(COVER_PREFIX)) {
    throw new CoverError("La referencia de portada no es válida.");
  }

  return safeFilename(coverUrlValue.slice(COVER_PREFIX.length));
}

export async function storeCover(file: File): Promise<string> {
  if (file.size <= 0 || file.size > MAX_COVER_BYTES) {
    throw new CoverError("La portada debe pesar entre 1 byte y 5 MB.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const format = detectImageFormat(bytes);
  if (!format) {
    throw new CoverError("La portada debe ser una imagen JPG, PNG, GIF o WebP válida.");
  }

  await mkdir(COVER_DIRECTORY, { recursive: true });
  const filename = `${randomUUID()}.${format.extension}`;
  await writeFile(path.join(COVER_DIRECTORY, filename), bytes, { flag: "wx", mode: 0o600 });
  return filename;
}

export async function removeCover(filename: string): Promise<void> {
  await unlink(path.join(COVER_DIRECTORY, safeFilename(filename)));
}

export async function readCover(filename: string): Promise<{ bytes: Buffer; contentType: string }> {
  const safeName = safeFilename(filename);
  const bytes = await readFile(path.join(COVER_DIRECTORY, safeName));
  const format = detectImageFormat(bytes);

  if (!format) {
    throw new CoverError("El archivo de portada no es una imagen válida.");
  }

  return { bytes, contentType: format.contentType };
}
