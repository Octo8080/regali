import { parse } from "../deps.ts";

interface ProxyConfig {
  target: string;
  replace: boolean;
}

export interface ProxyConfigs {
  [key: string]: ProxyConfig;
}

export function readConfig(): ProxyConfigs {
  const parsedArgs = parse(Deno.args);

  const importFileName = typeof parsedArgs["config"] === "string"
    ? parsedArgs["config"]
    : "proxy_config.json";

  let readConfig: string;

  try {
    readConfig = Deno.readTextFileSync(importFileName);
  } catch (error) {
    if (error.name === "NotFound") {
      console.error(
        `Import Config file [${importFileName}] is not Found!!\nplease confirm.`,
      );

      Deno.exit();
    }
    throw error;
  }

  return JSON.parse(readConfig) as ProxyConfigs;
}
