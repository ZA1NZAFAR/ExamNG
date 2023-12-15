import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import {Skeleton} from '@nextui-org/skeleton';


const QuestionSkeleton = () => {
	return (
		<Card className="w-full">
			<CardHeader className="flex gap-2">
				<div className="flex flex-col gap-2">
					<Skeleton className='h-4 w-96 rounded-md bg-default-300'/>
					<Skeleton className='h-3.5 w-20 rounded-md'/>
				</div>
			</CardHeader>
			<CardBody>
				<Skeleton className='h-20 rounded-md'/>
			</CardBody>
			<Divider/>
			<CardFooter className="flex flex-col items-start text-start gap-2">
				<Skeleton className='h-40 w-full rounded-md'/>
			</CardFooter>
		</Card>
	);
};

export default QuestionSkeleton;
