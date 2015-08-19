export function setBadgeText (text) {
  chrome.browserAction.setBadgeText({
    text: text
  })
}
