function decodeUtf8(arrayBuffer) {
  let result = "";
  let i = 0;
  let c = 0;
  const c1 = 0;
  let c2 = 0;

  const data = new Uint8Array(arrayBuffer);

  // If we have a BOM skip it
  if (
    data.length >= 3 &&
    data[0] === 0xef &&
    data[1] === 0xbb &&
    data[2] === 0xbf
  ) {
    i = 3;
  }

  while (i < data.length) {
    c = data[i];

    if (c < 128) {
      result += String.fromCharCode(c);
      i++;
    } else if (c > 191 && c < 224) {
      if (i + 1 >= data.length) {
        throw "UTF-8 Decode failed. Two byte character was truncated.";
      }
      c2 = data[i + 1];
      result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      if (i + 2 >= data.length) {
        throw "UTF-8 Decode failed. Multi byte character was truncated.";
      }
      c2 = data[i + 1];
      const c3 = data[i + 2];
      result += String.fromCharCode(
        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      i += 3;
    }
  }
  return result;
}

// chrome.cookies.getAll({url:"https://10fastfingers.com/"}, cookie => console.log(cookie))

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.url != "https://10fastfingers.com/speedtests/auswertung")
      return;

    const str = decodeUtf8(details.requestBody.raw[0].bytes);

    const params = {};
    str
      .split("&")
      .map((pair) => pair.split("="))
      .forEach(([k, v]) => (params[k] = v));
    console.log("pre", params);
    params["user_input"] = params.wordlist.split("|").slice(0, 255).join(" ");
    params["backspace_counter"] = 19;
    params["afk_timer"] = 1;
    params["user_input"] = encodeURI(params["user_input"]);

    console.log("post", params);
    const paramsToString = (params) =>
      Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join("&");

    console.log(paramsToString(params));

    fetch("https://10fastfingers.com/speedtests/auswertung?a=1", {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
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
      body: paramsToString(params),
      method: "POST",
      mode: "cors",
      credentials: "include",
    });

    /*fetch("https://10fastfingers.com/speedtests/auswertung", {
      headers: {
        accept: "application/json, text/javascript, *!/!*; q=0.01",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
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
      body:
        "sz=1604104784641&ez=1604101244653&wordlist=co|kto|tyle|dwa|jedno|u|dobrze|i|on|bez|trzy|jako|drzwi|nikt|razy|ona|drzwi|tu|dla|dlatego|oraz|świat|niemal|siebie|zupełnie|niech|za|czy|oczywiście|ku|to|wcale|tylko|lecz|taki|pewnie|nagle|drogi|przez|jeżeli|we|bo|raz|ojciec|miał|długo|a|człowiek|nie|przez|więc|drugi|pan|sposób|wiele|tyle|jej|on|pan|gdy|u|trzy|razem|od|mężczyzna|swoje|drogi|drugi|nim|nad|zaraz|sam|niech|ona|ani|dopiero|skąd|skąd|może|ale|mój|z|by|sobie|mimo|tutaj|mój|jakby|wszyscy|do|jakby|choć|nigdy|lub|a|niemal|obok|zbyt|zanim|on|nieco|ile|miał|właśnie|cóż|czego|i|już|ku|może|prawda|twarz|żeby|razem|jaki|prawie|go|nic|pod|ten|mężczyzna|zaś|o|wokół|wszyscy|jedno|tam|kto|też|no|potem|między|świat|trzeba|czym|poza|po|na|właśnie|wcale|swój|tyle|którego|bowiem|gdy|lub|chyba|dwa|wszystko|potem|ciebie|dla|powoli|gdy|dziś|coraz|znów|wtedy|zaś|jego|trzy|ani|kobieta|co|swoje|obok|między|chociaż|się|nim|nikt|taki|jak|choć|nad|skąd|którego|bez|wciąż|miejsce|życie|kilka|bowiem|ona|gdyż|dzień|kiedy|z|ciebie|przed|ojciec|czy|jednak|to|wcale|bardzo|świat|dlaczego|ciebie|niż|razy|ty|pewnie|obok|każdy|wiele|za|przynajmniej|lub|tak|do|niż|moje|kilka|nadal|natychmiast|już|zbyt|ty|już|siebie|niemal|wiele|tu|wśród|być|zaś|kobieta|nadal|siebie|nad|zupełnie|szybko|o|chociaż|sposób|cóż|mimo|jeden|wszyscy|ich|bowiem|ich|pewno|w|kiedy|my|pewno|ponieważ|prawda|my|po|dzień|sposób|poza|razem|powiedzieć|przynajmniej|stanie|wciąż|gdyby|stary|mieć|dużo|być|często|jedynie|znów|jak|jeszcze|aż|jakby|dwa|wokół|nagle|nawet|wszystko|zbyt|na|ty|zresztą|ten|nawet|powoli|albo|ile|ponieważ|tam|nadal|jego|nawet|od|ktoś|tak|tylko|drogi|jego|zanim|potem|prawie|dość|twarz|dobrze|wrażenie|głos|stanie|oraz|każdy|ktoś|niech|zawsze|aż|jedno|jeśli|często|chyba|&user_input=&backspace_counter=0&afk_timer=60&speedtest_id=9&mode=",
      method: "POST",
      mode: "cors",
      credentials: "include",
    })
      .then((x) => x.text())
      .then(console.log);*/
    return {
      cancel: true,
    };
  },
  { urls: ["*://10fastfingers.com/*"] },
  ["blocking", "requestBody"]
);



