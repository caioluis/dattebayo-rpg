import { useUser, RedirectToSignIn, SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import Layout from "../../components/Layout";
import { type NextPage } from "next";

import { Container, NarrowContainer } from "../../components/layout/index";
import { Loading } from "../../components/navigation";
import Background from "../../components/layout/Background";

const Perfil: NextPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="grid place-items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Layout user={user}>
          <Background src="/main-wallpaper.jpg" />
          <Container>
            <NarrowContainer>
              <UserProfile
                path="/perfil"
                routing="path"
                appearance={{
                  elements: {
                    rootBox: "mt-5",
                    profileSectionContent: "pb-3",
                    form: "pb-3",
                    breadcrumbsItems: "pt-3",
                    page: "gap-0 min-h-0",
                    pageScrollBox: "justify-center py-0 px-[1rem]",
                    navbarMobileMenuButton: "hidden",
                    profileSectionTitle__profile: "hidden",
                    avatarBox: "w-24 h-24",
                    formField__firstName: "hidden",
                    formField__lastName: "hidden",
                    navbar: "hidden",
                    profilePage__security: "hidden",
                    navbarButton__security: "hidden",
                    profileSection__connectedAccounts: "hidden",
                    profileSection__emailAddresses: "hidden"
                  }
                }}
              />
            </NarrowContainer>
          </Container>
        </Layout>
      </SignedIn>
    </>
  );
};

export default Perfil;
