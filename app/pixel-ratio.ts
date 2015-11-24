let ratio:number = window.devicePixelRatio || 1;

export function r(p:number, m:number = 1):number {
	return p * ratio * m;
}
