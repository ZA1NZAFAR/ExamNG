'use client';
import {
	Calendar as BigCalendar,
	momentLocalizer,
	Views,
	View,
} from 'react-big-calendar';
import moment from 'moment';
import YearView from '@/components/YearView/yearview';
import { useState } from 'react';

const localizer = momentLocalizer(moment);

const events = [
	{
		start: moment('2024-10-10T10:00:00').toDate(),
		end: moment('2024-10-10T12:00:00').toDate(),
		title: 'English exam',
	},
	{
		start: moment('2024-01-10T10:00:00').toDate(),
		end: moment('2024-01-10T11:00:00').toDate(),
		title: 'Algorithm exam',
	},
	{
		start: moment('2024-06-10T10:00:00').toDate(),
		end: moment('2024-06-10T11:00:00').toDate(),
		title: 'Maths exam',
	},
];

export default function Calendar() {
	//const [view, setView] = useState(Views.WEEK);
	const [view, setView] = useState<View>('week');
	const [date, setDate] = useState(new Date());


	return (
		// @ts-expect-error: year views is not in the type definition
		<BigCalendar
			localizer={localizer}
			defaultView={Views.WEEK}
			view={view}
			date={date}
			onView={(view) => setView(view)}
			onNavigate={(date) => setDate(date)}
			events={events}
			views={
				{
					month: true,
					day: true,
					week: true,
					year: YearView,
				}
			}
			messages={{ year: 'Year' }}
		/>
	);
}