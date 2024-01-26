import React from 'react';
import { LANGUAGES, Language } from '@/types/data/language';
import Editor, { OnChange } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/switch';
import { Select, SelectItem } from '@nextui-org/select';
import { useService } from '@/hooks/useService';
import { useLiveQuery } from 'dexie-react-hooks';

/**
 * Represents the props for the CodeAnswer component.
 * @property {Language | null} language - The language of the code.
 * @property {boolean} isLanguageLocked - Whether the language can be changed.
 * @property {string} code - The initial code to display.
 * @property {boolean} isDisabled - Whether the answer can be submitted.
 * @property {(value: string) => void} onCodeChange - The callback function to be called when the code changes.
 * @property {(language: Language) => void} onLanguageChange - The callback function to be called when the language changes.
 */
type CodeEditorProps = {
  /**
   * The language of the code.
   */
  language: Language | null;
  /**
   * Whether the language can be changed.
   * @default false
   */
  isLanguageLocked?: boolean;
  /**
   * The initial code to display.
   */
  code?: string;
  /**
   * Whether the answer can be submitted.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The callback function to be called when the code changes.
   * @default () => {}
   * @param {string} value - The new code.
   */
  onCodeChange: (value: string) => void;
  /**
   * The callback function to be called when the language changes.
   * @default () => {}
   * @param {Language} language - The new language.
   */
  onLanguageChange?: (language?: Language) => void;
}

const MIN_LINES = 3;
const MAX_LINES = 10;
const LINE_HEIGHT = 19;

const sortedLanguages = Array.from(LANGUAGES).sort((a, b) => a.localeCompare(b));

function CodeEditor ({
	language,
	code = '',
	isDisabled = false,
	isLanguageLocked = false,
	onCodeChange = () => {},
	onLanguageChange = (_) => {}
}: CodeEditorProps) {
	const { theme } = useTheme();
	const { userService } = useService();
	
	const defaultWordWrap = useLiveQuery(async () => await userService.getUserConfig('isWordwrapByDefault'), [], false);

	const [isWordWrapEnabled, setIsWordWrapEnabled] = React.useState(defaultWordWrap);
	
	const defaultLanguage = language || 'javascript';
	const minimumLines = Math.min(MAX_LINES, Math.max(MIN_LINES, code.split('\n').length + 1));
	const height = (isDisabled ? minimumLines : MAX_LINES) * LINE_HEIGHT;

	const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onLanguageChange(e.target.value as Language);
	};

	const handleCodeChange: OnChange = (value) => {
		if (value) {
			onCodeChange(value);
		}
	};
	return (
		<>
			<div className="flex justify-between gap-2 items-center text-center">
				<Select
					labelPlacement='inside'
					label="Language"
					className="flex-initial w-64"
					onChange={handleSelectionChange}
					selectedKeys={[defaultLanguage]}
					isDisabled={ isLanguageLocked }
				>
					{sortedLanguages.map((lang) => (
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
				className="max-w"
				language={defaultLanguage}
				theme={theme === 'dark' ? 'vs-dark' : 'light'}
				value={code}
				onChange={handleCodeChange}
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

export default CodeEditor;
