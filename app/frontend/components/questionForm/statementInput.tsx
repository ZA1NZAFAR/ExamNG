import { EditorProps } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import HTMLSanitize from '@/utils/htmlSanitizer';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';

// weird bug with react-draft-wysiwyg with window not being defined
// dynamic import fixes it
const TextEditor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });

const StatementInput = () => {
	const { statement, setStatement, statementError, setStatementError, deleteStatementError } = useQuestionFormStore(
		useShallow((state) => ({
			statement: state.question.statement,
			setStatement: (newStatement: string) => state.setQuestion({ ...state.question, statement: newStatement }),
			statementError: state.errors.statement,
			setStatementError: (newStatementError: string) => state.setErrors({ ...state.errors, statement: newStatementError }),
			deleteStatementError: () => state.deleteError('statement')
		})));

	const contentBlock = htmlToDraft(statement);
	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
	const [ editorState, setEditorState ] = React.useState(EditorState.createWithContent(contentState));

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
		const newContentState = editorState.getCurrentContent();
		const newStatement = HTMLSanitize(draftToHtml(convertToRaw(newContentState)));
		setStatement(newStatement);
		if (newContentState.getPlainText() === '') {
			setStatementError('Statement cannot be empty');
		} else {
			deleteStatementError();
		}
	};

	return (
		<div className="px-4">
			<TextEditor
				wrapperClassName="border-2 border-gray-300 rounded-md p-2"
				editorClassName="border-2 border-gray-300 rounded-md px-2 min-h-[100px]"
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				toolbar={{
					options: ['inline', 'list', 'textAlign', 'remove', 'history'],
					inline: {
						options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
					},
					list: {
						options: ['unordered', 'ordered'],
					},
					textAlign: {
						options: ['left', 'center', 'right', 'justify'],
					}
				}}
			/>
			{statementError && <p className="text-red-500">{statementError}</p>}
		</div>
	);
};

export default StatementInput;
