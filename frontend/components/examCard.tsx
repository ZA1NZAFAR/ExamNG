import React, { useState, useEffect } from 'react';
import Proptypes from 'prop-types';
import Image from 'next/image';
import { Card, CardBody, Progress, Switch } from '@nextui-org/react';
import { Bell, BellOff, UsersRound, Book, Calendar, BarChart2 } from 'lucide-react';
import { Exam } from '@/types/exam';
import logo from '../resources/img/logo.png';

export const ExamCard = ({ exam } : { exam: Exam }) => {
	const [subscribed, setSubscribed] = useState(false);
	const [examProgress, setExamProgress] = useState(Number.NEGATIVE_INFINITY);

	const formatDate = (date: Date): string => {
		const currentDate = new Date();

		const year = date.getFullYear();
		const month = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);		// Month is zero-based, so add 1
		const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
		const hour = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
		const minute = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();

		let formattedDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ' ';
		const daysDifference = dateDifferenceInDays(currentDate, date);
		const daysFormatted = Math.abs(daysDifference) > 1 ? 'days' : 'day';

		if (daysDifference < 0) {
			formattedDate += `(${-daysDifference} ${daysFormatted} ago)`;
		} else if (daysDifference > 0) {
			formattedDate += `(in ${daysDifference} ${daysFormatted})`;
		} else {
			formattedDate += '(exam is today)';
		}

		return formattedDate;
	};

	const dateDifferenceInDays = (date1: Date, date2: Date): number => {
		const MS_PER_DAY = 1000 * 60 * 60 * 24;

		// Discard the time and time-zone information
		const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
		const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
	
		return Math.floor((utc2 - utc1) / MS_PER_DAY);
	};

	const classAvgGrade = (average: number): string => {
		const MAX_GRADE = 20;
		return average + '/' + MAX_GRADE;
	};

	const calculateExamProgress = (startTime: Date, endTime: Date) => {
		const currentTime = new Date();
		const MS_PER_DAY = 86_400_000;
		const MS_PER_HOUR = 3_600_000;
		const MS_PER_MINUTE = 60_000;

		// Exam is planned, hasn't yet started
		if (currentTime < startTime) {
			setExamProgress(0);
		// Exam has taken place in the past
		} else if (currentTime > endTime) {
			setExamProgress(100);
		} else {
			const diffMsDuration = (endTime - startTime);					// milliseconds between end time & start time
			const diffMsPastTimeSinceStart = (currentTime - startTime);		// milliseconds between now & start time
			const diffMinsDuration = Math.round(((diffMsDuration % MS_PER_DAY) % MS_PER_HOUR) / MS_PER_MINUTE);
			const diffMinsPastTimeSinceStart = Math.round(((diffMsPastTimeSinceStart % MS_PER_DAY) % MS_PER_HOUR) / MS_PER_MINUTE);
			console.log(diffMinsPastTimeSinceStart / diffMinsDuration * 100);
			setExamProgress(diffMinsPastTimeSinceStart / diffMinsDuration * 100);
		}
	};

	useEffect(() => {
		calculateExamProgress(exam.startDate, exam.endDate);
	}, []);

	return (
		<Card
			isBlurred
			className="border-none bg-background/60 dark:bg-default-100/50 py-4 grow-0 shrink-0"
			shadow="sm"
			isPressable onPress={() => console.log('item pressed')}
		>
			<CardBody>
				<div className="relative overflow-hidden w-52 h-52 xl:w-80 xl:h-80">
					<Image
						alt="Exam cover"
						className="object-cover rounded-xl shadow-md"
						src={ exam.imageURL ? exam.imageURL : logo.src }
						fill
					/>
				</div>

				<div className="flex flex-col py-2">
					<div className="flex justify-between items-center mt-2">
						<h1 className="text-large font-semibold text-foreground/90">{ exam.title }</h1>

						<Switch
							className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
							defaultSelected
							size="lg"
							color="secondary"
							onChange={() => setSubscribed((v) => !v)}
							startContent={<BellOff />}
							endContent={<Bell />}
						>
						</Switch>
					</div>

					<div className="flex flex-col gap-4 my-2">
						<div className="flex flex-row justify-between">
							<div className='flex flex-row justify-start items-center text-xs xl:text-small text-foreground/80'>
								<UsersRound className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-start text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									{ exam.participants.map(participant => 
										<p key={participant.code} className='inline-block'>{ participant.name }</p>) 
									}
								</div>
							</div>
							<div className='flex flex-row justify-end items-center text-xs xl:text-small text-foreground/80'>
								<Book className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-end text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p className='inline-block'>{ exam.course.name }</p>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div className='flex flex-row justify-start items-center text-xs xl:text-small text-foreground/80'>
								<Calendar className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-start text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p>{ formatDate(exam.startDate) }</p>
								</div>
							</div>
							<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
								<BarChart2 className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-end text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p className='inline-block'>{ exam.average ? classAvgGrade(exam.average) : 'N/A' }</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col mt-3 gap-1">
						<Progress
							size="sm"
							radius="sm"
							classNames={{
								base: 'max-w-md',
								track: 'drop-shadow-md border border-default',
								indicator: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
								label: 'tracking-wider font-medium text-default-600',
								value: 'text-foreground/60',
							}}
							label={(examProgress > 0 && examProgress < 100) ? 'Exam in progress' : 'Duration'}
							value={examProgress}
							showValueLabel={true}
						></Progress>
						<div className="flex justify-between">
							<p className="text-small">{ formatDate(exam.startDate).split(' ')[1] }</p>
							<p className="text-small text-foreground/50">{ formatDate(exam.endDate).split(' ')[1] }</p>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

ExamCard.propTypes = {
	exam: Proptypes.object.isRequired,
};
