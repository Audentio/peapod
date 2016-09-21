module.exports = function (sheet) {
    const main = sheet.addMain();
    const innerBox = sheet.addPart('innerBox');
    const wrapper = sheet.addPart('wrapper');
    const box = sheet.addPart('box');
    const input = sheet.addPart('input');
    const icon = sheet.addPart('icon');
    const label = sheet.addPart('label');

    // Conditions
    sheet.addCondition('checked').addState({ checked: true });
    sheet.addCondition('disabled').addState({ disabled: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            width: '16px',
            get height() { return component.width; },
            color: {
                text: theme.color.text.dark,
                background: theme.palette.grey50,
                backgroundChecked: theme.palette.grey500,
                icon: theme.color.text.white,
            },
            border: {
                color: theme.palette.grey600,
                get colorChecked() { return component.color.backgroundChecked; },
                radius: theme.border.radius.small,
                width: '2px',
                style: 'solid',
            },
            font: {
                family: 'inherit',
                size: theme.font.size.body1,
            },
        };
        return component;
    };

    sheet.resolveSceneValues = (common, theme) => { // eslint-disable-line no-unused-vars
        const component = {
            dark: {
                color: {
                    text: theme.color.text.white,
                    background: 'transparent',
                },
                border: {
                    color: theme.palette.white,
                    colorChecked: theme.palette.grey200,
                },
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'inline-block',
        }).selector('.main.--block', {
            display: 'block',
        });

        sheet.selector('.innerBox', {
            width: component.width,
            height: component.height,
            display: 'inline-block',
            backgroundColor: 'transparent',
            borderRadius: component.border.radius,
            borderWidth: component.border.width,
            borderStyle: component.border.style,
            borderColor: component.border.color,
            // marginRight: '10px',
            verticalAlign: 'middle',
        }).selector('.innerBox.--checked', {
            backgroundColor: component.color.backgroundChecked,
            borderColor: component.border.colorChecked,
        }).selector('.innerBox.--disabled', {
            opacity: '0.6',
            borderColor: component.border.colorChecked,
        }).selector('.innerBox.--disabled.--checked', {
            opacity: '0.6',
            backgroundColor: component.color.backgroundChecked,
            borderColor: component.border.colorChecked,
        });

        sheet.selector('.wrapper', {
            display: 'flex',
            alignItems: 'center',
        });

        sheet.selector('.box', {
            position: 'relative',
            cursor: 'pointer',
        });

        sheet.selector('.input', {
            display: 'none',
        });

        sheet.selector('.icon', {
            color: component.color.icon,
            position: 'absolute',
            cursor: 'pointer',
            top: '53%',
            transform: 'translateY(-50%)',
            left: '1px',
            display: 'none',
            fontSize: component.font.size,
        }).selector('.icon.--checked', {
            display: 'inline-block',
        });

        sheet.selector('.label', {
            marginLeft: 10,
            fontFamily: component.font.family,
            fontSize: component.font.size,
            color: component.color.text,
        });
    };

    return sheet;
};
