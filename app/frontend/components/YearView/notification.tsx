'use client';
import React from 'react';
import {Button, Card, CardBody, CardHeader} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

interface NotificationProps {
	id: string;
	code: string;
	formattedDate: string;
}

export default function Notification({id, code, formattedDate}: NotificationProps) {

	let styles = {};
	if (formattedDate === '2023-06-12') {
		styles = {bottom: '5vh', right: '50%'};
	} else if (formattedDate === '2023-12-05') {
		styles = {bottom: '-30%', right: '20px'};
	} else if (formattedDate === '2024-03-15') {
		styles = {top: '29vh', right:'12%'};
	}

	return (
		<Card className="notification_title" style={styles}>
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
					<Link href={`/exams/${code}/${id}`}><Button className="button">Create the exam</Button></Link>
				</div>
			</CardBody>
		</Card>
	);
}
