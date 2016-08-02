// control page scrolling
// --
// disables touch scrolling on touch enabled devices
// disables scrolling on non-touch devices without hiding scrollbar
export default function scrolling(allowScroll) {
    // Touch Device
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
        if (allowScroll) {
            document.removeEventListener('touchmove', this.noTouchScrolling);
        } else {
            document.addEventListener('touchmove', this.noTouchScrolling);
        }
    }

    document.body.style.overflow = (allowScroll) ? '' : 'scroll'; // overflowY doesn't disable scrolling on safari
    document.documentElement.style.overflow = (allowScroll) ? '' : 'hidden'; // overflowY doesn't disable scrolling on safari
}
