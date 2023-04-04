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
import Background from "../components/layout/Background";
import NarrowContainer from "../components/layout/NarrowContainer";

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
    return <RedirectToSignIn />;
  }

  const CreationStageView = CreationViews[stage] ?? ChooseYourVillage;

  return (
    <Layout user={user}>
      <Background src="/wallpaperFicha.png" />
      <CreationStageView user={user} setStage={setStage} />
    </Layout>
  );
};

export default CriarFicha;
