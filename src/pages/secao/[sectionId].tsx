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
import { NarrowContainer, Container } from "../../components/layout/index";

const Secao: NextPage = () => {
  const { data: sessionData, status } = useSession();

  const { data: section, status: sectionQueryStatus } = trpc.sections.getSection.useQuery({ id: 1 });

  if (status === "loading" || sectionQueryStatus === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (status === "unauthenticated" || !sessionData?.user) {
    return <Register />;
  }

  const user: User = sessionData.user;

  const allSections = section?.allSections;
  const allTopics = section?.allTopics ?? [];

  return (
    <Layout user={user}>
      <main>
        {Object.keys(allTopics).length ? (
          <Container>
            <p>Topicos</p>
          </Container>
        ) : (
          <NarrowContainer>
            <h1 className="text-5xl text-center mt-10">Esta seção ainda não tem tópicos.</h1>
            <Link href={""}>
              <p className="text-3xl text-center mt-10 w-full">Seja o primeiro a criar um!</p>
            </Link>
          </NarrowContainer>
        )}
      </main>
    </Layout>
  );
};

export default Secao;
