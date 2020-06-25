const ip = require("./getIPAddress");

function printDevMessage() {
  process.stdout.write("\u001b[2J\u001b[0;0H");
  console.log("项目运行中...");
  console.log();
  console.log(`本地：http://localhost:3000`);
  console.log(`远程：http://${ip}:3000`);
}

module.exports = {
  printDevMessage: printDevMessage,
};
