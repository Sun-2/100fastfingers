import { decodeUtf8 } from "../utils/decodeUtf8";
import { getCookie } from "./getCookie";
import { getCookieStoreForTab } from "./getCookieStoreForTab";

const sent = new Set<string>();

/**
 * Intercepts the normal challenge answer requests, and sets the desired amount of correctly typed words.
 */
export function initializeNormalChallengeCheat() {
  return chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      console.log(details);
      if (details.url != "https://10fastfingers.com/speedtests/auswertung")
        return;

      // @ts-ignore
      const str = decodeUtf8(details.requestBody.raw[0].bytes);

      const params = {} as any;
      str
        .split("&")
        .map((pair) => pair.split("="))
        .forEach(([k, v]) => (params[k] = v));

      params["user_input"] = params.wordlist.split("|").slice(0, 130).join(" ");
      params["backspace_counter"] = Math.floor(Math.random() * 25);
      params["afk_timer"] = 1;
      params["user_input"] = encodeURI(params["user_input"]);

      const paramsToString = (params) =>
        Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join("&");

      const body = paramsToString(params);
      if (sent.has(body)) return;
      sent.add(body);
      console.log("Sending answer", body);
      (async () => {
        const cookieStore = await getCookieStoreForTab(details.tabId);
        const cookie = await getCookie(cookieStore);
        console.log("cookies", cookie);
        const resp = await fetch(
          "https://10fastfingers.com/speedtests/auswertung?a=1",
          {
            headers: {
              accept: "application/json, text/javascript, */*; q=0.01",
              "accept-language": "en-US,en;q=0.9,pl;q=0.8",
              "cache-control": "no-cache",
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              pragma: "no-cache",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              cookie,
              referrer: "https://10fastfingers.com/typing-test/polish",
            },
            body,
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );
        const txt = await resp.text();
        console.log(txt);
      })();

      return {
        cancel: true,
      };
    },
    { urls: ["*://10fastfingers.com/*"] },
    ["blocking", "requestBody"]
  );
}
