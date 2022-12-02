import type { User } from "@prisma/client";
import { Navbar } from "./navigation/index";
import { FooterSocialLinksOnly } from "./pageSections/index";

export default function Layout({ children, user } : { children: JSX.Element|JSX.Element[], user: User }) {
  return (
    <>
      <Navbar user={user} />
      {children}
      <FooterSocialLinksOnly />
    </>
  );
}