import React from 'react';
import { Language } from '@/types';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';

/**
 * Represents the props for the CodeAttachment component.
 * @property {Language} language - The language of the code.
 * @property {string} code - The code to display.
 */
type CodeAttachmentProps = {
  /**
   * The language of the code.
   */
  language: Language;
  /**
   * The code to display.
   */
  code: string;
}

const MAX_LINES = 10;
const LINE_HEIGHT = 19;

function CodeAttachmentComponent ({ language, code }: CodeAttachmentProps) {
	const { theme } = useTheme();
	const height = Math.min(MAX_LINES, code.split('\n').length + 1) * LINE_HEIGHT;
	return (
		<Editor
			height={`${height}px`}
			language={language}
			className="max-w"
			theme={theme === 'dark' ? 'vs-dark' : 'light'}
			value={code}
			options={{
				readOnly: true, domReadOnly: true,
				scrollBeyondLastLine: false,
				minimap: {enabled: false}
			}}
		/>
	);
}

export default CodeAttachmentComponent;
