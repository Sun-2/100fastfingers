export async function submitChallenge(wpm: number) {
  const wordsUrl = "https://10fastfingers.com/speedtests/get_words";
  const words = await fetch(wordsUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
    },
    body: "speedtest_mode=&speedtest_id=9",
  }).then((x) => x.text());

  const wordlist = words;
  const answerLength = wpm;
  const answer = encodeURI(
    words.split("|").filter(Boolean).slice(0, answerLength).join(" ")
  );

  console.log(answer);

  await new Promise((res) => setTimeout(res, 76 * 1000));
  const resp = await fetch("https://10fastfingers.com/speedtests/auswertung", {
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    referrer: "https://10fastfingers.com/typing-test/polish",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `sz=${Date.now() - 60002}&ez=${
      Date.now() + 2
    }&wordlist=${wordlist}&user_input=${answer}&backspace_counter=18&afk_timer=1&speedtest_id=9&mode=`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  }).then((x) => x.json());
  console.log(resp);
}
