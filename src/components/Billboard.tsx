"use client";

import Image from "next/image";
import { Movie } from "@/lib/types";

export default function Billboard({ movie }: { movie: Movie }) {
  const hasImg = Boolean(movie.backdropUrl);

  return (
    <section id="inicio" className="relative">
      <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
        {hasImg ? (
          <Image
            src={movie.backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        )}

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-24 mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span className="uppercase tracking-widest">EM DESTAQUE</span>
            </div>

            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              {movie.title}
            </h1>

            <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-zinc-200 md:text-base">
              {movie.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
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

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-semibold text-black hover:bg-white/90 transition">
                ▶ Assistir
              </button>
              <button className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15 border border-white/10 transition">
                ℹ Mais informações
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>
    </section>
  );
}
