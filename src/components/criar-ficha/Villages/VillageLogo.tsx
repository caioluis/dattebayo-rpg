import { Kiri, Konoha, Suna } from "../../logos";

export const VillageLogo = ({ village }: { village: string }) => {
  switch (village) {
    case "konoha":
      return <Konoha className="stroke-emerald-400 mr-3" />;
    case "suna":
      return <Suna className="stroke-amber-400 mr-3" />;
    case "kiri":
      return <Kiri className="stroke-cyan-400 mr-3" />;
    default:
      return <Konoha className="stroke-emerald-400 mr-3" />;
  }
};
