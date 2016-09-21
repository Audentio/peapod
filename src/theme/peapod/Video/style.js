import { merge as _merge } from 'lodash';

module.exports = function (sheet) {
    sheet.addCondition('main_hovered').addState({ main_hovered: true });
    sheet.addCondition('playing').addState({ playing: true });
    sheet.addCondition('fullscreen').addState({ fullscreen: true });

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {};
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        sheet.selector('.main', {
            display: 'inline-block',
            outline: 'none',
            position: 'relative',
            width: '720px',
            maxWidth: '100%',
            borderRadius: 5,
            overflow: 'hidden',
            backgroundColor: 'black',
        }).selector('.main.--fullscreen', {
            display: 'block',
            width: '100%',
            height: '100%',
        });

        sheet.selector('.video', {
            display: 'block',
            maxWidth: '100%',
        }).selector('.video.--fullscreen', {
            width: '100%',
            height: '100%',
        });

        sheet.selector('.controls', {
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
        }).selector('.controls.--playing', {
            transform: 'translateY(100%)',
        }).selector('.controls.--main_hovered', {
            transform: 'none',
        }).selector('.controls.--fullscreen', {
            height: 48,
        });

        const controls_section = {
            display: 'table-cell',
            verticalAlign: 'middle',
            zIndex: 1,
            textAlign: 'center',
        };

        sheet.selector('.playpause', _merge({}, controls_section, {
            cursor: 'pointer',
            width: '38px',
            opacity: 0.8,
            transition: '.1s',
            ':hover': {
                opacity: 1,
            },
        }));

        sheet.selector('.playpauseIcon', {
            cursor: 'pointer',
            verticalAlign: 'bottom',
            fontSize: 24,
        });

        sheet.selector('.volumeIcon', {
            verticalAlign: 'bottom',
            fontSize: 17,
        });

        sheet.selector('.seekbar', controls_section);

        sheet.selector('.seekbar_table', {
            display: 'table',
            width: '100%',
            height: 40,
        }).selector('.seekbar_table.--fullscreen', {
            height: 48,
        });

        sheet.selector('.seekbar_main', {
            marginBottom: 0,
            background: 'rgba(255,255,255,0.3)',
        });

        sheet.selector('.seekbar_progress', {
            background: 'rgba(255,255,255,1)',
            transition: '0.1s',
        });

        sheet.selector('.seekbar_time', {
            display: 'table-cell',
            verticalAlign: 'middle',
            width: '50px',
            textAlign: 'left',
        });

        sheet.selectors('.seekbar_bar', {
            display: 'table-cell',
            verticalAlign: 'middle',
            padding: '0 4px',
        });

        sheet.selector('.morecontrols', _merge({}, controls_section, {
            width: '70px',
        }));
    };

    return sheet;
};
