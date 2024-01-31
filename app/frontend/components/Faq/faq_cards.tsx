import React from 'react';
import {Button, Card, CardBody, Image, ScrollShadow} from '@nextui-org/react';
import style from './style_faq.module.css';
import {Avatar} from '@nextui-org/react';
import Link from 'next/link';

const FaqCards: React.FC = () => {
	{
		const list = [
			{
				title: 'Does the platform ensure exam security to prevent fraud or cheating?',
				img: '/icon_conversation.svg',
				text: 'Yes, our platform ensures exam security to prevent fraud or cheating, by different ways : for example no one can’t swicth between pages during the exam.',
			},
			{
				title: 'Is the platform easily accessible across different devices (computer, tablet, smartphone)?',
				img: '/icon_device.svg',
				text: 'No, we intentionally designed the site to be inaccessible via tools that don\'t meet the appropriate dimensions required for taking the exam, such as smartphones. ',
			},
			{
				title: 'What is your cancellation policy?',
				img: '/icon_cancelled.svg',
				text: 'You can  cancel anytime you want ! You’ll be refunded according to our refund policy.',
			},
			{
				title: 'Is there technical support available in case of technical issues during the exam?',
				img: '/icon_settings.svg',
				text: 'Of course, you can contact us directly from the form, or talk us thanks to our Support page.',
			},
			{
				title: 'Does the platform offer a user-friendly and intuitive interface to facilitate exam-taking?',
				img: '/icon_smiling.svg',
				text: 'Yes, it was the crux of creating our site. We\'ve also taken online exams during our schooling, and there\'s nothing worse than having a non-intuitive interface...',
			},
			{
				title: 'How does student monitoring during online exams work to ensure result integrity?',
				img: '/icon_monitor.svg',
				text: 'The monitoring takes place on a single computer; one person is more than enough to oversee the entire exam. They have adequate and intuitive tools and permissions.',
			},
			{
				title: 'How do I change my account email?',
				img: '/icon_mail.svg',
				text: 'You can log in to your account and change it from your Profile > Edit Profile. Then go to the general tab to change your email.',
			},
			{
				title: 'Does the platform allow easy creation and management of exams, questions, and responses?',
				img: '/icon_sheet.svg',
				text: 'Of course, we actually offer what we believe is one of the most personalized experiences in the market* with the ability to create various types of questions and customize each one of them.',
			},
			{
				title: 'Are the content promptly accessible after completing the exam? Are detailed feedback provided?',
				img: '/icon_conversation.svg',
				text: 'It depends on your professor\'s preference; we provide the options for displaying content and/or feedbacks. It\'s up to their choice!',
			},
			{
				title: 'Is it possible to include a link from the login platform to your website?',
				img: '/icon_login.svg',
				text: 'Absolutely! It\'s super easy to integrate our site into your login platform. Just let your IT department know, and they can reach out to us directly for all the technical details to make it happen.',
			},

		];
		return (
			<>
				<ScrollShadow className="w-[98%] h-[600px]">
					<Card className={style.whiteContainer}>
						<CardBody>
							<div
								className="gap-2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
								{list.map((item, index) => (
									<Card
										shadow="sm"
										key={index}
										isPressable
										onPress={() => console.log('item pressed')}
									>
										<CardBody className={`overflow-visible p-0 ${style.global}`}>
											<Avatar src={item.img} alt={''}/>
											<h1 className={style.question_title}>{item.title}</h1>

											<p className={style.text_faq}>{item.text}</p>
										</CardBody>
									</Card>
								))}

							</div>
						</CardBody>
					</Card>
				</ScrollShadow>
				<br/>
				<br/>
				<br/>
				{/*=== FOOTER PART ===*/}
				<h1 className={style.footer_heading}>{ 'Where the magic ends (but the help doesn\'t!)' }</h1>
				<p className={style.text_footer}>{ 'Got a question? Don\'t be shy, hit us up! We\'re all ears and ready to sprinkle some assistance magic your way!'}</p>
				<Link href="/support">
					<Button className={style.button}>👋 Contact us</Button>
				</Link>
				<br/>
				<Image className={style.button} src="/Divider.svg" alt="divider"/>
				<div className={style.textContainer}>
					<p className={style.logo}>ExamNG</p>
					<p className={style.text_reserved}>© 2024 ExamNG. All Rights Reserved</p>
					<Image src="/Facebook_icon.svg" alt="Facebook"/>
					<Image src="/Linkedin_icon.svg" alt="LinkedIn"/>
					<Image src="/Insta_icon.svg" alt="Instagram"/>
				</div>


			</>
		);
	}
};
export default FaqCards;
