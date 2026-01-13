import Image from "next/image";
import Link from "next/link";
import { getTitleDetails } from "@/lib/tmdb";

export default async function TitlePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { type?: string };
}) {
  const type = (searchParams?.type === "tv" ? "tv" : "movie") as "movie" | "tv";
  const title = await getTitleDetails(params.id, type);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed inset-x-0 top-0 z-50 h-16 bg-zinc-950/70 backdrop-blur border-b border-white/5">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-sm text-zinc-200 hover:text-white transition">
            ← Voltar
          </Link>
          <div className="text-xs text-zinc-400">
            {type === "tv" ? "Série" : "Filme"}
          </div>
        </div>
      </div>

      <main className="pt-16">
        <section className="relative">
          <div className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
            {title.backdropUrl ? (
              <Image
                src={title.backdropUrl}
                alt={title.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-10 mx-auto max-w-[1400px] px-4 md:px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-black leading-tight md:text-6xl">{title.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                  {title.year ? (
                    <span className="rounded border border-white/10 bg-black/30 px-2 py-1">{title.year}</span>
                  ) : null}
                  {title.maturity ? (
                    <span className="rounded border border-white/10 bg-black/30 px-2 py-1">{title.maturity}+</span>
                  ) : null}
                  {title.duration ? (
                    <span className="rounded border border-white/10 bg-black/30 px-2 py-1">{title.duration}</span>
                  ) : null}
                  {title.rating !== undefined ? (
                    <span className="rounded border border-white/10 bg-black/30 px-2 py-1">★ {title.rating}</span>
                  ) : null}
                  {title.genres?.length ? (
                    <span className="text-zinc-400">{title.genres.slice(0, 4).join(" • ")}</span>
                  ) : null}
                </div>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 md:text-base">
                  {title.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 font-semibold text-black hover:bg-white/90 transition">
                    ▶ Assistir
                  </button>
                  {title.trailerYouTubeKey ? (
                    <a
                      href={`#trailer`}
                      className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/15 border border-white/10 transition"
                    >
                      ▶ Trailer
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
          <div className="grid gap-8 md:grid-cols-[320px_1fr]">
            <div className="hidden md:block">
              {title.posterUrl ? (
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <Image src={title.posterUrl} alt={title.title} fill className="object-cover" sizes="320px" />
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h2 className="text-lg font-bold">Sobre</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-200">{title.description}</p>
                <div className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                  <div>
                    <span className="text-zinc-500">Tipo:</span> {type === "tv" ? "Série" : "Filme"}
                  </div>
                  {title.runtimeMinutes ? (
                    <div>
                      <span className="text-zinc-500">Duração:</span> {title.runtimeMinutes} min
                    </div>
                  ) : null}
                  {title.genres?.length ? (
                    <div className="sm:col-span-2">
                      <span className="text-zinc-500">Gêneros:</span> {title.genres.join(", ")}
                    </div>
                  ) : null}
                </div>
              </div>

              {title.trailerYouTubeKey ? (
                <div id="trailer" className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <h2 className="text-lg font-bold">Trailer</h2>
                  <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-black">
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${title.trailerYouTubeKey}?rel=0&modestbranding=1`}
                        title={`Trailer de ${title.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
                  Não encontramos trailer oficial no YouTube para este título.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
