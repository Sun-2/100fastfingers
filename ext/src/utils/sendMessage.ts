import { Message } from "../api/Message";

export type MessageTarget = "background" | "content" | "popup";
export const sendMessage = async <T extends Message>(
  message: T,
  target: MessageTarget
) =>
  new Promise((res) => {
    if (target === "content") {
      chrome.tabs.query({ url: "*://10fastfingers.com/*" }, (tabs) => {
        if (!tabs.length)
          throw new Error(`No tab found for message of type ${message.type}`);
        chrome.tabs.sendMessage(tabs[0].id!, message, res);
      });
    } else {
      chrome.runtime.sendMessage(message, res);
    }
  });
