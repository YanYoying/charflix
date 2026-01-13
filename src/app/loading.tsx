export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navbar skeleton */}
      <div className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/5 bg-zinc-950/80 backdrop-blur" />

      <main className="pt-16">
        {/* Billboard skeleton */}
        <section className="relative">
          <div className="h-[72vh] min-h-[520px] w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20" />
            <div className="absolute inset-x-0 bottom-24 mx-auto max-w-[1400px] px-4 md:px-8">
              <div className="max-w-2xl space-y-4">
                <div className="h-6 w-40 rounded-full bg-white/10" />
                <div className="h-12 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-5/6 rounded bg-white/10" />
                <div className="flex gap-3 pt-2">
                  <div className="h-10 w-32 rounded-md bg-white/10" />
                  <div className="h-10 w-44 rounded-md bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rows skeleton */}
        <section className="relative -mt-10 space-y-10 pb-14">
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <div key={rowIdx} className="space-y-3">
              <div className="mx-auto max-w-[1400px] px-4 md:px-8">
                <div className="h-5 w-36 rounded bg-white/10" />
              </div>
              <div className="mx-auto flex max-w-[1400px] gap-3 overflow-hidden px-4 md:px-8">
                {Array.from({ length: 10 }).map((__, i) => (
                  <div
                    key={i}
                    className="aspect-[2/3] w-[140px] md:w-[170px] rounded-md bg-white/10 animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
