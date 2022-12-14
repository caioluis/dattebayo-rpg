import Image from 'next/image';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

import { trpc } from '../utils/trpc';

import type { User } from '@prisma/client';

import Layout from '../components/Layout';
import ChooseYourVillage from '../components/criar-ficha/ChooseVillage';
import { Container } from '../components/layout/index';
import { Loading } from '../components/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CreationViews = {
  1: ChooseYourVillage,
};


const CriarFicha: NextPage = () => {
  const [stage, setStage] = useLocalStorage("characterSheetCreationStage", 1);
  const { data: session, status: sessionQueryStatus } = trpc.auth.getSession.useQuery();
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    if (session) {
      setUser(session.user ?? null);
    }
  }, [session]);

  useEffect(() => console.log('Stage changed!'), [stage]);

  if (sessionQueryStatus == 'loading') {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  const CreationStageView = CreationViews[stage] ?? ChooseYourVillage;

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
        <CreationStageView user={user} setStage={setStage}/>
      </Container>
    </Layout>
  );
};

export default CriarFicha;
