/**
 * Gets all cookies used by 10fastfinters.com as a cookie string.
 */
export async function getCookie(storeId?: string): Promise<string> {
  return new Promise((res) =>
    chrome.cookies.getAll(
      { url: "https://10fastfingers.com/", storeId },
      (cookie) => res(cookie.map((c) => `${c.name}=${c.value}`).join("; "))
    )
  );
}
