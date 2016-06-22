module.exports = function (sheet) {
    const main = sheet.addMain();
    const footer = sheet.addPart('footer');

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            color: {
                lightRow: {
                    background: 'transparent',
                    color: theme.color.text.dark,
                    hover: theme.palette.grey200,
                },
                darkRow: {
                    get background() { return component.color.lightRow.background; },
                    get color() { return component.color.lightRow.color; },
                    get hover() { return component.color.lightRow.hover; },
                },
                header: {
                    background: '#FFF',
                    color: theme.color.text.lighter,
                    hover: '#525F6D',
                },
                checked: {
                    background: 'rgb(224, 231, 236)',
                    color: theme.color.text.dark,
                    hover: theme.palette.blueGrey300,
                },
                columnHovered: {
                    background: 'initial',
                    color: theme.color.text.dark,
                    get headerBackground() { return component.color.header.background; },
                    headerColor: theme.color.text.dark,
                },
                controls: {
                    background: '#FFF',
                    color: theme.palette.grey600,
                },
                editIcon: {
                    color: '#ABBAC7',
                },
            },
            border: {
                color: theme.palette.grey300,
                radius: theme.border.radius.large,
                width: '1px',
                style: 'solid',
            },
            gutter: {
                vertical: theme.gutter.internal,
                horizontal: theme.gutter.small,
            },
            font: {
                family: 'inherit',
                size: theme.font.size.normal,
                headerFamily: theme.font.family.primary,
                headerSize: theme.font.size.small,
                headerWeight: theme.font.weight.medium,
            },
            headerHeight: '64px',
            footerHeight: '56px',
        };
        return component;
    };


    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        main.addSelector({
            common: {
                width: '100%',
                display: 'block',
                borderRadius: component.border.radius,
                overflowX: 'auto',
            },
        });

        footer.addSelector({
            common: {
                background: component.color.controls.background,
                color: component.color.controls.color,
            },
        });
    };

    return sheet;
};
