import { VillageAction, VillageHeader, VillageImageButton } from ".";

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
  characterVillage
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

  villageChangeObject[shortName] = true;

  return (
    <VillageImageButton open={open} setOpen={setOpen} shortName={shortName} villageChangeObject={villageChangeObject}>
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
    </VillageImageButton>
  );
};
