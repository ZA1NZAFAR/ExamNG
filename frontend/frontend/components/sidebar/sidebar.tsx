import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {Input} from '@nextui-org/react';
import Notifications from '@/components/notification/notifications';
import {useSideBarContext} from '@/components/sidebar/SideBarContext';


interface SidebarItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}



export default function Sidebar(): JSX.Element {
	const [tooltipIndex, setTooltipIndex] = useState<number | null>(0);
	const { isCollapsed, setIsCollapsed } = useSideBarContext();

	useEffect(() => {
		const collapsedState = localStorage.getItem('sidebarCollapsed');
		if (collapsedState) {
			setIsCollapsed(collapsedState === 'true');
		}
	}, [setIsCollapsed]);

	const toggleSidebarCollapseHandler = () => {
		const newState = !isCollapsed;
		setIsCollapsed(newState);
		localStorage.setItem('sidebarCollapsed', newState.toString());
	};

	const handleHover = (index: number) => {
		setTooltipIndex(index);
		const sidebarItems = document.querySelectorAll('.sidebar_item') as NodeListOf<HTMLElement>;
		sidebarItems.forEach((item, i) => {
			if (i === index) {
				item.classList.add('hovered');
			} else if (i > index && index == 0) {
				item.style.transform = !isCollapsed ? 'translateY(250%)' : 'translateY(2%)';
			} else if (i > index && index != 0) {
				item.style.transform = 'translateY(2%)';
			}
		});
	};

	const handleLeave = () => {
		setTooltipIndex(null);
		const sidebarItems = document.querySelectorAll('.sidebar_item') as NodeListOf<HTMLElement>;
		sidebarItems.forEach((item) => {
			item.style.transform = 'translateY(0)';
			item.classList.remove('hovered');
		});
	};
	const sidebarItems: SidebarItem[] = [
		{
			name: 'Exams',
			href: '/exams',
			icon: <Image src="/exams.svg" alt="Exams" width={24} height={24}/>,
		},
		{
			name: 'Calendar',
			href: '/calendar',
			icon: <Image src="/Calendar.svg" alt="Sheets" width={24} height={24}/>,
		},
		{
			name: 'Exams reviews',
			href: '#',
			icon: <Image src="/Sheets.svg" alt="Exams" width={24} height={24}/>,
		},
		{
			name: 'Notifications',
			href: '#',
			icon: <Notifications sideBarIsActive={isCollapsed}/>,
		},
	];
	return (
		<div className="sidebar_wrapper">
			<button className="btn" onClick={toggleSidebarCollapseHandler}>
				{isCollapsed ? (
					<Image
						width={150}
						height={150}
						className="sidebar_logo"
						src="/ArrowRight.svg"
						alt="logo"
					/>
				) : (
					<Image
						width={150}
						height={150}
						className="sidebar_logo"
						src="/ArrowLeft.svg"
						alt="logo"
					/>
				)}
			</button>
			<aside className={`sidebar ${isCollapsed ? '' : 'active'}`} data-collapse={isCollapsed}>
				<div className="sidebar_top">
					<Image
						width={80}
						height={80}
						className="sidebar_logo"
						src="/Avatar.svg"
						alt="logo"
					/>
					<p className="sidebar_logo-name">Meryem Kose</p>
				</div>
				<ul className="sidebar_list" onMouseLeave={handleLeave}>
					{sidebarItems.slice(0, -1).map(({name, icon, href}, index) => (
						<li
							className="sidebar_item"
							key={name}
							onMouseEnter={() => handleHover(index)}
							onMouseLeave={handleLeave}
						>
							<Link href={href}>
								<div className="sidebar_link">
									<div className="sidebar_icon-wrapper">
										<span className="sidebar_icon">{icon}</span>
									</div>
									<span className="sidebar_name">{name}</span>
								</div>
							</Link>
							{index == 0 && !isCollapsed && (
								<div
									className={`tooltip ${tooltipIndex === index ? 'show' : ''}`}
									id={`tooltip-${index}`}
								>
									<ul className="w-full">
										<div className="w-full flex flex-col md:flex-row">

											<div
												key="underlined"
												className="w-full md:w-auto flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"

											>
											</div>

											<div className="w-full md:w-auto flex flex-col">
												<ul className="flex flex-col">
													<div className = "w-full text-left mb-2 mt-0">
														<Input type="email" variant="underlined" label="Search..."/>
													</div>
													<li className="w-full text-left">JEE</li>
													<li className="w-full text-left">Scala</li>
													<li className="w-full text-left">Sociology</li>
												</ul>
											</div>

										</div>
									</ul>
								</div>
							)}
						</li>
					))}

					<span className = "sidebar_item">{sidebarItems[3].icon}</span>

				</ul>
			</aside>
		</div>
	);
}