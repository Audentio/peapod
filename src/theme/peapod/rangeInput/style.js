import { Sheet } from 'stylesheet.js'

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName)
    const main = sheet.addMain()
    const input = sheet.addPart('input')
    const track = sheet.addPart('track')
    const handle = sheet.addPart('handle')

    sheet.addCondition('handleActive').addState({ handleActive: true })

    main.addSelector({
        common: {
            position: 'relative',
            padding: '7px 0',
            marginBottom: 15,
        },
    })

    input.addSelector({
        common: {
            display: 'none',
        },
    })

    track.addSelector({
        common: {
            backgroundColor: '#eee',
            width: '100%',
            height: 4,
            position: 'relative',
        },
    })

    const handleActiveStyle = {
        backgroundColor: '#666',
    }

    handle.addSelector({
        common: {
            cursor: 'pointer',
            height: 14,
            width: 14,
            borderRadius: 100,
            backgroundColor: '#999',
            position: 'absolute',
            top: '50%',
            marginLeft: -7,
            marginTop: -7,
            ':hover': {
                backgroundColor: '#888',
            },
            ':active': handleActiveStyle,
        },
    }).addSelector({
        condition: 'handleActive',
        common: handleActiveStyle,
    })

    return sheet;
}
