/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import { merge as _merge } from 'lodash'

const Pod_Helper = {

    // some things are left to the reader's imagination
    // --
    keymap: {
        esc: 27,
    },

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
                document.removeEventListener('touchmove', this.noTouchScrolling)
            } else {
                document.addEventListener('touchmove', this.noTouchScrolling)
            }
        }

        document.body.style.overflow = (allowScroll) ? '' : 'scroll'; // overflowY doesn't disable scrolling on safari
        document.documentElement.style.overflow = (allowScroll) ? '' : 'hidden'; // overflowY doesn't disable scrolling on safari
    },

    noTouchScrolling: (e) => {
        e.preventDefault()
    },

    fullscreen: {

        isAvailable: () => (
            document.fullscreenEnabled ||
            document.msFullscreenEnabled ||
            document.mozFullscreenEnabled ||
            document.webkitFullscreenEnabled
        ),

        isEnabled: () => (
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement
        ),

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

        toggle: () => {
            if (Pod_Helper.fullscreen.isEnabled()) {
                Pod_Helper.fullscreen.exit()
            } else {
                Pod_Helper.fullscreen.enter()
            }
        },

        lastScrollPos: null,
    },

    downloadFile: (url, filename) => {
        const downLink = document.createElement('a')
        downLink.href = url
        downLink.download = filename || url.substring(url.lastIndexOf('/') + 1, url.length)
        downLink.click()
    },

    addStylesheet: (id, path, callback) => {
        if (!document.getElementById(`Peapod_${id}_stylesheet`)) {
            const stylesheet = document.createElement('link');
            stylesheet.id = `Peapod_${id}_stylesheet`
            stylesheet.rel = 'stylesheet'
            stylesheet.type = 'text/css'
            stylesheet.href = path
            stylesheet.onload = callback
            document.head.appendChild(stylesheet)
            return true
        }
        return false
    },

    addScript: (params) => {
        if (document.getElementById(`Peapod_${params.id}_script`)) {
            return false
        }

        const addToPage = (cb) => {
            const script = document.createElement('script');
            script.id = `Peapod_${params.id}_script`
            script.type = 'text/javascript'
            script.src = params.url
            if (cb) script.onload = (res, status) => cb(script, status)
            document.head.appendChild(script)
            return true
        }

        if (params.ajax) {
            Pod_Helper.xhr({
                url: params.url,
                success: () => addToPage(params.callback),
                error: () => {
                    console.error('[addScript] Unable to load script')
                },
            })
        } else {
            addToPage(params.callback(false, 0))
        }

        return true
    },

    // XHR helper function
    xhr: (args) => {
        // Default options
        let opts = {
            method: 'GET',
            timeout: 3000,
            cache: false,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
        }
        opts = _merge(opts, args)

        if (!opts.url) throw new Error('[XHR] url must be defined')

        // Cache-control
        // Adds random number param at end to make sure new version is downloaded
        if (opts.cache === false) {
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
        if (opts.ontimeout) xmlhttp.ontimeout = opts.ontimeout

        xmlhttp.onreadystatechange = () => {
            const req_complete = xmlhttp.readyState === XMLHttpRequest.DONE
            const req_success = req_complete && xmlhttp.status === 200
            const req_error = req_complete && xmlhttp.status !== 200

            // callback: Success
            if (req_success && opts.success) opts.success(this.responseText, xmlhttp.status, xmlhttp.statusText)

            // calback: Error
            if (req_error && opts.error) opts.error(xmlhttp.status, xmlhttp.statusText)

            // callback: Complete
            if (req_complete && opts.complete) opts.complete(this.responseText, xmlhttp.status, xmlhttp.statusText)
        }

        // callback: Progressr
        if (opts.progress) {
            xmlhttp.addEventListener('progress', (e) => {
                const progress = (e.lengthComputable) ? Math.ceil((e.loaded / e.total) * 100) : null
                opts.progress(progress, e)
            })
        }

        // callback: beforeSend
        // --this allows modifying xmlhttp properties
        // --overrides everything else
        if (opts.beforeSend) opts.beforeSend(xmlhttp, opts);

        // Console stuff
        //
        const reqPath = (opts.url.indexOf('?') > 0) ? opts.url.split('?')[0] : opts.url

        console.groupCollapsed(`[XHR] %c${opts.method}%c ${reqPath}`, 'color: blue', 'color: #666')

        console.log(`%cFull URL: %c${opts.url}`, 'font-weight:bold', 'font-weight:normal')
        console.log('%cConfig: %o', 'font-weight:bold', opts)

        if (opts.data) console.log(`%cData: %c${opts.data}`, 'font-weight:bold', 'font-weight:normal')

        console.groupEnd(`[XHR] ${opts.method} ${opts.url}`)

        // Let's go
        xmlhttp.send(opts.data)
    },

    serialize(form) {
        if (!form || form.nodeName !== 'FORM') return false

        const q = [];

        for (let i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === '') continue

            switch (form.elements[i].nodeName) {

            case 'INPUT':
                switch (form.elements[i].type) {
                case 'text':
                case 'hidden':
                case 'password':
                case 'button':
                case 'reset':
                case 'submit':
                    q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    break;
                case 'checkbox':
                case 'radio':
                    if (form.elements[i].checked) {
                        q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    }
                    break;
                case 'file':
                    break;
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
                }
                break;

            case 'BUTTON':
                switch (form.elements[i].type) {
                case 'reset':
                case 'submit':
                case 'button':
                    q.push(`${form.elements[i].name}=${encodeURIComponent(form.elements[i].value)}`);
                    break;
                }
                break;
            }
        }
        return q.join('&');
    },
}

window.Pod_Helper = Pod_Helper;

export default Pod_Helper
