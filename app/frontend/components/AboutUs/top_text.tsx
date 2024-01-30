import React from 'react';
import style from './style_about_us.module.css';

export default function Top_text() {
	return (
		<div className="text-center ml-32 mr-32 mt-16">
			<p className={style.TextTitle}>Who are we ?</p>
			<p className={style.story}>
				{ 'Here\'s our talented team behind all the platform\'s features 🌟'}
			</p>

		</div>
	);
}
