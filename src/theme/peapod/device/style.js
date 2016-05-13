import { Sheet } from 'stylesheet.js';

import devices from './presets.js';

module.exports = function (sheetName) {
    const sheet = new Sheet(sheetName);
    const main = sheet.addMain();
    const background = sheet.addPart('background');
    const innerscreen = sheet.addPart('innerscreen');
    const overlay = sheet.addPart('overlay');
    const scrollable = sheet.addPart('scrollable');


    // Conditions
    sheet.addCondition('scrollable').addStyler({ scrollable: true });
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });

    sheet.addCondition('trueScaling').addProp({ trueScaling: true });
    sheet.addCondition('scale').addProp({ scale: ['!=', undefined] });


    // Variables
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
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            width: getStandardVersion.height,
            height: getStandardVersion.width,
        },
    });
    background.addSelector({
        common: {
            position: 'relative',
            backgroundSize: '100% 100%',
            backgroundImage: getStandardVariant.svg,
            width: getStandardVersion.width,
            height: getStandardVersion.height,
            position: 'absolute',
        },
    }).addSelector({
        condition: ['horizontal'],
        common: {
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
            bottom: getStandardVariant.position.bottom,
            left: getStandardVariant.position.left,
        },
    });
    innerscreen.addSelector({
        common: {
            position: 'absolute',
            top: getStandardVersion.offset.top,
            right: getStandardVersion.offset.right,
            bottom: getStandardVersion.offset.bottom,
            left: getStandardVersion.offset.left,
            overflow: 'hidden',
            background: 'white',
        }
    }).addSelector({
        condition: ['horizontal'],
        common: {
            top: getStandardVersion.offset.left,
            right: getStandardVersion.offset.bottom,
            bottom: getStandardVersion.offset.right,
            left: getStandardVersion.offset.top,
        }
    }).addSelector({
        condition: ['trueScaling'],
        common: {
            width: getStandardVersion.viewport.width,
            height: getStandardVersion.viewport.height,
            transform: 'scale(' + ((getStandardVersion.width -  getStandardVersion.offset.right - getStandardVersion.offset.left) / getStandardVersion.viewport.width ) + ')', // should be 0.688
            transformOrigin: '0 0'
        }
    }).addSelector({
        condition: ['trueScaling', 'horizontal'],
        common: {
            width: getStandardVersion.viewport.height,
            height: getStandardVersion.viewport.width,
            transform: 'scale(' + ((getStandardVersion.width -  getStandardVersion.offset.right - getStandardVersion.offset.left) / getStandardVersion.viewport.width ) + ')', // should be 0.688
            transformOrigin: '0 0'
        }
    });
    scrollable.addSelector({
        common: {
            width: '100%',
            height: '100%'
        }
    }).addSelector({
        condition: ['scrollable'],
        common: {
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '100%',
            height: '100%'
        }
    });
    overlay.addSelector({
        common: {
            position: 'absolute',
            pointerEvents: 'none',
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundPosition: '-194.5% -50%',
            backgroundSize: '380%',

            backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,.1) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)'
            // radial-gradient(ellipse at center, rgba(255,255,255,0.43) 0%, rgb(255, 255, 255) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 100%)

        }
    });
    for(var index in devices.devices) {
        var device = devices.devices[index];
        var deviceindex = index;

        sheet.addCondition('device' + deviceindex).addProp({device: deviceindex});

        var standardVersion = device.standard.version;
        var standardVariant = device.standard.variant;

        var versions = devices.devices[deviceindex].versions;
        var variants = devices.devices[deviceindex].variants;

        var getStandardVersion = device.versions[standardVersion];
        var getStandardVariant = device.variants[standardVariant];

        main.addSelector({
            condition: ['device' + deviceindex],
            common: {
                position: 'relative',
                backgroundSize: '100% 100%',
                position: 'relative',

                width: getStandardVersion.width,
                height: getStandardVersion.height
            }
        }).addSelector({
            condition: ['device' + deviceindex, 'horizontal'],
            common: {
                width: getStandardVersion.height,
                height: getStandardVersion.width
            }
        });
        background.addSelector({
            condition: ['device' + deviceindex],
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
            condition: ['device' + deviceindex],
            common: {
                position: 'absolute',
                top: getStandardVersion.offset.top,
                right: getStandardVersion.offset.right,
                bottom: getStandardVersion.offset.bottom,
                left: getStandardVersion.offset.left,
                overflow: 'hidden'
            }
        }).addSelector({
            condition: ['horizontal', 'device' + deviceindex],
            common: {
                top: getStandardVersion.offset.left,
                right: getStandardVersion.offset.bottom,
                bottom: getStandardVersion.offset.right,
                left: getStandardVersion.offset.top
            }
        }).addSelector({
            condition: ['trueScaling', 'device' + deviceindex],
            common: {
                width: getStandardVersion.viewport.width,
                height: getStandardVersion.viewport.height,
                transform: 'scale(' + ((getStandardVersion.width -  getStandardVersion.offset.right - getStandardVersion.offset.left) / getStandardVersion.viewport.width ) + ')', // should be 0.688
                transformOrigin: '0 0'
            }
        });

        for(var index in versions) {
            var versionindex = index;

            sheet.addCondition('version' + versionindex).addProp({version: versionindex});

            main.addSelector({
                condition: ['version' + versionindex, 'device' + deviceindex],
                common: {
                    width: versions[versionindex].width,
                    height: versions[versionindex].height
                }
            }).addSelector({
                condition: ['version' + versionindex, 'device' + deviceindex, 'horizontal'],
                common: {
                    width: versions[versionindex].height,
                    height: versions[versionindex].width
                }
            });
            background.addSelector({
                condition: ['version' + versionindex, 'device' + deviceindex],
                common: {
                    width: versions[versionindex].width,
                    height: versions[versionindex].height
                }
            })
            innerscreen.addSelector({
                condition: ['version' + versionindex, 'device' + deviceindex],
                common: {
                    top: versions[versionindex].offset.top,
                    right: versions[versionindex].offset.right,
                    bottom: versions[versionindex].offset.bottom,
                    left: versions[versionindex].offset.left,
                }
            }).addSelector({
                condition: ['horizontal', 'version' + versionindex, 'device' + deviceindex],
                common: {
                    top: versions[versionindex].offset.left,
                    right: versions[versionindex].offset.bottom,
                    bottom: versions[versionindex].offset.right,
                    left: versions[versionindex].offset.top,
                }
            }).addSelector({
                condition: ['trueScaling', 'version' + versionindex, 'device' + deviceindex],
                common: {
                    width: versions[versionindex].viewport.width,
                    height: versions[versionindex].viewport.height,
                    transform: 'scale(' + ((versions[versionindex].width -  versions[versionindex].offset.right - versions[versionindex].offset.left) / versions[versionindex].viewport.width ) + ')', // should be 0.688
                    transformOrigin: '0 0'
                }
            });

            for(var index in variants) {
                var variantindex = index;

                sheet.addCondition('variant' + variantindex).addProp({variant: variantindex});
                background.addSelector({
                    condition: ['variant' + variantindex, 'device' + deviceindex],
                    common: {
                        backgroundImage: variants[variantindex].svg,
                        bottom: variants[variantindex].position.bottom,
                        left: variants[variantindex].position.left
                    }
                });
            }
        }

    }

    return sheet;
}
