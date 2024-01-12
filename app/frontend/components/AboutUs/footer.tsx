import React from 'react';
import {Button, Image} from '@nextui-org/react';
import style from './style_about_us.module.css';
import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<h1 className={style.footer_heading}> { 'Where the magic ends (but the help doesn\'t!)' } </h1>
			<p className={style.text_footer}>{ 'Got a question? Don\'t be shy, hit us up! We\'re all ears and ready to sprinkle some assistance magic your way!' }</p>
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
