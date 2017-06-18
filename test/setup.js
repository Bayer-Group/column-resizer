import {jsdom} from 'jsdom';
import fs from 'fs';

// mocha re-executes every time so we need to create this lazily
if (!global.document) {
    global.document = jsdom(fs.readFileSync('test/sample1.html'));
    global.window = document.defaultView;
    global.navigator = window.navigator;
    global.getComputedStyle = window.getComputedStyle;
    // eslint-disable-next-line no-console
    console.log('');
    global.XMLSerializer = () => {
    };
    propagateToGlobal(global.window);
}

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;
        global[key] = window[key];
    }
}
