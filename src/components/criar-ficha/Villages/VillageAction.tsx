import { motion } from "framer-motion";
import { trpc } from "../../../utils/trpc";

export const VillageAction = ({
  open,
  setOpen,
  shortName,
  variants,
  setStage,
  userId,
  hasVacantSpots,
  isJoiningNewVillage,
  villageId,
  characterId,
  characterVillage
}: VillageActionProps) => {
  const { mutate: incrementNumberOfNinjas } = trpc.village.incrementNumberOfNinjas.useMutation();
  const { mutate: decrementNumberOfNinjas } = trpc.village.decrementNumberOfNinjas.useMutation();
  const { mutate: updateUserMetadata } = trpc.user.updateUserMetadata.useMutation();
  const { mutate: updateCharacter } = trpc.character.updateCharacter.useMutation();

  const handleJoinVillage = async () => {
    if (isJoiningNewVillage && hasVacantSpots) {
      if (characterVillage) {
        decrementNumberOfNinjas({ id: characterVillage });
      }
      incrementNumberOfNinjas({ id: villageId });
      updateCharacter({ id: characterId, villageId: villageId });
      updateUserMetadata({ id: userId, currentVillageId: villageId });
      setStage(2);
    } else {
      alert("Você já está nessa vila! Seguindo em frente!");
      setStage(2);
    }
  };

  const lowerCaseShortName = shortName.toLowerCase();

  return (
    <motion.div
      className="flex flex-row w-full"
      variants={variants}
      initial="closed"
      animate={open[lowerCaseShortName] ? "open" : "closed"}
    >
      <motion.button
        className="bg-red-500 text-white font-bold text-lg 2xl:text-2xl p-1 2xl:p-2 w-1/2"
        onClick={() => {
          setOpen({ ...open, [lowerCaseShortName]: false });
        }}
        disabled={!open[lowerCaseShortName]}
      >
        Cancelar
      </motion.button>
      <motion.button
        className="bg-green-600 text-white font-bold text-lg 2xl:text-2xl p-1 2xl:p-2 w-1/2"
        onClick={() => {
          setOpen({ ...open, [lowerCaseShortName]: false });
          handleJoinVillage();
        }}
        disabled={!open[lowerCaseShortName]}
      >
        Fazer parte de {shortName}
      </motion.button>
    </motion.div>
  );
};
