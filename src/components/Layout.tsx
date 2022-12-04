import type { User } from "@prisma/client";
import Head from "next/head";
import { Navbar } from "./navigation/index";
import { FooterSocialLinksOnly } from "./pageSections/index";

export default function Layout({ children, user } : { children: JSX.Element|JSX.Element[], user: User }) {
  return (
    <>
      <Head>
        <title>Dattebayo!</title>
        <meta name="description" content="O melhor RPG de Naruto da história!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      {children}
      <FooterSocialLinksOnly />
    </>
  );
}