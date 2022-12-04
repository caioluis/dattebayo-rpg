import Image from 'next/image';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import { Container } from '../../components/layout/index';
import { Suna, Kiri, Konoha } from '../../components/logos';
import { useSession } from 'next-auth/react';
import { Loading } from '../../components/navigation';
import { trpc } from '../../utils/trpc';
import type { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const ChooseYourVillage: NextPage = () => {
  const { data: session, status: sessionQueryStatus } =
    trpc.auth.getSession.useQuery();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const { data: character, status: getCurrentCharacterQueryStatus } =
    trpc.character.getCurrentCharacter.useQuery({
      currentCharacter: user?.currentCharacter
    }, {
      onError: () => {
        return router.push('/');
      }
    });


  if (
    sessionQueryStatus == 'loading' ||
    getCurrentCharacterQueryStatus == 'loading'
  ) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Layout user={user}>
      <div className="flex flex-1 z-[-1]">
        <Image
          src="/wallpaperFicha.png"
          alt="Background"
          layout="fill"
          className="aspect-w-16 aspect-h-9 object-cover grayscale"
          style={{
            WebkitMaskImage:
              '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))'
          }}
        />
      </div>
      <Container>
        <div>hello</div>
      </Container>
    </Layout>
  );
};

export default ChooseYourVillage;
