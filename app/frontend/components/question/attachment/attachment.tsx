import React from 'react';
import { Image } from '@nextui-org/image';
import { Attachment } from '@/types';
import { isImageAttachment } from './attachment.util';
import CodeAttachmentComponent from './codeAttachment';


/**
 * Represents the properties for an attachment component.
 * @property {Attachment} attachment - The attachment to display.
 */
type AttachmentProps = {
	/**
	 * The attachment to display.
	 */
  attachment: Attachment;
}

function AttachmentComponent ({ attachment }: AttachmentProps) {
	if (isImageAttachment(attachment)) {
		return (
			<Image
				src={attachment.imageUrl}
				alt={attachment.description}
			/>
		);
	}
	return (
		<CodeAttachmentComponent
			title={attachment.title || ''}
			language={attachment.language}
			code={attachment.code || ''}
		/>
	);
}

export default AttachmentComponent;
