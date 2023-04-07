import { Kiri, Konoha, Suna } from "../../logos";

export const VillageLogo = ({ village }: { village: string }) => {
  switch (village) {
    case "konoha":
      return <Konoha className="stroke-emerald-400" />;
    case "suna":
      return <Suna className="stroke-amber-400" />;
    case "kiri":
      return <Kiri className="stroke-cyan-400" />;
    default:
      return <Konoha className="stroke-emerald-400" />;
  }
};
