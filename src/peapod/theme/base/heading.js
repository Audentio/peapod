import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    h1 = sheet.addPart('h1'),
    h2 = sheet.addPart('h2'),
    h3 = sheet.addPart('h3'),
    h4 = sheet.addPart('h4'),
    h5 = sheet.addPart('h5'),
    h6 = sheet.addPart('h6');

//Conditions

//Variables
sheet.setValues({
    common: {
        heading: {
            textTransform: 'uppercase'
        }
    }
});

var getMargin = (margin, font) => {
    return (parseFloat(Pod_Vars.get(margin)) - parseFloat(Pod_Vars.get(font))) + 'px';
}
h1.addSelector({
    common:{
       fontSize: '$font.size.display3',
       marginBottom: getMargin('font.margins.display3', 'font.size.body1'),
    }
});

h2.addSelector({
    common:{
       fontSize: '$font.size.display2',
       marginBottom: getMargin('font.margins.display2', 'font.size.body1'),
    }
});

h3.addSelector({
    common:{
       fontSize: '$font.size.display1',
       marginBottom: getMargin('font.margins.display1', 'font.size.body1'),
    }
});

h4.addSelector({
    common:{
       fontSize: '$font.size.headline',
       marginBottom: getMargin('font.margins.headline', 'font.size.body1'),
    }
});

h5.addSelector({
    common:{
       fontSize: '$font.size.title',
       marginBottom: getMargin('font.margins.title', 'font.size.body1'),
    }
});

h6.addSelector({
    common:{
       fontSize: '$font.size.subheading',
       marginBottom: getMargin('font.margins.subheading', 'font.size.body1'),
    }
});

module.exports = sheet;
