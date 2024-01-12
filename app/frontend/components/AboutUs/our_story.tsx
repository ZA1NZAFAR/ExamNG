import React from 'react';
import style from './style_about_us.module.css';
import { Image } from '@nextui-org/image';

export default function Our_story() {
	return (
		<div className="text-center ml-32 mr-32">
			<div className={style.image}>
				<Image src="/book_reader.png" alt=""/>
			</div>
			<p className={style.TextTitle}>Our story</p>
			<p className={`${style.story} mt-20`}>
				{ 'Once upon a time, a group of old school friends embarked on a journey. It all started with a year-end project that sparked a shared passion. Today, that passion drives us as we lead you through a transformative technological adventure in the realm of exams.' }
			</p>
			<p className={style.story}>
				{ 'With every step, we\'re committed to weaving a narrative of innovation and improvement.' }
			</p>

			<p className={style.story}>
				{ 'Our constant quest? To bring students, teachers, and proctors closer together, shaping an experience often deemed \'arduous\' into one that\'s beautifully intuitive.' }
			</p>
			<p className={style.story}>
                And that, dear reader, concludes this part about our tale of friendship, innovation, and transforming the exam experience!
			</p>

		</div>

	);
}
