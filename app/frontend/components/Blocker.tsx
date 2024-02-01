
'use client';

import { Button } from '@nextui-org/react';
import React from 'react';

const Blocker = () => {
	const bgColors = ['bg-zinc-700', 'bg-red-700', 'bg-blue-700', 'bg-yellow-700', 'bg-orange-700', 'bg-green-700', 'bg-pink-700', 'bg-purple-700', 'bg-indigo-700', 'bg-gray-700'];
	const [ bgString, setBgString ] = React.useState('bg-zinc-700');

	const isFullscreen = document.fullscreenElement !== null;
	
	const className = !isFullscreen ? `fixed inset-x-0 top-0 z-30 flex items-center justify-center w-full h-full opacity-90 ${bgString}` : 'hidden';

	const getRandomColor = () => {
		let index = bgColors.indexOf(bgString);
		while (bgColors[index] === bgString || index === -1) {
			index = Math.floor(Math.random() * bgColors.length);
		}
		return bgColors[index];
	}
	
	const handleRequestFullscreen = async () => {
		try {
			window.addEventListener('fullscreenchange', (_) => {
				setBgString(getRandomColor());
				window.localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
			});
			await document.documentElement.requestFullscreen();
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		const disableF11 = (e: KeyboardEvent) => {
			if (e.key === 'F11') {
				e.preventDefault();
			}
		};
		window.addEventListener('keydown', disableF11);
		const interval = setInterval(() => {
			if (!isFullscreen) {
				setBgString(getRandomColor());
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		}
	},[isFullscreen, bgString]);
	return (
		<div
			className={className}
		>
			<Button
				onPress={handleRequestFullscreen}
				>
				Please enter fullscreen
			</Button>
		</div>
	);
};

export default Blocker;
