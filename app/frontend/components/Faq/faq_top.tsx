import React from 'react';
import style from './style_faq.module.css';
import {Input} from '@nextui-org/react';
import {SearchIcon} from './SearchIcon';


const FaqTop: React.FC = () => {
	{

		return (
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-lg text-center justify-center">
					<h1 className={style.heading}>Ask us anything</h1>
					<p className={style.text}>
                    Have any questions? Perhaps someone else had the same ones.
					</p>
					<Input
						label="Search"
						isClearable
						radius="lg"
						classNames={{
							label: 'text-black/50 dark:text-white/90',
							input: [
								'bg-transparent',
								'text-black/90 dark:text-white/90',
								'placeholder:text-default-700/50 dark:placeholder:text-white/60',
							],
							innerWrapper: 'bg-transparent',
							inputWrapper: [
								'shadow-xl',
								'bg-default-200/50',
								'dark:bg-default/60',
								'backdrop-blur-xl',
								'backdrop-saturate-200',
								'hover:bg-default-200/70',
								'dark:hover:bg-default/70',
								'group-data-[focused=true]:bg-default-200/50',
								'dark:group-data-[focused=true]:bg-default/60',
								'!cursor-text',
							],
						}}
						placeholder="Type to search..."
						startContent={
							<SearchIcon
								className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
						}
					/>

				</div>
			</section>
		);
	}
};
export default FaqTop;
