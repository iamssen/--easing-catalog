///<reference path="../typings/tsd.d.ts"/>

import {autoDetectRenderer, CanvasRenderer, SystemRenderer, Container, Graphics} from 'pixi.js';
import {Ease} from './ease';
import {r} from './pixel-ratio';

//---------------------------------------------
// app
//---------------------------------------------
const ITEM_WIDTH:number = 130;
const ITEM_HEIGHT:number = 100;
const ITEM_HGAP:number = 10;
const ITEM_VGAP:number = 10;

const stage:Container = new Container;
const easings:string[] = [
	'Quadratic',
	'Cubic',
	'Quartic',
	'Quintic',
	'Sinusoidal',
	'Exponential',
	'Circular',
	'Elastic',
	'Back',
	'Bounce'
];
const funcs:string[] = [
	'In',
	'InOut',
	'Out'
];

let items:Ease[] = [];
let f:number = -1;
let fmax:number = easings.length;

while (++f < fmax) {
	let easing:string = easings[f];
	let h:number = (f % 2) ? 4 : 1;
	let hgap:number = f % 2;
	let v:number = Math.floor(f / 2) + 1;

	let s:number = -1;
	let smax:number = funcs.length;
	while (++s < smax) {
		let func:string = funcs[s];
		let item:Ease = new Ease(r(ITEM_WIDTH), r(ITEM_HEIGHT), easing, func);
		item.x = r(ITEM_HGAP, h + s + hgap) + r(ITEM_WIDTH, h + s - 1);
		item.y = r(ITEM_VGAP, v) + r(ITEM_HEIGHT, v - 1);
		stage.addChild(item);
		items.push(item);
	}
}

//---------------------------------------------
// render
//---------------------------------------------
let WIDTH:number = (ITEM_WIDTH * 6) + (ITEM_HGAP * 8);
let HEIGHT:number = (ITEM_HEIGHT * 5) + (ITEM_VGAP * 7);

stage.addChildAt(new Graphics().beginFill(0xeeeeee).drawRect(0, 0, r(WIDTH), r(HEIGHT)), 0);

let renderer:SystemRenderer;

console.log(window.devicePixelRatio);

if (window.devicePixelRatio > 1) {
	renderer = autoDetectRenderer(r(WIDTH), r(HEIGHT), {antialias: true, resolution: r(1)});
} else {
	renderer = new CanvasRenderer(r(WIDTH), r(HEIGHT), {antialias: true, resolution: r(1)});
}

let view:HTMLCanvasElement = renderer.view;
view.style.width = WIDTH + 'px';
view.style.height = HEIGHT + 'px';

document.body.appendChild(view);

let start:number = +new Date;
const DURATION:number = 2000;

function animate() {
	let t:number = ((+new Date - start) % DURATION) / DURATION;
	items.forEach(item => item.update(t));
	renderer.render(stage);
	requestAnimationFrame(animate);
}

animate();



