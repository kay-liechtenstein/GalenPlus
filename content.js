// 現在のページURLを取得
const currentUrl = window.location.href;

// 対象のURLパターンを定義
const urlPatterns = [
    '/dashboard',
    '/timetable/users/',
    '/users/',
    '/announcements',
    '/events/' // ここに追加
];

// 現在のURLがどのパターンにマッチするか確認
const isTargetPage = urlPatterns.some(pattern => {
    // 特定のユーザーIDを含むURLのための処理
    if (pattern.endsWith('/')) {
        return currentUrl.includes(pattern);
    }
    // 正確なマッチを必要とする場合
    return currentUrl.includes(pattern);
});

if (isTargetPage || currentUrl.includes('galen.st-andrews.ac.uk')) {
    // ダークモードトグルボタンの作成（トグルスイッチ）
    let toggleContainer = document.createElement('div');
    toggleContainer.style.position = 'fixed';
    toggleContainer.style.top = '10px';
    toggleContainer.style.left = '50%';
    toggleContainer.style.transform = 'translateX(-50%)';
    toggleContainer.style.zIndex = '10000';
    toggleContainer.style.display = 'flex';
    toggleContainer.style.alignItems = 'center';

    let toggleButton = document.createElement('div');
    toggleButton.id = 'darkModeToggle';
    toggleButton.style.width = '60px';
    toggleButton.style.height = '30px';
    toggleButton.style.backgroundColor = '#444';
    toggleButton.style.borderRadius = '15px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.position = 'relative';
    toggleButton.style.transition = 'background-color 0.3s ease';

    let toggleCircle = document.createElement('div');
    toggleCircle.style.width = '26px';
    toggleCircle.style.height = '26px';
    toggleCircle.style.backgroundColor = '#fff';
    toggleCircle.style.borderRadius = '50%';
    toggleCircle.style.position = 'absolute';
    toggleCircle.style.top = '2px';
    toggleCircle.style.left = '2px';
    toggleCircle.style.transition = 'left 0.3s ease';

    toggleButton.appendChild(toggleCircle);
    toggleContainer.appendChild(toggleButton);

    let toggleText = document.createElement('span');
    toggleText.style.marginLeft = '10px';
    toggleText.style.color = 'white';
    toggleText.style.fontSize = '14px';
    toggleContainer.appendChild(toggleText);

    document.body.appendChild(toggleContainer);

    // 初期モードに応じたボタンのテキストとトグル位置設定
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleText.innerText = 'Turn on Light Mode';
        toggleButton.style.backgroundColor = '#666';
        toggleCircle.style.left = '32px';
        insertDarkModeStyles();
    } else {
        toggleText.innerText = 'Turn on Dark Mode';
    }

    // ダークモードスタイルの定義
function insertDarkModeStyles() {
    const darkModeStyles = `
        /* サイドバーのスタイルを除外するためのセレクタ */
        #sidebar, .sidebar, .sidebar *, .sidebar .menu-item {
            background-color: inherit !important; /* 継承する */
            color: inherit !important; /* 継承する */
        }

        /* ダークモードのスタイルをメインコンテンツに適用 */
        body {
            background-color: #000 !important;
            color: #fff !important;
        }

        #announcementBody, #announcementBody *, #agenda, #agenda *, .card, .card-header, .card-body, .card-icon, .card-text {
            background-color: #000 !important;
            color: #fff !important;
        }
        .container-fluid .card .card-body {
            background-color: #000 !important;
            color: #fff !important;
        }
        .card-header-icon, .card-header-text {
            background-color: #000 !important;
            color: #fff !important;
        }
        .event-list, .event-list * {
            background-color: #000 !important;
            color: #fff !important;
        }
        .btn-info, .btn-info * {
            background-color: #444 !important;
            color: #fff !important;
        }
        .card.card-plain.card-normal, .card.card-normal.bg-gradient {
            background-color: #000 !important;
            color: #fff !important;
        }
        .list-group-item {
            background-color: #000 !important;
            color: #fff !important;
        }
        .badge {
            background-color: #333 !important;
            color: #fff !important;
        }
    `;

    let styleSheet = document.getElementById('darkModeStyles');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'darkModeStyles';
        styleSheet.type = 'text/css';
        styleSheet.innerText = darkModeStyles;
        document.head.appendChild(styleSheet);
    }
}


    // ダークモードの切り替え
    toggleButton.addEventListener('click', () => {
        let isDarkMode = document.body.classList.toggle('dark-mode');
        if (isDarkMode) {
            localStorage.setItem('darkMode', 'true');
            toggleText.innerText = 'Turn on Light Mode';
            toggleButton.style.backgroundColor = '#666';
            toggleCircle.style.left = '32px';
            insertDarkModeStyles();
        } else {
            localStorage.setItem('darkMode', 'false');
            toggleText.innerText = 'Turn on Dark Mode';
            toggleButton.style.backgroundColor = '#444';
            toggleCircle.style.left = '2px';
            document.getElementById('darkModeStyles').remove();
        }
    });

    // 初期ロード時にダークモードを設定
    if (localStorage.getItem('darkMode') === 'true') {
        insertDarkModeStyles();
    }
}

// タイムテーブルページ向けの機能（全週に適用）
if (currentUrl.includes('/timetable/users/')) {
    // タイムテーブルの縦サイズを調整するためのCSSを挿入
    const resizeTimetableStyles = `
        #calendar {
            height: 95vh !important; /* カレンダー要素の高さを設定 */
        }
    `;

    let resizeStyleSheet = document.getElementById('resizeTimetableStyles');
    if (!resizeStyleSheet) {
        resizeStyleSheet = document.createElement('style');
        resizeStyleSheet.id = 'resizeTimetableStyles';
        resizeStyleSheet.type = 'text/css';
        resizeStyleSheet.innerText = resizeTimetableStyles;
        document.head.appendChild(resizeStyleSheet);
    }
}

// events/*ページ向けの機能
if (currentUrl.includes('/events/')) {
    let downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.innerText = 'Download All Documents';

    // ボタンのスタイル設定
    let buttonColorStart = '#2E3A45';
    let buttonColorEnd = '#2E3A45';

    downloadButton.style.position = 'fixed';
    downloadButton.style.top = '40px';
    downloadButton.style.right = '20px';
    downloadButton.style.zIndex = '9999';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.backgroundColor = buttonColorStart;
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '25px';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    downloadButton.style.backgroundImage = `linear-gradient(to right, ${buttonColorStart}, ${buttonColorEnd})`;
    downloadButton.style.fontWeight = 'bold';
    downloadButton.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    downloadButton.onmouseover = function() {
        downloadButton.style.transform = 'scale(1.1)';
        downloadButton.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.3), 0 10px 25px 0 rgba(0, 0, 0, 0.25)';
    };

    downloadButton.onmouseout = function() {
        downloadButton.style.transform = 'scale(1)';
        downloadButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    };

    document.body.appendChild(downloadButton);

    downloadButton.addEventListener('click', () => {
        let links = document.querySelectorAll('td.m-2.editable-resource a');
        let urls = [];
        links.forEach(link => {
            urls.push(link.href);
        });

        if (urls.length > 0) {
            chrome.runtime.sendMessage({ downloadUrls: urls });
        } else {
            alert('No downloadable documents found.');
        }
    });
}

// timetable/users/*ページ向けのイベントのポップオーバー機能
if (currentUrl.includes('/timetable/users/')) {
    // ポップオーバーを開く機能を定義
    function addMoreLinkHoverEffect() {
        document.querySelectorAll('.fc-daygrid-more-link').forEach(link => {
            link.addEventListener('mouseover', () => {
                link.click();
                setTimeout(() => {
                    let popover = document.querySelector('.fc-popover');
                    if (popover) {
                        popover.addEventListener('mouseleave', () => {
                            let closeButton = document.querySelector('.fc-popover-close');
                            if (closeButton) {
                                closeButton.click();
                            }
                        });
                    }
                }, 500);
            });
        });
    }

    // MutationObserverを使ってDOMの変化を監視し、ポップオーバーの機能を再適用
    const observer = new MutationObserver(() => {
        addMoreLinkHoverEffect();
    });

    observer.observe(document.querySelector('#calendar'), {
        childList: true,
        subtree: true
    });

    // 初回ロード時にも適用
    addMoreLinkHoverEffect();

    // カーソルがポップオーバーから離れた時に閉じる機能
    document.addEventListener('mousemove', (event) => {
        let popover = document.querySelector('.fc-popover');
        if (popover) {
            let rect = popover.getBoundingClientRect();
            if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            ) {
                let closeButton = document.querySelector('.fc-popover-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });
}
