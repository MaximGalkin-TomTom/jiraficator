'use strict';
// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
      // My code starts here
      var hcp3_url = "https://jira.tomtomgroup.com/browse/HCP3-" + text;
      fetch(hcp3_url).then(response => {
        if (response.ok) {
            console.log("Connected to " + hcp3_url);
            return response.text().then(function(text) {
                var title = text.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                suggest([
                    {content: hcp3_url, description: title}
                ]);
            });
        }
      });
      // My code starts here
      var nav_url = "https://jira.tomtomgroup.com/browse/NAV-" + text;
      fetch(nav_url).then(response => {
        if (response.ok) {
            console.log("Connected to " + nav_url);
            return response.text().then(function(text) {
                var title = text.match(/<title[^>]*>([^<]+)<\/title>/)[1];
                suggest([
                    {content: nav_url, description: title}
                ]);
            });
        }
      });
    });
    
// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function(text) {
        console.log('inputEntered: ' + text);          
        var url;                
        if (text.substr(0, 6) == 'https:') {              
            url = text;          
        } else {
            url = 'https://jira.tomtomgroup.com/issues/?jql=text%20~' + encodeURIComponent("\"" + text + "\"");
        }      
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var tab = tabs[0];
            chrome.tabs.update(tab.id, {url: url});
        });    
    });