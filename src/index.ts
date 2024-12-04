import html from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";

new Elysia()
  .use(staticPlugin({ assets: "dist" }))
  .use(html())
  .get(
    "/",
    () => `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>React App</title>
        </head>
        <body>
          <div id="root"></div>
          <script src="/public/page.js"></script>
        </body>
      </html>
    `
  )
  .listen(3000);
