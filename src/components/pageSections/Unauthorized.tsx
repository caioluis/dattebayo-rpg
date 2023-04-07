import Link from "next/link";
import Background from "../layout/Background";

export const Unauthorized = () => {
  return (
    <>
      <Background src="/main-wallpaper.jpg" />
      <main className="relative isolate min-h-full">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-xl font-semibold leading-8 text-white">👀</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Não autorizado</h1>
          <p className="mt-4 text-base text-white/70 sm:mt-6">
            Parece que você não tem autorização para acessar esta página
          </p>
          <div className="mt-10 flex justify-center">
            <Link href="/" className="text-sm font-semibold leading-7 text-white">
              <span aria-hidden="true">&larr;</span> Voltar para a página inicial
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
