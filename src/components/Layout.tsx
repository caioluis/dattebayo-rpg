import Head from "next/head";
import { Navbar } from "./navigation/index";
import { FooterSocialLinksOnly } from "./pageSections/index";
import type { UserResource } from "@clerk/types";

export default function Layout({
  children,
  user
}: {
  children: JSX.Element | JSX.Element[];
  user: UserResource | null;
}) {
  return (
    <>
      <Head>
        <title>Dattebayo!</title>
        <meta name="description" content="O melhor RPG de Naruto da história!" />
        <link rel="icon" href="/favicon.ico" />
        <html lang="pt-br" />
      </Head>
      <Navbar user={user} />
      {children}
      <FooterSocialLinksOnly />
    </>
  );
}
