import { NextResponse } from "next/server";
import { apiError } from "@/lib/api-response";
import {
  deleteBook,
  getBook,
  updateBook,
} from "../../../../../backend/services/books.service";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { id } = await params;
    return NextResponse.json(await getBook(id));
  } catch (error) {
    return apiError(error, "No se pudo consultar el libro.");
  }
}

export async function PUT(request: Request, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { id } = await params;
    return NextResponse.json(await updateBook(id, request));
  } catch (error) {
    return apiError(error, "No se pudo actualizar el libro.");
  }
}

export async function DELETE(_request: Request, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { id } = await params;
    await deleteBook(id);
    return NextResponse.json({ message: "Libro eliminado correctamente." });
  } catch (error) {
    return apiError(error, "No se pudo eliminar el libro.");
  }
}
