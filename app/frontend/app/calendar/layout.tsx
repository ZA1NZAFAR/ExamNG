import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function CalendarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className= "full-calendar-page" >
			<div>
				{children}
			</div>
		</section>
	);
}