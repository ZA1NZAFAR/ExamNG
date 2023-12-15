'use client';
import React from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { useSideBarContext } from '@/components/sidebar/SideBarContext';

interface UserCardProps {
    id: number;
    onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ id, onDelete }) => {
	const { isCollapsed } = useSideBarContext();

	const handleDeleteClick = () => {
		onDelete(id);
	};

	return (
		<Card shadow="none" className="border-none bg-transparent w-full max-w-[400px] mx-auto">
			<CardHeader className="justify-between">
				<div className="flex gap-3 items-center">
					<Avatar isBordered radius="full" size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
					{!isCollapsed && (
						<div className="flex flex-col items-start justify-center">
							<h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
							<h5 className="text-small tracking-tight text-default-500">@zoeylang</h5>
						</div>
					)}
				</div>
				{!isCollapsed && (
					<div className="flex gap-2">
						<div className="flex flex-col sm:flex-row gap-2">
							<Button
								className="bg-transparent text-foreground border-default-200"
								color="primary"
								radius="full"
								size="sm"
								variant="bordered"
								onClick={handleDeleteClick}
							>
                            Delete
							</Button>
						</div>
					</div>
				)}
			</CardHeader>
			{!isCollapsed && (
				<CardBody className="px-3 py-2 sm:py-3">
					<p className="text-small pl-px text-default-500">
                        Full-stack developer, @getnextui lover she/her
						<span aria-label="confetti" role="img">
              🎉
						</span>
					</p>
				</CardBody>
			)}
			{!isCollapsed && (
				<CardFooter className="flex flex-col sm:flex-row gap-3">
					<div className="flex gap-1">
						<p className="font-semibold text-default-600 text-small">4</p>
						<p className="text-default-500 text-small">Following</p>
					</div>
					<div className="flex gap-1">
						<p className="font-semibold text-default-600 text-small">97.1K</p>
						<p className="text-default-500 text-small">Followers</p>
					</div>
				</CardFooter>
			)}
		</Card>
	);
};

export default UserCard;
