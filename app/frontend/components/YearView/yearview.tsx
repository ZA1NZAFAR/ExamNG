import { DateLocalizer, Navigate, ViewProps, Views } from 'react-big-calendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import App from '@/components/YearView/notification';
import {useEffect, useState} from 'react';

// Set the locale globally to English
moment.locale('en');
interface YearViewProps extends ViewProps {
	events: {
		start: Date;
		end: Date;
		title: string;
	}[];
}

export default function YearView({
	date,
	localizer,
	onView,
	onNavigate,
	events,
}: YearViewProps) {
	const [isClickedDateMarch, setIsClickedDateMarch] = useState(false);
	const [isClickedDateApril, setIsClickedDateApril] = useState(false);
	const [isClickedDateMay, setIsClickedDateMay] = useState(false);
	const [showApp, setShowApp] = useState(false);

	const handleDayClick = (day: Date) => {
		const isMarch = moment(day).isSame(moment('2024-03-22'), 'day');
		const isApril = moment(day).isSame(moment('2024-04-18'), 'day');
		const isMay = moment(day).isSame(moment('2024-05-16'), 'day');

		if (isMarch) {
			setIsClickedDateMarch(!isClickedDateMarch);
		} else if (isApril) {
			setIsClickedDateApril(!isClickedDateApril);
		} else if (isMay) {
			setIsClickedDateMay(!isClickedDateMay);
		} else {
			// Naviguer vers le mois pour les autres jours
			onView && onView(Views.DAY);
			onNavigate && onNavigate(day);
		}
	};

	useEffect(() => {
		if (isClickedDateMarch || isClickedDateApril || isClickedDateMay) {
			setShowApp(true);
		} else {
			setShowApp(false);
		}
	}, [isClickedDateMarch, isClickedDateApril, isClickedDateMay]);

	const currRange = YearView.range(new Date(date), { localizer });

	return (
		<div className='grid gap-12 grid-cols-4'>
			{currRange.map((month, index) => {
				return (
					<div key={index}>
						<Calendar
							activeStartDate={month}
							locale="en-UK"
							tileClassName={({ date, view }) => {
								if (
									view === 'month' &&
									events?.find((event) =>
										moment(event.start).isSame(moment(date), 'day')
									)
								)
									return 'event-day';
								return null;
							}}
							onClickDay={(day) => {
								handleDayClick(day);
							}}
						/>
					</div>
				);
			})}
			{showApp && <App />}
		</div>
	);
}




YearView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
	const start = localizer.startOf(date, 'year');
	const end = localizer.endOf(date, 'year');

	const range = [];
	let current = start;

	while (localizer.lte(current, end, 'year')) {
		range.push(current);
		current = localizer.add(current, 1, 'month');
	}

	return range;
};

YearView.navigate = (
	date: Date,
	// TODO: check action type
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: any,
	{ localizer }: { localizer: DateLocalizer }
) => {
	if (action instanceof Date) return action;

	switch (action) {
	case Navigate.NEXT:
		return localizer.add(date, 1, 'year');
	case Navigate.PREVIOUS:
		return localizer.add(date, -1, 'year');
	default:
		return date;
	}
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
	return localizer.format(date, 'YYYY');
};
