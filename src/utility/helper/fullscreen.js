const isAvailable = () => {
    if (document.fullscreenEnabled ||
        document.msFullscreenEnabled ||
        document.mozFullscreenEnabled ||
        document.webkitFullscreenEnabled) {
        return true;
    }
    return false;
};

const isEnabled = () => {
    if (document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement) {
        return true;
    }
    return false;
};

const enter = elem => {
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
};

const exit = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};

const toggle = elem => {
    if (isEnabled()) {
        exit();
    } else {
        enter(elem);
    }
};

export default { isAvailable, isEnabled, enter, exit, toggle };
