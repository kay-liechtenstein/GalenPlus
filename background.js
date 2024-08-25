chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.downloadUrls) {
    // リンクごとにダウンロードをトリガー
    request.downloadUrls.forEach(url => {
      chrome.downloads.download({ url: url });
    });
  }
});
