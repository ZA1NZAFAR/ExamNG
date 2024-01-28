import {
	Attachment,
	ImageAttachment,
	CodeAttachment
} from '@/types';

export function isImageAttachment(attachment: Attachment): attachment is ImageAttachment {
	return (attachment as ImageAttachment).imageUrl !== undefined;
}

export function isCodeAttachment(attachment: Attachment): attachment is CodeAttachment {
	return (attachment as CodeAttachment).language !== undefined;
}
