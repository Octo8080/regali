import { proxy, Router } from "../deps.ts";
import { type ProxyConfigs } from "./read_config.ts";

function setupProxy(
  path: string,
  params: { target: string; replace: boolean },
) {
  return proxy(params.target, {
    parseReqBody: true,
    async proxyReqUrlDecorator(url, req) {
      if (params.replace) {
        url.pathname = req.url.pathname.replace(new RegExp(`^${path}`), "");
        return url;
      }
      url.pathname = req.url.pathname;
      console.log(`Request: ${url.pathname}`);
      console.log(`=>Params: ${JSON.stringify(await req.body().value)}`);
      return url;
    },
    srcResDecorator: (req, _res, _proxyRes, proxyResData) => {
      const data = new TextDecoder().decode(proxyResData);
      console.log(`Request: ${req.url.pathname}`);
      console.log(`=>Response: ${data}`);
      return proxyResData;
    },
  });
}

export function setupRouter(setup: ProxyConfigs): Router {
  const router = new Router();

  (Object.keys(setup) as (keyof typeof setup)[])
    .forEach((key) => {
      if (typeof key !== "string") return;
      router.all(`${key}(.*)`, setupProxy(key, setup[key]));
    });
  return router;
}
