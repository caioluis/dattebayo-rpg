import { useReducer } from "react";

import Head from "next/head";
import Link from "next/link";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import type { User } from "@prisma/client";

import { trpc } from "../../utils/trpc";

import Layout from "../../components/Layout";
import { Loading } from "../../components/navigation";
import { Register } from "../../components/Register";

const Secao: NextPage = () => {
  const { data: sessionData, status } = useSession();
  

  if (status === "loading") {
    return (
    <div className="grid place-items-center h-screen">
      <Loading />
      </div>
    );
  }

  if (status === "unauthenticated" || !sessionData?.user) {
    return <Register />;
  }

  const user : User = sessionData.user;
  
  return (
    <>
      <Head>
        <title>Dattebayo!</title>
        <meta name="description" content="O melhor RPG de Naruto da história!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout user={user}>
        <div>Hello</div>
      </Layout>
    </>
  );
};

export default Secao;