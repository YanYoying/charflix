"use client";

import { useMemo, useRef, useState } from "react";
import TitleRow from "./TitleRow";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/cn";

export default function Row({
  title,
  items,
  variant,
}: {
  title: string;
  items: Movie[];
  variant?: "top10";
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<Movie | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const hint = useMemo(() => items.slice(0, 1)[0]?.title ?? "", [items]);

  return (
    <div className="space-y-3">
      <TitleRow title={title} />

      <div className="group relative">
        <button
          onClick={() => scrollBy("left")}
          className={cn(
            "absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full",
            "bg-black/50 px-3 py-3 text-white border border-white/10 backdrop-blur",
            "opacity-0 transition group-hover:opacity-100 md:block"
          )}
          aria-label={`Rolar ${title} para esquerda`}
        >
          ‹
        </button>

        <div
          ref={scrollerRef}
          className={cn(
            "mx-auto flex max-w-[1400px] gap-3 overflow-x-auto px-4 pb-2 md:px-8",
            "scrollbar-none snap-x snap-mandatory"
          )}
        >
          {items.map((m, idx) => (
            <div key={m.id} className="snap-start">
              <MovieCard movie={m} onOpen={setOpen} rank={variant === "top10" ? idx + 1 : undefined} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollBy("right")}
          className={cn(
            "absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full",
            "bg-black/50 px-3 py-3 text-white border border-white/10 backdrop-blur",
            "opacity-0 transition group-hover:opacity-100 md:block"
          )}
          aria-label={`Rolar ${title} para direita`}
        >
          ›
        </button>

        <div className="mx-auto max-w-[1400px] px-4 text-xs text-zinc-500 md:px-8">
          Dica: clique em <span className="text-zinc-300">{hint}</span> para abrir o modal.
        </div>
      </div>

      {open && <Modal movie={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
