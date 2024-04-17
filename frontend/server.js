require("dotenv").config();
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 9161;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const fs = require("fs");

app.prepare().then(() => {
  const httpsOptions = {
    key: fs.readFileSync("/home/jenkins/SSL/ss.key", "utf8"),
    cert: fs.readFileSync("/home/jenkins/SSL/ss.crt", "utf8"),
  };

  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on ${hostname}:${port}`);
    });
});
