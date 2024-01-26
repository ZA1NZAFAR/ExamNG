import { NextResponse } from 'next/server';

const colorCodes = [ '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF' ];
let colorIndex = 0;

setInterval(() => {
	colorIndex = Math.floor(new Date().getUTCMinutes() / 10);
}, 30000);

export async function GET() {
	return NextResponse.json({ color: colorCodes[colorIndex]});
}
