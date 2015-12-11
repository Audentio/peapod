/*
var Color = require('color');
var Pea_Vars = require('../mixins/vars.jsx');

var generateKind = function(
  backgroundColor = '#444',
  color = 'white'){

  if (typeof(backgroundColor) == "object") {
    backgroundColor = backgroundColor[backgroundColor.length - 1].val;
  }

  if (typeof(color) == "object") {
    color = color[color.length - 1].val;
  }

  if (color == 'white') {
    var hoverColor = Color(backgroundColor).lighten(0.2).rgbString();
  } else {
    var hoverColor = Color(backgroundColor).darken(0.2).rgbString();
  }

  return {
    backgroundColor: backgroundColor,
    color: color,

    ':hover': {
      backgroundColor: hoverColor
    }
  }
}

module.exports = {
  Pea_button: [
    {
      neon: generateKind(Pea_Vars.get('brand-pink', 'neon'), Pea_Vars.get('text-dark', 'neon')),
      props: {
        kind: 'warning'
      }
    }
  ]
}
*/
