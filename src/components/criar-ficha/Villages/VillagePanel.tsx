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

  const lazyColors = {
    0: "#a95f3a69",
    1: "#7f634057",
    2: "#34547c78"
  };

  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "150%" }
  };

  const villageHeaderVariants = {
    open: { opacity: 1, y: "30%" },
    closed: { opacity: 1, y: 0 },
    loading: {
      opacity: 0
    },
    loaded: {
      opacity: 1,
      transition: {
        delay: 1
      }
    }
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
      <div
        className="absolute w-full h-full"
        style={{
          backgroundColor: lazyColors[villageId - 1]
        }}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: villagesLoaded ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          src={`villages/${lowerCaseShortName}/wallpaper.jpg`}
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
        villagesLoaded={villagesLoaded}
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
