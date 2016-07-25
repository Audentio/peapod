import Logger from 'utility/logger.js';

// XHR helper function
export default function xhr(args) {
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
}
