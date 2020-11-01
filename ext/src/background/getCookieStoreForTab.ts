/**
 * Returns the CookieStore ID for the Tab ID.
 * @param tabId TabID
 */
export async function getCookieStoreForTab(tabId: number): Promise<string | undefined> {
  return new Promise((res) => {
    chrome.cookies.getAllCookieStores((stores) => {
      res(stores.find((store) => store.tabIds.includes(tabId))?.id);
    });
  });
}
