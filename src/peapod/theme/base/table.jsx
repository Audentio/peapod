import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	footer = sheet.addPart('footer');

//Variables
sheet.setValues({
	common: {
		table: {
			color: {
				lightRow: {
					background: 'transparent',
					color: '$color.text.body',
					hover: '#EDF0F4'
				},
				darkRow: {
					background: '$color.base.table',
					color: '$color.text.body',
					hover: '#EDF0F4'
				},
				header: {
					background: '#525F6D',
					color: '$color.text.white',
					hover: '#525F6D'
				},
				checked: {
					background: '#E6E9ED',
					color: '$color.text.dark',
					hover: '$palette.blueGrey300'
				},
				columnHovered: {
					background: '#EDF0F4',
					color: '$color.text.body',
					headerBackground: '$color.base.active',
					headerColor: '$table.color.header.color'
				},
				controls: {
					background: '#647383',
					color: '#ABBAC9'
				},
				editIcon: {
					color: '#ABBAC7'
				}
			},
			border: {
				color: '$palette.grey200',
				radius: '$border.radius.large',
				width: '1px',
				style: 'solid'
			},
			gutter: {
				vertical: '$gutter.internal',
				horizontal: '$gutter.small'
			},
			font: {
				family: 'inherit',
				size: '$font.size.normal',
				headerFamily: '$font.family.secondary',
				headerSize: '$font.size.xsmall'
			},
			headerHeight: '5rem',
			footerHeight: '5rem'
		}
	}
});

main.addSelector({
	common: {
		width: '100%',
		borderRadius: '$table.border.radius',
		overflowX: 'auto'
	}
});

footer.addSelector({
	common: {
		background: '$table.color.controls.background',
		color: '$table.color.controls.color'
	}
});

module.exports = sheet;
