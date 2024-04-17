/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = withPWA(nextConfig);

module.exports = {
  images: {
    domains: ["OLPSs3.s3.amazonaws.com"],
  },
};
module.exports = {
  basePath: process.env.HOST,
  publicRuntimeConfig: {
    includeOpenTokScript: true,
  },
};
module.exports = {
  env: {
    OT_API_KEY: process.env.OT_API_KEY,
    OT_SESSION_ID: process.env.OT_SESSION_ID,
    API_URL_LOCAL: process.env.API_URL_LOCAL,
    API_URL: process.env.API_URL,
    SOCKET_URL: process.env.SOCKET_URL,
    STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
    S3_BUCKET: process.env.NEXT_APP_AWS_bucketName,
    REGION: process.env.NEXT_APP_AWS_regionName,
    ACCESS_KEY: process.env.NEXT_APP_AWS_accessKeyId,
    SECRET_ACCESS_KEY: process.env.NEXT_APP_AWS_secretAccessKey,
    REACT_APP_GOOGLE_KEY: process.env.REACT_APP_GOOGLE_KEY,
  },
};

module.exports = {
  trailingSlash: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

// next.config.js
// module.exports = {
//   async headers() {
//     return [
//       {
//         source: "/_next/:path*",
//         headers: [
//           {
//             key: "Access-Control-Allow-Origin",
//             value: "http://localhost:9168/",
//           },
//         ],
//       },
//     ];
//   },
// };

// next.config.js
// module.exports = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "http://localhost:9168/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//         ],
//       },
//     ];
//   },
// };
