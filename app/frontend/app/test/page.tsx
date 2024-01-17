'use client';
import React from 'react';
import FullScreenComponent from '@/components/Test/test';

export default function CalendarPage() {
	const handleCopyPaste = (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		alert('Copying and pasting is not allowed on this page.');
	};

	return (
		<div onCopy={handleCopyPaste} onPaste={handleCopyPaste}>
			<h1>Test Page</h1>
			<FullScreenComponent />
		</div>
	);
}
