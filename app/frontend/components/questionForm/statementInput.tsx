import { Editor as TextEditor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import '@/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { QuestionFormContext } from './questionFormContext';
import React from 'react';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import HTMLSanitize from '@/utils/htmlSanitizer';

const StatementInput = () => {
	const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());
	const { question, setQuestion, errors, setErrors, deleteError } = React.useContext(QuestionFormContext);
	React.useEffect(() => {
		const contentBlock = htmlToDraft(question.statement);
		const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
		setEditorState(EditorState.createWithContent(contentState));
	}, []);

	const onEditorStateChange = (editorState: EditorState) => {
		setEditorState(editorState);
		const newContentState = editorState.getCurrentContent();
		const newStatement = HTMLSanitize(draftToHtml(convertToRaw(newContentState)));
		setQuestion({ ...question, statement: newStatement });
		const newErrors = {...errors};
		if (newContentState.getPlainText() === '') {
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
			{errors.statement && <p className="text-red-500">{errors.statement}</p>}
		</>
    
	);
};

export default StatementInput;
