import { NextResponse } from "next/server";
import { BooksServiceError } from "../../backend/services/books.service";

export function apiError(error: unknown, fallback: string): NextResponse {
  if (error instanceof BooksServiceError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  console.error(fallback, error);
  return NextResponse.json({ error: fallback }, { status: 500 });
}
