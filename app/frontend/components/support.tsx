import React, { useState } from 'react';
import { Card, CardBody, Input, CheckboxGroup, Checkbox } from '@nextui-org/react';
// import { envConfig } from '@/config/envConfig';

export const Support = () => {
	const [firstName, setFirstName] = useState('John');
	const [lastName, setLastName] = useState('Doe');
	const [email, setEmail] = useState('user@examng.net');
	const [phoneNumber, setPhoneNumber] = useState('+33 06 12 34 56 78');
	const [isInvalid, setIsInvalid] = useState(true);

	return (
		<Card className='w-1/2 h-1/2 mt-12'>
			<CardBody className='flex flex-col justify-center items-start p-14'>
				<h3 className='text-5xl font-semibold tracking-wide antialiased mb-10 text-gray-800'>Stuck in a pickle?</h3>
				<p><span className='text-left font-normal tracking-normal text-lg text-gray-700/50'>We&apos;ve got the answer!<br />Don&apos;t hesitate to throw us a line for a rescue mission</span> 🚀</p>
				<div className='flex flex-row justify-between items-center w-full mt-20 mb-5'>
					<Input
						value={firstName}
						type="text"
						label="First Name"
						variant="underlined"
						onValueChange={setFirstName}
						className="max-w-xs"
					/>
					<Input
						value={lastName}
						type="text"
						label="Last Name"
						variant="underlined"
						onValueChange={setLastName}
						className="max-w-xs"
					/>
				</div>
				<div className='flex flex-row justify-between items-center w-full mt-5'>
					<Input
						value={email}
						type="email"
						label="Email"
						variant="underlined"
						onValueChange={setEmail}
						className="max-w-xs"
					/>
					<Input
						value={phoneNumber}
						type="tel"
						label="Phone Number"
						variant="underlined"
						onValueChange={setPhoneNumber}
						className="max-w-xs"
					/>
				</div>
				<CheckboxGroup
					isRequired
					orientation='horizontal'
					isInvalid={isInvalid}
					label="Select subject:"
					color='default'
					onValueChange={(value) => {
						setIsInvalid(value.length < 1);
					}}
					className='my-14'
				>
					<Checkbox value="general-inquiry">General inquiry</Checkbox>
					<Checkbox value="informations">Informations</Checkbox>
					<Checkbox value="about-students">About students</Checkbox>
					<Checkbox value="about-professor-access">About professor access</Checkbox>
				</CheckboxGroup>
			</CardBody>
		</Card>
	);
};
