
'use client';

import { useService } from '@/hooks/useService';
import { Button } from '@nextui-org/react';
import React from 'react';

const Blocker = () => {
	const [render, setRender] = React.useState(false);

	const isFullscreen = React.useMemo(() => {
		return !window.screenTop && !window.screenY;
	}, [window.screenTop, window.screenY, render]);
	
	console.log(isFullscreen);
	const className = !isFullscreen ? 'fixed inset-x-0 top-0 z-30 flex items-center justify-center w-full h-full bg-zinc-600 opacity-90' : 'hidden';

	const handleRequestFullscreen = async () => {
		try {
			window.addEventListener('fullscreenchange', (_) => {
				setRender(!!document.fullscreenElement);
				window.localStorage.setItem('fullscreen', document.fullscreenElement ? 'true' : 'false');
			});
			await document.documentElement.requestFullscreen();
		} catch (error) {
			console.log(error);
		}
	};
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
