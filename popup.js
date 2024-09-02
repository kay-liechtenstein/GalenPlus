document.getElementById('toggle-dark-mode').addEventListener('click', () => {
    // 現在のタブでダークモードをトグルするメッセージを送信
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "toggleDarkMode" });
    });
});
