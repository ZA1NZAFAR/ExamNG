import React from 'react';
import CodeEditor from '@/components/codeEditor';
import { CodeQuestion } from '@/types';

type CodeAnswerProps = {
  question: CodeQuestion;
  isDisabled?: boolean;
}

const CodeAnswerComponent: React.FC<CodeAnswerProps> = ({ question, isDisabled = false }) => {
	const [ code, setCode ] = React.useState<string>(question.initialCode || '');
	const handleChange = (value?: string) => {
		setCode(value || '');
	};
	return (
		<CodeEditor
			defaultLanguage={question.defaultLanguage}
			code={code}
			onChange={(value) => handleChange(value)}
			isDisabled={isDisabled}
		/>
	);
};

export default CodeAnswerComponent;
