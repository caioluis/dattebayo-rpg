
import type { NextPage } from 'next';

import { Suna, Kiri, Konoha } from '../../components/logos';
import { Loading } from '../../components/navigation';
import { trpc } from '../../utils/trpc';
import type { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const RandomPage: NextPage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold">Random Page</h1>
    </div>
  );
};

export default RandomPage;
