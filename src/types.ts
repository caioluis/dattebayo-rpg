import type { Variants } from "framer-motion";

declare global {
  interface UserPublicMetadata {
    rank: string | undefined;
    clan: string | undefined;
    icon: string | undefined;
    cargos: string | undefined;
    avatar: string | undefined;
    characterName: string | undefined;
    currentVillageId: number | undefined;
    currentCharacterId: number | undefined;
    maxNumberOfCharacters: number | undefined;
  }

  interface VillageAnimationProps {
    suna: boolean;
    kiri: boolean;
    konoha: boolean;
  }

  interface VillageHeaderProps {
    shortName: string;
    portugueseName: string;
    numberOfVacantSpots: number;
    villagesLoaded: boolean;
    open: VillageAnimationProps;
    villageHeaderVariants: Variants | undefined;
  }

  interface JoinVillageData {
    villageId: number;
    characterId: number;
    numberOfNinjas: number;
    maxNumberOfNinjas: number;
    currentVillage: number | undefined;
  }

  interface VillageActionProps {
    userId: string;
    shortName: string;
    open: VillageAnimationProps;
    variants: Variants | undefined;
    isJoiningNewVillage: boolean;
    hasVacantSpots: boolean;
    villageId: number;
    characterVillage: number | undefined;
    characterId: number;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<VillageAnimationProps>>;
  }

  interface VillageButtonProps {
    shortName: string;
    villageChangeObject: {
      konoha: boolean;
      suna: boolean;
      kiri: boolean;
    };
    children: React.ReactNode;
    open: VillageAnimationProps;
    setOpen: React.Dispatch<React.SetStateAction<VillageAnimationProps>>;
  }
  interface VillagePanelProps {
    villagesLoaded: boolean;
    userId: string;
    characterId: number;
    villageId: number;
    shortName: string;
    portugueseName: string;
    hasVacantSpots: boolean;
    numberOfVacantSpots: number;
    open: VillageAnimationProps;
    isJoiningNewVillage: boolean;
    characterVillage: number | undefined;
    setStage: React.Dispatch<React.SetStateAction<number>>;
    setOpen: React.Dispatch<React.SetStateAction<VillageAnimationProps>>;
  }
}

export {};
