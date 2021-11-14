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