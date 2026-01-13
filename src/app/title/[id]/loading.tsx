export default function LoadingTitle() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="fixed inset-x-0 top-0 z-50 h-16 bg-zinc-950/70 backdrop-blur border-b border-white/5" />

      <main className="pt-16">
        <section className="relative">
          <div className="h-[72vh] min-h-[520px] w-full overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/20" />
            <div className="absolute inset-x-0 bottom-10 mx-auto max-w-[1400px] px-4 md:px-8">
              <div className="max-w-2xl space-y-4">
                <div className="h-12 w-3/4 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
                <div className="flex gap-3 pt-2">
                  <div className="h-10 w-32 rounded-md bg-white/10 animate-pulse" />
                  <div className="h-10 w-24 rounded-md bg-white/10 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
          <div className="grid gap-8 md:grid-cols-[320px_1fr]">
            <div className="hidden md:block">
              <div className="aspect-[2/3] w-full rounded-xl bg-white/10 animate-pulse" />
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                <div className="h-5 w-28 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                <div className="h-5 w-24 rounded bg-white/10 animate-pulse" />
                <div className="aspect-video w-full rounded bg-white/10 animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
