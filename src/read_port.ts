import { parse } from "../deps.ts";

export function readPort(): number {
  const parsedArgs = parse(Deno.args);
  return typeof parsedArgs.port === "number" ? parsedArgs.port : 8080;
}
