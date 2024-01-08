import React, { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useQuestionFormStore } from './questionFormStore';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';
import { Attachment } from '@/types';
import AttachmentInput from './attachmentInput';

const AttachmentForm: React.FC = () => {
	const [ showAttachmentPrompt, setShowAttachmentPrompt ] = useState<boolean>(false);
	const {
		attachments,
		addAttachment,
	} = useQuestionFormStore(useShallow((state) => ({
		attachments: state.question.attachments,
		addAttachment: (newAttachment: Attachment) => state.setQuestion({
			...state.question,
			attachments: [...state.question.attachments, newAttachment]
		}),
	})));

	function handleAddAttachment(type: 'image' | 'code') {
		const attachment: Attachment = type === 'image' ?
			{
				imageUrl: ''
			} :
			{
				language: 'javascript',
				code: ''
			};
		addAttachment(attachment);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-1 overflow-auto max-h-96 gap-2 px-4">
			{ attachments.map((_, index) => (
				<AttachmentInput key={index} index={index} />
			))}
			</div>
			{ showAttachmentPrompt
				? ( <div className="grid grid-cols-3 gap-4">
					<Tooltip content="Upload an image" showArrow closeDelay={1000}>
						<Button color="primary" onPress={() => handleAddAttachment('image')}>Image Attachment</Button>
					</Tooltip>
					<Tooltip content="Add a code snippet" showArrow closeDelay={1000}>
						<Button color="primary" onPress={() => handleAddAttachment('code')}>Code Attachment</Button>
					</Tooltip>
					<Button color="danger" onPress={() => setShowAttachmentPrompt(false)}>Cancel</Button>
				</div>)
				: ( <Button color="secondary" onPress={() => setShowAttachmentPrompt(true)}>Add new attachment</Button> )
			}
		</div>
	);
};

export default AttachmentForm;
