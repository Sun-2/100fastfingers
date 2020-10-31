import fetch from "node-fetch";
import { recognize } from "./recognize";

/**
 * Returns the AntiCheat text for a client's cookie.
 * @param cookie Client's cookie string
 */
export async function getAntiCheatText(cookie: string): Promise<string> {
  const resp = await fetch(
    "https://10fastfingers.com/anticheat/generate_word_picture?rand=73540329",
    {
      headers: {
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        cookie,
        referrer: "https://10fastfingers.com/anticheat/view/1/9",
      },
    }
  );
  const arrayBuffer = await resp.arrayBuffer();
  const txt = await recognize(arrayBuffer);
  console.log(`Got Tesseract answer: ${txt}`);
  return txt;
}
