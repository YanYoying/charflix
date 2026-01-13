/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
  },
  eslint: {
    // Vercel/CI: não falhar build por regras de lint (mantemos lint no dev via `npm run lint`)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
