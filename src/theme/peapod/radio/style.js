module.exports = function (sheet) {
    const main = sheet.addMain();
    // const wrapper_outer = sheet.addPart('wrapper_outer');
    // const wrapper_inner = sheet.addPart('wrapper_inner');
    const radio_outer = sheet.addPart('radio_outer');
    const radio_inner = sheet.addPart('radio_inner');
    const radio_element = sheet.addPart('radio_element');
    const label = sheet.addPart('label');

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
        main.addSelector({});

        radio_outer.addSelector({
            common: {
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
            },
        });
        radio_inner.addSelector({
            condition: ['checked'],
            common: {
                display: 'block',
                borderRadius: '1000px',
                background: component.color.background,
                position: 'absolute',
                top: component.border.width,
                left: component.border.width,
                bottom: component.border.width,
                right: component.border.width,
            },
        });
        radio_element.addSelector({
            common: {
                display: 'none',
            },
        });

        label.addSelector({
            common: {
                fontSize: component.font.size,
                verticalAlign: 'middle',
            },
        });
    };

    return sheet;
};
