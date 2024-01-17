'use client';
import React, { useEffect, useState } from 'react';
import { Tooltip, Button } from '@nextui-org/react';
import { Card, CardBody } from '@nextui-org/react';

const FullScreenComponent = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [fullScreenAttemptCount, setFullScreenAttemptCount] = useState(0);
	const [visibleAttemptCount, setVisibleAttemptCount] = useState(0);

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
				setFullScreenAttemptCount((prevCount) => prevCount + 1);
			}
			checkFullScreen();
		};

		const handleVisibilityChange = () => {
			if (!document.hidden) {
				// Window is visible, increment visibility attempt count
				setVisibleAttemptCount((prevCount) => prevCount + 1);
			}
		};

		const handleCopyPaste = (event: { preventDefault: () => void; }) => {
			event.preventDefault();
			alert('Copying and pasting is not allowed in this component.');
		};

		// Attach the resize handler
		window.addEventListener('resize', handleResize);

		// Attach the visibility change handler
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Attach the copy and paste event handlers to the component's root element
		const componentRootElement = document.getElementById('fullScreenComponentRoot');
		if (componentRootElement) {
			componentRootElement.addEventListener('copy', handleCopyPaste);
			componentRootElement.addEventListener('paste', handleCopyPaste);
		}

		// Check on initial mount
		checkFullScreen();

		// Cleanup the event listeners when the component is unmounted
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (componentRootElement) {
				componentRootElement.removeEventListener('copy', handleCopyPaste);
				componentRootElement.removeEventListener('paste', handleCopyPaste);
			}
		};
	}, [isFullScreen]);

	return (
		<div id="fullScreenComponentRoot">
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
							<p>Number of attempts to reduce window size: {fullScreenAttemptCount}</p>
						</CardBody>
					</Card>
				</div>
			)}
			<p>Number of attempts to change window visibility: {visibleAttemptCount}</p>
		</div>
	);
};

export default FullScreenComponent;
