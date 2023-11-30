import React, { useState } from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import { BellRing, BellOff, UsersRound, Book, Calendar, BarChart2 } from 'lucide-react';
import logo from '../resources/img/logo.png';

export const ExamCard = () => {
	const [liked, setLiked] = useState(false);

	return (
		<Card
			isBlurred
			className="border-none bg-background/60 dark:bg-default-100/50 py-4"
			shadow="sm"
			// isPressable onPress={() => console.log('item pressed')}
		>
			<CardBody>
				<div className="items-center justify-center">
					<div className="overflow-visible">
						<Image
							alt="Exam cover"
							className="object-cover rounded-xl"
							shadow="md"
							src={logo.src}
							width={300}
						/>
					</div>

					<div className="flex flex-col py-2">
						<div className="flex justify-between items-center mt-2">
							<h1 className="text-large font-semibold text-foreground/90">Name</h1>

							<Button
								isIconOnly
								className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
								radius="full"
								variant="light"
								onPress={() => setLiked((v) => !v)}
							>
								{liked ? <BellOff /> : <BellRing />}
							</Button>
						</div>

						<div className="flex flex-col gap-4 my-2">
							<div className="flex flex-row justify-between">
								<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
									<UsersRound className='mr-2' />
									<p>Participants</p>
								</div>
								<div className='flex flex-row justify-start items-center text-small text-foreground/80'>
									<Book className='mr-2' />
									<p>Course</p>
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
						
						<h2 className="font-medium mt-3">Duration</h2>

						<div className="flex flex-col mt-3 gap-1">
							<Slider
								aria-label="Exam progress"
								classNames={{
									track: 'bg-default-500/30',
								}}
								color="foreground"
								step={1}
								minValue={0}
								maxValue={300}
								defaultValue={99}
								size="sm"
								hideThumb={true}
								isDisabled
							/>
							<div className="flex justify-between">
								<p className="text-small">1:30</p>
								<p className="text-small text-foreground/50">4:00</p>
							</div>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
