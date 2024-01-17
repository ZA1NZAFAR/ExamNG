import {title} from '@/components/primitives';
import {Calendar} from '@/components/Calendar';

export default function CalendarPage() {
	return (
		<div id="title">
			<h1 className={title()}>Calendar</h1>
			<p id="description">
				A place where you can find all your previous and upcoming exams with detail given by your professor.
			</p>
			<Calendar/>
		</div>
	);
}
