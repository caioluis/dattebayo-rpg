import type { User } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';

import { trpc } from '../../utils/trpc';


export const CallToCreateCharacter = ({ userId }: { userId: User['id'] }) => {
  const createCharacterMutation = trpc.character.createCharacter.useMutation();

  const handleCharacterCreation = async (userId: User['id']) => {
    const characterCreation = await createCharacterMutation.mutateAsync({
      userId
    });
    return characterCreation;
  };

  return (
    <Link
      href={''}
      onClick={() => (handleCharacterCreation(userId))}
      className="no-underline text-white hover:text-neutral-300"
    >
      <div className="mt-10 flex flex-col items-center justify-center bg-rose-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded border border-neutral-800">
        <h1 className="text-2xl text-center my-2 lg:text-5xl">
          Você ainda não possui um personagem!
        </h1>
        <p className="text-xl text-center my-2 w-full lg:text-3xl">
          Crie um agora mesmo clicando aqui!
        </p>
      </div>
    </Link>
  );
};
