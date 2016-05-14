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
                silver: {
                    svg: 'url(devices/iPhone-6-Silver.svg)',
                    position: {
                        bottom: 'calc(-5px - 50%)',
                        left: 'calc(378px - 50%)',
                    },
                },
                gold: {
                    svg: 'url(devices/iPhone-6-Gold.svg)',
                    position: {
                        bottom: 'calc(-5px - 50%)',
                        left: 'calc(378px - 50%)',
                    },
                },
                rosegold: {
                    svg: 'url(devices/iPhone-6-Rose-Gold.svg)',
                    position: {
                        bottom: 'calc(-5px - 50%)',
                        left: 'calc(378px - 50%)',
                    },
                },
                spacegrey: {
                    svg: 'url(devices/iPhone-6-Space-Grey.svg)',
                    position: {
                        bottom: 'calc(-5px - 50%)',
                        left: 'calc(378px - 50%)',
                    },
                },
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
                gold: {
                    svg: 'url(devices/Macbook-Gold.svg)',
                    position: {
                        bottom: 0,
                        left: 0,
                    },
                },
                silver: {
                    svg: 'url(devices/Macbook-Silver.svg)',
                    position: {
                        bottom: 0,
                        left: 0,
                    },
                },
                spacegrey: {
                    svg: 'url(devices/Macbook-SpaceGrey.svg)',
                    position: {
                        bottom: 0,
                        left: 0,
                    },
                },
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
                2015: {
                    svg: 'url(devices/Macbook-Pro-Retina.svg)',
                    position: {
                        bottom: 0,
                        left: 0,
                    },
                },
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
                silver: {
                    svg: 'url(devices/iMac.svg)',
                    position: {
                        bottom: 0,
                        left: 0,
                    },
                },
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
                silver: {
                    svg: 'url(devices/iPad-Pro-12-Silver.svg)',
                    position: {
                        bottom: '-73px',
                        left: '73px',
                    },
                },
                gold: {
                    svg: 'url(devices/iPad-Pro-12-Gold.svg)',
                    position: {
                        bottom: '-73px',
                        left: '73px',
                    },
                },
                rosegold: {
                    svg: 'url(devices/iPad-Pro-12-Rose-Gold.svg)',
                    position: {
                        bottom: '-73px',
                        left: '73px',
                    },
                },
                spacegrey: {
                    svg: 'url(devices/iPad-Pro-12-Space-Grey.svg)',
                    position: {
                        bottom: '-73px',
                        left: '73px',
                    },
                },
            },
        },
    },
};

module.exports = devices;
