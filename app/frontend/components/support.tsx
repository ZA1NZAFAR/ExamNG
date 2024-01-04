import React, { useState } from 'react';
import { Card, CardBody, Input, CheckboxGroup, Checkbox, Textarea, Button } from '@nextui-org/react';
import { Phone } from 'lucide-react';
// import { envConfig } from '@/config/envConfig';

export const Support = () => {
	const [firstName, setFirstName] = useState<string>('John');
	const [lastName, setLastName] = useState<string>('Doe');
	const [email, setEmail] = useState<string>('user@examng.net');
	const [phoneNumber, setPhoneNumber] = useState<string>('+33 06 12 34 56 78');
	const [isInvalid, setIsInvalid] = useState<boolean>(true);
	const [selected, setSelected] = useState<Array<string>>([]);
	const [message, setMessage] = useState<string>('');

	return (
		<Card className='w-1/2 h-1/2 mt-12'>
			<CardBody className='flex flex-col justify-center items-start px-16 py-14'>
				<h3 className='text-5xl max-md:text-3xl font-semibold tracking-wide antialiased mb-10 max-md:mb-5 text-gray-800'>Stuck in a pickle?</h3>
				<p><span className='text-left font-normal tracking-normal text-lg max-md:text-base text-gray-700/50'>We&apos;ve got the answer!<br />Don&apos;t hesitate to throw us a line for a rescue mission</span> 🚀</p>
				<div className='flex max-md:flex-col flex-row justify-between items-center w-full mt-20 max-md:mt-14 mb-5'>
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
				<div className='flex max-md:flex-col flex-row justify-between items-center w-full mt-5'>
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
					label="Select subject"
					color='default'
					onValueChange={(value) => {
						setIsInvalid(value.length < 1);
						setSelected(value);
					}}
					value={selected}
					className='my-14 max-md:my-8'
				>
					<Checkbox value="general-inquiry">General inquiry</Checkbox>
					<Checkbox value="informations">Informations</Checkbox>
					<Checkbox value="about-students">About students</Checkbox>
					<Checkbox value="about-professor-access">About professor access</Checkbox>
				</CheckboxGroup>
				<Textarea
					minRows={1}
					maxRows={5}
					isRequired
					variant='underlined'
					label="Message"
					labelPlacement='outside'
					placeholder="Write your message..."
					value={message}
					onValueChange={setMessage}
					className='mb-14 max-md:mb-8'
				/>
				<div className='flex max-md:flex-col flex-row justify-between items-center w-full'>
					<div className='flex flex-col justify-between items-start'>
						<h4 className='text-3xl max-md:text-1xl font-medium tracking-normal antialiased text-gray-800'>Let&apos;s talk!</h4>
						<div>
							<Phone className='inline-block mr-2 my-6' />
							<span>+33 06 12 34 56 78</span>
						</div>
					</div>
					<Button color="success" variant="shadow" className='w-3/12 h-16 text-lg text-white'>
						Send message
					</Button>  
				</div>
			</CardBody>
		</Card>
	);
};
