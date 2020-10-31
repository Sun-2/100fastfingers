import { getCookie } from "./getCookie";
import { WS_PORT } from "@100ff/shared";
import {
  AntiCheatRequest,
  AntiCheatRequestType,
} from "@100ff/shared/dist/messages/AntiCheatRequest";
import { ws } from "./ws";

/**
 * Intercepts the AntiCheat image request and sends it to the WebSocket server.
 */
export function initializeAntiCheatWorkaround() {
  return chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (!details.url.includes("generate_word_picture")) return;

      (async () => {
        const cookie = await getCookie();
        if (true || ws.readyState === 2) {
          const msg: AntiCheatRequest = {
            type: AntiCheatRequestType,
            cookie,
          };
          ws.send(JSON.stringify(msg));
        } else {
          /*todo handle ws error*/
        }
      })();

      return {
        cancel: true,
      };
    },
    { urls: ["*://10fastfingers.com/*"] },
    ["blocking"]
  );
}
