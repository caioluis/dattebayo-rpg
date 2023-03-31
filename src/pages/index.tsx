import Image from "next/image";
import { type NextPage } from "next";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

import Layout from "../components/Layout";

import { Loading } from "../components/navigation";
import { Container, NarrowContainer } from "../components/layout/index";
import { Mural, RegrasETutoriais } from "../components/pageSections/index";
import { CallToCreateCharacter } from "../components/pageSections/CallToCreateCharacter";

const Home: NextPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  const userHasCharacter = Boolean(user?.publicMetadata.currentCharacter);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Layout user={user}>
          <div className="fixed z-[-1] h-screen w-screen">
            <Image
              src="https://i.imgur.com/hkj0kMn.jpg"
              fill={true}
              className="aspect-w-16 aspect-h-9 object-cover"
              alt="Background"
              style={{
                WebkitMaskImage:
                  "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.2)))"
              }}
            />
          </div>
          <Container>
            <NarrowContainer>
              <>{!userHasCharacter && <CallToCreateCharacter userId={user?.id} />}</>
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
