// background.js
const GALEN_ORIGIN = 'https://galen.st-andrews.ac.uk';
const MAX_DOWNLOADS_PER_REQUEST = 100;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Only our own content script, running in a Galen tab, may ask for downloads.
    if (sender.id !== chrome.runtime.id || !sender.tab || !sender.url) return;
    let senderOrigin;
    try {
        senderOrigin = new URL(sender.url).origin;
    } catch (e) {
        return;
    }
    if (senderOrigin !== GALEN_ORIGIN) return;

    if (!message || !Array.isArray(message.downloadUrls)) return;

    message.downloadUrls.slice(0, MAX_DOWNLOADS_PER_REQUEST).forEach(raw => {
        let url;
        try {
            url = new URL(String(raw));
        } catch (e) {
            return;
        }
        // Plain web links only: no data:, blob:, javascript:, file: etc.
        if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
        chrome.downloads.download({ url: url.href });
    });
});
