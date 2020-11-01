import {byteArrayToBase64} from "../utils/byteArrayToBase64";

export async function getAntiCheatImage() {
  const arrayBuffer = await fetch(
    "https://10fastfingers.com/anticheat/generate_word_picture?rand=8471333324",
    {
      headers: {
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
      },
      referrer: "https://10fastfingers.com/anticheat/view/1/9",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  ).then((x) => x.arrayBuffer());
  return byteArrayToBase64(arrayBuffer);
}
