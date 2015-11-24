import {Graphics, Container, Text} from 'pixi.js';
import {Easing} from 'tween.js';
import {r} from './pixel-ratio';

export class Ease extends Container {
	private H:number = 60;
	private h:number;
	private dot:Graphics;
	private ease:(t:number) => number;

	constructor(private w:number,
				h:number,
				private easing:string,
				private func:string) {
		super();

		this.h = h - r(20);
		this.ease = Easing[this.easing][this.func];

		this.addChild(this.drawLabel(`${easing}.${func}`));
		this.addChild(this.drawBackground());
		this.addChild(this.dot = this.drawDot());
	}

	private drawDot():Graphics {
		let dot:Graphics = new Graphics;
		dot.beginFill(0, 1);
		dot.drawCircle(0, 0, r(2));
		dot.endFill();
		return dot;
	}

	private drawLabel(text:string):Text {
		let label:Text = new Text(text, {font: `${r(12)}px _sans`, fill: 0x888888});
		label.x = 0;
		label.y = this.h + r(3);
		return label;
	}

	private drawBackground():Graphics {
		let g:Graphics = new Graphics;

		// background color
		g.beginFill(0xbbbbbb);
		g.drawRect(0, 0, this.w, this.h);
		g.endFill();

		// dots
		g.beginFill(0x555555);

		let f:number = -1;
		let fmax:number = this.H;
		let s:number = this.w / fmax;

		while (++f < fmax) {
			let x:number = s * f;
			let y:number = this.ease(f / fmax) * this.h;
			g.drawCircle(x, this.h - y, r(0.7));
		}

		g.endFill();
		return g;
	}

	public update(t:number) {
		let x:number = t * this.w;
		let y:number = this.ease(t) * this.h;

		this.dot.x = x;
		this.dot.y = this.h - y;
	}
}