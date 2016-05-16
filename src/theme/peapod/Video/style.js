import { Sheet } from 'stylesheet.js'
import { merge as _merge } from 'lodash'

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName)
    const main = sheet.addMain()
    const video = sheet.addPart('video')
    const controls = sheet.addPart('controls')
    const playpause = sheet.addPart('playpause')
    const playpauseIcon = sheet.addPart('playpauseIcon')
    const volumeIcon = sheet.addPart('volumeIcon')
    const seekbar = sheet.addPart('seekbar')
    const seekbar_progress = sheet.addPart('seekbar_progress')
    const seekbar_time = sheet.addPart('seekbar_time')
    const seekbar_bar = sheet.addPart('seekbar_bar')
    const morecontrols = sheet.addPart('morecontrols')

    sheet.addCondition('main_hovered').addState({ main_hovered: true })
    sheet.addCondition('playing').addState({ playing: true })
    sheet.addCondition('fullscreen').addState({ fullscreen: true })

    main.addSelector({
        common: {
            display: 'inline-block',
            outline: 'none',
            position: 'relative',
            width: '720px',
            maxWidth: '100%',
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: 'black',
        },
    })
    .addSelector({
        condition: 'fullscreen',
        common: {
            display: 'block',
            width: '100%',
            height: '100%',
        },
    })

    video.addSelector({
        common: {
            display: 'block',
            maxWidth: '100%',
        },
    })
    .addSelector({
        condition: 'fullscreen',
        common: {
            width: '100%',
            height: '100%',
        },
    })

    controls.addSelector({
        common: {
            display: 'table',
            WebkitUserSelect: 'none',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 40,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,.5)',
            transition: '.1s',
            borderRadius: '0 0 5px 5px',
        },
    })
    .addSelector({
        condition: 'playing',
        common: {
            transform: 'translateY(100%)',
        },
    })
    .addSelector({
        condition: ['main_hovered'],
        common: {
            transform: 'none',
        },
    })
    .addSelector({
        condition: 'fullscreen',
        common: {
            height: 48,
        },
    })

    const controls_section = {
        display: 'table-cell',
        verticalAlign: 'middle',
        zIndex: 1,
        textAlign: 'center',
    }

    playpause.addSelector({
        common: _merge({}, controls_section, {
            cursor: 'pointer',
            width: '38px',
            opacity: 0.8,
            transition: '.1s',
            ':hover': {
                opacity: 1,
            },
        }),
    })

    playpauseIcon.addSelector({
        common: {
            cursor: 'pointer',
            verticalAlign: 'bottom',
            fontSize: 24,
        },
    })

    volumeIcon.addSelector({
        common: {
            verticalAlign: 'bottom',
            fontSize: 17,
        },
    })

    seekbar.addSelector({
        common: _merge({}, controls_section, {

        }),
    })

    seekbar_progress.addSelector({
        common: {
            mainStyle: {
                marginBottom: 0,
                background: 'rgba(255,255,255,0.3)',
            },
            progressStyle: {
                background: 'rgba(255,255,255,1)',
                transition: '0.1s',
            },
        },
    })

    seekbar_time.addSelector({
        common: {
            display: 'table-cell',
            verticalAlign: 'middle',
            width: '50px',
            textAlign: 'left',
        },
    })

    seekbar_bar.addSelector({
        common: {
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '0 4px',
        },
    })

    morecontrols.addSelector({
        common: _merge({}, controls_section, {
            width: '70px',
        }),
    })

    return sheet;
}
