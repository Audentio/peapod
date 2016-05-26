import { Sheet } from 'utility/stylesheet.js';

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

    // Set all variables for different devices
    const getDeviceStyles = function (version, variant, deviceVals) {
        let devicename;
        let deviceversion;
        let devicevariant;

        if (deviceVals) {
            devicename = (deviceVals.name) ? 'device' + deviceVals.name : undefined;
            deviceversion = (deviceVals.version) ? 'version' + deviceVals.version : undefined;
            devicevariant = (deviceVals.variant) ? 'variant' + deviceVals.variant : undefined;
        }

        main.addSelector({
            condition: [deviceversion, devicename].filter((e) => e),
            common: {
                position: 'relative',
                backgroundSize: '100% 100%',

                width: version.width,
                height: version.height,
            },
        }).addSelector({
            condition: ['horizontal', deviceversion, devicename].filter((e) => e),
            common: {
                width: version.height,
                height: version.width,
            },
        }).addSelector({
            condition: ['scale', deviceversion, devicename].filter((e) => e),
            common: {
                width(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.width * scale) + 'px';
                },
                height(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.height * scale) + 'px';
                },
            },
        }).addSelector({
            condition: ['scale', 'horizontal', deviceversion, devicename].filter((e) => e),
            common: {
                height(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.width * scale) + 'px';
                },
                width(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.height * scale) + 'px';
                },
            },
        });
        background.addSelector({
            condition: [devicevariant, deviceversion, devicename].filter((e) => e),
            common: {
                backgroundSize: '100% 100%',
                backgroundImage: variant,
                width: version.width,
                height: version.height,
                position: 'absolute',
            },
        }).addSelector({
            condition: ['horizontal', devicevariant, deviceversion, devicename].filter((e) => e),
            common: {
                transform: 'translateX(-50%) translateY(50%) rotate(-90deg)',
                transformOrigin: '50% 50%',
                bottom: '50%',
                left: '50%',
            },
        }).addSelector({
            condition: ['scale', deviceversion, devicename].filter((e) => e),
            common: {
                width(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.width * scale);
                },
                height(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return (version.height * scale) + 'px';
                },
            },
        });
        innerscreen.addSelector({
            condition: [deviceversion, devicename].filter((e) => e),
            common: {
                position: 'absolute',
                top: version.offset.top,
                right: version.offset.right,
                bottom: version.offset.bottom,
                left: version.offset.left,
                overflow: 'hidden',
                background: 'white',
            },
        }).addSelector({
            condition: ['horizontal', deviceversion, devicename].filter((e) => e),
            common: {
                top: version.offset.left,
                right: version.offset.bottom,
                bottom: version.offset.right,
                left: version.offset.top,
            },
        }).addSelector({
            condition: ['scale', deviceversion, devicename].filter((e) => e),
            common: {
                top(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.top * scale;
                },
                right(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.right * scale;
                },
                bottom(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.bottom * scale;
                },
                left(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.left * scale;
                },
            },
        }).addSelector({
            condition: ['scale', deviceversion, devicename].filter((e) => e),
            common: {
                top(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.left * scale;
                },
                right(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.bottom * scale;
                },
                bottom(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.right * scale;
                },
                left(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return version.offset.top * scale;
                },
            },
        }).addSelector({
            condition: ['trueScaling', deviceversion, devicename].filter((e) => e),
            common: {
                width: version.viewport.width,
                height: version.viewport.height,
                transform: 'scale(' + ((version.width - version.offset.right - version.offset.left) / version.viewport.width) + ')', // should be 0.688
                transformOrigin: '0 0',
            },
        }).addSelector({
            condition: ['trueScaling', 'scale', deviceversion, devicename].filter((e) => e),
            common: {
                transform(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return 'scale(' + (((version.width * scale) - (version.offset.right * scale) - (version.offset.left * scale)) / version.viewport.width) + ')';
                },
            },
        }).addSelector({
            condition: ['trueScaling', 'horizontal', deviceversion, devicename].filter((e) => e),
            common: {
                width: version.viewport.height,
                height: version.viewport.width,
                transform: 'scale(' + ((version.width - version.offset.right - version.offset.left) / version.viewport.width) + ')', // should be 0.688
                transformOrigin: '0 0',
            },
        }).addSelector({
            condition: ['trueScaling', 'horizontal', 'scale', deviceversion, devicename].filter((e) => e),
            common: {
                width: version.viewport.height,
                height: version.viewport.width,
                transform(obj) {
                    const scale = parseInt(obj.props.scale, 10);
                    return 'scale(' + (((version.width * scale) - (version.offset.right * scale) - (version.offset.left * scale)) / version.viewport.width) + ')';
                },
            },
        });
    };

    const standardDevice = devices.standard.device;
    const getStandard = devices.devices[standardDevice];
    const standardVersion = getStandard.standard.version;
    const standardVariant = getStandard.standard.variant;
    const getStandardVersion = getStandard.versions[standardVersion];
    const getStandardVariant = getStandard.variants[standardVariant];

    // not used
    // const getStandardValues = {
    //     name: standardDevice,
    //     version: standardVersion,
    //     variant: standardVariant,
    // };

    getDeviceStyles(getStandardVersion, getStandardVariant);

    scrollable.addSelector({
        common: {
            width: '100%',
            height: '100%',
        },
    }).addSelector({
        condition: ['scrollable'],
        common: {
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '100%',
            height: '100%',
        },
    });
    overlay.addSelector({
        common: {
            position: 'absolute',
            pointerEvents: 'none',
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundPosition: '-194.5% -50%',
            backgroundSize: '380%',

            backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,.1) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
            // radial-gradient(ellipse at center, rgba(255,255,255,0.43) 0%, rgb(255, 255, 255) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 100%)

        },
    });
    for (const deviceindex in devices.devices) {
        if (devices.devices[deviceindex]) {
            const device = devices.devices[deviceindex];

            sheet.addCondition('device' + deviceindex).addProp({ device: deviceindex });

            const standardDeviceVersion = device.standard.version;
            const standardDeviceVariant = device.standard.variant;

            const versions = devices.devices[deviceindex].versions;
            const variants = devices.devices[deviceindex].variants;

            const getDeviceStandardVersion = device.versions[standardDeviceVersion];
            const getDeviceStandardVariant = device.variants[standardDeviceVariant];

            for (const versionindex in versions) {
                if (versions[versionindex]) {
                    sheet.addCondition('version' + versionindex).addProp({ version: versionindex });

                    getDeviceStyles(versions[versionindex], getDeviceStandardVariant, {
                        name: deviceindex,
                        version: versionindex,
                        variant: undefined,
                    });

                    for (const variantindex in variants) {
                        if (variants[variantindex]) {
                            sheet.addCondition('variant' + variantindex).addProp({ variant: variantindex });

                            getDeviceStyles(versions[versionindex], variants[variantindex], {
                                name: deviceindex,
                                version: versionindex,
                                variant: variantindex,
                            });
                        }
                    }
                }
            }

            for (const variantindex in variants) {
                if (variants[variantindex]) {
                    sheet.addCondition('variant' + variantindex).addProp({ variant: variantindex });

                    getDeviceStyles(getDeviceStandardVersion, variants[variantindex], {
                        name: deviceindex,
                        version: undefined,
                        variant: variantindex,
                    });
                }
            }
        }
    }

    return sheet;
};
