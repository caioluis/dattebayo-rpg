import { useState } from "react";
import { trpc } from "../../../utils/trpc";

interface SectionProps {
  title: string;
  description: string;
  parentSectionId?: number | null;
}

export const Sections = () => {
  const { data: allSections, status: sectionsQueryStatus } = trpc.sections.getAll.useQuery();

  const [sectionInfo, setSectionInfo] = useState<SectionProps>({
    title: "",
    description: ""
  });

  const { mutate: createSection } = trpc.sections.createSection.useMutation();

  const handleSectionCreation = async () => {
    const { title, description, parentSectionId } = sectionInfo;
    createSection({
      title,
      description,
      parentSectionId
    });
  };

  return (
    <div className="flex flex-col justify-around bg-neutral-1000/50 rounded-lg mt-10">
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
  );
};
