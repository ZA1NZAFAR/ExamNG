import React from 'react';
import { Card, CardBody } from '@nextui-org/react';
// import { envConfig } from '@/config/envConfig';

export const Support = () => {
	return (
		<Card className='w-1/2 h-1/2 mt-12'>
			<CardBody className='flex flex-col justify-center items-start p-14'>
				<h3 className='text-5xl font-semibold tracking-wide antialiased mb-10 text-gray-800'>Stuck in a pickle?</h3>
				<p><span className='text-left font-normal tracking-normal text-lg text-gray-700/50'>We&apos;ve got the answer!<br/>Don&apos;t hesitate to throw us a line for a rescue mission</span> 🚀</p>
			</CardBody>
		</Card>
	);
};
