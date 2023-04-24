import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import type { NextPage } from "next";
import type { UserResource } from "@clerk/types";

import { trpc } from "../../utils/trpc";
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
  const [villagesLoaded, setVillagesLoaded] = useState(false);

  const { data: villagesData, status } = trpc.villages.getAll.useQuery();
  const { data: userPublicMetadata } = trpc.users.getUserMetadata.useQuery({ id: user.id });

  console.log(userPublicMetadata);

  // filter the last item in villagesData, which is the "no village" village
  const villages = villagesData?.filter((village) => village.id !== 99);

  const currentVillage = userPublicMetadata?.currentVillageId;
  const characterId = userPublicMetadata?.currentCharacterId;
  const userId = user.id;

  const [characterVillage, setCharacterVillage] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (status === "success") {
      setVillagesLoaded(true);
    }
    if (currentVillage) {
      setCharacterVillage(currentVillage);
    }
    setStage(1);
  }, [characterId, currentVillage, setStage, status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3 }}
      className="flex flex-row items-center justify-center w-full h-full mb-2"
    >
      {villages?.map((village) => {
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
            villagesLoaded={villagesLoaded}
            open={open}
            userId={userId}
            setOpen={setOpen}
            setStage={setStage}
            shortName={shortName}
            villageId={villageId}
            characterId={characterId as number}
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
