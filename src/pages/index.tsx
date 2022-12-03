  import { type NextPage } from "next";
  import Image from "next/image";
  import { useSession } from "next-auth/react";

  import { trpc } from "../utils/trpc";

  import type { User } from "@prisma/client";

  import Layout from "../components/Layout";
  import { Mural, RegrasETutoriais } from "../components/pageSections/index";
  import { Register } from "../components/Register";
  import { Loading } from "../components/navigation";
  import { Container, NarrowContainer } from "../components/layout/index";
import Link from "next/link";
import { CallToCreateCharacter } from "../components/pageSections/CallToCreateCharacter";


  const Home: NextPage = () => {
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

    const userHasCharacter = user.currentCharacter != null;
    
    return (
      <Layout user={user}>
        <div className="fixed z-[-1] h-screen w-screen">
          <Image
            src="https://i.imgur.com/hkj0kMn.jpg"
            fill={true}
            className="aspect-w-16 aspect-h-9 object-cover"
            alt="Background"
            style={{
              WebkitMaskImage:
                "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.2)))",
            }}
          />
        </div>
        <Container>
          <NarrowContainer>
            {!userHasCharacter && (
              <CallToCreateCharacter />
            )}
            <Mural />
            <RegrasETutoriais />
          </NarrowContainer>
        </Container>
      </Layout>
    );
  }

  export default Home;