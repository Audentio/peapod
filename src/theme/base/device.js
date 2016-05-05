import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('device'),
    main = sheet.addMain(),
    background = sheet.addPart('background'),
    innerscreen = sheet.addPart('innerscreen');

//Conditions
sheet.addCondition('scrollable').addStyler({scrollable: true});
sheet.addCondition('horizontal').addProp({orientation: 'horizontal'});

var devices = {
    standard: {
        device: 'iphone'
    },
    devices: {
        iphone: {
            standard: {
                version: 'six',
                variant: 'black'
            },
            versions: {
                six: {
                    // 'styles'
                    width: '320px',
                    height: '600px',
                    offset: {
                        top: 71,
                        right: 31,
                        bottom: 71,
                        left: 31
                    }
                }
            },
            variants: {
                black: {
                    svg: 'url(iphone.svg)',
                    position: {
                        bottom: 'calc(50% - 300px)',
                        left: 'calc(50% - 160px)'
                    }
                }
            }
        }
    }
}

//Variables
sheet.setValues(devices);

var standardDevice = devices.standard.device;
var standardVersion = devices.devices[standardDevice].standard.version;
var standardVariant = devices.devices[standardDevice].standard.variant;
var getStandard = devices.devices[standardDevice];
var getStandardVersion = getStandard.versions[standardVersion];
var getStandardVariant = getStandard.variants[standardVariant];

main.addSelector({
    common: {
        position: 'relative',
        backgroundSize: '100% 100%',
        position: 'relative',

        width: getStandardVersion.width,
        height: getStandardVersion.height
    }
}).addSelector({
    condition: ['horizontal'],
    common: {
        width: getStandardVersion.height,
        height: getStandardVersion.width
    }
});
background.addSelector({
    common: {
        position: 'relative',
        backgroundSize: '100% 100%',
        backgroundImage: getStandardVariant.svg,
        width: getStandardVersion.width,
        height: getStandardVersion.height,
        position: 'absolute',
        bottom: getStandardVariant.position.bottom,
        left: getStandardVariant.position.left
    }
}).addSelector({
    condition: ['horizontal'],
    common: {
        transform: 'rotate(-90deg)',
        transformOrigin: 'center'
    }
});
innerscreen.addSelector({
    common: {
        position: 'absolute',
        top: getStandardVersion.offset.top,
        right: getStandardVersion.offset.right,
        bottom: getStandardVersion.offset.bottom,
        left: getStandardVersion.offset.left,
        overflow: 'hidden'
    }
}).addSelector({
    condition: ['horizontal'],
    common: {
        top: getStandardVersion.offset.right,
        right: getStandardVersion.offset.bottom,
        bottom: getStandardVersion.offset.left,
        left: getStandardVersion.offset.top,
    }
}).addSelector({
    condition: ['scrollable'],
    common: {
        overflowX: 'hidden',
        overflowY: 'auto'
        // scrollable?
    }
})

for(var index in devices.devices) {
    if (index != 'standard') {continue;}
    var device = devices.devices[index];

    sheet.addCondition('device' + index).addProp({device: index});

    var standardVersion = device.standard.version;
    var standardVariant = device.standard.variant;
    var getStandardVersion = device[standardVersion];
    var getStandardVariant = device[standardVariant];

    var versions = devices.devices[index].versions;
    var variants = devices.devices[index].variants;

    main.addSelector({
        condition: ['device' + index],
        common: {
            position: 'relative',
            backgroundSize: '100% 100%',
            position: 'relative',

            width: getStandardVersion.width,
            height: getStandardVersion.height
        }
    }).addSelector({
        condition: ['device' + index, 'horizontal'],
        common: {
            width: getStandardVersion.height,
            height: getStandardVersion.width
        }
    });
    background.addSelector({
        condition: ['device' + index],
        common: {
            position: 'relative',
            backgroundSize: '100% 100%',
            backgroundImage: getStandardVariant.svg,
            width: getStandardVersion.width,
            height: getStandardVersion.height,
            position: 'absolute',
            bottom: getStandardVariant.position.bottom,
            left: getStandardVariant.position.left
        }
    });
    innerscreen.addSelector({
        condition: ['device' + index],
        common: {
            position: 'absolute',
            top: getStandardVersion.offset.top,
            right: getStandardVersion.offset.right,
            bottom: getStandardVersion.offset.bottom,
            left: getStandardVersion.offset.left,
            overflow: 'hidden'
        }
    }).addSelector({
        condition: ['horizontal'],
        common: {
            top: getStandardVersion.offset.right,
            right: getStandardVersion.offset.bottom,
            bottom: getStandardVersion.offset.left,
            left: getStandardVersion.offset.top,
        }
    })

    for(var index in versions) {
        sheet.addCondition('version' + index).addProp({version: index});

        main.addSelector({
            condition: ['version' + index, 'device' + index],
            common: {
                width: versions[index].width,
                height: versions[index].height
            }
        }).addSelector({
            condition: ['version' + index, 'device' + index, 'horizontal'],
            common: {
                width: versions[index].height,
                height: versions[index].width
            }
        });
        background.addSelector({
            condition: ['version' + index, 'device' + index],
            common: {
                width: versions[index].width,
                height: versions[index].height
            }
        })
        innerscreen.addSelector({
            condition: ['version' + index, 'device' + index],
            common: {
                top: versions[index].offset.top,
                right: versions[index].offset.right,
                bottom: versions[index].offset.bottom,
                left: versions[index].offset.left,
            }
        }).addSelector({
            condition: ['horizontal'],
            common: {
                top: versions[index].offset.right,
                right: versions[index].offset.bottom,
                bottom: versions[index].offset.left,
                left: versions[index].offset.top,
            }
        });

        for(var index in variants) {
            sheet.addCondition('variant' + index).addProp({variant: index});
            background.addSelector({
                condition: ['variant' + index, 'device' + index],
                common: {
                    backgroundImage: variants[index].svg,
                    bottom: variants[index].position.bottom,
                    left: variants[index].position.left
                }
            });
        }
    }

}

module.exports = sheet;