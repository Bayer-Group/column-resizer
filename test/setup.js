import {JSDOM} from 'jsdom';
import fs from 'fs';

// mocha re-executes every time so we need to create this lazily
if (!global.document) {
    const dom = new JSDOM(fs.readFileSync('test/sample1.html'), { pretendToBeVisual: true, resources: 'usable' });
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = {
        userAgent: 'node.js',
    };
    global.getComputedStyle = window.getComputedStyle;
    // eslint-disable-next-line no-console
    console.log('');
    global.XMLSerializer = () => {
    };
    propagateToGlobal(global.window);
}

function propagateToGlobal(window) {
    const props = Object.getOwnPropertyNames(window)
        .filter(prop => typeof global[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(window, prop),
        }), {});
    Object.defineProperties(global, props);
}
