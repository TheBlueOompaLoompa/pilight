import Driver from 'rpi-ws281x-led';
import fs from 'fs';

// Led Setup
if(typeof driver == 'undefined') {
	var driver = new Driver({
		channels: [{ count: 180 }],
	});
}
driver.channels[0].leds.fill(0x000000);
driver.channels[0].render();

let pattern: any;
let patterns = [];
let settings = {};
let persistentData = {};

// Set default pattern
import Solid from '$lib/patterns/solid';
pattern = Solid;
patterns.push(Solid);

// Import all patterns at startup
const patternFiles = fs.readdirSync('/home/pi/pilight/src/lib/patterns/')
patternFiles.forEach(file => {
	import(`/home/pi/pilight/src/lib/patterns/${file}`).then(pat => {
		if(pat.default.name != 'Solid Color') patterns.push(pat.default);
	})	
})

// Render Loop
setInterval(() => {
	({leds: driver.channels[0].leds, persistentData} = pattern.draw(driver.channels[0].leds, settings, persistentData))
	driver.render();
},1000/30)


// Get state
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	return {
		body: {
			active: pattern.name,
			patterns,
			settings,
			leds: [...driver.channels[0].leds]
		}
	};
}

// Update state
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ params }) {
	const data = params['data'].split(',');
	if(data[0] == 'setting') {
		settings[data[1]] = data[2]
	}else if(data[0] == 'pattern') {
		patterns.forEach(pat => {
			if(pat.name == data[1]) {
				pattern = pat;
			}
		})
	}
	return {
		status: 'successs',
	};
}