export type Movie = {
  id: string; // TMDB id como string
  title: string;
  description: string;
  year: number; // 0 se desconhecido
  maturity: string; // fallback simples (14/18)
  duration: string; // pode vir vazio
  genres: string[]; // pode vir vazio
  backdropUrl: string; // pode ser vazio
  posterUrl: string; // pode ser vazio
  mediaType?: "movie" | "tv";
  rating?: number; // 0-10
};
