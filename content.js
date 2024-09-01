// 現在のページURLを取得
const currentUrl = window.location.href;

if (currentUrl.includes('/events/')) {
    // events/*ページ向けの機能
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

} else if (currentUrl.includes('/timetable/users/')) {
    // timetable/users/*ページ向けの機能
    document.querySelectorAll('.fc-daygrid-more-link').forEach(link => {
        link.addEventListener('mouseover', () => {
            // カーソルを合わせたときにリンクをクリックして内容を表示
            link.click();

            // ポップアップが表示された後、mouseleaveイベントを動的に追加
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
            }, 500); // 少し待機してポップアップが確実に表示されるのを待つ
        });
    });

    // ドキュメント全体にマウスイベントを設定して、ポップアップ外で閉じる
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

// タイムテーブルの縦サイズを調整する関数
function resizeTimetable() {
    var calendarElement = document.querySelector('#calendar');
    if (calendarElement) {
        // ウィンドウの高さを取得して、それに基づいてカレンダーの高さを設定
        var windowHeight = window.innerHeight;
        var newHeight = windowHeight * 0.95; // 80%の高さをカレンダーに設定
        calendarElement.style.height = newHeight + 'px';

        // FullCalendarのインスタンスを取得してリサイズ
        if (typeof FullCalendar !== 'undefined' && FullCalendar.Calendar) {
            var calendar = FullCalendar.Calendar.get(calendarElement);
            if (calendar) {
                calendar.updateSize();
            }
        } else {
            console.log('FullCalendar is not defined or Calendar instance not found.');
        }
    } else {
        console.log('Calendar element not found.');
    }
}

if (currentUrl.includes('/timetable/users/')) {
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

    // ページロード時とウィンドウのリサイズ時にタイムテーブルのサイズを調整
    window.addEventListener('load', resizeTimetable);
    window.addEventListener('resize', resizeTimetable);
    resizeTimetable();
}

}
