const netData = require("os").networkInterfaces(); //服务器本机地址
const wlanData = Object.values(netData)[0];

let ipv4 = "";

for (var i = 0; i < wlanData.length; i++) {
  const alias = wlanData[i];

  if (
    alias.family === "IPv4" &&
    alias.address !== "127.0.0.1" &&
    !alias.internal
  ) {
    ipv4 = alias.address;
  } else {
    ipv4 = "127.0.0.1";
  }
}

module.exports = ipv4;
