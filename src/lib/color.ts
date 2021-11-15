type Color = {
	r: number,
	g: number,
	b: number
}

export function int2rgb(color: number): Color {
	return {
		r: (color >> 16) & 0xFF, 
		g: (color >> 8) & 0xFF, 
		b: color & 0xFF 
	};
}

export function rgb2int(rgbcolor: Color) {
	let rgb = rgbcolor.r;
	rgb = (rgb << 8) + rgbcolor.g;
	rgb = (rgb << 8) + rgbcolor.b;

	return rgb;
}

// rainbow-colors, taken from http://goo.gl/Cs3H0v
export function colorwheel(pos: number): number {
	pos = 255 - pos;
	if (pos < 85) { return rgb2int({r: 255 - pos * 3, g: 0, b: pos * 3}); }
	else if (pos < 170) { pos -= 85; return rgb2int({r: 0, g: pos * 3, b: 255 - pos * 3}); }
	else { pos -= 170; return rgb2int({r: pos * 3, g: 255 - pos * 3, b: 0}); }
}  