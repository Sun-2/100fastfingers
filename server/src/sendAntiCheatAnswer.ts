export async function sendAntiCheatAnswer(words: string[], cookie: string) {
  const backspaceCounter = Math.floor(Math.random() * 5);
  const wordString = words.join(" ");

  return await fetch(
    "https://10fastfingers.com/anticheat/auswertung_anticheat",
    {
      credentials: "include",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:82.0) Gecko/20100101 Firefox/82.0",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        cookie,
      },
      referrer: "https://10fastfingers.com/anticheat/view/1/9",
      body: `eingabe_string=${wordString}&backspace_counter=${backspaceCounter}`,
      method: "POST",
      mode: "cors",
    }
  );
}
