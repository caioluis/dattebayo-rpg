import { useState } from "react";
import { trpc } from "../../../utils/trpc";

enum AdvantageType {
  "Especial",
  "Física",
  "Psicológica e Social",
  "Shinobi"
}

enum Modifiers {
  strength = "Força",
  stamina = "Stamina",
  handSeals = "Selos",
  speed = "Velocidade",
  ninjutsu = "Ninjutsu",
  genjutsu = "Genjutsu",
  taijutsu = "Taijutsu",
  intelligence = "Inteligência"
}

interface AdvantageProps {
  name: string;
  type: number;
  points: number;
  effects: string;
  requirements: string;
  modifiers: {
    [key: string]: number;
  };
  requiresManualApproval: boolean;
  requirementsDescription: string;
}

export const Advantages = () => {
  const [modifiers, setModifiers] = useState({
    speed: 0,
    stamina: 0,
    strength: 0,
    ninjutsu: 0,
    genjutsu: 0,
    taijutsu: 0,
    handSeals: 0,
    intelligence: 0
  });

  return (
    <div className="mt-10 bg-neutral-1000/50 rounded-lg">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-neutral-900/10 pb-12 md:grid-cols-3 p-4">
        <div>
          <h2 className="text-base font-semibold leading-7 text-neutral-100">Criar Vantagem</h2>
          <p className="mt-1 text-sm leading-6 ">Cria uma nova vantagem seguindo os parâmetros apresentados.</p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <label htmlFor="nome-da-vila" className="block text-sm font-medium leading-6 text-neutral-100">
              Nome da Vantagem
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="nome-da-vila"
                id="nome-da-vila"
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-500 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="tipo-de-vantagem" className="block text-sm font-medium leading-6 text-neutral-100">
              Tipo de Vantagem
            </label>
            <div className="mt-2">
              <select
                id="tipo-de-vantagem"
                name="tipo-de-vantagem"
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              >
                <option value={AdvantageType.Especial}>{AdvantageType[0]}</option>
                <option value={AdvantageType.Física}>{AdvantageType[1]}</option>
                <option value={AdvantageType["Psicológica e Social"]}>{AdvantageType[2]}</option>
                <option value={AdvantageType.Shinobi}>{AdvantageType[3]}</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="pontos-vantagem" className="block text-sm font-medium leading-6 text-neutral-100">
              Número de Pontos
            </label>
            <div className="mt-2">
              <input
                id="pontos-vantagem"
                name="pontos-vantagem"
                type="number"
                min={1}
                max={3}
                value={1}
                className="block w-14 rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="requisitos" className="block text-sm font-medium leading-6 text-neutral-100">
              Hash dos Requisitos
            </label>
            <div className="mt-2">
              <input
                id="requisitos"
                name="requisitos"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="requisitos-manuais" className="block text-sm font-medium leading-6 text-neutral-100">
              Tem requisitos manuais?
            </label>
            <div className="mt-2">
              <input
                id="requisitos-manuais"
                type="checkbox"
                className="block w-4 h-4 rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-5">
            <label htmlFor="requisitos" className="block text-sm font-medium leading-6 text-neutral-100">
              Requisitos
            </label>
            <div className="mt-2">
              <textarea
                id="requisitos"
                name="requisitos"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-5">
            <label htmlFor="efeitos" className="block text-sm font-medium leading-6 text-neutral-100">
              Efeitos da Vantagem (Descrição)
            </label>
            <div className="mt-2">
              <textarea
                id="efeitos"
                name="efeitos"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium leading-6 text-neutral-100">Modificadores</label>
            <div className="mt-2 grid grid-cols-4 gap-y-4 gap-x-2">
              {Object.keys(modifiers).map((modifier) => (
                <div key={modifier} className="flex flex-col items-center">
                  <label htmlFor={modifier} className="block text-sm font-medium leading-6 text-neutral-100">
                    {Modifiers[modifier]}
                  </label>
                  <input
                    id={modifier}
                    name={modifier}
                    type="number"
                    className="block w-14 rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                    value={modifiers[modifier] || 0}
                    onChange={(e) => {
                      setModifiers({
                        ...modifiers,
                        [modifier]: e.target.value
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 pb-5 pr-4">
        <button className="text-sm font-semibold leading-6 ">Limpar campos</button>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Criar Vantagem
        </button>
      </div>
    </div>
  );
};
