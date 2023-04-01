import Link from "next/link";
import { type NextPage } from "next";

import { trpc } from "../../utils/trpc";

import Layout from "../../components/Layout";
import { Loading } from "../../components/navigation";
import { NarrowContainer, Container } from "../../components/layout/index";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const Secao: NextPage = () => {
  const { user, isLoaded } = useUser();
  const { data: section, status: sectionQueryStatus } = trpc.sections.getSection.useQuery({ id: 1 });

  if (!isLoaded || sectionQueryStatus === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  // const allSections = section?.allSections;
  const allTopics = section?.allTopics ?? [];

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
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
      </SignedIn>
    </>
  );
};

export default Secao;
