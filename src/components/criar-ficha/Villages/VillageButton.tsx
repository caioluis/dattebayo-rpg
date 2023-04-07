import { motion } from "framer-motion";

export const VillageButton = ({ open, setOpen, shortName, villageChangeObject, children }: VillageButtonProps) => {
  return (
    <motion.button
      className="relative flex flex-col items-end justify-end w-1/3 h-full enabled:cursor-pointer"
      onClick={() => setOpen(villageChangeObject)}
      disabled={open[shortName]}
    >
      {children}
    </motion.button>
  );
};
