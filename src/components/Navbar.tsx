"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all",
        scrolled
          ? "bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 border-b border-white/5"
          : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <div className="select-none font-extrabold tracking-wide text-red-600">
            CHARFLIX
          </div>

          <nav className="hidden items-center gap-4 text-sm text-zinc-200 md:flex">
            <a className="hover:text-white transition" href="#inicio">Início</a>
            <a className="hover:text-white transition" href="#series">Séries</a>
            <a className="hover:text-white transition" href="#filmes">Filmes</a>
            <a className="hover:text-white transition" href="#bombando">Em alta</a>
            <a className="hover:text-white transition" href="#lista">Minha lista</a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md px-2 py-1 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            aria-label="Buscar"
          >
            ⌕
          </button>
          <button
            className="rounded-md px-2 py-1 text-zinc-200 hover:bg-white/10 hover:text-white transition"
            aria-label="Notificações"
          >
            🔔
          </button>
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-md bg-white/10 text-xs font-bold border border-white/10">
            YA
          </div>
        </div>
      </div>
    </header>
  );
}
