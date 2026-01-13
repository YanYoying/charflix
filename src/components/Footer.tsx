export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
        <div className="grid grid-cols-2 gap-3 text-sm text-zinc-400 md:grid-cols-4">
          {[
            "Perguntas frequentes",
            "Central de Ajuda",
            "Conta",
            "Imprensa",
            "Carreiras",
            "Privacidade",
            "Preferências de cookies",
            "Informações corporativas",
            "Entre em contato",
            "Avisos legais",
            "Só aqui",
            "Teste de velocidade",
          ].map((t) => (
            <a key={t} href="#" className="hover:text-zinc-200 transition">
              {t}
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-zinc-600">
          Projeto educacional (front-end) inspirado em streaming UI. Não afiliado à Netflix.
        </p>
      </div>
    </footer>
  );
}
