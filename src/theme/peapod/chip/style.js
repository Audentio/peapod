import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('chip'),
    main = sheet.addMain(),
    deleteTrigger = sheet.addPart('deleteTrigger'),
    photo = sheet.addPart('photo');

//Conditions

//Functions
var half = (value) => {
    return (parseFloat(Pod_Vars.get(value)) / 2 );
}

//Variables
sheet.setValues({
    height: '32px',
    background: '$palette.grey100',
    color: '#777', // needs to be 67% black
    hover: {
        background: '$palette.grey600',
        color: '$palette.white'
    },
    paddingLeftRight: '12px',
    innerMargins: '8px'
});

main.addSelector({
    common: {
        backgroundColor: '$chip.background',
        display: 'inline-block',
        height: '$chip.height',
        lineHeight: '$chip.height',
        paddingLeft: '$chip.paddingLeftRight',
        paddingRight: '$chip.paddingLeftRight',
        color: '$chip.color',
        borderRadius: '1000px',
        marginRight: '10px', // for testing

        ':hover': {
            background: '$chip.hover.background',
            color: '$chip.hover.color'
        }
    }
})

deleteTrigger.addSelector({
    common: {
        display: 'inline-block',
        height: half('chip.height'),
        lineHeight: half('chip.height') + 'px',
        width: half('chip.height'),
        fontSize:'12px', // variable?
        background: '$palette.grey500',
        color: '$chip.background',
        textAlign:'center',
        float: 'right',
        marginLeft: '$chip.innerMargins',
        marginRight: (0 - half('chip.innerMargins')),
        marginTop: '$chip.innerMargins',
        borderRadius: half('chip.height'),

        ':hover': {
            background: '$chip.hover.color',
            color: '$chip.hover.background'
        }
    }
});

photo.addSelector({
    common: {
        height: '$chip.height',
        width: '$chip.height',
        borderRadius: half('chip.height'),
        float: 'left',
        marginLeft: (0 - parseFloat(Pod_Vars.get('chip.paddingLeftRight'))), // needs to be minus
        marginRight: '$chip.innerMargins'
    }
})

module.exports = sheet;
