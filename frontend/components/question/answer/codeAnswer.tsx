import React from 'react';
import { LANGUAGES, Language } from '@/types/language';
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/switch';
import { Select, SelectItem } from '@nextui-org/select';

/**
 * Represents the props for the CodeAnswer component.
 * @property {Language} defaultLanguage - The default language of the code.
 * @property {string} initialCode - The initial code to display.
 * @property {boolean} isDisabled - Whether the answer can be submitted.
 */
type CodeAnswerProps = {
  /**
   * The default language of the code.
   */
  defaultLanguage: Language | null;
  /**
   * The initial code to display.
   */
  initialCode?: string;
  /**
   * Whether the answer can be submitted.
   * @default false
   */
  isDisabled?: boolean;
}

const MIN_LINES = 3;
const MAX_LINES = 10;
const LINE_HEIGHT = 19;

function CodeAnswerComponent ({ defaultLanguage = null, initialCode = '', isDisabled = false }: CodeAnswerProps) {
	const selectedLanguage = defaultLanguage || 'javascript';
	const { theme } = useTheme();
	const [ isWordWrapEnabled, setIsWordWrapEnabled ] = React.useState<boolean>(false);
	const [ language, setLanguage ] = React.useState<Language>(selectedLanguage);
	const languages = LANGUAGES.toSorted();
	const minimumLines = Math.min(MAX_LINES, Math.max(MIN_LINES, initialCode.split('\n').length + 1));
	const height = (isDisabled ? minimumLines : MAX_LINES) * LINE_HEIGHT;

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(e.target.value as Language);
	};
	return (
		<>
			<div className="flex justify-between gap-2 items-center text-center">
				<Select
					labelPlacement='inside'
					label="Language"
					className="flex-initial w-64"
					onChange={handleSelectionChange}
					selectedKeys={[language]}
					isDisabled={ !!defaultLanguage }
				>
					{languages.map((lang) => (
						<SelectItem key={lang} value={lang}>
							{lang}
						</SelectItem>
					))}
				</Select>
				<Switch
					size="sm"
					isSelected={isWordWrapEnabled}
					onValueChange={setIsWordWrapEnabled}
				>Wordwrap</Switch>
			</div>
			<Editor
				height={`${height}px`}
				defaultLanguage={selectedLanguage}
				className="max-w"
				language={language}
				theme={theme === 'dark' ? 'vs-dark' : 'light'}
				defaultValue={initialCode}
				options={{
					readOnly: isDisabled,
					readOnlyMessage: { value: 'You cannot submit your answer' },
					scrollBeyondLastLine: !isDisabled,
					wordWrap: isWordWrapEnabled ? 'on' : 'off',
					minimap: {enabled: !isDisabled}
				}}
			/>
		</>
	);
}

export default CodeAnswerComponent;