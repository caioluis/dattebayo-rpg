import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { motion } from "framer-motion";

interface Clan {
  name: string;
  numberOfNinjas: number;
  hasKekkeiGenkai: boolean;
  description: string | null;
  longDescription: string | null;
  ninjasWithKekkeiGenkai: number;
  vacanciesForKekkeiGenkai: number;
}

export const Clans = () => {
  const [clanInfo, setClanInfo] = useState<Clan>({
    name: "",
    description: "",
    numberOfNinjas: 0,
    longDescription: "",
    hasKekkeiGenkai: false,
    ninjasWithKekkeiGenkai: 0,
    vacanciesForKekkeiGenkai: 0
  });

  const { data: clans } = trpc.clans.getAll.useQuery();

  const { mutate: createClan } = trpc.clans.createClan.useMutation();

  const handleClanCreation = async () => {
    const { name, hasKekkeiGenkai, vacanciesForKekkeiGenkai, description, longDescription } = clanInfo;
    createClan({
      name,
      hasKekkeiGenkai,
      vacanciesForKekkeiGenkai,
      description,
      longDescription
    });
  };

  return (
    <div className="flex flex-col justify-around bg-neutral-1000/50 rounded-lg mt-10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-neutral-900/10 pb-12 md:grid-cols-3 p-4">
        <div>
          <h2 className="text-base font-semibold leading-7 text-neutral-100">Criar clã</h2>
          <p className="mt-1 text-sm leading-6 ">Cria uma novo clã seguindo os parâmetros apresentados.</p>
          <p className="mt-1 text-sm leading-6 ">
            A primeira descrição deve ser algo sucinto que dê uma visão geral do clã.
          </p>
          <p className="mt-1 text-sm leading-6 ">
            A descrição mais longa é autoexplicativa; Mete a dissertação palestrinha!
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <label htmlFor="nome-do-cla" className="block text-sm font-medium leading-6 text-neutral-100">
              Nome do clã *
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nome-do-cla"
                id="nome-do-cla"
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-500 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                value={clanInfo.name}
                onChange={(e) => setClanInfo({ ...clanInfo, name: e.target.value })}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="tem-kekkei-genkai" className="block text-sm font-medium leading-6 text-neutral-100">
              O clã tem Kekkei Genkai?
            </label>
            <div
              onClick={() => setClanInfo({ ...clanInfo, hasKekkeiGenkai: !clanInfo.hasKekkeiGenkai })}
              className={
                `flex w-10 bg-neutral-100/60 rounded-lg p-1 ` +
                (clanInfo.hasKekkeiGenkai ? "justify-end" : "justify-start")
              }
            >
              <motion.div
                className="rounded-full h-4 w-4"
                layout
                initial={{
                  backgroundColor: "#FCD34D"
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                animate={{
                  justifyContent: clanInfo.hasKekkeiGenkai ? "flex-end" : "flex-start",
                  backgroundColor: clanInfo.hasKekkeiGenkai ? "#26ee13" : "#ad2626"
                }}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="vagas-kg" className="block text-sm font-medium leading-6 text-neutral-100">
              Vagas para a Kekkei Genkai
            </label>
            <div className="mt-2">
              <input
                id="vagas-kg"
                name="vagas-kg"
                type="number"
                min={0}
                max={15}
                className={
                  `block w-14 rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6 ` +
                  (clanInfo.hasKekkeiGenkai ? "" : "bg-neutral-100/60")
                }
                value={clanInfo.vacanciesForKekkeiGenkai || undefined}
                onChange={(e) => setClanInfo({ ...clanInfo, vacanciesForKekkeiGenkai: Number(e.target.value) })}
                disabled={!clanInfo.hasKekkeiGenkai}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
