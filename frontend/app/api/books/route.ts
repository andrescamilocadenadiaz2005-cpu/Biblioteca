import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-response";
import { createBook, listBooks } from "../../../../backend/services/books.service";

export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json(await listBooks());
  } catch (error) {
    return apiError(error, "No se pudo cargar el catálogo de libros.");
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    return NextResponse.json(await createBook(request), { status: 201 });
  } catch (error) {
    return apiError(error, "No se pudo registrar el libro.");
  }
}
