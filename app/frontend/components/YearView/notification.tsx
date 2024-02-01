'use client';
import React from 'react';
import {Card, CardHeader, CardBody, Button} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

export default function App() {

	return (
		<Card className="notification_title">
			<CardHeader className="justify-between">
				<div className="flex gap-5">
					<div className="absolute top-6,5">
						<Image src="\smallIcon.svg" alt="Sheets" width={15} height={15}/>
					</div>
					<div>
						<h4 className="heading">Exam Center <p>now</p></h4>
						<br/>
						<h5>New exam updated</h5>
					</div>
				</div>
			</CardHeader>
			<CardBody className="px-3 py-0 text-small text-default-400">
				<p>
					English exam will be 24/01. Please find fo....
				</p>
				<div className="absolute top-0 right-5">
					<Image src="\largeIcon.svg" alt="Sheets" width={36} height={36}/>
				</div>
				<div>
					<Link href="/exams"><Button className="button">Create the exam</Button></Link>
				</div>
			</CardBody>
		</Card>
	);
}
