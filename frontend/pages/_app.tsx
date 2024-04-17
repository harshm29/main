import React, { useEffect, useState } from "react";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import "../public/assets/css/style.scss";
import "react-toastify/dist/ReactToastify.css";
import { MyAppProps } from "../src/components/common/types";
import { Layouts } from "../src/components/common/Layouts";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Loading from "./loading";

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const Layout =
    Layouts[Component.Layout] ?? (({ children }) => <>{children}</>);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service-worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>SGRD</title>
      </Head>

      <Layout>
        <>
          <ToastContainer />
          {isLoading && <Loading />}
          <Component {...pageProps} />
        </>
      </Layout>
    </>
  );
}
