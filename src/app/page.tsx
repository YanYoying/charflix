import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import Row from "@/components/Row";
import Footer from "@/components/Footer";
import { getHomeData } from "@/lib/tmdb";

export default async function Home() {
  const { billboard, rows } = await getHomeData();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-16">
        <Billboard movie={billboard} />
        <section className="relative -mt-10 space-y-10 pb-14">
          {rows.map((r) => (
            <Row key={r.id} title={r.title} items={r.items} variant={r.variant} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
