import { Fragment } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useClerk } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const NavLink = ({ pathRouter, linkPath, label }: { pathRouter: string; linkPath: string; label: string }) => (
  <Link
    href={linkPath}
    className={
      pathRouter === linkPath
        ? "bg-neutral-1000 text-white px-3 py-2 rounded-md text-sm font-medium no-underline hover:no-underline"
        : "text-neutral-300 hover:bg-neutral-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline hover:no-underline"
    }
  >
    {label}
  </Link>
);

const NavLinkMobile = ({ pathRouter, linkPath, label }: { pathRouter: string; linkPath: string; label: string }) => (
  <Disclosure.Button
    as={Link}
    href={linkPath}
    className={
      pathRouter === linkPath
        ? "bg-neutral-900 text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
        : "text-neutral-300 hover:bg-neutral-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
    }
  >
    {label}
  </Disclosure.Button>
);

export const Navbar = ({ user }: { user: UserResource | null }) => {
  const { signOut } = useClerk();

  // placeholder 100x100 image
  let userImage = "https://via.placeholder.com/100x100";
  let userName = "Visitante";

  if (user) {
    userImage = user.profileImageUrl;
    userName = user.username as string;
  }

  const path = useRouter().pathname;
  return (
    <Disclosure as="nav" className="bg-neutral-900 shadow-sm">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex flex-row items-center gap-2 z-index">
                  <div>
                    <Image src="/DattebayoLogo.svg" height={32} width={32} alt="Dattebayo!" />
                  </div>
                  <div>
                    <Image src="/DattebayoNameLogo.svg" height={32} width={180} alt="Dattebayo!" />
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <NavLink pathRouter={path} linkPath="/" label="Início" />
                    <NavLink pathRouter={path} linkPath="/database" label="Database" />
                    {user?.publicMetadata?.cargos == "admin" && (
                      <NavLink pathRouter={path} linkPath="/admin" label="Painel administrativo" />
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative z-[5]">
                    <div>
                      <Menu.Button className="bg-neutral-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white">
                        <span className="sr-only">Abrir menu</span>
                        <div className="w-8 h-8">
                          <Image className="rounded-full" src={userImage} fill alt="Foto de perfil" />
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl py-1 bg-neutral-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/perfil"
                              className={classNames(
                                active ? "bg-neutral-700" : "",
                                "block px-4 py-2 text-sm text-neutral-100 no-underline"
                              )}
                            >
                              Perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-neutral-700" : "",
                                "block px-4 py-2 text-sm text-neutral-100 w-full text-left no-underline"
                              )}
                              onClick={() => signOut()}
                            >
                              Sair
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLinkMobile pathRouter={path} linkPath="/" label="Início" />
              <NavLinkMobile pathRouter={path} linkPath="/database" label="Database" />
              <NavLinkMobile pathRouter={path} linkPath="/admin" label="Painel administrativo" />
            </div>
            <div className="pt-4 pb-3 border-t border-neutral-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="relative w-8 h-8">
                    <Image className="rounded-full" fill src={userImage} alt="Foto de perfil" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{userName}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <>
                  <NavLinkMobile pathRouter={path} linkPath="/perfil" label="Perfil" />
                  <NavLinkMobile pathRouter={path} linkPath="/perfil" label="Sair" />
                </>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
