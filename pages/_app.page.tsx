import "react-perfect-scrollbar/dist/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "../public/assets/css/main.css";
import "leaflet/dist/leaflet.css";
import "photoswipe/dist/photoswipe.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../redux/store";
import StorageWrapper from "@/components/ecommerce/storage-wrapper";
import Preloader from "@/components/elements/Preloader";
import NextNProgress from "nextjs-progressbar";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { Router } from "next/router";
import { ToastContainer } from "react-toastify";
import { GoftinoSnippet } from "@mohsen007/react-goftino";

const GOFTINO_KEY = process.env.GOFTINO_KEY;

export default function MyApp({ Component, pageProps }: AppProps) {
  // page loading stuff
  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add("loading");
    };
    const handleStop = () => {
      document.body.classList.remove("loading");
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  return (
    <>
      <GoftinoSnippet goftinoKey={process.env.GOFTINO_KEY ?? ""} />
      <Provider store={store}>
        <StorageWrapper>
          <Layout>
            <NextNProgress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
            />
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </StorageWrapper>
      </Provider>
    </>
  );
}
