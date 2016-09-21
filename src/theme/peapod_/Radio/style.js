module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('checked').addState({ checked: true });
    sheet.addCondition('block').addStyler({ block: true });
    sheet.addCondition('hovered').addStyler({ hovered: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            width: '1.5rem',
            get height() { return component.width; },
            color: {
                text: theme.color.text.dark,
                background: theme.palette.grey500,
                backgroundChecked: theme.color.primary.base,
                icon: theme.color.text.white,
            },
            border: {
                color: theme.palette.grey200,
                get colorChecked() { return component.color.backgroundChecked; },
                radius: theme.border.radius.large,
                width: '2px',
                style: 'solid',
            },
            font: {
                family: 'inherit',
                size: theme.font.size.normal,
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
                    get color() { return component.color.text; },
                },
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {

        });

        sheet.selector('.radio_outer', {
            width: component.width,
            height: component.height,
            background: 'transparent',
            borderWidth: component.border.width,
            borderStyle: component.border.style,
            borderColor: component.color.background,
            display: 'inline-block',
            marginRight: theme.gutter.extrasmall,
            borderRadius: '1000px',
            position: 'relative',
            verticalAlign: 'middle',
        });

        sheet.selector('.radio_inner.--checked', {
            display: 'block',
            borderRadius: '1000px',
            background: component.color.background,
            position: 'absolute',
            top: component.border.width,
            left: component.border.width,
            bottom: component.border.width,
            right: component.border.width,
        });

        sheet.selector('.radio_element', {
            display: 'none',
        });

        sheet.selector('.label', {
            fontSize: component.font.size,
            verticalAlign: 'middle',
        });
    };

    return sheet;
};
