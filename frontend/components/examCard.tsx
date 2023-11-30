import React, { useState } from 'react';
import {Card, CardBody, Image, Button, Slider} from '@nextui-org/react';
import { Heart } from 'lucide-react';
import logo from '../resources/img/logo.png';

export const ExamCard = () => {
	const [liked, setLiked] = useState(false);

	return (
		<Card
			isBlurred
			className="border-none bg-background/60 dark:bg-default-100/50 py-4"
			shadow="sm"
		>
			<CardBody className="overflow-visible">
				<div className="items-center justify-center">
					<div className="relative col-span-6 md:col-span-4">
						<Image
							alt="Exam cover"
							className="object-cover rounded-xl"
							shadow="md"
							src={logo.src}
							width={300}
						/>
					</div>

					<div className="flex flex-col col-span-6 md:col-span-8 py-2">
						<div className="flex justify-between items-start">
							<div className="flex flex-col gap-0">
								<h3 className="font-semibold text-foreground/90">Java JEE</h3>
								<p className="text-small text-foreground/80">DE</p>
								<h1 className="text-large font-medium mt-2">Duration</h1>
							</div>

							<Button
								isIconOnly
								className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
								radius="full"
								variant="light"
								onPress={() => setLiked((v) => !v)}
							>
								<Heart
									className={liked ? '[&>path]:stroke-transparent' : ''}
									fill={liked ? 'currentColor' : 'none'}
								/>
							</Button>
						</div>

						<div className="flex flex-col mt-3 gap-1">
							<Slider
								aria-label="Music progress"
								classNames={{
									track: 'bg-default-500/30',
									thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
								}}
								color="foreground"
								defaultValue={33}
								size="sm"
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
