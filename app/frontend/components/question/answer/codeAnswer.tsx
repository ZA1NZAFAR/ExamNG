import React from 'react';
import CodeEditor from '@/components/codeEditor';
import { Language } from '@/types/data/language';
import { CodeQuestion } from '@/types';
import { useAnswerFormStore } from '../answerFormStore';
import { useService } from '@/hooks/useService';

type CodeAnswerProps = {
	question: CodeQuestion;
	isDisabled?: boolean;
}

const CodeAnswerComponent: React.FC<CodeAnswerProps> = ({
	question,
	isDisabled = false }) => {
	const {
		answer,
		setAnswer
	} = useAnswerFormStore(state => ({
		answer: state.answerSheet.answers.get(question.id)?.answer as string || '',
		setAnswer: state.setAnswer
	}));

	const { localAnswerService } = useService();
	const defaultLanguage = question.defaultLanguage || null;
	const initialCode = question.initialCode || '';
	
	React.useEffect(() => {
		setAnswer(question.id, initialCode);
	}, [initialCode, question.id, setAnswer]);

	const [ language, setLanguage ] = React.useState<Language | null>(defaultLanguage);
	const handleChange = (value: string) => {
		setAnswer(question.id, value);
		localAnswerService.setAnswer(question.id, { answer: value });
	};
	return (
		<CodeEditor
			language={language}
			code={answer}
			onCodeChange={handleChange}
			onLanguageChange={(language) => setLanguage(language || null)}
			isDisabled={isDisabled}
			isLanguageLocked={!! language}
		/>
	);
};

export default CodeAnswerComponent;
