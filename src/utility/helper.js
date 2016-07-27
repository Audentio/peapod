/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import Logger from './logger.js';

const Pod_Helper = {

    // Check if device is touch-enabled
    isTouch: () => ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0),

    // control page scrolling
    // --
    // disables touch scrolling on touch enabled devices
    // disables scrolling on non-touch devices without hiding scrollbar
    scrolling: (allowScroll) => {
        // Touch
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            if (allowScroll) {
                document.removeEventListener('touchmove', this.noTouchScrolling);
            } else {
                document.addEventListener('touchmove', this.noTouchScrolling);
            }
        }

        document.body.style.overflow = (allowScroll) ? '' : 'scroll'; // overflowY doesn't disable scrolling on safari
        document.documentElement.style.overflow = (allowScroll) ? '' : 'hidden'; // overflowY doesn't disable scrolling on safari
    },

    noTouchScrolling: (e) => {
        e.preventDefault();
    },

    fullscreen: {
        isAvailable: () => {
            if (document.fullscreenEnabled ||
                document.msFullscreenEnabled ||
                document.mozFullscreenEnabled ||
                document.webkitFullscreenEnabled) {
                return true;
            }
            return false;
        },

        isEnabled: () => {
            if (document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement) {
                return true;
            }
            return false;
        },

        enter: (elem) => {
            elem = (elem instanceof HTMLElement) ? elem : document.documentElement;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        },

        exit: () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },

        toggle: (elem) => {
            if (Pod_Helper.fullscreen.isEnabled()) {
                Pod_Helper.fullscreen.exit();
            } else {
                Pod_Helper.fullscreen.enter(elem);
            }
        },

        lastScrollPos: null,
    },

    downloadFile: (url, filename) => {
        const downLink = document.createElement('a');
        downLink.href = url;
        downLink.download = filename || url.substring(url.lastIndexOf('/') + 1, url.length);
        downLink.click();
    },

    addStylesheet: (id, path, callback) => {
        if (!document.getElementById(`Peapod_${id}_stylesheet`)) {
            const stylesheet = document.createElement('link');
            stylesheet.id = `Peapod_${id}_stylesheet`;
            stylesheet.rel = 'stylesheet';
            stylesheet.type = 'text/css';
            stylesheet.href = path;
            stylesheet.onload = callback;
            document.head.appendChild(stylesheet);
            return true;
        }
        return false;
    },

    addScript: (params) => {
        if (document.getElementById(`Peapod_${params.id}_script`)) {
            return false;
        }

        const addToPage = (cb) => {
            const script = document.createElement('script');
            script.id = `Peapod_${params.id}_script`;
            script.type = 'text/javascript';
            script.src = params.url;
            if (cb) script.onload = (res, status) => cb(script, status);
            document.head.appendChild(script);
            return true;
        };

        if (params.ajax) {
            Pod_Helper.xhr({
                url: params.url,
                success: () => addToPage(params.callback),
                error: () => {
                    Logger.error('[addScript] Unable to load script');
                },
            });
        } else {
            addToPage(params.callback(false, 0));
        }

        return true;
    },

    // XHR helper function
    xhr: (args) => {
        // Default options
        let opts = {
            method: 'GET',
            timeout: 3000,
            cache: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        opts = Object.assign({}, opts, args);

        if (!opts.url) throw new Error('[XHR] url must be defined');

        // Cache-control
        // Adds random number param at end to make sure new version is downloaded
        if (opts.cache === false && opts.method === 'GET') {
            const param = (opts.url.indexOf('?') === -1) ? `?rand=${Math.random()}` : `&rand=${Math.random()}`;
            opts.url += param;
        }

        const xmlhttp = new XMLHttpRequest();

        xmlhttp.open(opts.method, opts.url, true);

        // set request headers
        for (const header in opts.headers) {
            if (opts.headers.hasOwnProperty(header)) xmlhttp.setRequestHeader(header, opts.headers[header]);
        }

        // set timeout
        xmlhttp.timeout = opts.timeout;

        // callback: Timeout
        if (opts.ontimeout) xmlhttp.ontimeout = opts.ontimeout;

        xmlhttp.onreadystatechange = () => {
            const req_complete = xmlhttp.readyState === XMLHttpRequest.DONE;
            const req_success = req_complete && xmlhttp.status === 200;
            const req_error = req_complete && xmlhttp.status !== 200;

            // callback: Success
            if (req_success && opts.success) {
                opts.success(xmlhttp.responseText);
            }

            // calback: Error
            if (req_error && opts.error) {
                opts.error(xmlhttp.status, xmlhttp.statusText);
            }

            // callback: Complete
            if (req_complete && opts.complete) {
                opts.complete(xmlhttp.responseText, xmlhttp.status, xmlhttp.statusText);
            }
        };

        // callback: Progressr
        if (opts.progress) {
            xmlhttp.addEventListener('progress', (e) => {
                const progress = (e.lengthComputable) ? Math.ceil((e.loaded / e.total) * 100) : null;
                opts.progress(progress, e);
            });
        }

        // callback: beforeSend
        // --this allows modifying xmlhttp properties
        // --overrides everything else
        if (opts.beforeSend) opts.beforeSend(xmlhttp, opts);

        // temp
        const reqFilename = opts.url.substring(opts.url.lastIndexOf('/') + 1);
        const reqFilename_clean = (reqFilename.indexOf('?') > 0) ? reqFilename.substr(0, reqFilename.lastIndexOf('?')) : reqFilename;
        Logger.groupCollapsed(`[XHR] %c${opts.method}%c ${reqFilename_clean}`, 'color: blue', 'color: #666');
        Logger.trace();
        Logger.log(`%cFull URL: %c${opts.url}`, 'font-weight:bold', 'font-weight:normal');
        Logger.log('%cConfig: %o', 'font-weight:bold', opts);
        if (opts.data) Logger.log(`%cData: %c${opts.data}`, 'font-weight:bold', 'font-weight:normal');
        Logger.groupEnd(`[XHR] ${opts.method} ${opts.url}`);

        xmlhttp.send(opts.data);
    },

    serialize(form) {
        if (!form || form.nodeName !== 'FORM') return false;

        const q = [];

        for (let i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === '') continue;

            switch (form.elements[i].nodeName) {

            case 'INPUT':
                switch (form.elements[i].type) {
                case 'text':
                case 'hidden':
                case 'password':
                case 'button':
                case 'date':
                case 'submit':
                    q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    break;
                case 'checkbox':
                case 'radio':
                    if (form.elements[i].checked) {
                        let value = form.elements[i].value;
                        value = (value === 'on') ? 1 : 0;
                        q.push(`${form.elements[i].name}=${encodeURIComponent(value)}`);
                    }
                    break;
                case 'file':
                    break;
                // no default
                }
                break;

            case 'TEXTAREA':
                q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                break;

            case 'SELECT':
                switch (form.elements[i].type) {
                case 'select-one':
                    q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    break;
                case 'select-multiple':
                    for (let j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                        if (form.elements[i].options[j].selected) {
                            q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].options[j].value)}`);
                        }
                    }
                    break;
                // no default
                }
                break;

            case 'BUTTON':
                switch (form.elements[i].type) {
                case 'reset':
                case 'submit':
                case 'button':
                    q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    break;
                // no default
                }
                break;

            // no default
            }
        }
        return q.join('&');
    },

    oneEm: Number(getComputedStyle(document.documentElement, null).fontSize.replace(/[^\d]/g, '')),

    responsiveFont(ems, min = ems) {
        const siteWidth = 1300;

        let vw = window.innerWidth;
        vw = (vw < siteWidth) ? vw : siteWidth;

        const oneTenth = siteWidth / this.oneEm;
        const newSize = (vw / oneTenth);

        const minEm = min * this.oneEm;
        const maxEm = ems * newSize;
        const newEm = (maxEm > minEm) ? maxEm : minEm;

        const actualEm = newEm / this.oneEm;

        return `${actualEm}rem`;
    },

    // some things are left to the reader's imagination
    // --
    keymap: {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        KEY_0: 48,
        KEY_1: 49,
        KEY_2: 50,
        KEY_3: 51,
        KEY_4: 52,
        KEY_5: 53,
        KEY_6: 54,
        KEY_7: 55,
        KEY_8: 56,
        KEY_9: 57,
        KEY_A: 65,
        KEY_B: 66,
        KEY_C: 67,
        KEY_D: 68,
        KEY_E: 69,
        KEY_F: 70,
        KEY_G: 71,
        KEY_H: 72,
        KEY_I: 73,
        KEY_J: 74,
        KEY_K: 75,
        KEY_L: 76,
        KEY_M: 77,
        KEY_N: 78,
        KEY_O: 79,
        KEY_P: 80,
        KEY_Q: 81,
        KEY_R: 82,
        KEY_S: 83,
        KEY_T: 84,
        KEY_U: 85,
        KEY_V: 86,
        KEY_W: 87,
        KEY_X: 88,
        KEY_Y: 89,
        KEY_Z: 90,
        LEFT_META: 91,
        RIGHT_META: 92,
        SELECT: 93,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUM_LOCK: 144,
        SCROLL_LOCK: 145,
        SEMICOLON: 186,
        EQUALS: 187,
        COMMA: 188,
        DASH: 189,
        PERIOD: 190,
        FORWARD_SLASH: 191,
        GRAVE_ACCENT: 192,
        OPEN_BRACKET: 219,
        BACK_SLASH: 220,
        CLOSE_BRACKET: 221,
        SINGLE_QUOTE: 222,
    },
};

window.Pod_Helper = Pod_Helper;

module.exports = Pod_Helper;
