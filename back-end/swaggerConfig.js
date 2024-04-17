const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Online Live Polling System",
      description:
        "The Online Live Polling System is a web application designed for conducting polls and collecting votes in real-time during elections or events. It caters to two main user roles: the admin, responsible for creating and managing polls, and the audience, who participate by voting.",
      contact: {
        name: "OLPS",
      },
      servers: [`${process.env.HOST}`],
    },
    host: process.env.HOST,

    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        schema: "bearer",
        in: "header",
      },
    },
  },
  apis: [
    "./routes*.js",
    "./routes/index.js",
    "./routes/poll.js",
    "./routes/users.js",
  ],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
