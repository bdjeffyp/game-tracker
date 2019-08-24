const shelljs = require("shelljs");

shelljs.exec("npm run watch:koji", { async: true, cwd: process.cwd() });
const webpackProcess = shelljs.exec("npm run watch:client", {async: true, cwd: process.cwd() });

function shutdown() {
  webpackProcess.kill();
  process.exit();
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
