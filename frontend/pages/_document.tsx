import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <Script src="js/js/opentok.min.js" strategy="beforeInteractive" /> */}

        <Script
          src="https://static.opentok.com/v2/js/opentok.min.js"
          strategy="beforeInteractive"
        />

        <Script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcfWwG6YBWH6LxKLqT1SKslD-ZZJRLOok&libraries=places&protocol=http"
          strategy="beforeInteractive"
        />
      </Head>
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
      <meta name="theme-color" content="#c992ae" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
