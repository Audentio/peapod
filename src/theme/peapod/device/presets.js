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
                    width: 245,
                    height: 500,
                    offset: {
                        top: 59,
                        right: 15,
                        bottom: 59,
                        left: 15
                    },
                    viewport: {
                        width: 375,
                        height: 667
                    }
                }
            },
            variants: {
                black: {
                    svg: 'url(iPhone-6-Black.svg)',
                    position: {
                        bottom: 0,
                        left: 0
                    }
                }
            }
        },
        macbook: {
            standard: {
                version: 'one',
                variant: 'spacegrey'
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
                        left: 62
                    },
                    viewport: {
                        width: 1024,
                        height: 640
                    }
                }
            },
            variants: {
                gold: {
                    svg: 'url(Macbook-Gold.svg)',
                    position: {
                        bottom: 0,
                        left: 0
                    }
                },
                silver: {
                    svg: 'url(Macbook-Silver.svg)',
                    position: {
                        bottom: 0,
                        left: 0
                    }
                },
                spacegrey: {
                    svg: 'url(Macbook-SpaceGrey.svg)',
                    position: {
                        bottom: 0,
                        left: 0
                    }
                }
            }
        },
        // macbookpro: {
        //     standard: {
        //         version: '2015',
        //         variant: '15'
        //     },
        //     versions: {
        //         '2015': {
        //             // 'styles'
        //             width: '600px',
        //             height: '300px',
        //             offset: {
        //                 top: 19,
        //                 right: 104,
        //                 bottom: 36,
        //                 left: 104
        //             }
        //         }
        //     },
        //     variants: {
        //         '15': {
        //             svg: 'url(Macbook-Pro-Retina.svg)',
        //             position: {
        //                 bottom: 0,
        //                 left: 0
        //             }
        //         }
        //     }
        // },
        // imac: {
        //     standard: {
        //         version: '2016',
        //         variant: 'silver'
        //     },
        //     versions: {
        //         '2016': {
        //             // 'styles'
        //             width: '600px',
        //             height: '400px',
        //             offset: {
        //                 top: 19,
        //                 right: 77,
        //                 bottom: 129,
        //                 left: 77
        //             }
        //         }
        //     },
        //     variants: {
        //         silver: {
        //             svg: 'url(iMac.svg)',
        //             position: {
        //                 bottom: 0,
        //                 left: 0
        //             }
        //         }
        //     }
        // },
    }
}
module.exports = devices;