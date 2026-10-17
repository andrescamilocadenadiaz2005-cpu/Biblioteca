import { NextResponse } from "next/server";
import { CoverError, readCover } from "../../../../../backend/storage/covers";
import { apiError } from "@/lib/api-response";
import { BooksServiceError, filenameFromCoverUrl } from "../../../../../backend/services/books.service";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ filename: string }> };

export async function GET(_request: Request, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { filename } = await params;
    const safeFilename = filenameFromCoverUrl(`/api/covers/${filename}`);
    const cover = await readCover(safeFilename);
    return new NextResponse(new Uint8Array(cover.bytes), {
      headers: {
        "Content-Type": cover.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return NextResponse.json({ error: "No se encontró la portada." }, { status: 404 });
    }
    if (error instanceof CoverError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof BooksServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return apiError(error, "No se pudo cargar la portada.");
  }
}
