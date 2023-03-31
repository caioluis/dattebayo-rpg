import Image from "next/image";
import type { NextPage } from "next";

import { useEffect } from "react";

import Layout from "../components/Layout";
import ChooseYourVillage from "../components/criar-ficha/ChooseVillage";
import RandomPage from "../components/criar-ficha/RandomComponent";
import { Container } from "../components/layout/index";
import { Loading } from "../components/navigation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const CreationViews = {
  1: ChooseYourVillage,
  2: RandomPage
};

const CriarFicha: NextPage = () => {
  const [stage, setStage] = useLocalStorage("characterSheetCreationStage", 1);

  useEffect(() => console.log("Stage changed!"), [stage]);

  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!isSignedIn) {
    console.log("Redirecting to sign in...");
    return <RedirectToSignIn />;
  }

  const CreationStageView = CreationViews[stage] ?? ChooseYourVillage;

  return (
    <Layout user={user}>
      <div className="flex flex-1 z-[-1]">
        <Image
          src="/wallpaperFicha.png"
          alt="Background"
          fill={true}
          className="aspect-w-16 aspect-h-9 object-cover grayscale"
          style={{
            WebkitMaskImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))"
          }}
        />
      </div>
      <Container>
        <CreationStageView user={user} setStage={setStage} />
      </Container>
    </Layout>
  );
};

export default CriarFicha;
