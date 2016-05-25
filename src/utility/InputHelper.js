export const Validator = {
    // Validate: URL
    // require protocol (http/ftp)
    // domain.ext (ext must be at least 2 chars long)
    url(value) {
        const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i // eslint-disable-line
        return regex.test(value);
    },

    // Validate: E-MAIL
    // something@something.something
    email(value) {
        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regex.test(value);
    },

    // Validate: PASSWORD
    // require lowercase, uppercase and number
    // at least 8 characters
    password(value) {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regex.test(value);
    },
};

// autofix missing protocol
// Adds http:// for string with dot
export function autoFixURL(value, validate) {
    if (validate !== false &&                                                   // validation enabled
        value && value.length > 0 &&                                            // Value is non-empty & has a dot
        value.match(/(?:[a-z][a-z0-9_]*)(\.)(?:[a-z][a-z0-9_]*)/) &&            // There's a dot in between
        value.indexOf('://') === -1                                             // protocol undefined
    ) {
        return `http://${value.trim()}`;
    }
    return value;
}
