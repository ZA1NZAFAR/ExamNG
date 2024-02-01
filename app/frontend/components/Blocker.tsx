
'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import React from 'react';

const Blocker = () => {
	const bgColors = ['bg-zinc-700', 'bg-red-700', 'bg-blue-700', 'bg-yellow-700', 'bg-orange-700', 'bg-green-700', 'bg-pink-700', 'bg-purple-700', 'bg-indigo-700', 'bg-gray-700'];
	const [ bgString, setBgString ] = React.useState('bg-zinc-700');
	const [ disableFullscreenCount, setDisableFullscreenCount ] = React.useState(0);
	const [ hiddenCount, setHiddenCount ] = React.useState(0);
	const isFullscreen = document.fullscreenElement !== null;
	
	const className = !isFullscreen ? `fixed inset-x-0 top-0 z-30 flex items-center justify-center w-full h-full opacity-90 ${bgString}` : 'hidden';

	const getRandomColor = () => {
		let index = bgColors.indexOf(bgString);
		while (bgColors[index] === bgString || index === -1) {
			index = Math.floor(Math.random() * bgColors.length);
		}
		return bgColors[index];
	}

	const handleFullscreenChange = () => {
		setBgString(getRandomColor());
		if (!document.fullscreenElement) {
			const notFullscreenCount = parseInt(window.localStorage.getItem('notFullscreenCount') ?? '0');
			window.localStorage.setItem('notFullscreenCount', (notFullscreenCount + 1).toString());
		}
		window.localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
	}
	
	const handleRequestFullscreen = async () => {
		try {
			await document.documentElement.requestFullscreen();
		} catch (error) {
			console.log(error);
		}
	};
	const handleVisibilityChange = () => {
		if (!document.hidden) {
			const hiddenCount = parseInt(window.localStorage.getItem('hiddenCount') ?? '0');
			window.localStorage.setItem('hiddenCount', (hiddenCount + 1).toString());
		}
	}

	React.useEffect(() => {
		const getLastChange = parseInt(window.localStorage.getItem('lastChange') ?? '0');
		const now = Date.now();
		if (now - getLastChange > 1000 * 60 * 60 * 2) {
			window.localStorage.removeItem('hiddenCount');
			window.localStorage.removeItem('notFullscreenCount');
			window.localStorage.setItem('lastChange', now.toString());
		}
		const disableF11 = (e: KeyboardEvent) => {
			if (e.key === 'F11') {
				e.preventDefault();
			}
		};
		window.addEventListener('keydown', disableF11);
		window.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('visibilitychange', handleVisibilityChange);
		const interval = setInterval(() => {
			if (!isFullscreen) {
				setBgString(getRandomColor());
			}
			setHiddenCount(parseInt(window.localStorage.getItem('hiddenCount') ?? '0'));
			setDisableFullscreenCount(parseInt(window.localStorage.getItem('notFullscreenCount') ?? '0'));
		}, 1000);
		return () => {
			clearInterval(interval);
			window.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		}
	},[isFullscreen, bgString]);
	return (
		<div
			className={className}
		>
			<Card>
				<CardBody>
					<Button
						onPress={handleRequestFullscreen}
						>
						Please enter fullscreen
					</Button>
					<p>Number of attempts to reduce window size: {disableFullscreenCount}</p>
					<p>Number of attempts to change window visibility: {hiddenCount}</p>
				</CardBody>
			</Card>
		</div>
	);
};

export default Blocker;
