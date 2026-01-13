import { Movie } from "./types";

const poster = (seed: string) => `https://picsum.photos/seed/${seed}-p/480/720`;
const backdrop = (seed: string) => `https://picsum.photos/seed/${seed}-b/1600/900`;

const makeMovie = (seed: string, i: number): Movie => ({
  id: `${seed}-${i}`,
  title: `${seed} ${i + 1}`,
  description:
    "Um thriller tenso com reviravoltas, personagens marcantes e um final que dá vontade de ver o próximo episódio.",
  year: 2020 + (i % 5),
  maturity: ["10", "12", "14", "16", "18"][i % 5],
  duration: ["1h 35m", "1h 58m", "2h 10m", "45m", "52m"][i % 5],
  genres: [
    ["Ação", "Drama", "Suspense"],
    ["Comédia", "Romance"],
    ["Sci-fi", "Mistério"],
    ["Crime", "Drama"],
    ["Aventura", "Fantasia"],
  ][i % 5],
  backdropUrl: backdrop(`${seed}-${i}`),
  posterUrl: poster(`${seed}-${i}`),
  accent: (["red", "blue", "green", "purple"] as const)[i % 4],
});

export const billboardMovie: Movie = {
  id: "featured-0",
  title: "Destaque da Semana",
  description:
    "Uma produção intensa e cinematográfica. Assista agora e descubra por que todo mundo está falando disso.",
  year: 2025,
  maturity: "16",
  duration: "2h 02m",
  genres: ["Suspense", "Drama", "Mistério"],
  backdropUrl: backdrop("featured"),
  posterUrl: poster("featured"),
  accent: "red",
};

export const rows = [
  { id: "trending", title: "Em alta", items: Array.from({ length: 14 }, (_, i) => makeMovie("EmAlta", i)) },
  { id: "top10", title: "Top 10 hoje", items: Array.from({ length: 10 }, (_, i) => makeMovie("Top", i)) },
  { id: "originals", title: "Originais", items: Array.from({ length: 14 }, (_, i) => makeMovie("Original", i)) },
  { id: "action", title: "Ação", items: Array.from({ length: 14 }, (_, i) => makeMovie("Acao", i)) },
  { id: "comedy", title: "Comédias", items: Array.from({ length: 14 }, (_, i) => makeMovie("Comedia", i)) },
];
