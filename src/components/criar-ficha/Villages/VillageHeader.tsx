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
        className="flex flex-row w-full justify-between"
        variants={villageHeaderVariants}
        animate={open[shortName] ? "closed" : "open"}
      >
        <div className="flex flex-col items-start ml-5 mb-2">
          <h2 className="text-4xl 2xl:text-6xl font-bold capitalize">{shortName}</h2>
          <h2 className="text-xl font-medium text-neutral-400 ml-1 ">{portugueseName}</h2>
          <p className="ml-1">{numberOfVacantSpots} vagas disponíveis</p>
        </div>
        <div className="h-[75px] w-[75px] 2xl:h-[100px] 2xl:w-[100px]">
          <VillageLogo village={lowerCaseShortName} />
        </div>
      </motion.div>
    </div>
  );
};
