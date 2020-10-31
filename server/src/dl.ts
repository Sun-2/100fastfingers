import fetch from 'node-fetch';
import {promises as fsp} from 'fs';
import * as cp from 'child_process';
import clipboardy from 'clipboardy';

  (async () => {
    const resp = await fetch("https://10fastfingers.com/anticheat/generate_word_picture?rand=73540329", {
      "headers": {
        "accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "same-origin",
        "cookie": "__cfduid=d59e4ca74685c66e195ed0f1cae0d0f081604101178; CakeCookie[lang]=Q2FrZQ%3D%3D.5exP; CakeCookie[alternate_language_suggestion]=Q2FrZQ%3D%3D.9PBdWA%3D%3D; CookieConsent={stamp:%27swuSBgNQZFxHq4Y0TtGjwwHbz0xHbFcfnO+9U7GSBijydCWb2tdJ7A==%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1604101179852%2Cregion:%27pl%27}; CAKEPHP=22vfh2aafpm61n32te6r3jbs5k; CakeCookie[remember_me_cookie]=Q2FrZQ%3D%3D.s7oaDGZh6ha2jsJDqARn7%2FJ%2BdO%2FlbOtY2L0dhL7aIkt%2FpPgqknTsNw%3D%3D",
        "referrer": "https://10fastfingers.com/anticheat/view/1/9",
      },
      "method": "GET",
    });
    const img = await resp.arrayBuffer();

    await fsp.writeFile("img.jpeg", new Uint8Array(img));

    cp.exec("tesseract img.jpeg stdout -l pol", (error, stdout, stderr) => {
      clipboardy.write(stdout);
    })
  })();