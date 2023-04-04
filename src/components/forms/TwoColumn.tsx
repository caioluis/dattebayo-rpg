import { useState } from "react";
import { trpc } from "../../utils/trpc";

interface sectionProps {
  title: string;
  description: string;
  parentSectionId?: number | null;
}

interface villageProps {
  name: string;
  portugueseName: string;
  maxNumberOfNinjas: number;
}

export default function PainelAdmin() {
  // create a state object for those 3 fields on the form
  const [sectionInfo, setSectionInfo] = useState<sectionProps>({
    title: "",
    description: ""
  });

  const [villageInfo, setVillageInfo] = useState<villageProps>({
    name: "",
    portugueseName: "",
    maxNumberOfNinjas: 5
  });

  const { data: allSections, status: sectionsQueryStatus } = trpc.sections.getAll.useQuery();

  const { mutate: createSection } = trpc.sections.createSection.useMutation();
  const { mutate: createVillage } = trpc.village.createVillage.useMutation();

  const handleSectionCreation = async () => {
    const { title, description, parentSectionId } = sectionInfo;
    const newSection = createSection({
      title,
      description,
      parentSectionId
    });
    console.log(newSection);
  };

  const handleVillageCreation = async () => {
    const { name, portugueseName, maxNumberOfNinjas } = villageInfo;
    const newVillage = createVillage({
      name,
      portugueseName,
      maxNumberOfNinjas
    });
    console.log(newVillage);
  };

  return (
    <form className="mt-5">
      <div className="my-3 bg-slate-300/20 p-2 rounded">
        <h2 className="text-xl font-semibold leading-7 text-neutral-100">Painel de Administração</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-200">
          As ações neste painel podem trazer consequências irreversíveis. Tenha certeza do que está fazendo.
        </p>
      </div>
      <div className="flex flex-col justify-around bg-neutral-1000/50 rounded-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-neutral-900/10 pb-12 md:grid-cols-3 p-4">
          <div>
            <h2 className="text-base font-semibold leading-7 text-neutral-100">Criar seção</h2>
            <p className="mt-1 text-sm leading-6 ">Cria uma nova seção seguindo os parâmetros apresentados.</p>
            <p className="mt-1 text-sm leading-6 ">O título e descrição deverão ser preferencialmente curtos.</p>
            <p className="mt-1 text-sm leading-6 ">Não é necessário escolher uma seção pai, mas é possível.</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label htmlFor="titulo-da-secao" className="block text-sm font-medium leading-6 text-neutral-100">
                Título *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="titulo-da-secao"
                  id="titulo-da-secao"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-500 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                  value={sectionInfo.title}
                  onChange={(e) => setSectionInfo({ ...sectionInfo, title: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="descricao-secao" className="block text-sm font-medium leading-6 text-neutral-100">
                Descrição *
              </label>
              <div className="mt-2">
                <input
                  id="descricao-secao"
                  name="descricao-secao"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                  value={sectionInfo.description}
                  onChange={(e) => setSectionInfo({ ...sectionInfo, description: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="parentSection" className="block text-sm font-medium leading-6 text-neutral-100">
                Seção pai
              </label>
              <div className="mt-2">
                <select
                  id="parentSection"
                  name="parentSection"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={sectionInfo.parentSectionId?.toString()}
                  onChange={(e) => setSectionInfo({ ...sectionInfo, parentSectionId: Number(e.target.value) })}
                >
                  <option></option>
                  {allSections?.map((section) => {
                    if (section.parentSectionId === null) {
                      return (
                        <option key={section.id} value={section.id}>
                          {section.title}
                        </option>
                      );
                    }
                    return (
                      <option key={section.id} value={section.id} disabled>
                        &emsp;└ {section.title}
                      </option>
                    );
                  })}
                </select>
                <div>{sectionsQueryStatus === "loading" && <div>Carregando...</div>}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 pb-5 pr-4">
          <button
            type="button"
            className="text-sm font-semibold leading-6 "
            onClick={() => setSectionInfo({ title: "", description: "" })}
          >
            Limpar campos
          </button>
          <button
            type="submit"
            onClick={handleSectionCreation}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Criar Seção
          </button>
        </div>
      </div>

      <div className="mt-10 bg-neutral-1000/50 rounded-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-neutral-900/10 pb-12 md:grid-cols-3 p-4">
          <div>
            <h2 className="text-base font-semibold leading-7 text-neutral-100">Criar Vila</h2>
            <p className="mt-1 text-sm leading-6 ">Cria uma nova vila seguindo os parâmetros apresentados.</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-4">
              <label htmlFor="nome-da-vila" className="block text-sm font-medium leading-6 text-neutral-100">
                Nome da vila em Japonês (Rōmaji)*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nome-da-vila"
                  id="nome-da-vila"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-500 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                  value={villageInfo.name}
                  onChange={(e) => setVillageInfo({ ...villageInfo, name: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="nome-vila-portugues" className="block text-sm font-medium leading-6 text-neutral-100">
                Nome da Vila em Português *
              </label>
              <div className="mt-2">
                <input
                  id="nome-vila-portugues"
                  name="nome-vila-portugues"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                  value={villageInfo.portugueseName}
                  onChange={(e) => setVillageInfo({ ...villageInfo, portugueseName: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="max-player-capacity" className="block text-sm font-medium leading-6 text-neutral-100">
                Máximo de jogadores na Vila *
              </label>
              <div className="mt-2">
                <input
                  id="max-player-capacity"
                  name="max-player-capacity"
                  type="number"
                  min={5}
                  max={100}
                  className="block w-14 rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-orange-700 sm:text-sm sm:leading-6"
                  value={villageInfo.maxNumberOfNinjas}
                  onChange={(e) => setVillageInfo({ ...villageInfo, maxNumberOfNinjas: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 pb-5 pr-4">
          <button
            className="text-sm font-semibold leading-6 "
            onClick={() => setVillageInfo({ name: "", portugueseName: "", maxNumberOfNinjas: 5 })}
          >
            Limpar campos
          </button>
          <button
            onClick={handleVillageCreation}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Criar Vila
          </button>
        </div>
      </div>
    </form>
  );
}
