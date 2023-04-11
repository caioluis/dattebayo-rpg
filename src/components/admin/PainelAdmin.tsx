import { Sections } from "./Sections";
import { Villages } from "./Villages";
import { Clans } from "./Clans";

const AdminHeader = () => {
  return (
    <div className="my-3 bg-slate-300/20 p-2 rounded">
      <h2 className="text-xl font-semibold leading-7 text-neutral-100">Painel de Administração</h2>
      <p className="mt-1 text-sm leading-6 text-neutral-200">
        As ações neste painel podem trazer consequências irreversíveis. Tenha certeza do que está fazendo.
      </p>
    </div>
  );
};

export default function PainelAdmin() {
  return (
    <form className="mt-5">
      <AdminHeader />
      <Sections />
      <Villages />
      <Clans />
    </form>
  );
}
