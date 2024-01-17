'use client';
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';
const FullScreenComponent = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [attemptCount, setAttemptCount] = useState(0);

	useEffect(() => {
		const checkFullScreen = () => {
			setIsFullScreen(
				window.innerHeight >= 1080 &&
				window.innerWidth >= 1720 &&
				!document.fullscreenElement
			);
		};

		const handleResize = () => {
			if (!isFullScreen) {
				setAttemptCount((prevCount) => prevCount + 1);
			}


			checkFullScreen();
		};

		// Attach the resize handler
		window.addEventListener('resize', handleResize);

		// Check on initial mount
		checkFullScreen();

		// Cleanup the event listener when the component is unmounted
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isFullScreen]);

	return (
		<div>
			{!isFullScreen && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						background: 'rgba(255, 255, 255, 0.8)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 999,
					}}
				>
					<Card>
						<CardBody className="text-center mt-4 mb-4">
							<p>Please open the app in full screen for the best experience.</p>
							<br />
							<Tooltip
								content={`The full size is ${window.innerWidth} * ${window.innerHeight}, but it needs to be 1080 * 1720`}
							>
								<Button>More info</Button>
							</Tooltip>
							<p>Number of attempts to reduce window size: {attemptCount}</p>
						</CardBody>
					</Card>
				</div>
			)}
		</div>
	);
};

export default FullScreenComponent;
