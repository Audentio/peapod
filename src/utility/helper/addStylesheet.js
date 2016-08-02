export default function addStylesheet(id, path, callback) {
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
}
