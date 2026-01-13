"use client";

import Image from "next/image";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/cn";

export default function MovieCard({
  movie,
  onOpen,
  rank,
}: {
  movie: Movie;
  onOpen: (m: Movie) => void;
  rank?: number; // 1..10 (Top 10)
}) {
  const hasPoster = Boolean(movie.posterUrl);
  const isTop10 = typeof rank === "number";

  return (
    <div className={cn("relative shrink-0", isTop10 ? "w-[220px] md:w-[260px]" : "w-auto")}
      aria-label={`Abrir ${movie.title}`}
    >
      {isTop10 && (
        <div
          className={cn(
            "pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 select-none",
            "text-[120px] md:text-[150px] font-black leading-none",
            "text-transparent [-webkit-text-stroke:6px_rgba(255,255,255,0.18)]"
          )}
        >
          {rank}
        </div>
      )}

      <button
        onClick={() => onOpen(movie)}
        className={cn(
          "group relative aspect-[2/3] shrink-0 overflow-hidden rounded-md",
          isTop10 ? "ml-14 w-[140px] md:ml-16 md:w-[170px]" : "w-[140px] md:w-[170px]",
          "bg-white/5 border border-white/10",
          "transition hover:scale-[1.06] hover:z-10 focus:outline-none focus:ring-2 focus:ring-red-600/60"
        )}
      >
      {hasPoster ? (
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition duration-300 group-hover:opacity-95"
          sizes="(max-width: 768px) 140px, 170px"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
          <span className="px-3 text-center text-xs text-zinc-300 line-clamp-2">
            {movie.title}
          </span>
        </div>
      )}

      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-0 w-full p-2">
          <p className="line-clamp-1 text-left text-xs font-semibold">
            {movie.title}
          </p>
          <p className="mt-0.5 text-left text-[11px] text-zinc-300">
            {movie.maturity ? `${movie.maturity}+` : ""}{movie.maturity && movie.rating !== undefined ? " • " : ""}
            {movie.rating !== undefined ? `★ ${movie.rating}` : ""}
          </p>
        </div>
      </div>
      </button>
    </div>
  );
}
