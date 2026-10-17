"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
};

type DialogState =
  | { kind: "create" }
  | { kind: "edit"; book: Book }
  | { kind: "delete"; book: Book }
  | null;

async function responseError(response: Response): Promise<string> {
  const body = (await response.json().catch(() => null)) as { error?: string } | null;
  return body?.error ?? "No se pudo completar la operación.";
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (): Promise<Book[]> => {
    const response = await fetch("/api/books", { cache: "no-store" });
    if (!response.ok) throw new Error(await responseError(response));
    return (await response.json()) as Book[];
  }, []);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    setPageError(null);
    try {
      setBooks(await fetchBooks());
    } catch (error) {
      setPageError(error instanceof Error ? error.message : "No se pudo cargar el catálogo.");
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

  async function saveBook(form: FormData, book?: Book) {
    const response = await fetch(book ? `/api/books/${book.id}` : "/api/books", {
      method: book ? "PUT" : "POST",
      body: form,
    });
    if (!response.ok) throw new Error(await responseError(response));

    const saved = (await response.json()) as Book;
    setBooks((current) => {
      const next = book
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...current];
      return next.sort((first, second) => second.id - first.id);
    });
    setSelectedId(saved.id);
    setDialog(null);
    setPageError(null);
    void fetchBooks().then(setBooks).catch(() => {
      setPageError("El cambio se guardó, pero no se pudo actualizar el catálogo.");
    });
  }

  async function deleteBook(book: Book) {
    const response = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(await responseError(response));

    setBooks((current) => current.filter((item) => item.id !== book.id));
    setSelectedId(null);
    setDialog(null);
    setPageError(null);
    void fetchBooks().then(setBooks).catch(() => {
      setPageError("El libro se eliminó, pero no se pudo actualizar el catálogo.");
    });
  }

  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <h1>Biblioteca</h1>
        <button className="button button-primary" onClick={() => setDialog({ kind: "create" })}>
          Agregar libro
        </button>
      </header>

      {pageError && books.length > 0 && (
        <div className="page-error" role="alert">
          <span>{pageError}</span>
          <button className="text-button" onClick={() => void loadBooks()}>Reintentar</button>
        </div>
      )}

      {loading ? (
        <p className="catalog-status" role="status">Cargando catálogo…</p>
      ) : pageError && books.length === 0 ? (
        <section className="empty-state" aria-labelledby="load-error-heading">
          <h2 id="load-error-heading">No se pudo cargar el catálogo</h2>
          <button className="button button-secondary" onClick={() => void loadBooks()}>
            Reintentar
          </button>
        </section>
      ) : books.length === 0 ? (
        <section className="empty-state" aria-labelledby="empty-heading">
          <h2 id="empty-heading">Tu catálogo está vacío</h2>
          <p>Agrega un libro para comenzar tu biblioteca.</p>
          <button className="button button-primary" onClick={() => setDialog({ kind: "create" })}>
            Agregar libro
          </button>
        </section>
      ) : (
        <section className="book-list" aria-label="Catálogo de libros">
          {books.map((book) => {
            const selected = selectedId === book.id;
            return (
              <article className={`book-entry${selected ? " is-selected" : ""}`} key={book.id}>
                <button
                  className="book-card"
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedId(selected ? null : book.id)}
                >
                  {/* Local cover API URLs are dynamic, so a regular img is appropriate. */}
                  <img className="book-cover" src={book.cover} alt={`Portada de ${book.title}`} />
                  <span className="book-copy">
                    <span className="book-title">{book.title}</span>
                    <span className="book-author">{book.author}</span>
                  </span>
                  <span className="selection-indicator" aria-hidden="true">{selected ? "−" : "+"}</span>
                </button>
                {selected && (
                  <div className="book-actions" aria-label={`Acciones para ${book.title}`}>
                    <span className="selected-label">Libro seleccionado</span>
                    <div className="action-buttons">
                      <button className="button button-secondary" onClick={() => setDialog({ kind: "edit", book })}>
                        Editar libro
                      </button>
                      <button className="button button-danger" onClick={() => setDialog({ kind: "delete", book })}>
                        Eliminar libro
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </section>
      )}

      {(dialog?.kind === "create" || dialog?.kind === "edit") && (
        <BookDialog
          key={dialog.kind === "create" ? "create" : `edit-${dialog.book.id}`}
          mode={dialog.kind}
          book={dialog.kind === "edit" ? dialog.book : undefined}
          onClose={() => setDialog(null)}
          onSave={saveBook}
        />
      )}

      {dialog?.kind === "delete" && (
        <DeleteDialog
          book={dialog.book}
          onClose={() => setDialog(null)}
          onConfirm={() => deleteBook(dialog.book)}
        />
      )}
    </main>
  );
}

function BookDialog({
  mode,
  book,
  onClose,
  onSave,
}: {
  mode: "create" | "edit";
  book?: Book;
  onClose: () => void;
  onSave: (form: FormData, book?: Book) => Promise<void>;
}) {
  const [title, setTitle] = useState(book?.title ?? "");
  const [author, setAuthor] = useState(book?.author ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("title", title);
      form.set("author", author);
      if (file) form.set("cover", file);
      await onSave(form, book);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo guardar el libro.");
      setConfirmEdit(false);
    } finally {
      setSaving(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "edit") {
      setError(null);
      setConfirmEdit(true);
    } else {
      void submit();
    }
  }

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      tabIndex={-1}
      onKeyDown={(event) => event.key === "Escape" && !saving && onClose()}
      onMouseDown={(event) => event.target === event.currentTarget && !saving && onClose()}
    >
      <section className="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="book-dialog-title">
        {confirmEdit ? (
          <>
            <h2 id="book-dialog-title">¿Estás seguro de editar este libro?</h2>
            <p className="dialog-copy">Se guardarán los cambios de título, autor y portada seleccionada.</p>
            {error && <p className="dialog-error" role="alert">{error}</p>}
            <div className="dialog-actions">
              <button className="button button-secondary" onClick={onClose} disabled={saving}>Cancelar</button>
              <button className="button button-primary" onClick={() => void submit()} disabled={saving}>
                {saving ? "Guardando…" : "Confirmar"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="dialog-heading">
              <h2 id="book-dialog-title">{mode === "create" ? "Agregar libro" : "Editar libro"}</h2>
              <button className="close-button" type="button" onClick={onClose} aria-label="Cerrar" disabled={saving}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="form-field">
                <span>Título</span>
                <input autoFocus required maxLength={255} value={title} onChange={(event) => setTitle(event.target.value)} autoComplete="off" />
              </label>
              <label className="form-field">
                <span>Autor</span>
                <input required maxLength={255} value={author} onChange={(event) => setAuthor(event.target.value)} autoComplete="off" />
              </label>
              <label className="form-field">
                <span>Portada{mode === "edit" ? " (opcional)" : ""}</span>
                <input
                  required={mode === "create"}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </label>
              {(preview || book?.cover) && (
                <div className="cover-preview">
                  <img src={preview ?? book?.cover} alt="Vista previa de la portada" />
                  <span>{file ? "Nueva portada seleccionada" : "Portada actual"}</span>
                </div>
              )}
              {error && <p className="dialog-error" role="alert">{error}</p>}
              <div className="dialog-actions">
                <button className="button button-secondary" type="button" onClick={onClose} disabled={saving}>Cancelar</button>
                <button className="button button-primary" type="submit" disabled={saving}>
                  {saving ? "Guardando…" : mode === "create" ? "Guardar libro" : "Continuar"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function DeleteDialog({
  book,
  onClose,
  onConfirm,
}: {
  book: Book;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    setPending(true);
    setError(null);
    try {
      await onConfirm();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "No se pudo eliminar el libro.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      tabIndex={-1}
      onKeyDown={(event) => event.key === "Escape" && !pending && onClose()}
      onMouseDown={(event) => event.target === event.currentTarget && !pending && onClose()}
    >
      <section className="dialog-panel" role="alertdialog" aria-modal="true" aria-labelledby="delete-dialog-title">
        <h2 id="delete-dialog-title">¿Estás seguro de eliminar {book.title}?</h2>
        <p className="dialog-copy">Esta acción eliminará el libro del catálogo.</p>
        {error && <p className="dialog-error" role="alert">{error}</p>}
        <div className="dialog-actions">
          <button className="button button-secondary" onClick={onClose} disabled={pending}>Cancelar</button>
          <button className="button button-danger" onClick={() => void confirm()} disabled={pending}>
            {pending ? "Eliminando…" : "Confirmar"}
          </button>
        </div>
      </section>
    </div>
  );
}
