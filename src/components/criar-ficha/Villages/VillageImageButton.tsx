import { motion } from "framer-motion";

export const VillageImageButton = ({
  open,
  setOpen,
  shortName,
  villageChangeObject,
  children
}: VillageImageButtonProps) => {
  const lowerCaseShortName = shortName.toLowerCase();
  return (
    <motion.button
      className="flex flex-col items-end justify-end w-1/3 h-full enabled:cursor-pointer"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(villages/${lowerCaseShortName}/wallpaper.png)`,
        backgroundSize: "cover",
        backgroundPositionX: "center"
      }}
      onClick={() => setOpen(villageChangeObject)}
      disabled={open[lowerCaseShortName]}
    >
      {children}
    </motion.button>
  );
};
