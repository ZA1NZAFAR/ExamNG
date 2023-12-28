import { Editor as TextEditor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { QuestionFormContext } from './questionFormContext';
import React from 'react';

const StatementInput = () => {
	const { question, setQuestion, errors, setErrors, deleteError } = React.useContext(QuestionFormContext);
	const [ editorState, setEditorState ] = React.useState(
		question.statement.length > 0 ?  EditorState.createWithContent(ContentState.createFromText(question.statement)) :
			EditorState.createEmpty()
	);

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
		const contentState = editorState.getCurrentContent().getPlainText();
		setQuestion({ ...question, statement: contentState });
		const newErrors = {...errors};
		if (contentState.length === 0) {
			setErrors({...newErrors, statement: 'Statement cannot be empty'});
		} else {
			deleteError('statement');
		}
	};

	return (
		<>
			<TextEditor
				wrapperClassName="border-2 border-gray-300 rounded-md p-2"
				editorClassName="border-2 border-gray-300 rounded-md px-2 min-h-[100px]"
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
			/>
			{errors.statement && <p className="text-red-500">{errors.statement}</p>}
		</>
	);
};

export default StatementInput;
