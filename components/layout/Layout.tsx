import dynamic from "next/dynamic";
import { useState } from "react";
import Head from "next/head";
import ScrollButton from "../widgets/scroll-button";
// import useSecureCall from "@/hooks/use-secure-call";
// import IntroPopup from "@/pages/price/IntroPopup";

const Footer = dynamic(() => import("./Footer"));
const Header = dynamic(() => import("@/components/partials/header"));
const MobileMenu = dynamic(() => import("./MobileMenu"));
const BottomNav = dynamic(() => import("../partials/BottomNav"));

const GoogleTagManagerScript = dynamic(() =>
  import("../partials/GoogleTagManager").then(
    (mod) => mod.GoogleTagManagerScript
  )
);
const GoogleTagManagerIFrame = dynamic(() =>
  import("../partials/GoogleTagManager").then(
    (mod) => mod.GoogleTagManagerIFrame
  )
);

const MotomoScript = dynamic(() =>
  import("../partials/Matomo").then((mod) => mod.MatomoScript)
);

const MicrosoftClarityScript = dynamic(
  () => import("../partials/MicrosoftClarityScript")
);

type LayoutType = {
  children?: JSX.Element | JSX.Element[];
  parent?: string;
  sub?: string;
  child?: string;
  subChild?: string;
  noBreadcrumb?: string;
  headerStyle?: any;
  className?: string;
};

const Layout = (props: LayoutType) => {
  const { children, parent, sub, subChild, noBreadcrumb, headerStyle } = props;

  const [isToggled, setToggled] = useState(false);
  const toggleClick = () => {
    setToggled(!isToggled);
    isToggled
      ? //@ts-ignore
        document.querySelector("body").classList.remove("mobile-menu-active")
      : //@ts-ignore
        document.querySelector("body").classList.add("mobile-menu-active");
  };

  // const { CallModalsContainer, handleCallVendor } = useSecureCall();

  return (
    <>
      <Head>
        {process.env.APP_ENV !== "production" && (
          <meta name="robots" content="noindex" />
        )}

        {process.env.APP_ENV === "production" && <GoogleTagManagerScript />}
        {process.env.APP_ENV === "production" && <MicrosoftClarityScript />}
        {process.env.APP_ENV === "production" && <MotomoScript />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isToggled && (
        <div className="body-overlay-1" onClick={toggleClick}></div>
      )}
      <Header
        //@ts-ignore
        headerStyle={headerStyle}
        isToggled={isToggled}
        toggleClick={toggleClick}
      />
      <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
      {/* <BottomNav /> */}
      <main className="main">
        {process.env.APP_ENV === "production" && <GoogleTagManagerIFrame />}

        {children}
        <ScrollButton />
      </main>

      {/* <IntroPopup handleCall={handleCallVendor} />
      <CallModalsContainer /> */}
      <Footer />
    </>
  );
};

export default Layout;
