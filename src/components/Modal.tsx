"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/types";

export default function Modal({
  movie,
  onClose,
}: {
  movie: Movie;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const hasImg = Boolean(movie.backdropUrl);

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar modal"
      />

      <div className="relative mx-auto mt-16 w-[92vw] max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
        <div className="relative h-[46vh] min-h-[260px] w-full">
          {hasImg ? (
            <Image
              src={movie.backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 92vw, 768px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

          <button
            onClick={onClose}
            className="absolute right-3 top-3 rounded-md bg-black/50 px-3 py-2 text-sm text-white hover:bg-black/70 border border-white/10 transition"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-black md:text-3xl">{movie.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              {movie.year ? (
                <span className="rounded border border-white/10 bg-black/30 px-2 py-1">
                  {movie.year}
                </span>
              ) : null}
              {movie.maturity ? (
                <span className="rounded border border-white/10 bg-black/30 px-2 py-1">
                  {movie.maturity}+
                </span>
              ) : null}
              {movie.duration ? (
                <span className="rounded border border-white/10 bg-black/30 px-2 py-1">
                  {movie.duration}
                </span>
              ) : null}
              {movie.rating !== undefined ? (
                <span className="rounded border border-white/10 bg-black/30 px-2 py-1">
                  ★ {movie.rating}
                </span>
              ) : null}
              {movie.mediaType ? (
                <span className="text-zinc-400">
                  {movie.mediaType === "tv" ? "Série" : "Filme"}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="text-sm leading-relaxed text-zinc-200">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-semibold text-black hover:bg-white/90 transition">
              ▶ Assistir
            </button>
            <button className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15 border border-white/10 transition">
              ＋ Minha lista
            </button>

            <Link
              href={`/title/${movie.id}?type=${movie.mediaType ?? "movie"}`}
              className="inline-flex items-center gap-2 rounded-md bg-transparent px-4 py-2 font-semibold text-zinc-200 hover:bg-white/10 border border-white/10 transition"
            >
              Ver detalhes →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
