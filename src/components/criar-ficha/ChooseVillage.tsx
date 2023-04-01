import type { NextPage } from "next";

import { Suna, Kiri, Konoha } from "../../components/logos";
import { Loading } from "../../components/navigation";
import { trpc } from "../../utils/trpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ChooseYourVillage: NextPage = ({
  user,
  setStage
}: {
  user: User | null;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const { data: villagesData } = trpc.village.getAll.useQuery();
  const { data: character, status: getCurrentCharacterQueryStatus } =
    trpc.character.getCurrentCharacterVillage.useQuery(
      {
        currentCharacter: user?.currentCharacter
      },
      {
        onError: () => {
          return router.push("/");
        }
      }
    );
  const { mutateAsync: joinVillage, status: joinVillageMutationStatus } = trpc.village.joinVillage.useMutation();

  const currentVillage = character?.villageId;

  const [characterVillage, setCharacterVillage] = useState<number | null>(null);

  useEffect(() => {
    if (currentVillage) {
      setCharacterVillage(currentVillage);
    }
    setStage(1);
  }, [currentVillage]);

  if (getCurrentCharacterQueryStatus == "loading" || joinVillageMutationStatus == "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  const handleJoinVillage = async (villageId: number, currentVillage: number | null, characterId: number) => {
    if (villageId !== currentVillage) {
      await joinVillage({ villageId, characterId });
      setStage(2);
    } else {
      alert("Você já está nessa vila! Seguindo em frente!");
      setStage(2);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <h2 className="pb-6 self-center text-lg text-center font-bold text-neutral-300 sm:text-2xl sm:leading-none sm:tracking-tight lg:text-5xl">
        Escolha sua Vila
      </h2>
      {/* Cards das Vilas */}
      <div className="mt-12 gap-x-8 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 2xl:gap-x-24">
        {villagesData?.map((village) => {
          const numberOfVacantSpots = village.maxNumberOfNinjas - village.numberOfNinjas;
          return (
            <div className="flex flex-col w-fit" key={village.id}>
              <button
                disabled={numberOfVacantSpots === 0}
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(${village.cardPhoto})`,
                  backgroundSize: "cover"
                }}
                className={
                  "min-w-[300px] h-[420px] relative rounded-2xl shadow-sm flex flex-col 2xl:min-w-[400px] 2xl:h-[560px] transition-all duration-1000 hover:transition-all hover:duration-300 cursor-pointer " +
                  (characterVillage !== village.id ? "saturate-0 hover:saturate-100" : "")
                }
                onClick={() => {
                  if (character) {
                    handleJoinVillage(village.id, characterVillage, character?.id);
                  }
                }}
              >
                {village.id === 2 ? (
                  <div className="flex w-full justify-between absolute bottom-1 mb-5 2xl:mb-10">
                    <div className="ml-5">
                      <h2 className="text-4xl 2xl:text-6xl font-bold">Suna</h2>
                      <h3 className="text-xl font-medium text-neutral-400 ml-2">Vila da Areia</h3>
                    </div>
                    <div className="h-[75px] w-[75px] 2xl:h-[100px] 2xl:w-[100px]">
                      <Suna className="stroke-amber-400 mr-3" />
                    </div>
                  </div>
                ) : village.id === 3 ? (
                  <div className="flex w-full justify-between absolute bottom-1 mb-5 2xl:mb-10">
                    <div className="ml-5">
                      <h2 className="text-4xl 2xl:text-6xl font-bold">Kiri</h2>
                      <h3 className="text-xl font-medium text-neutral-400 ml-1 2xl:ml-2">Vila da Névoa</h3>
                    </div>
                    <div className="h-[75px] w-[75px] 2xl:h-[100px] 2xl:w-[100px]">
                      <Kiri className="stroke-cyan-400 mr-3" />
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full justify-between absolute bottom-1 mb-5 2xl:mb-10">
                    <div className="ml-5">
                      <h2 className="text-4xl 2xl:text-6xl font-bold">Konoha</h2>
                      <h3 className="text-xl font-medium text-neutral-400 ml-1 2xl:ml-2">Vila da Folha</h3>
                    </div>
                    <div className="h-[75px] w-[75px] 2xl:h-[100px] 2xl:w-[100px]">
                      <Konoha className="stroke-emerald-400 mr-3" />
                    </div>
                  </div>
                )}
              </button>
              <p className="self-center mt-5">Vagas restantes: {numberOfVacantSpots}</p>
              {characterVillage && characterVillage === village.id && (
                <p className="self-center mt-5">Você escolheu essa vila!</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseYourVillage;
