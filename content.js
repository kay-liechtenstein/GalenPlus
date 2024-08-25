let downloadButton = document.createElement('button');
downloadButton.id = 'downloadButton';
downloadButton.innerText = 'Download All Documents';

let buttonColorStart = '#A1C2C2';
let buttonColorEnd = '#6FA8A8';

downloadButton.style.position = 'fixed';
downloadButton.style.top = '20px';
downloadButton.style.right = '20px';
downloadButton.style.zIndex = '9999';
downloadButton.style.padding = '15px 30px';
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
  let links = document.querySelectorAll('a[href*="resources/download/"]');
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
