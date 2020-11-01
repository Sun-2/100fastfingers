import * as ws from "websocket";
import * as http from "http";
import {
  AntiCheatRequest,
  AntiCheatRequestType,
  Message,
  WS_PORT,
} from "@100ff/shared";
import { recognize } from "./recognize";
import { getAntiCheatText } from "./getAntiCheatText";
import { sendAntiCheatAnswer } from "./sendAntiCheatAnswer";

const server = http.createServer();

server.listen(WS_PORT, function () {
  console.log("Server is listening on port 8080");
});

const wsServer = new ws.server({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on("request", async function (request) {
  const connection = request.accept();
  console.log(`Got connection.`);

  connection.on("message", async function (message) {
    console.log(`Got message.`, message.utf8Data);

    if (!message.utf8Data) return console.error(`Unrecognized WS message.`);
    const msg: Message = JSON.parse(message.utf8Data);
    switch (msg.type) {
      case AntiCheatRequestType:
        const antiCheatMessage = msg as AntiCheatRequest;
        const text = await getAntiCheatText(antiCheatMessage.cookie);
        await sendAntiCheatAnswer(
          text.replace(/\s+/g, " ").trim().split(" "),
          antiCheatMessage.cookie
        );
      default:
        console.error("Unknown WS message type:", msg.type);
    }
  });

  connection.on("close", function (reasonCode, description) {
    console.log(`Connection closed.`);
  });
});
