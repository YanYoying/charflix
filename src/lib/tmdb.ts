import { Movie } from "./types";
import { billboardMovie as mockBillboard, rows as mockRows } from "./data";

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMG_W500 = "https://image.tmdb.org/t/p/w500";

type FetchOptions = {
  revalidate?: number;
};

export type HomeRow = {
  id: string;
  title: string;
  items: Movie[];
  variant?: "top10";
};

export type HomeData = {
  billboard: Movie;
  rows: HomeRow[];
};

function requireApiKey() {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "TMDB_API_KEY não definido. Crie um .env.local com TMDB_API_KEY=SUACHAVE"
    );
  }
  return key;
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  options: FetchOptions = {}
): Promise<T> {
  const apiKey = requireApiKey();
  const url = new URL(`${TMDB_BASE}${path}`);

  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "pt-BR");

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    next: { revalidate: options.revalidate ?? 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB error ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

/* =======================
   Types
======================= */

type TMDBGenre = { id: number; name: string };

type TMDBVideos = {
  results: Array<{
    key: string;
    site: string;
    type: string;
    official?: boolean;
  }>;
};

type TMDBBaseItem = {
  id: number;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  adult?: boolean;
  vote_average?: number;
};

type TMDBMovieItem = TMDBBaseItem & {
  title?: string;
  release_date?: string;
};

type TMDBTvItem = TMDBBaseItem & {
  name?: string;
  first_air_date?: string;
};

type TMDBDetailMovie = TMDBMovieItem & {
  runtime?: number;
  genres?: TMDBGenre[];
  videos?: TMDBVideos;
};

type TMDBDetailTv = TMDBTvItem & {
  episode_run_time?: number[];
  genres?: TMDBGenre[];
  videos?: TMDBVideos;
};

type TMDBListResponse<T> = {
  results: T[];
};

export type TitleDetails = Movie & {
  trailerYouTubeKey?: string;
  runtimeMinutes?: number;
};

/* =======================
   Helpers
======================= */

function yearFrom(dateStr?: string) {
  if (!dateStr) return undefined;
  const y = Number(dateStr.slice(0, 4));
  return Number.isFinite(y) ? y : undefined;
}

function buildImg(
  urlPath?: string | null,
  size: "w500" | "original" = "w500"
) {
  if (!urlPath) return undefined;
  return (size === "original" ? IMG_ORIGINAL : IMG_W500) + urlPath;
}

function pickTrailerKey(videos?: TMDBVideos) {
  const list = videos?.results ?? [];
  return (
    list.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    list.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    list.find((v) => v.site === "YouTube")
  )?.key;
}

function mapListItem(item: TMDBMovieItem | TMDBTvItem, mediaType: "movie" | "tv"): Movie {
  const isMovie = mediaType === "movie";
  const title = isMovie ? (item as TMDBMovieItem).title : (item as TMDBTvItem).name;
  const dateStr = isMovie ? (item as TMDBMovieItem).release_date : (item as TMDBTvItem).first_air_date;

  return {
    id: String(item.id),
    title: title || "Sem título",
    description: item.overview || "Sem descrição.",
    year: yearFrom(dateStr) ?? 0,
    maturity: item.adult ? "18" : "14",
    duration: "",
    genres: [],
    backdropUrl: buildImg(item.backdrop_path, "original") ?? "",
    posterUrl: buildImg(item.poster_path, "w500") ?? "",
    mediaType,
    rating: item.vote_average ? Number(item.vote_average.toFixed(1)) : undefined,
  };
}

function toHomeFallback(): HomeData {
  // Usa os mocks para não quebrar build/preview se a env não estiver configurada.
  return {
    billboard: mockBillboard,
    rows: mockRows.map((r) => ({
      id: r.id,
      title: r.title,
      items: r.items,
      variant: r.id === "top10" ? "top10" : undefined,
    })),
  };
}

/**
 * Dados da Home (billboard + fileiras) com cache e fallback.
 * - Em dev/preview sem TMDB_API_KEY, cai para dados mock.
 */
export async function getHomeData(): Promise<HomeData> {
  try {
    // trending (mix de filmes/séries) — tipado (sem any)
    type TMDBTrendingItem =
      | (TMDBMovieItem & { media_type: "movie" })
      | (TMDBTvItem & { media_type: "tv" });

    const trending = await tmdbFetch<TMDBListResponse<TMDBTrendingItem>>(
      "/trending/all/week",
      { page: 1 },
      { revalidate: 1800 }
    );

    // top 10 (filmes)
    const top10 = await tmdbFetch<TMDBListResponse<TMDBMovieItem>>(
      "/movie/popular",
      { page: 1 },
      { revalidate: 3600 }
    );

    // originais (séries) — usando discover com network da Netflix (213)
    const originals = await tmdbFetch<TMDBListResponse<TMDBTvItem>>(
      "/discover/tv",
      { with_networks: 213, sort_by: "popularity.desc", page: 1 },
      { revalidate: 3600 }
    );

    const action = await tmdbFetch<TMDBListResponse<TMDBMovieItem>>(
      "/discover/movie",
      { with_genres: 28, sort_by: "popularity.desc", page: 1 },
      { revalidate: 3600 }
    );

    const comedy = await tmdbFetch<TMDBListResponse<TMDBMovieItem>>(
      "/discover/movie",
      { with_genres: 35, sort_by: "popularity.desc", page: 1 },
      { revalidate: 3600 }
    );

    const trendingResults = trending.results || [];

    // Billboard: primeiro item com backdrop
    const billboardPick =
      trendingResults.find((x) => Boolean(x.backdrop_path)) ?? trendingResults[0];

    const billboard = billboardPick
      ? mapListItem(billboardPick, billboardPick.media_type)
      : mockBillboard;

    // rows
    const trendingMovies: Movie[] = trendingResults
      .filter((x) => x.media_type === "movie")
      .slice(0, 14)
      .map((x) => mapListItem(x, "movie"));

    const trendingTv: Movie[] = trendingResults
      .filter((x) => x.media_type === "tv")
      .slice(0, 14)
      .map((x) => mapListItem(x, "tv"));

    return {
      billboard,
      rows: [
        {
          id: "trending",
          title: "Em alta",
          items: [...trendingMovies, ...trendingTv].slice(0, 14),
        },
        {
          id: "top10",
          title: "Top 10 hoje",
          variant: "top10",
          items: (top10.results || [])
            .slice(0, 10)
            .map((x) => mapListItem(x, "movie")),
        },
        {
          id: "originals",
          title: "Originais",
          items: (originals.results || [])
            .slice(0, 14)
            .map((x) => mapListItem(x, "tv")),
        },
        {
          id: "action",
          title: "Ação",
          items: (action.results || [])
            .slice(0, 14)
            .map((x) => mapListItem(x, "movie")),
        },
        {
          id: "comedy",
          title: "Comédias",
          items: (comedy.results || [])
            .slice(0, 14)
            .map((x) => mapListItem(x, "movie")),
        },
      ],
    };
  } catch (err) {
    // Fallback para não travar build/preview.
    console.warn("[TMDB] Falha ao carregar dados da home, usando mock.", err);
    return toHomeFallback();
  }
}


/* =======================
   ✅ FUNÇÃO ÚNICA (SEM DUPLICAÇÃO)
======================= */

export async function getTitleDetails(
  id: string,
  mediaType: "movie" | "tv"
): Promise<TitleDetails> {
  try {
    if (mediaType === "movie") {
      const d = await tmdbFetch<TMDBDetailMovie>(
        `/movie/${id}`,
        { append_to_response: "videos" },
        { revalidate: 3600 }
      );

      return {
        id: String(d.id),
        title: d.title || "Sem título",
        description: d.overview || "Sem descrição.",
        year: yearFrom(d.release_date) ?? 0,
        maturity: d.adult ? "18" : "14",
        duration: d.runtime ? `${d.runtime}m` : "",
        runtimeMinutes: d.runtime,
        genres: (d.genres ?? []).map((g) => g.name),
        backdropUrl:
          buildImg(d.backdrop_path, "original") ??
          buildImg(d.poster_path, "original") ??
          "",
        posterUrl: buildImg(d.poster_path, "w500") ?? "",
        mediaType: "movie",
        rating: d.vote_average ? Number(d.vote_average.toFixed(1)) : undefined,
        trailerYouTubeKey: pickTrailerKey(d.videos),
      };
    }

    const d = await tmdbFetch<TMDBDetailTv>(
      `/tv/${id}`,
      { append_to_response: "videos" },
      { revalidate: 3600 }
    );

    const runtime = d.episode_run_time?.[0];

    return {
      id: String(d.id),
      title: d.name || "Sem título",
      description: d.overview || "Sem descrição.",
      year: yearFrom(d.first_air_date) ?? 0,
      maturity: d.adult ? "18" : "14",
      duration: runtime ? `${runtime}m/ep` : "",
      runtimeMinutes: runtime,
      genres: (d.genres ?? []).map((g) => g.name),
      backdropUrl:
        buildImg(d.backdrop_path, "original") ??
        buildImg(d.poster_path, "original") ??
        "",
      posterUrl: buildImg(d.poster_path, "w500") ?? "",
      mediaType: "tv",
      rating: d.vote_average ? Number(d.vote_average.toFixed(1)) : undefined,
      trailerYouTubeKey: pickTrailerKey(d.videos),
    };
  } catch (err) {
    console.warn(
      "[TMDB] Falha ao carregar detalhes do título, usando fallback.",
      err
    );
    return {
      id,
      title: "Título indisponível",
      description:
        "Não foi possível carregar os detalhes agora. Verifique sua TMDB_API_KEY.",
      year: 0,
      maturity: "14",
      duration: "",
      genres: [],
      backdropUrl: "",
      posterUrl: "",
      mediaType,
    };
  }
}
