import React, { useState } from 'react';
import Proptypes from 'prop-types';
import Image from 'next/image';
import { Card, CardBody, Progress, Switch } from '@nextui-org/react';
import { Bell, BellOff, UsersRound, Book, Calendar, BarChart2 } from 'lucide-react';
import { Exam } from '@/types/exam';
import logo from '../resources/img/logo.png';

export const ExamCard = ({ exam } : { exam: Exam }) => {
	const [subscribed, setSubscribed] = useState(false);
	const [examProgress, setExamProgress] = useState(Number.NEGATIVE_INFINITY);

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
							<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
								<UsersRound className='mr-2' />
								<div className='w-14 block overflow-hidden text-start text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24'>
									{ exam.participants.map(participant => 
										<p key={participant.code} className='inline-block'>{ participant.name }</p>) 
									}
								</div>
							</div>
							<div className='flex flex-row justify-end items-center text-small text-foreground/80'>
								<Book className='mr-2' />
								<div className='w-14 block overflow-hidden text-end text-ellipsis white-space:nowrap hover:overflow-visible xl:w-24'>
									<p className='inline-block'>{ exam.course.name }</p>
								</div>
							</div>
						</div>
						<div className="flex flex-row justify-between">
							<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
								<Calendar className='mr-2' />
								<p>Date</p>
							</div>
							<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
								<BarChart2 className='mr-2' />
								<p>Average</p>
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
							label={examProgress != Number.NEGATIVE_INFINITY ? 'Exam in progress' : 'Duration'}
							value={65}
							showValueLabel={true}
						></Progress>
						<div className="flex justify-between">
							<p className="text-small">08:00</p>
							<p className="text-small text-foreground/50">10:00</p>
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
