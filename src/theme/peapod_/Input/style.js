module.exports = function (sheet) {
    sheet.addCondition('focused').addState({ focus: true });
    sheet.addCondition('type-textarea').addProp({ type: 'textarea' });
    sheet.addCondition('showCounter').addProp({ showCounter: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            color: {
                text: theme.color.text.base,
                placeholder: 'rgba(0,0,0,0.3)',
                background: 'transparent',
                backgroundFocus: 'transparent',
                get icon() { return component.color.text; },
            },
            textIndent: 0,
            height: (obj) => (obj.styler.height),
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            textareaPadding: {
                top: 10,
                right: 0,
                bottom: 10,
                left: 0,
            },
            border: {
                color: theme.palette.blue400,
                radius: '0px',
                width: '0px 0px 2px',
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
                    get placeholder() { return component.dark.color.text; },
                    background: 'transparent',
                    backgroundFocus: 'rgba(255, 255, 255, 0.1)',
                    get icon() { return component.dark.color.text; },
                },
                border: {
                    color: theme.palette.grey200,
                },
            },
            material: {
                color: {
                    background: 'transparent',
                },
                border: {
                    width: '0px 0px 1px 0px',
                },
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            height: component.height,
            fontSize: theme.font.size.body1,
            display: 'inline-block',
            position: 'relative',
            color: component.color.text,
            backgroundColor: component.color.background,
            borderWidth: '0px 0px 2px',
            borderStyle: component.border.style,
            borderColor: theme.palette.grey300,
            borderRadius: component.border.radius,
            // marginBottom: theme.gutter.extrasmall,
            transition: 'border-color 100ms',
        }).selector('.main.--type-textArea', {
            display: 'block',
            width: '500px',
            height: 'auto',
        }).selector('.main.--focused', {
            borderColor: theme.color.primary.base,
            borderWidth: '0px 0px 2px 0px',
        }).selector('.main.--evaluation-valid', {
            backgroundColor: 'transparent',
            borderColor: theme.color.success.base,
        }).selector('.main.--evaluation-invalid', {
            backgroundColor: 'transparent',
            borderColor: theme.color.danger.base,
        }).selector('.main.--evaluation-empty', {
            backgroundColor: 'transparent',
            borderColor: theme.color.danger.base,
        });

        sheet.selector('.wrapper', {
            paddingBottom: theme.gutter.internal,
            // paddingTop: theme.gutter.extrasmall,
        });

        sheet.selector('.input', {
            lineHeight: component.height,
            textAlign: 'start',
            // height: component.height,  // weird verticalAlign issue with placeholder and input text
            width: 180,
            minWidth: '100%',
            maxWidth: '100%',
            paddingTop: component.padding.top,
            paddingRight: component.padding.right,
            paddingBottom: component.padding.bottom,
            paddingLeft: component.padding.left,
            verticalAlign: 'middle',
            textIndent: component.textIndent,
            background: 'transparent',
            fontSize: 'inherit',
            color: 'inherit',
            appearance: 'none',
            borderWidth: '0',
            outline: 'none',
            position: 'relative',
            zIndex: 2,
            transition: 'padding 100ms',
            fontFamily: 'inherit',
        }).selector('.input.--type-textarea', {
            maxWidth: '100%',
            paddingTop: component.textareaPadding.top,
            paddingBottom: component.textareaPadding.bottom,
        }).selector('input.--focused', {
            paddingLeft: '0px',
        });

        sheet.selector('.placeholder', {
            position: 'absolute',
            textAlign: 'start',
            lineHeight: component.height,
            height: component.height,
            width: '100%',
            top: 0,
            left: 0,
            paddingRight: component.padding.right,
            paddingLeft: component.padding.left,
            textIndent: component.textIndent,
            zIndex: 1,
            color: component.color.placeholder,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: 'inherit',
            transition: 'padding 100ms',
            verticalAlign: 'middle',
        }).selector('.placeholder.--type-textarea', {
            lineHeight: 'normal',
            height: '100%',
            paddingTop: component.textareaPadding.top,
            paddingBottom: component.textareaPadding.bottom,
        });

        sheet.selector('.charCounter', {
            position: 'absolute',
            bottom: 0,
            left: 0,
            marginBottom: -25,
        });
    };

    return sheet;
};
