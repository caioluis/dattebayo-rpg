import Image from "next/image";
import { signIn } from "next-auth/react";

export const Register = () => {
    return (
      <>
        <main className="flex flex-col" >
          <div>
            <div className="fixed z-[-1] h-screen w-screen">
              <Image
                src="/register/background.png"
                fill={true}
                className="aspect-w-16 aspect-h-9 object-cover"
                alt="Background"
              />
            </div>
            <div className="absolute h-[330px] w-[280px] md:h-[500px] md:w-[400px] lg:h-[750px] lg:w-[650px] 2xl:h-[1050px] 2xl:w-[880px] 3xl:h-[1600px] 3xl:w-[1288px]  bottom-0  z-[3]  left-[50px] md:left-[180px] lg:left-[-50px] xl:left-[30px] 3xl:left-[300px]">
              <Image
                  src="/register/naruto.png"
                  fill={true}
                  alt="Naruto"
                />
            </div>
          </div>
          <div className="absolute h-[35px] w-full lg:h-[80px] mt-4 flex items-center 3xl:h-[140px] 3xl:mt-12">
            <Image
                src="/DattebayoNameLogo.svg"
                alt="Dattebayo!"
                fill={true}
            />
          </div>
          <div className="flex flex-col mt-20 lg:justify-center lg:mt-52 2xl:mt-80 3xl:mt-[550px]">
            <div className="flex flex-col items-center lg:ml-auto lg:mr-16 lg:w-[400px] xl:w-[600px] xl:mr-24 2xl:mr-52 2xl:w-[800px] 3xl:w-[1200px] 3xl:mr-72">
              <div className="my-4" >
                <h1 className="text-5xl text-center text-white font-extrabold mb-4 xl:text-7xl">Olá, Genin!</h1>
                <p className="text-center font-semibold xl:text-3xl">Seja bem-vindo ao <em>Dattebayo!</em>, O RPG de Naruto mais completo da internet.</p>
              </div>
              <hr className="w-[60%] border-none bg-[#F29B30] h-1 rounded shadow-[0px_0px_14px_#F29B30]"/>
              <p className="text-center font-semibold m-2 mt-5 xl:text-3xl">Para começar, você precisa criar uma conta.<br />
              É rápido e fácil!</p>
              <SignInButton />
            </div>
          </div>
        </main>
      </>
    );
  };
  
  const SignInButton: React.FC = () => {
    return (
        <button
          className="flex items-center gap-4 bg-[#5865F2] font-semibold text-white rounded-lg px-2 py-1 sm:px-3 sm:py-1 xl:text-xl 2xl:text-2xl 3xl:text-3xl 3xl:px-10 3xl:py-4"
          onClick={() => signIn('discord')}
        >
          Cadastre-se ou faça Login
          <Image
              src="/discord-mark-white.svg"
              alt="Cadastro pelo Discord"
              width={24}
              height={24}
              className="z-[4] mx-auto my-4"
          />
        </button>
    );
  };