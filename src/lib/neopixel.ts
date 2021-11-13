// https://github.com/node-red/node-red-nodes/blob/master/hardware/neopixel

import {spawn, execSync} from 'child_process';
import fs from 'fs';

const piCommand = '/home/pi/pilight/neopix';

export default class Neopixel {
	cmd
	ledCount: number

	constructor(leds: number) {
		this.cmd = spawn(piCommand, [`${leds}`, '0', 'shiftu', '100','1','0', '18']);
		this.ledCount = leds;
	}

	setPixel(i: number, r: number, g: number, b: number) {
		this.cmd.stdin.write(`${i},${r},${g},${b}\n`);
	}
}
