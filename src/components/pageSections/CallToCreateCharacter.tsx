import Link from "next/link";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";
import type { UserResource } from "@clerk/types";

export const CallToCreateCharacter = ({ userId }: { userId: UserResource["id"] }) => {
  const router = useRouter();

  const createCharacterMutation = trpc.characters.createCharacter.useMutation();
  const { mutate: updateUserMetadata, error } = trpc.users.updateUserMetadata.useMutation();

  const handleCharacterCreation = async (userId: UserResource["id"]) => {
    await createCharacterMutation.mutateAsync(
      {
        userId
      },
      {
        onSuccess: (characterId) => {
          updateUserMetadata({
            id: userId,
            currentCharacterId: characterId,
            maxNumberOfCharacters: 0,
            rank: 1,
            currentVillageId: 99
          });
          if (error) {
            return alert(error);
          }
          router.push(`/criar-ficha/`);
        },
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
