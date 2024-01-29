import { title } from '@/components/primitives';
import AboutUs from '@/components/AboutUs/about_us';
import Our_story from '@/components/AboutUs/our_story';
import Top_text from '@/components/AboutUs/top_text';
import Footer from '@/components/AboutUs/footer';

export default function AboutPage() {
	return (
		<div>
			<Top_text/>
			<div className={'max-w-lg'}>
				<AboutUs/>
			</div>
			<Our_story/>
			<div className={'mt-96'}>
				<Footer/>
			</div>
		</div>
	);
}
