module.exports = function (sheet) {
    // Conditions
    sheet.addCondition('scrollable').addStyler({ scrollable: true });
    sheet.addCondition('horizontal').addProp({ orientation: 'horizontal' });

    sheet.addCondition('trueScaling').addProp({ trueScaling: true });
    // sheet.addCondition('scale').addProp({ scale: ['!=', undefined] });
    sheet.addCondition('scale').addFunction((instance) => {
        return instance.props.width || instance.props.height || instance.props.scale;
    });

    const devices = {
        iphone: {
            standard: {
                version: 6,
                variant: 'silver',
            },
            versions: {
                6: {},
            },
            variants: {
                silver: 'url(assets/devices/iPhone-6-Silver.svg)',
                gold: 'url(assets/devices/iPhone-6-Gold.svg)',
                rosegold: 'url(assets/devices/iPhone-6-Rose-Gold.svg)',
                spacegrey: 'url(assets/devices/iPhone-6-Space-Grey.svg)',
            },
        },
        macbook: {
            standard: {
                version: 'one',
                variant: 'spacegrey',
            },
            versions: {
                one: {},
            },
            variants: {
                gold: 'url(assets/devices/Macbook-Gold.svg)',
                silver: 'url(assets/devices/Macbook-Silver.svg)',
                spacegrey: 'url(assets/devices/Macbook-SpaceGrey.svg)',
            },
        },
        macbookpro: {
            standard: {
                version: 15,
                variant: 2015,
            },
            versions: {
                15: {},
                13: {},
            },
            variants: {
                2015: 'url(assets/devices/Macbook-Pro-Retina.svg)',
            },
        },
        imac: {
            standard: {
                version: 2016,
                variant: 'silver',
            },
            versions: {
                2016: {},
            },
            variants: {
                silver: 'url(assets/devices/iMac.svg)',
            },
        },
        ipadpro: {
            standard: {
                version: 12,
                variant: 'silver',
            },
            versions: {
                12: {},
            },
            variants: {
                silver: 'url(assets/devices/iPad-Pro-12-Silver.svg)',
                gold: 'url(assets/devices/iPad-Pro-12-Gold.svg)',
                rosegold: 'url(assets/devices/iPad-Pro-12-Rose-Gold.svg)',
                spacegrey: 'url(assets/devices/iPad-Pro-12-Space-Grey.svg)',
            },
        },
    };

    for (const deviceindex in devices) {
        if (devices[deviceindex]) {
            sheet.addCondition('device' + deviceindex).addProp({ device: deviceindex });

            const versions = devices[deviceindex].versions;
            const variants = devices[deviceindex].variants;

            for (const versionindex in versions) {
                if (versions[versionindex]) {
                    sheet.addCondition('version' + versionindex).addProp({ version: versionindex });

                    for (const variantindex in variants) {
                        if (variants[variantindex]) {
                            sheet.addCondition('variant' + variantindex).addProp({ variant: variantindex });
                        }
                    }
                }
            }

            for (const variantindex in variants) {
                if (variants[variantindex]) {
                    sheet.addCondition('variant' + variantindex).addProp({ variant: variantindex });
                }
            }
        }
    }

    sheet.resolveValues = theme => { // eslint-disable-line no-unused-vars
        const component = {
            standard: {
                device: 'iphone',
            },
            devices: {
                iphone: {
                    standard: {
                        version: 6,
                        variant: 'silver',
                    },
                    versions: {
                        6: {
                            // 'styles'
                            width: 245,
                            height: 500,
                            offset: {
                                top: 59,
                                right: 15,
                                bottom: 59,
                                left: 15,
                            },
                            viewport: {
                                width: 375,
                                height: 667,
                            },
                        },
                    },
                    variants: {
                        silver: 'url(assets/devices/iPhone-6-Silver.svg)',
                        gold: 'url(assets/devices/iPhone-6-Gold.svg)',
                        rosegold: 'url(assets/devices/iPhone-6-Rose-Gold.svg)',
                        spacegrey: 'url(assets/devices/iPhone-6-Space-Grey.svg)',
                    },
                },
                macbook: {
                    standard: {
                        version: 'one',
                        variant: 'spacegrey',
                    },
                    versions: {
                        one: {
                            // 'styles'
                            width: 500,
                            height: 290,
                            offset: {
                                top: 21,
                                right: 62,
                                bottom: 33,
                                left: 62,
                            },
                            viewport: {
                                width: 1280,
                                height: 800,
                            },
                        },
                    },
                    variants: {
                        gold: 'url(assets/devices/Macbook-Gold.svg)',
                        silver: 'url(assets/devices/Macbook-Silver.svg)',
                        spacegrey: 'url(assets/devices/Macbook-SpaceGrey.svg)',
                    },
                },
                macbookpro: {
                    standard: {
                        version: 15,
                        variant: 2015,
                    },
                    versions: {
                        15: {
                            // 'styles'
                            width: 500,
                            height: 291,
                            offset: {
                                top: 18,
                                right: 60,
                                bottom: 36,
                                left: 60,
                            },
                            viewport: {
                                width: 1440,
                                height: 900,
                            },
                        },
                        13: {
                            // 'styles'
                            width: 500,
                            height: 291,
                            offset: {
                                top: 18,
                                right: 60,
                                bottom: 36,
                                left: 60,
                            },
                            viewport: {
                                width: 1280,
                                height: 800,
                            },
                        },
                    },
                    variants: {
                        2015: 'url(assets/devices/Macbook-Pro-Retina.svg)',
                    },
                },
                imac: {
                    standard: {
                        version: 2016,
                        variant: 'silver',
                    },
                    versions: {
                        2016: {
                            // 'styles'
                            width: 500,
                            height: 413,
                            offset: {
                                top: 20,
                                right: 21,
                                bottom: 134,
                                left: 21,
                            },
                            viewport: {
                                width: 2560,
                                height: 1440,
                            },
                        },
                    },
                    variants: {
                        silver: 'url(assets/devices/iMac.svg)',
                    },
                },
                ipadpro: {
                    standard: {
                        version: 12,
                        variant: 'silver',
                    },
                    versions: {
                        12: {
                            // 'styles'
                            width: 353,
                            height: 500,
                            offset: {
                                top: 43,
                                right: 21,
                                bottom: 43,
                                left: 21,
                            },
                            viewport: {
                                width: 1024,
                                height: 1366,
                            },
                        },
                    },
                    variants: {
                        silver: 'url(assets/devices/iPad-Pro-12-Silver.svg)',
                        gold: 'url(assets/devices/iPad-Pro-12-Gold.svg)',
                        rosegold: 'url(assets/devices/iPad-Pro-12-Rose-Gold.svg)',
                        spacegrey: 'url(assets/devices/iPad-Pro-12-Space-Grey.svg)',
                    },
                },
            },
        };
        return component;
    };

    sheet.resolveStyles = (component, theme) => { // eslint-disable-line no-unused-vars
        function getScale(props, origWidth, origHeight) {
            const { scale = undefined, width = undefined, height = undefined } = props;
            let returnedscale;

            if (scale) {
                returnedscale = scale;
            } else if (height) {
                returnedscale = height / origHeight;
            } else if (width) {
                returnedscale = width / origWidth;
            }

            return returnedscale;
        }

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

            sheet.selector(`.main.--${deviceversion}.--${devicename}`, {
                position: 'relative',
                backgroundSize: '100% 100%',
                width: version.width,
                height: version.height,
                display: 'inline-block',
            }).selector(`.main.--horizontal.--${deviceversion}.--${devicename}`, {
                width: version.height,
                height: version.width,
            }).selector(`.main.--scale.--${deviceversion}.--${devicename}`, {
                width(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return (version.width * scale) + 'px';
                },
                height(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return (version.height * scale) + 'px';
                },
            });

            sheet.selector(`.background.--${devicevariant}.--${deviceversion}.--${devicename}`, {
                backgroundSize: '100% 100%',
                backgroundImage: variant,
                width: version.width,
                height: version.height,
                position: 'absolute',
            }).selector(`.background.--horizontal.--${devicevariant}.--${deviceversion}.--${devicename}`, {
                transform: 'translateX(-50%) translateY(50%) rotate(-90deg)',
                transformOrigin: '50% 50%',
                bottom: '50%',
                left: '50%',
            }).selector(`.background.--scale.--${deviceversion}.--${devicename}`, {
                width(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return (version.width * scale);
                },
                height(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return (version.height * scale) + 'px';
                },
            });

            sheet.selector(`.innerscreen.--${deviceversion}.--${devicename}`, {
                position: 'absolute',
                top: version.offset.top,
                right: version.offset.right,
                bottom: version.offset.bottom,
                left: version.offset.left,
                overflow: 'hidden',
                textAlign: 'left',
                background: 'white',
            }).selector(`.innerscreen.--horizontal.--${deviceversion}.--${devicename}`, {
                top: version.offset.left,
                right: version.offset.bottom,
                bottom: version.offset.right,
                left: version.offset.top,
            }).selector(`.innerscreen.--scale.--${deviceversion}.--${devicename}`, {
                top(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return version.offset.top * scale;
                },
                right(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return version.offset.right * scale;
                },
                bottom(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return version.offset.bottom * scale;
                },
                left(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return version.offset.left * scale;
                },
            }).selector(`.innerscreen.--trueScaling.--${deviceversion}.--${devicename}`, {
                width: version.viewport.width,
                height: version.viewport.height,
                transform: 'scale(' + ((version.width - version.offset.right - version.offset.left) / version.viewport.width) + ')', // should be 0.688
                transformOrigin: '0 0',
            }).selector(`.innerscreen.--trueScaling.--scale.--${deviceversion}.--${devicename}`, {
                transform(obj) {
                    const scale = getScale(obj.props, version.width, version.height);
                    return 'scale(' + (((version.width * scale) - (version.offset.right * scale) - (version.offset.left * scale)) / version.viewport.width) + ')';
                },
            });
        };

        const standardDevice = component.standard.device;
        const getStandard = component.devices[standardDevice];
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

        sheet.selector('.scrollale', {
            width: '100%',
            height: '100%',
        }).selector('.scrollable.--scrollable', {
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '100%',
            height: '100%',
        });

        sheet.selector('.overlay', {
            position: 'absolute',
            pointerEvents: 'none',
            top: 0, right: 0, bottom: 0, left: 0,
            backgroundPosition: '-194.5% -50%',
            backgroundSize: '380%',

            backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,.1) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
            // radial-gradient(ellipse at center, rgba(255,255,255,0.43) 0%, rgb(255, 255, 255) 50%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 51%, rgba(255,255,255,0) 100%)
        });

        for (const deviceindex in component.devices) {
            if (component.devices[deviceindex]) {
                const device = component.devices[deviceindex];

                const standardDeviceVersion = device.standard.version;
                const standardDeviceVariant = device.standard.variant;

                const versions = component.devices[deviceindex].versions;
                const variants = component.devices[deviceindex].variants;

                const getDeviceStandardVersion = device.versions[standardDeviceVersion];
                const getDeviceStandardVariant = device.variants[standardDeviceVariant];

                for (const versionindex in versions) {
                    if (versions[versionindex]) {

                        getDeviceStyles(versions[versionindex], getDeviceStandardVariant, {
                            name: deviceindex,
                            version: versionindex,
                            variant: undefined,
                        });

                        for (const variantindex in variants) {
                            if (variants[variantindex]) {
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
                        getDeviceStyles(getDeviceStandardVersion, variants[variantindex], {
                            name: deviceindex,
                            version: undefined,
                            variant: variantindex,
                        });
                    }
                }
            }
        }
    };

    return sheet;
};
