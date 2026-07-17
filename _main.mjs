import { spawn } from "node:child_process";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import {validateSubscription} from "./subscription.mjs";

await validateSubscription();

const file = fileURLToPath(import.meta.resolve("./main.sh")); // 👈 CHANGE ME!
const subprocess = spawn("bash", [file], { stdio: "inherit" });
const [exitCode, signal] = await once(subprocess, "exit");
if (signal) {
  process.kill(process.pid, signal);
} else {
  process.exit(exitCode);
}
