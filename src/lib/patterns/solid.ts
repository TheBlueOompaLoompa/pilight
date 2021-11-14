export default {
	name: 'Solid Color',
	settings: [
		{
			name: 'Color',
			type: 'color'
		}
	],
	draw: function(leds: Uint32Array, settings: any, persist: any) {
		return {leds: leds.fill(parseInt(settings['Color'], 16) | 0xff0000), persistentData: persist};
	}
}