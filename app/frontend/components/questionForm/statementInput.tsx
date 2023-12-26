import { Editor as TextEditor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { QuestionContext } from './questionContext';
import React from 'react';

const StatementInput = () => {
	const { question, setQuestion } = React.useContext(QuestionContext);
	const [ editorState, setEditorState ] = React.useState(
		question.statement.length > 0 ?  EditorState.createWithContent(ContentState.createFromText(question.statement)) :
			EditorState.createEmpty()
	);

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
		setQuestion({ ...question, statement: editorState.getCurrentContent().getPlainText() });
	};

	return (
		<>
			<TextEditor
				wrapperClassName="border-2 border-gray-300 rounded-md p-2"
				editorClassName="border-2 border-gray-300 rounded-md px-2 min-h-[100px]"
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
			/>
			<div> {question.statement} </div>
		</>
	);
};

export default StatementInput;
