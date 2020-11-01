import { submitChallenge } from "./submitChallenge";
import { Message } from "../api/Message";
import {
  REQUEST_SUBMIT_CHALLENGE,
  RequestSubmitChallenge,
} from "../api/RequestSubmitChallenge";
import { getAntiCheatImage } from "./getAntiCheatImage";
import { OkMessage } from "../api/OkMessage";

console.log(`Initializing 100fastfingers cheat.`);

chrome.runtime.onMessage.addListener(function (
  request: Message,
  sender,
  sendResponse
) {
  console.log("req", request);
  switch (request.type) {
    case REQUEST_SUBMIT_CHALLENGE:
      const msg = request as RequestSubmitChallenge;
      submitChallenge(msg.wpm);
      sendResponse({ type: "OK" } as OkMessage);
      break;
    case "GET_ANTICHEAT_IMAGE":
      getAntiCheatImage().then((img) => sendResponse(img));
      break;
    default:
      throw new Error("Unrecognized message.");
  }

  return true;
});
