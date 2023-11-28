import React from 'react';
import { Image } from '@nextui-org/image';
import { Textarea } from '@nextui-org/input';
import { AttachmentProps } from '@/types/attachment';
import { isImageAttachment } from './attachment.util';

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
		/>
	);
};

export default AttachmentComponent;