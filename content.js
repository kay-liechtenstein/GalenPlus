const currentUrl = window.location.href;

const urlPatterns = [
    '/dashboard',
    '/timetable/users/',
    '/users/',
    '/announcements',
    '/events/',
    '/evidence/',
    '/placements/'
];

// 現在のURLがどのパターンにマッチするか確認
const isTargetPage = urlPatterns.some(pattern => {
    if (pattern.endsWith('/')) {
        return currentUrl.includes(pattern);
    }
    return currentUrl.includes(pattern);
});

if (isTargetPage || currentUrl.includes('galen.st-andrews.ac.uk')) {
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

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggleText.innerText = 'Turn on Light Mode';
        toggleButton.style.backgroundColor = '#666';
        toggleCircle.style.left = '32px';
        insertDarkModeStyles();
    } else {
        toggleText.innerText = 'Turn on Dark Mode';
    }

    function insertDarkModeStyles() {
        const darkModeStyles = `
            #sidebar, .sidebar, .sidebar *, .sidebar .menu-item {
                background-color: inherit !important;
                color: inherit !important;
            }
            body {
                background-color: #004400 !important;
                color: #fff !important;
            }
            #announcementBody, #announcementBody *, #agenda, #agenda *, .card, .card-header, .card-body, .card-icon, .card-text {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .container-fluid .card .card-body {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .card-header-icon, .card-header-text {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .event-list, .event-list * {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .btn-info, .btn-info * {
                background-color: #444 !important;
                color: #fff !important;
            }
            .card.card-plain.card-normal, .card.card-normal.bg-gradient {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .list-group-item {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .badge {
                background-color: #333 !important;
                color: #fff !important;
            }
            table.table-striped td, table.table-striped th {
                color: #fff !important;
            }
            table.table-no-bordered {
                background-color: #004400 !important;
                color: #fff !important;
            }
            .text-muted {
                color: #bbb !important;
            }
            input[type="text"], .form-control {
                background-color: #222 !important;
                color: #fff !important;
            }
            .navbar, .navbar * {
                color: #fff !important;
            }
            .card-title {
                color: #fff !important;
            }
            p {
                color: #fff !important;
            }
            td {
                color: #fff !important;
            }
            th {
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

    if (localStorage.getItem('darkMode') === 'true') {
        insertDarkModeStyles();
    }
}

if (currentUrl.includes('/timetable/users/')) {
    const resizeTimetableStyles = `
        #calendar {
            height: 95vh !important;
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

    const popoverObserver = new MutationObserver(() => {
        addMoreLinkHoverEffect();
    });

    popoverObserver.observe(document.querySelector('#calendar'), {
        childList: true,
        subtree: true
    });

    addMoreLinkHoverEffect();

    document.addEventListener('mousemove', (event) => {
        let popover = document.querySelector('.fc-popover');
        if (popover) {
            let rect = popover.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
                let closeButton = document.querySelector('.fc-popover-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });

    function addHoverEffectToEventTitle() {
        document.querySelectorAll('.fc-event-title').forEach(item => {
            item.removeEventListener('mouseenter', handleMouseEnter);
            item.removeEventListener('mouseleave', handleMouseLeave);

            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
        });
    }

    function handleMouseEnter(e) {
        const item = e.target;
        const fullText = item.textContent.trim();
        let existingHoverBox = document.querySelector('.hoverBox');
        if (existingHoverBox) {
            existingHoverBox.remove();
        }

        const hoverBox = document.createElement('div');
        hoverBox.classList.add('hoverBox');
        hoverBox.innerText = fullText;

        hoverBox.style.position = 'absolute';
        hoverBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        hoverBox.style.color = '#fff';
        hoverBox.style.padding = '10px';
        hoverBox.style.borderRadius = '5px';
        hoverBox.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        hoverBox.style.maxWidth = '300px';
        hoverBox.style.wordWrap = 'break-word';
        hoverBox.style.zIndex = '10000';
        hoverBox.style.opacity = '0';
        hoverBox.style.transition = 'opacity 0.1s';

        const rect = item.getBoundingClientRect();
        hoverBox.style.top = `${rect.top + window.scrollY + item.offsetHeight + 5}px`;
        hoverBox.style.left = `${rect.left + window.scrollX}px`;

        document.body.appendChild(hoverBox);

        requestAnimationFrame(() => {
            hoverBox.style.opacity = '1';
        });

        item.addEventListener('mousemove', handleMouseMove);
    }

    function handleMouseMove(e) {
        let hoverBox = document.querySelector('.hoverBox');
        if (hoverBox) {
            hoverBox.style.top = `${e.clientY + window.scrollY + 5}px`;
            hoverBox.style.left = `${e.clientX + window.scrollX + 5}px`;
        }
    }

    function handleMouseLeave() {
        let hoverBox = document.querySelector('.hoverBox');
        if (hoverBox) {
            hoverBox.style.opacity = '0';
            setTimeout(() => {
                hoverBox.remove();
            }, 300);
    }

    }

    function addConfidenceStarsToTimetable() {
        const confidenceData = JSON.parse(localStorage.getItem('confidenceData')) || {};

        document.querySelectorAll('.fc-timegrid-event-harness a[href^="/events/"]').forEach(eventLink => {
            const eventId = eventLink.getAttribute('href').split('/events/')[1];

            if (eventId && confidenceData[eventId]) {
                const confidenceLevel = confidenceData[eventId];
                const starContainer = eventLink.querySelector('.star-container');
                
                if (!starContainer) {
                    const newStarContainer = document.createElement('div');
                    newStarContainer.className = 'star-container';
                    newStarContainer.style.display = 'inline-block';
                    newStarContainer.style.marginLeft = '10px';

                    for (let i = 0; i < confidenceLevel; i++) {
                        const star = document.createElement('span');
                        star.innerText = '★';
                        star.style.color = 'gold';
                        newStarContainer.appendChild(star);
                    }

                    const eventTimeElement = eventLink.querySelector('.fc-event-time');
                    if (eventTimeElement) {
                        eventTimeElement.style.display = 'inline-flex';
                        eventTimeElement.style.alignItems = 'center';
                        eventTimeElement.appendChild(newStarContainer);
                    }
                }
            }
        });
    }

    window.onload = function () {
        addHoverEffectToEventTitle();
        addConfidenceStarsToTimetable();

        const observer = new MutationObserver(() => {
            addHoverEffectToEventTitle();
            addConfidenceStarsToTimetable();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    document.addEventListener('DOMContentLoaded', addHoverEffectToEventTitle);

    const hoverObserver = new MutationObserver(() => {
        addHoverEffectToEventTitle();
    });

    hoverObserver.observe(document.querySelector('#calendar'), {
        childList: true,
        subtree: true
    });

    document.querySelector('#calendar').addEventListener('click', (event) => {
        if (event.target.closest('.fc-button') || event.target.closest('.fc-daygrid-day')) {
            setTimeout(() => {
                addHoverEffectToEventTitle();
                addConfidenceStarsToTimetable();
            }, 500);
        }
    });
}

if (currentUrl.includes('/events/')) {
    let downloadButton = document.createElement('button');
    downloadButton.id = 'downloadButton';
    downloadButton.innerText = 'Download All Documents';

    let buttonColorStart = '#2E3A45';
    let buttonColorEnd = '#3A4A55';

    downloadButton.style.position = 'fixed';
    downloadButton.style.top = '60px';
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
        const infoElement = document.querySelector('.info');
        if (infoElement && !infoElement.classList.contains('d-none')) {
            alert("This element hasn't been validated yet.");
        } else {
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
        }
    });
}

if (currentUrl.includes('/events/')) {
    let confidenceButton = document.createElement('button');
    confidenceButton.id = 'confidenceButton';
    confidenceButton.innerText = 'Confidence Level';
    confidenceButton.style.position = 'fixed';
    confidenceButton.style.top = '110px';
    confidenceButton.style.right = '20px';
    confidenceButton.style.zIndex = '9999';
    confidenceButton.style.padding = '10px 20px';
    confidenceButton.style.backgroundColor = '#2E3A45';
    confidenceButton.style.color = 'white';
    confidenceButton.style.border = 'none';
    confidenceButton.style.borderRadius = '25px';
    confidenceButton.style.cursor = 'pointer';
    confidenceButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    confidenceButton.style.backgroundImage = `linear-gradient(to right, #2E3A45, #3A4A55)`;
    confidenceButton.style.fontWeight = 'bold';
    confidenceButton.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    confidenceButton.addEventListener('mouseover', () => {
        confidenceButton.style.transform = 'scale(1.1)';
        confidenceButton.style.boxShadow = '0 8px 16px 0 rgba(0, 0, 0, 0.3), 0 10px 25px 0 rgba(0, 0, 0, 0.25)';
    });
    confidenceButton.addEventListener('mouseout', () => {
        confidenceButton.style.transform = 'scale(1)';
        confidenceButton.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    });

    document.body.appendChild(confidenceButton);

    let levelContainer = document.createElement('div');
    levelContainer.style.position = 'fixed';
    levelContainer.style.top = '160px';
    levelContainer.style.right = '20px';
    levelContainer.style.zIndex = '10000';
    levelContainer.style.display = 'flex';
    levelContainer.style.flexDirection = 'column';
    levelContainer.style.justifyContent = 'center';
    levelContainer.style.alignItems = 'center';
    levelContainer.style.gap = '10px';
    levelContainer.style.backgroundColor = 'transparent';
    levelContainer.style.padding = '0';
    levelContainer.style.opacity = '0';
    levelContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    levelContainer.style.transform = 'translateY(30px)';

    for (let i = 1; i <= 5; i++) {
        let levelButton = document.createElement('div');
        levelButton.innerText = i;
        levelButton.style.width = '40px';
        levelButton.style.height = '40px';
        levelButton.style.borderRadius = '50%';
        levelButton.style.display = 'flex';
        levelButton.style.alignItems = 'center';
        levelButton.style.justifyContent = 'center';
        levelButton.style.backgroundColor = '#3A4A55';
        levelButton.style.color = '#fff';
        levelButton.style.cursor = 'pointer';
        levelButton.style.fontSize = '18px';
        levelButton.style.fontWeight = 'bold';
        levelButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        levelButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease';

        levelButton.addEventListener('mouseover', () => {
            levelButton.style.transform = 'scale(1.1)';
            levelButton.style.backgroundColor = '#2E3A45';
        });
        levelButton.addEventListener('mouseout', () => {
            levelButton.style.transform = 'scale(1)';
            levelButton.style.backgroundColor = '#3A4A55';
        });

        levelButton.addEventListener('click', () => {
            saveConfidenceLevel(i);
            levelContainer.style.opacity = '0';
            levelContainer.style.transform = 'translateY(30px)';
        });

        levelContainer.appendChild(levelButton);
    }

    document.body.appendChild(levelContainer);

    confidenceButton.addEventListener('click', () => {
        if (levelContainer.style.opacity === '0') {
            levelContainer.style.opacity = '1';
            levelContainer.style.transform = 'translateY(0)';
            const levelButtons = levelContainer.children;
            for (let j = 0; j < levelButtons.length; j++) {
                levelButtons[j].style.transitionDelay = `${j * 0.1}s`;
            }
        } else {
            levelContainer.style.opacity = '0';
            levelContainer.style.transform = 'translateY(30px)';
        }
    });

    function saveConfidenceLevel(level) {
        let eventId = currentUrl.match(/\/events\/(\d+)/)[1];
        let confidenceData = JSON.parse(localStorage.getItem('confidenceData')) || {};
        confidenceData[eventId] = level;
        localStorage.setItem('confidenceData', JSON.stringify(confidenceData));
        alert(`Confidence Level ${level} has been saved for event ID: ${eventId}`);
    }
}
