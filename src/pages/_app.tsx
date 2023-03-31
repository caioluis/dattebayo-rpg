import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { ptBR } from "@clerk/localizations";
import { dark } from "@clerk/themes";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <>
      <ReactQueryDevtools initialIsOpen={true} />
      <ClerkProvider
        {...pageProps}
        localization={ptBR}
        appearance={{
          baseTheme: dark
        }}
        navigate={(to) => router.push(to)}
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
