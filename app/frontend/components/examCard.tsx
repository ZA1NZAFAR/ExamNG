import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import Image from 'next/image';
import { Card, CardBody, Progress, Switch } from '@nextui-org/react';
import { Link } from '@nextui-org/link';
import { Bell, BellOff, UsersRound, Book, Calendar, BarChart2 } from 'lucide-react';
import { Exam  } from '@/types';
import logo from '@/resources/img/logo.png';
import { envConfig } from '@/config/envConfig';

const dateDifferenceInDays = (date1: Date, date2: Date): number => {
	const MS_PER_DAY = 1000 * 60 * 60 * 24;

	// Discard the time and time-zone information
	const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
	const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

	return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

const formatDateToString = (timestamp: number): string => {
	const date = new Date(timestamp);
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

const doExamProgressCalculation = (
	startTimestamp: number,
	endTimestamp: number,
	intervalIDRef: MutableRefObject<NodeJS.Timeout | null>,
	setExamProgress: ((a: number) => void) ) => {
	const startTime = new Date(startTimestamp);
	const endTime = new Date(endTimestamp);
	const currentTime = new Date();
	const MS_PER_MINUTE = 60_000;

	// Exam is planned, hasn't yet started
	if (currentTime < startTime) {
		if (intervalIDRef.current) {
			clearInterval(intervalIDRef.current);
			intervalIDRef.current = null;
		}

		setExamProgress(0);
		// Exam has taken place in the past
	} else if (currentTime > endTime) {
		if (intervalIDRef.current) {
			clearInterval(intervalIDRef.current);
			intervalIDRef.current = null;
		}

		setExamProgress(100);
		// Exam is in progress
	} else {
		const diffMsDuration = (endTime.getTime() - startTime.getTime());					// milliseconds between end time & start time
		const diffMsPastTimeSinceStart = (currentTime.getTime() - startTime.getTime());		// milliseconds between now & start time
		const diffMinsDuration = Math.round(diffMsDuration / MS_PER_MINUTE);
		const diffMinsPastTimeSinceStart = Math.round(diffMsPastTimeSinceStart / MS_PER_MINUTE);
		setExamProgress(diffMinsPastTimeSinceStart / diffMinsDuration * 100);
	}
};

/**
 * Represents the properties for an exam card.
 * @property {Exam} exam - The exam to display.
 */
type ExamCardProps = {
  /** The exam to display. */
  exam: Exam;
};

export const ExamCard = ({ exam } : ExamCardProps) => {
	// TODO: check if we need subscribed
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [subscribed, setSubscribed] = useState(false);
	const [examProgress, setExamProgress] = useState(Number.NEGATIVE_INFINITY);
	const intervalIDRef = useRef<NodeJS.Timeout | null>(null);

	const { module, groups, average } = exam.summaryFields;
  
	const calculateExamProgress = (startTimestamp: number, endTimestamp: number) => doExamProgressCalculation(startTimestamp, endTimestamp, intervalIDRef, setExamProgress); 

	const classAverageToString = (): string => {
		if (!average) {
			return 'N/A';
		}
		return average + '/' + envConfig.defaultTotalScore;
	};

	useEffect(() => {
		calculateExamProgress(exam.startTimestamp, exam.endTimestamp);
		intervalIDRef.current = setInterval(() => calculateExamProgress(exam.startTimestamp, exam.endTimestamp), 60_000);
		return () => clearInterval(intervalIDRef.current!);
	}, [exam.startTimestamp, exam.endTimestamp]);

	return (
		<Card
			isBlurred
			className="border-none bg-background/60 dark:bg-default-100/50 py-4 grow-0 shrink-0"
			shadow="sm"
			as={Link}
			href={examProgress === 100 ? 'https://www.myefrei.fr/portal/student/exams-sheets' 
				: (examProgress > 0 && examProgress < 100) ? `/exams/${module.code}/${exam.id}` : '#'}
			isPressable
			isDisabled={examProgress === 0}
		>
			<CardBody>
				<div className="relative overflow-hidden w-52 h-52 xl:w-80 xl:h-80">
					<Image
						alt="Exam cover"
						className="object-cover rounded-xl shadow-md"
						src={ module.imageURL.length>0 ? module.imageURL : logo.src }
						fill
					/>
				</div>

				<div className="flex flex-col py-2">
					<div className="flex justify-between items-center mt-2">
						<h1 className="text-large font-semibold text-foreground/90">{ exam.summaryFields.module.description }</h1>

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
									{ groups.map(group => 
										<p key={group.id} className='inline-block'>{ group.name }</p>) 
									}
								</div>
							</div>
							<div className='flex flex-row justify-end items-center text-xs xl:text-small text-foreground/80'>
								<Book className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-end text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p className='inline-block'>{ module.description }</p>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div className='flex flex-row justify-start items-center text-xs xl:text-small text-foreground/80'>
								<Calendar className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-start text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p>{ formatDateToString(exam.startTimestamp) }</p>
								</div>
							</div>
							<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
								<BarChart2 className='mr-2' />
								<div className='w-14 h-14 block overflow-hidden text-end text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24 xl:h-auto'>
									<p className='inline-block'>{ classAverageToString() }</p>
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
							<p className="text-small">{ formatDateToString(exam.startTimestamp).split(' ')[1] }</p>
							<p className={`text-small ${examProgress > 0 && examProgress < 100 ? 'text-foreground/50' : ''}`}>{ formatDateToString(exam.endTimestamp).split(' ')[1] }</p>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
