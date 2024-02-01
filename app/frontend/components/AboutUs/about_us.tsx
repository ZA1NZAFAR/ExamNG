import React from 'react';
import { Avatar } from '@nextui-org/react';
import style from './style_about_us.module.css';
export default function about_us() {
	return (
		<div className="flex flex-wrap ml-48">
			<div
				className="flex flex-col md:flex-row justify-between space-x-4 md:space-x-8 ml-4 md:ml-0 mb-4 md:mb-48 mt-12 lg:space-x-72 lg:ml-0 ">
				<div className={style.AvatarContainer}>
					<h1 className={style.AvatarTitle}>Kerim</h1>
					<Avatar src="/AvatarKerim.png" className="w-64 h-64 "/>
					<p className={style.AvatarDescription}> { 'Our technical lead! He\'s the architect steering the technical direction of our projects, ensuring they\'re built on a solid foundation.'} </p>
				</div>

				<div className={style.AvatarContainer}>
					<h1 className={style.AvatarTitle}>Viet</h1>
					<Avatar src="/AvatarViet.png" className="w-64 h-64 "/>
					<p className={style.AvatarDescription}> { 'Meet our lead developer! He\'s the wizard behind the scenes, shaping and perfecting the inner workings of our website' }</p>
				</div>

				<div className="flex">
					<div className={style.AvatarContainer}>
						<h1 className={style.AvatarTitle}>Meryem</h1>
						<Avatar src="/AvatarMeryem.png" className="w-64 h-64 "/>
						<p className={style.AvatarDescription}> { 'Our multi-talented powerhouse! She crafts seamless user experiences, manages our databases flawlessly, and leads our team through agile efficiency as our Scrum Master' }</p>
					</div>
				</div>
			</div>
			<div
				className="flex flex-col md:flex-row justify-between space-x-4 md:space-x-8 ml-4 md:ml-0 mb-4 md:mb-48 lg:space-x-72 lg:ml-0 ">
				<div className={style.AvatarContainer}>
					<h1 className={style.AvatarTitle}>Zain</h1>
					<Avatar src="/AvatarZain.png" className="w-64 h-64 "/>
					<p className={style.AvatarDescription}> { 'Meet Zain, our Project Manager! He\'s the maestro orchestrating our team\'s efforts, ensuring projects move smoothly from start to finish' }</p>
				</div>
				<div className={style.AvatarContainer}>
					<h1 className={style.AvatarTitle}>Malak</h1>
					<Avatar src="/AvatarMalak.png" className="w-64 h-64 "/>
					<p className={style.AvatarDescription}> { 'Say hello to Malak, our data engineer! She\'s the mastermind transforming complex data into valuable insights that drive our decisions.' }</p>
				</div>
			</div>

		</div>
	);
}
