import Neopixel from '$lib/neopixel';

if(typeof neopixel == 'undefined') {
	var neopixel = new Neopixel(48);
}


/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {

	neopixel.setPixel(5, 255, 0, 0);

	return {
		body: `
		<h1>Beans</h1>
		`
	};
}