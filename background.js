chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('http')) {
    await chrome.debugger.attach({ tabId }, '1.3')
    try {
      // Enable Runtime domain
      await chrome.debugger.sendCommand({ tabId }, 'Runtime.enable');

      // Listen for console events
      chrome.debugger.onEvent.addListener((source, method, params) => {
        if (method === 'Runtime.consoleAPICalled') {
          console.log('Console event received:', params);
        }
      });

      // Call function that creates console output
      const result = await chrome.debugger.sendCommand(
        { tabId },
        'Runtime.evaluate',
        {
          expression: 'console.log("Hello World"); "done"',
          returnByValue: true
        }
      );
      console.log('Function call result:', result);
    } finally {
      // Detach debugger when done
      await chrome.debugger.detach({ tabId });
    }
  }
});
