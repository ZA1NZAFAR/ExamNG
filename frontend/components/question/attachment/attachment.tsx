import React from 'react';
import { Image } from '@nextui-org/image';
import { Textarea } from '@nextui-org/input';
import { Attachment } from '@/types/attachment';
import { isImageAttachment } from './attachment.util';

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

const AttachmentComponent: React.FC<AttachmentProps> = ({ attachment }) => {
	if (isImageAttachment(attachment)) {
		return (
			<Image
				src={attachment.imageUrl}
				alt={attachment.description}
			/>
		);
	}
	return (
		<Textarea
			label={attachment.language}
			placeholder="Enter your code here"
			className="max-w-xs"
			value={attachment.code}
			isDisabled
		/>
	);
};

export default AttachmentComponent;