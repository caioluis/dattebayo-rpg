import Image from 'next/image';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import { useEffect } from 'react';

import type { User } from '@prisma/client';

import Layout from '../components/Layout';
import ChooseYourVillage from '../components/criar-ficha/ChooseVillage';
import RandomPage from '../components/criar-ficha/RandomComponent';
import { Container } from '../components/layout/index';
import { Loading } from '../components/navigation';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CreationViews = {
  1: ChooseYourVillage,
  2: RandomPage,
};


const CriarFicha: NextPage = () => {
  const [stage, setStage] = useLocalStorage("characterSheetCreationStage", 1);
  const { data: session, status: sessionQueryStatus } = useSession();

  useEffect(() => console.log('Stage changed!'), [stage]);


  if (sessionQueryStatus == 'unauthenticated' || session?.user == null) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  const user: User = session?.user;

  const CreationStageView = CreationViews[stage] ?? ChooseYourVillage;

  return (
    <Layout user={user}>
      <div className="flex flex-1 z-[-1]">
        <Image
          src="/wallpaperFicha.png"
          alt="Background"
          fill={true}
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
