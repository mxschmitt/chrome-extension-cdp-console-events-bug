const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage();
  
  // Create CDP session
  const client = await page.context().newCDPSession(page);
  
  // Enable Runtime domain
  await client.send('Runtime.enable');
  
  // Set up console event listener
  client.on('Runtime.consoleAPICalled', (params) => {
    console.log('Console event received:', params);
  });
  
  // Evaluate code that creates console output
  const result = await client.send('Runtime.evaluate', {
    expression: 'console.log("Hello World"); "done"',
    returnByValue: true
  });
  console.log('Function call result:', result);
  
  await browser.close();
})(); 