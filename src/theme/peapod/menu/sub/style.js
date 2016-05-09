import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('menu_sub'),
    main = sheet.addMain();

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        background: '#fff',
        boxShadow: '$shadows.d1',
        padding: '16px 0',
        borderRadius: '$border.radius.small',
        zIndex: 3,
        position: 'absolute',
        whiteSpace: 'nowrap',
        transform: 'translate(0, -48px)',
        left: '100%'
    }
});

module.exports = sheet;
