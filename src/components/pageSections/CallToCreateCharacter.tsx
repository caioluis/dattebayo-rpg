import Link from "next/link";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import type { UserResource } from "@clerk/types";

export const CallToCreateCharacter = ({ userId }: { userId: UserResource["id"] | undefined }) => {
  const router = useRouter();

  const createCharacterMutation = trpc.character.createCharacter.useMutation();

  const handleCharacterCreation = async (userId: UserResource["id"] | undefined) => {
    if (!userId) return;
    await createCharacterMutation.mutateAsync(
      {
        userId
      },
      {
        onSuccess: () => router.push(`/criar-ficha/`),
        onError: (error) => alert(error)
      }
    );
  };

  return (
    <Link
      href={" "}
      onClick={() => handleCharacterCreation(userId)}
      className="no-underline text-white hover:text-neutral-300"
    >
      <div className="mt-10 flex flex-col items-center justify-center bg-rose-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded border border-neutral-800">
        <h1 className="text-2xl text-center my-2 lg:text-5xl">Você ainda não possui um personagem!</h1>
        <p className="text-xl text-center my-2 w-full lg:text-3xl">Crie um agora mesmo clicando aqui!</p>
      </div>
    </Link>
  );
};
