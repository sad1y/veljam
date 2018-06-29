import { createServer } from "http";
import { parse } from "url";
import * as next from "next";

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
    // const { pathname, query } = parsedUrl;

    // if (pathname === '/a') {
    //  app.render(req, res, '/a', query)
    // } else {
    //  handle(req, res, parsedUrl);
    // }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port} !!!`);
  });
});
