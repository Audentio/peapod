import { Sheet } from 'utility/stylesheet.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const footer = sheet.addPart('footer');

    // Variables
    sheet.setValues({
        color: {
            lightRow: {
                background: 'transparent',
                color: '$color.text.dark',
                hover: '$palette.grey200',
            },
            darkRow: {
                background: '$table.color.lightRow.background',
                color: '$table.color.lightRow.color',
                hover: '$table.color.lightRow.hover',
            },
            header: {
                background: '#FFF',
                color: '$color.text.lighter',
                hover: '#525F6D',
            },
            checked: {
                background: 'rgb(224, 231, 236)',
                color: '$color.text.dark',
                hover: '$palette.blueGrey300',
            },
            columnHovered: {
                background: 'initial',
                color: '$color.text.dark',
                headerBackground: '$table.color.header.background',
                headerColor: '$color.text.dark',
            },
            controls: {
                background: '#FFF',
                color: '$palette.grey600',
            },
            editIcon: {
                color: '#ABBAC7',
            },
        },
        border: {
            color: '$palette.grey300',
            radius: '$border.radius.large',
            width: '1px',
            style: 'solid',
        },
        gutter: {
            vertical: '$gutter.internal',
            horizontal: '$gutter.small',
        },
        font: {
            family: 'inherit',
            size: '$font.size.normal',
            headerFamily: '$font.family.primary',
            headerSize: '$font.size.small',
            headerWeight: '$font.weight.medium',
        },
        headerHeight: '64px',
        footerHeight: '56px',
    });

    main.addSelector({
        common: {
            width: '100%',
            display: 'block',
            borderRadius: '$table.border.radius',
            overflowX: 'auto',
        },
    });

    footer.addSelector({
        common: {
            background: '$table.color.controls.background',
            color: '$table.color.controls.color',
        },
    });

    return sheet;
};
