chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({color: '#edcbc3'}, function() {
		console.log('The color is FT.');
	});
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: { hostEquals: 'www.ft.com', schemes: ['https'] },
			})
			],
					actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});