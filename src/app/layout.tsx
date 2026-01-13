import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charflix",
  description: "Plataforma de streaming — projeto front-end com Next.js e TMDB",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
