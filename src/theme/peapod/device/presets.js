const devices = {
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

module.exports = devices;
