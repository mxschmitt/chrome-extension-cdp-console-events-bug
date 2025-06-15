# Chrome Extension CDP Console Events Bug

This extension demonstrates a bug in Chrome's DevTools Protocol (CDP) event ordering. It shows that the `Runtime.consoleAPICalled` event is received after the `Runtime.evaluate` result, this is different to normal CDP.

## How to Reproduce

1. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select this directory

2. Open any webpage (e.g., `https://example.com`)

3. Click the extension icon in your browser toolbar

4. Open the extension's background page console:
   - Right-click the extension icon
   - Click "Inspect views: background page"
   - This will open DevTools with the background page console

5. Observe the console output:
   - You'll see two logs:
     1. `Function call result: {...}` (from `Runtime.evaluate`)
     2. `Console event received: {...}` (from `Runtime.consoleAPICalled`)

## Expected vs Actual Behavior

**Expected Order:**
1. Console event received (from the `console.log` call)
2. Function call result (from `Runtime.evaluate`)

**Actual Order:**
1. Function call result
2. Console event received

This suggests that the CDP event for the console API call is being received after the evaluation result, which is not the expected behavior. This is different how normal CDP works (e.g. looking at the `test.js` which uses CDP with Playwright) and assumes that.

