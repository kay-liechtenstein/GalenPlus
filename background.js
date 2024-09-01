// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.downloadUrls && message.downloadUrls.length > 0) {
        message.downloadUrls.forEach(url => {
            chrome.downloads.download({ url: url });
        });
    }
});
