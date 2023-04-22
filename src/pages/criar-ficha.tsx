import type { NextPage } from "next";

import { useEffect } from "react";
import { LayoutGroup, motion } from "framer-motion";

import Layout from "../components/Layout";
import ChooseYourVillage from "../components/criar-ficha/ChooseVillage";
import RandomPage from "../components/criar-ficha/RandomComponent";
import { Loading } from "../components/navigation";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import Background from "../components/layout/Background";
import { trpc } from "../utils/trpc";

const CreationViews = {
  1: ChooseYourVillage,
  2: RandomPage
};

const viewNames = {
  1: "Vilarejo",
  2: "Random"
};

const CriarFicha: NextPage = () => {
  const [stage, setStage] = useLocalStorage("characterSheetCreationStage", 1);

  const { user, isLoaded, isSignedIn } = useUser();
  const { refetch: refetchVillages } = trpc.villages.getAll.useQuery();
  const { refetch: refetchMetadata } = trpc.users.getUserMetadata.useQuery({ id: user?.id as string });

  useEffect(() => {
    if (stage === 1) {
      refetchVillages();
    }
    refetchMetadata();
  }, [stage]);

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
      <Background src="/wallpaperFicha.jpg" />
      <CreationStageView user={user} setStage={setStage} />
      <LayoutGroup>
        <ul className="flex justify-center gap-2 w-full ">
          {Object.keys(CreationViews).map((key) => (
            <li key={key}>
              <button
                className="relative p-1"
                onClick={() => {
                  setStage(Number(key));
                }}
              >
                {viewNames[key]}
                {Number(key) === stage && (
                  <motion.div
                    layoutId="stepChooserIndicator"
                    className="absolute inset-0 bg-neutral-200/30 rounded-md z-[-1]"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </LayoutGroup>
    </Layout>
  );
};

export default CriarFicha;
