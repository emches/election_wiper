document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {
      chrome.tabs.executeScript({
        file:'jquery-3.1.1.min.js'
      })
      chrome.tabs.executeScript({
        file:'parse.js'
      })
      chrome.tabs.executeScript({
        file:'gifs.js'
      })
      chrome.tabs.executeScript({
        file:'content.js'
      })
      chrome.tabs.insertCSS(
        null,
        {file: "style.css"
      });
  }, false);
}, false);
