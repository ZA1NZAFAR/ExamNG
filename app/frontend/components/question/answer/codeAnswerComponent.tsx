import React from 'react';
import CodeEditor from '@/components/codeEditor';
import { Language } from '@/types/data/language';

type CodeAnswerProps = {
	initialCode?: string;
	defaultLanguage?: Language | null;
	isDisabled?: boolean;
}

const CodeAnswerComponent: React.FC<CodeAnswerProps> = ({
	initialCode = '',
	defaultLanguage = null,
	isDisabled = false }) => {
	// TODO: add form control for student's answer
	// temporarily use useState for now
	const [ code, setCode ] = React.useState<string>('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ answer, setAnswer ] = React.useState<string>('');

	React.useEffect(() => {
		if (answer !== code && answer !== '') {
			setCode(answer);
		} else {
			setCode(initialCode);
		}
	}, [initialCode, answer]);

	const [ language, setLanguage ] = React.useState<Language | null>(defaultLanguage);
	const handleChange = (value?: string) => {
		setCode(value || '');
	};
	return (
		<CodeEditor
			language={language}
			code={code}
			onCodeChange={(value) => handleChange(value)}
    		onLanguageChange={(language) => setLanguage(language || null)}
			isDisabled={isDisabled}
		    isLanguageLocked={!! language}
		/>
	);
};

export default CodeAnswerComponent;
