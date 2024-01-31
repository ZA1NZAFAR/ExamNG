import {DateLocalizer, Navigate, ViewProps, Views} from 'react-big-calendar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import Notification from '@/components/YearView/notification';
import {useEffect, useState} from 'react';

import {useService} from '@/hooks/useService';
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
	const [isClickedDateJune, setIsClickedDateMarch] = useState(false);
	const [isClickedDateDecember, setIsClickedDateApril] = useState(false);
	const [isClickedDateMarch, setIsClickedDateMay] = useState(false);
	const [showApp, setShowApp] = useState(false);
	const [notificationInfo, setNotificationInfo] = useState<{ id: string; code: string; formattedDate:string  } | null>(null);

	const {examService} = useService();

	const fetchExams = async () => {
		try {
			const fetchedModules = await examService.getModules();
			const examDetailsList: { id: string; code: string; formattedDate: string }[] = [];

			for (const fetchedModule of fetchedModules.content) {
				const response = await examService.getExams(fetchedModule.code);
				for (const exam of response.content) {
					const {startTimestamp, id} = exam;
					const code = fetchedModule.code;

					const startDate = new Date(startTimestamp);
					const formattedDate = startDate.toISOString().split('T')[0];

					examDetailsList.push({id, code, formattedDate});
				}
			}
			return examDetailsList;
		} catch (error) {
			console.error('Error fetching exams:', error);
			return null;
		}
	};

	const handleDayClick = async (day: Date) => {
		try {
			const exams = await fetchExams();

			// Mise à jour de l'état notificationInfo même si aucune date n'est cliquée
			setNotificationInfo(null);

			if (exams) {
				const isClickedDate = exams.some((exam) =>
					moment(day).isSame(moment(exam.formattedDate), 'day')
				);

				if (isClickedDate) {
					const clickedDateDetails = exams.find((exam) =>
						moment(day).isSame(moment(exam.formattedDate), 'day')
					);

					if (clickedDateDetails) {
						const { id, code, formattedDate } = clickedDateDetails;
						setNotificationInfo({ id, code, formattedDate });
						switch (code) {
						case 'AFN111':
							setIsClickedDateMarch(!isClickedDateJune);
							break;
						case 'AFN112':
							setIsClickedDateApril(!isClickedDateDecember);
							break;
						case 'AFN113':
							setIsClickedDateMay(!isClickedDateMarch);
							break;
						default:
							break;
						}
					}
				} else {
					onView && onView(Views.DAY);
					onNavigate && onNavigate(day);
				}
			} else {
				console.error('Formatted dates is null.');
			}
		} catch (error) {
			console.error('Error handling day click:', error);
		}
	};



	useEffect(() => {
		if (isClickedDateJune || isClickedDateDecember || isClickedDateMarch) {
			setShowApp(true);
		} else {
			setShowApp(false);
		}
	}, [isClickedDateJune, isClickedDateDecember, isClickedDateMarch]);


	const currRange = YearView.range(new Date(date), {localizer});

	return (
		<div className="grid gap-12 grid-cols-4">
			{currRange.map((month, index) => {
				return (
					<div key={index}>
						<Calendar
							activeStartDate={month}
							locale="en-UK"
							tileClassName={({date, view}) => {
								if (
									view === 'month' &&
									events?.find((event) =>
										moment(event.start).isSame(moment(date), 'day')
									)
								)
									return 'event-day relative';
								return null;
							}}
							onClickDay={(day) => {
								handleDayClick(day);
							}}
						/>
					</div>
				);
			})}
			{showApp && notificationInfo && <Notification id={notificationInfo.id} code={notificationInfo.code} formattedDate={notificationInfo.formattedDate}/>}
		</div>
	);
}


YearView.range = (date: Date, {localizer}: { localizer: DateLocalizer }) => {
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
	{localizer}: { localizer: DateLocalizer }
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

YearView.title = (date: Date, {localizer}: { localizer: DateLocalizer }) => {
	return localizer.format(date, 'YYYY');
};
