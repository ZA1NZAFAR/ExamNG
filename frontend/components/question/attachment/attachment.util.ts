import {
	Attachment,
	ImageAttachment,
	CodeAttachment
} from '../../../types/attachment';

export function isImageAttachment(attachment: Attachment): attachment is ImageAttachment {
	return 'imageUrl' in attachment;
}

export function isCodeAttachment(attachment: Attachment): attachment is CodeAttachment {
	return 'language' in attachment;
}