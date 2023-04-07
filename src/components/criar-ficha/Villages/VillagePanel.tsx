import { VillageAction, VillageHeader, VillageButton } from ".";
import { motion } from "framer-motion";

export const VillagePanel = ({
  open,
  userId,
  setOpen,
  setStage,
  shortName,
  villageId,
  hasVacantSpots,
  portugueseName,
  isJoiningNewVillage,
  numberOfVacantSpots,
  characterId,
  characterVillage,
  villagesLoaded
}: VillagePanelProps) => {
  const villageChangeObject = {
    konoha: false,
    suna: false,
    kiri: false
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "150%" }
  };

  const villageHeaderVariants = {
    open: { opacity: 1, y: "50%" },
    closed: { opacity: 1, y: 0 }
  };

  const lowerCaseShortName = shortName.toLowerCase();
  villageChangeObject[lowerCaseShortName] = true;

  return (
    <VillageButton
      open={open}
      setOpen={setOpen}
      shortName={lowerCaseShortName}
      villageChangeObject={villageChangeObject}
    >
      <div className="absolute w-full h-full">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: villagesLoaded ? 0 : 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          src={`villages/${shortName}/wallpaper.jpg`}
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>

      <VillageHeader
        villageHeaderVariants={villageHeaderVariants}
        numberOfVacantSpots={numberOfVacantSpots}
        shortName={shortName}
        portugueseName={portugueseName}
        open={open}
      />
      <VillageAction
        open={open}
        setOpen={setOpen}
        shortName={shortName}
        variants={variants}
        setStage={setStage}
        userId={userId}
        villageId={villageId}
        characterVillage={characterVillage}
        isJoiningNewVillage={isJoiningNewVillage}
        hasVacantSpots={hasVacantSpots}
        characterId={characterId}
      />
    </VillageButton>
  );
};
