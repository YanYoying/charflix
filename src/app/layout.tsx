import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charflix",
  description: "Projeto front-end de streaming — Next.js + Tailwind + TMDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
