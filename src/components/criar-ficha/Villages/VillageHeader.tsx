import { motion } from "framer-motion";
import { VillageLogo } from ".";

export const VillageHeader = ({
  villageHeaderVariants,
  shortName,
  portugueseName,
  numberOfVacantSpots,
  open
}: VillageHeaderProps) => {
  const lowerCaseShortName = shortName.toLowerCase();
  return (
    <div className="w-full">
      <motion.div
        className="flex flex-row w-full items-center justify-between"
        variants={villageHeaderVariants}
        animate={open[lowerCaseShortName] ? "closed" : "open"}
      >
        <motion.div
          className="flex flex-col items-start ml-5 mb-10"
          initial={{ marginBottom: "2.5rem" }}
          animate={{ marginBottom: open[lowerCaseShortName] ? "0.75rem" : "2.5rem" }}
        >
          <h2 className="text-4xl 2xl:text-6xl font-bold capitalize">{shortName}</h2>
          <h2 className="text-xl font-medium text-neutral-400 ml-1 ">{portugueseName}</h2>
          <p className="ml-1">{numberOfVacantSpots} vagas disponíveis</p>
        </motion.div>
        <motion.div
          className="h-[75px] w-[75px] 2xl:h-[100px] 2xl:w-[100px] mr-3"
          initial={{ marginBottom: "2.5rem" }}
          animate={{ marginBottom: open[lowerCaseShortName] ? "0.75rem" : "2.5rem" }}
        >
          <VillageLogo village={lowerCaseShortName} />
        </motion.div>
      </motion.div>
    </div>
  );
};
