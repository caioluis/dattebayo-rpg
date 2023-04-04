import { type NextPage } from "next";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import Layout from "../../components/Layout";

import { Loading } from "../../components/navigation";
import { Container, NarrowContainer } from "../../components/layout/index";
import { Unauthorized } from "../../components/pageSections/index";

import Background from "../../components/layout/Background";
import PainelAdmin from "../../components/forms/TwoColumn";

const AdminPanel: NextPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  const isAdmin = user?.publicMetadata.cargos?.includes("admin");

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {isAdmin ? (
          <Layout user={user}>
            <Background src="/main-wallpaper.jpg" />
            <Container>
              <NarrowContainer>
                <PainelAdmin />
              </NarrowContainer>
            </Container>
          </Layout>
        ) : (
          <Unauthorized />
        )}
      </SignedIn>
    </>
  );
};

export default AdminPanel;
