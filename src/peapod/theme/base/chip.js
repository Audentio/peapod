import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    del = sheet.addPart('del'),
    photo = sheet.addPart('photo');

//Conditions

//Variables
sheet.setValues({
    common: {
        chip: {
            height: '32px',
            background: '$palette.grey100',
            color: '#777', // needs to be 67% black
            hover: {
                background: '$palette.grey600',
                color: '$palette.white'
            },
            paddingLeftRight: '12px',
            innerMargins: '8px'
        }
    }
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

del.addSelector({
    common: {
        display: 'inline-block',
        height: '16px', // $chip.height / 2
        lineHeight: '16px', // $chip.height / 2
        width: '16px', // $chip.height / 2
        fontSize:'12px', // variable?
        background: '$palette.grey500',
        color: '$chip.background',
        textAlign:'center',
        float: 'right',
        marginLeft: '$chip.innerMargins',
        marginRight: '-4px', // $chip.innerMargins / 2
        marginTop: '$chip.innerMargins',
        borderRadius: '50%',

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
        borderRadius: '50%',
        float: 'left',
        marginLeft: (0 - parseFloat(Pod_Vars.get('chip.paddingLeftRight'))), // needs to be minus
        marginRight: '$chip.innerMargins'
    }
})

module.exports = sheet;