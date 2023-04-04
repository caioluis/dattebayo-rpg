import Image from "next/image";
import { type NextPage } from "next";
import { RedirectToSignIn, SignedIn, useUser } from "@clerk/nextjs";

import Layout from "../components/Layout";

import { Loading } from "../components/navigation";
import { Background, Container, NarrowContainer } from "../components/layout/index";
import { Mural, RegrasETutoriais } from "../components/pageSections/index";
import { CallToCreateCharacter } from "../components/pageSections/CallToCreateCharacter";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { user, isLoaded } = useUser();

  const { mutate: updateUserMetadata, error } = trpc.user.updateUserMetadata.useMutation();

  // when we know for sure that the user is logged in, we add metadata to the user object
  // this is a workaround for the fact that the user object is not updated when the user is logged in
  // so we have to check if the user has anything at publicMetadata
  useEffect(() => {
    if (user && Object.keys(user.publicMetadata).length === 0) {
      updateUserMetadata({
        id: user.id,
        rank: "Genin",
        cargos: "player"
      });
      if (error) {
        console.log(error);
      }
    }
  }, [updateUserMetadata, user, error]);

  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }
  if (!user && isLoaded) return <RedirectToSignIn />;

  const userHasCharacter = Boolean(user?.publicMetadata.currentCharacterId);

  return (
    <>
      <SignedIn>
        <Layout user={user}>
          <Background src="/main-wallpaper.jpg" />
          <Container>
            <NarrowContainer>
              <>{!userHasCharacter && <CallToCreateCharacter userId={user.id} />}</>
              <Mural />
              <RegrasETutoriais />
            </NarrowContainer>
          </Container>
        </Layout>
      </SignedIn>
    </>
  );
};

export default Home;
