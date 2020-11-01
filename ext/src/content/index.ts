import { submitChallenge } from "./submitChallenge";
import { Message } from "../api/Message";
import {
  REQUEST_SUBMIT_CHALLENGE,
  RequestSubmitChallenge,
} from "../api/RequestSubmitChallenge";

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
      break;
    default:
      throw new Error("Unrecognized message.");
  }

  sendResponse("ok");
});
