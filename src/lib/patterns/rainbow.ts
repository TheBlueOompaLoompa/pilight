import { colorwheel } from "../color";

export default {
	name: 'Rainbow 🌈',
	settings: [
		{
			name: 'Speed',
			type: 'range',
			min: 1,
			max: 3
		}
	],
	draw: function(leds: Uint32Array, settings: any, persist: any) {
		for (var i = 0; i < leds.length; i++) {
			leds[i] = colorwheel((persist.offset + (i * 2)) * /*loops*/ 1 % 256);
		}

		persist.offset = ((persist.offset || 0) + (1 * (settings['Speed'] || 1))) % 256;
		return {leds, persistentData: persist};
	}
}