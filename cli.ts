import { Application } from "./deps.ts";
import { setupRouter } from "./src/setup_router.ts";
import { type ProxyConfigs, readConfig } from "./src/read_config.ts";
import { readPort } from "./src/read_port.ts";

const app = new Application();
const config = readConfig();
const router = setupRouter(config);
const port = readPort();

console.info(router);

app.use(router.routes());
app.use(router.allowedMethods());

console.info(`Start Server! port=${port}`);
await app.listen({ port });
