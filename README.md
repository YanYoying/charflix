# Netflixish (Next.js + Tailwind + TMDB)

UI inspirada em streaming (estilo Netflix), focada em front-end **com dados reais do TMDB**.
- Next.js App Router (Server Components)
- TailwindCSS
- Carrosséis de cards com hover
- Modal de detalhes com ESC/overlay
- Fetch server-side com cache/revalidate do Next

## Requisitos
Você precisa de uma chave do TMDB:

1. Crie uma conta no TMDB e gere sua API Key (v3).
2. Crie um arquivo `.env.local` na raiz do projeto:
```bash
TMDB_API_KEY=COLE_SUA_CHAVE_AQUI
```

Você pode usar o `.env.example` como base.

## Rodar
```bash
npm install
npm run dev
```

## Observação
Projeto educacional (front-end) inspirado em UI de streaming. Não afiliado à Netflix.
