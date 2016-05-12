import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
		main = sheet.addMain(),
		background = sheet.addPart('background'),
		innerscreen = sheet.addPart('innerscreen'),
		overlay = sheet.addPart('overlay'),
		scrollable = sheet.addPart('scrollable');

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
						svg: 'url(iPhone-6-Black.svg)',
						position: {
							bottom: 'calc(50% - 300px)',
							left: 'calc(50% - 160px)'
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
						width: '600px',
						height: '300px',
						offset: {
							top: 23,
							right: 106,
							bottom: 34,
							left: 105
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
			macbookpro: {
				standard: {
					version: '2015',
					variant: '15'
				},
				versions: {
					'2015': {
						// 'styles'
						width: '600px',
						height: '300px',
						offset: {
							top: 19,
							right: 104,
							bottom: 36,
							left: 104
						}
					}
				},
				variants: {
					'15': {
						svg: 'url(Macbook-Pro-Retina.svg)',
						position: {
							bottom: 0,
							left: 0
						}
					}
				}
			},
			imac: {
				standard: {
					version: '2016',
					variant: 'silver'
				},
				versions: {
					'2016': {
						// 'styles'
						width: '600px',
						height: '400px',
						offset: {
							top: 19,
							right: 77,
							bottom: 129,
							left: 77
						}
					}
				},
				variants: {
					silver: {
						svg: 'url(iMac.svg)',
						position: {
							bottom: 0,
							left: 0
						}
					}
				}
			},
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
				top: getStandardVersion.offset.right,
				right: getStandardVersion.offset.bottom,
				bottom: getStandardVersion.offset.left,
				left: getStandardVersion.offset.top,
			}
		})

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
					top: versions[versionindex].offset.right,
					right: versions[versionindex].offset.bottom,
					bottom: versions[versionindex].offset.left,
					left: versions[versionindex].offset.top,
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
