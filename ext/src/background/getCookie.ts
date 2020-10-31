/**
 * Gets all cookies used by 10fastfinters.com as a cookie string.
 */
export async function getCookie(): Promise<string> {
  return new Promise((res) =>
    chrome.cookies.getAll({ url: "https://10fastfingers.com/" }, (cookie) =>
      res(cookie.map((c) => `${c.name}=${c.value}`).join("; "))
    )
  );
}
