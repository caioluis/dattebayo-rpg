import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import type { NextPage } from "next";
import type { UserResource } from "@clerk/types";

import { trpc } from "../../utils/trpc";
import { Loading } from "../navigation";
import { VillagePanel } from "./Villages/VillagePanel";

const ChooseYourVillage: NextPage = ({
  user,
  setStage
}: {
  user: UserResource;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState({
    konoha: false,
    suna: false,
    kiri: false
  });

  const { data: villagesData } = trpc.village.getAll.useQuery();

  const currentVillage = user.publicMetadata?.currentVillageId;
  const characterId = user.publicMetadata?.currentCharacterId;
  const userId = user.id;

  const [characterVillage, setCharacterVillage] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (currentVillage) {
      setCharacterVillage(currentVillage);
    }
    setStage(1);
  }, [currentVillage, setStage]);

  if (!characterId || !villagesData) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="flex flex-row items-center justify-center w-full h-full bg-red-100"
    >
      {villagesData.map((village) => {
        const { id: villageId, name, portugueseName, numberOfNinjas, maxNumberOfNinjas } = village;

        //  Get the substring from the full japanese name
        const pattern = /(\w+)gakure no Sato/i;
        const match = name.match(pattern) as string[];
        const shortName = match[1] as string;

        const numberOfVacantSpots = maxNumberOfNinjas - numberOfNinjas;
        const isJoiningNewVillage = villageId !== currentVillage;
        const hasVacantSpots = numberOfVacantSpots > 0;

        return (
          <VillagePanel
            key={villageId}
            open={open}
            userId={userId}
            setOpen={setOpen}
            setStage={setStage}
            shortName={shortName}
            villageId={villageId}
            characterId={characterId}
            portugueseName={portugueseName}
            hasVacantSpots={hasVacantSpots}
            characterVillage={characterVillage}
            isJoiningNewVillage={isJoiningNewVillage}
            numberOfVacantSpots={maxNumberOfNinjas - numberOfNinjas}
          />
        );
      })}
    </motion.div>
  );
};

export default ChooseYourVillage;
