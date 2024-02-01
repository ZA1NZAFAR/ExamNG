import React from 'react';
import { Attachment, CodeAttachment, ImageAttachment } from '@/types';
import { LANGUAGES, Language } from '@/types/data/language';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import CodeEditor from '../codeEditor';
import { isCodeAttachment, isImageAttachment } from '../question/attachment/attachment.util';
import { Image, Tooltip } from '@nextui-org/react';
import { useQuestionFormStore } from './questionFormStore';
import { useShallow } from 'zustand/react/shallow';

// TODO: WIP

/**
 * The props for the AttachmentInput component
 * @property {number} index - The index of the attachment in the attachments array
 * */
type AttachmentInputProps = {
	/** The index of the attachment in the attachments array */
	index: number;
}

type CodeAttachmentInputProps = AttachmentInputProps & {
	handleDeleteAttachment: () => void;
}

const CodeAttachmentInput: React.FC<CodeAttachmentInputProps> = ({
	index,
	handleDeleteAttachment
}) => {
	const {
		attachment,
		setAttachment,
		attachmentError,
		setAttachmentError,
		deleteAttachmentError,
	} = useQuestionFormStore(useShallow((state) => ({
		attachment: state.question.attachments[index] as CodeAttachment,
		setAttachment: (newAttachment: CodeAttachment) => {
			const newAttachments = [...state.question.attachments];
			newAttachments[index] = newAttachment;
			state.setQuestion({
				...state.question,
				attachments: newAttachments
			});
		},
		attachmentError: Object.keys(state.errors)
			.filter((key) => key.startsWith(`attachment${index}`))
			.reduce((obj, key) => {
				obj[key] = state.errors[key];
				return obj;
			}, {} as Record<string, string>),
		setAttachmentError: (key: string, newAttachmentError: string) => state.setErrors({
			...state.errors,
			[`attachment${index}-${key}`]: newAttachmentError 
		}),
		deleteAttachmentError: (key: string) => state.deleteError(`attachment${index}-${key}`),
	})));

	const handleChange = (key: keyof CodeAttachment, value: string) => {
		setAttachment({ ...attachment, [key]: value });
		if (key === 'title' && value === '') {
			setAttachmentError('title', 'Title cannot be empty');
		} else if (key === 'language' && !LANGUAGES.includes(value as Language)) {
			setAttachmentError('language', `${value} is not a valid or supported language`);
		} else {
			deleteAttachmentError(key);
		}
	};
	React.useEffect(() => {
		if (attachment.code === '') {
			setAttachmentError('code', 'Code cannot be empty');
		}
	}, [attachment, index, setAttachmentError]);

	return (
		<div className="flex flex-col gap-2 py-2 px-4 border-2 border-gray-300 rounded-md">
			<div className="flex gap-4">
				<Input
					value={attachment.title}
					size="sm"
					label={`Attachment ${index + 1} title`}
					labelPlacement="outside-left"
					onValueChange={(value) => handleChange('title', value)}
					placeholder="Add a title for this snippet"
				/>
				<Button isIconOnly onPress={handleDeleteAttachment} color="danger">
					<span className="material-icons">delete</span>
				</Button>
			</div>
			<CodeEditor
				code={attachment.code}
				onCodeChange={(value = '') => handleChange('code', value)}
				language={attachment.language}
				onLanguageChange={(language = 'javascript') => handleChange('language', language)}
			/>
			{attachmentError.code !== undefined && <p className="text-red-500 text-sm">{attachmentError.code}</p>}
		</div>
	);
};

type ImageAttachmentInputProps = AttachmentInputProps & {
	handleDeleteAttachment: () => void;
}

const ImageAttachmentInput: React.FC<ImageAttachmentInputProps> = ({
	index,
	handleDeleteAttachment
}) => {
	const [ fileUrl, setFileUrl ] = React.useState<string>('');
	const {
		attachment,
		setAttachment,
		setAttachmentError,
		files,
		setFile
	} = useQuestionFormStore(useShallow((state) => {
		const currentAttachments = state.question.attachments;
		const currentAttachment = currentAttachments[index] as ImageAttachment;
		return {
			attachment: currentAttachment,
			setAttachment: (newAttachment: Attachment) => {
				const newAttachments = [...currentAttachments];
				newAttachments[index] = newAttachment;
				state.setQuestion({
					...state.question,
					attachments: newAttachments
				});
			},
			deleteAttachment: () => {
				const newAttachments = [...currentAttachments];
				newAttachments.splice(index, 1);
				state.setQuestion({
					...state.question,
					attachments: newAttachments
				});
			},
			attachmentError: Object.keys(state.errors)
				.filter((key) => key.startsWith(`attachment${index}`))
				.reduce((obj, key) => {
					obj[key] = state.errors[key];
					return obj;
				}, {} as Record<string, string>),
			setAttachmentError: (key: string, newAttachmentError: string) => state.setErrors({
				...state.errors,
				[`attachment${index}-${key}`]: newAttachmentError 
			}),
			deleteAttachmentError: (key: string) => state.deleteError(`attachment${index}-${key}`),
			files: state.files,
			setFile: (file: File) => state.setFiles({ ...state.files, [`attachment-${index}`]: file })
		};
	}));
	const noImage = fileUrl.length === 0;
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null && event.target.files.length > 0) {
			const file = event.target.files[0];
			console.log('file uploaded', file, URL.createObjectURL(file));
			setFileUrl(URL.createObjectURL(file));
			setFile(file);
		}
	};
	
	const handleDescriptionChange = (value: string) => {
		setAttachment({ ...attachment, description: value });
	};

	React.useEffect(() => {
		if (attachment.imageUrl === '' && !files[`attachment-${index}`]) {
			setAttachmentError('image', 'Image cannot be empty');
		}
		if (files[`attachment-${index}`]) {
			setFileUrl(URL.createObjectURL(files[`attachment-${index}`]));
		} else  {
			setFileUrl(attachment.imageUrl);
		}
	}, [attachment, files, index, setAttachmentError]);

	return (
		<div className="grid grid-cols-2 gap-2 py-2 px-4 border-2 border-gray-300 rounded-md">
			<Tooltip isDisabled={noImage} content={
				<Image
					src={fileUrl}
					width={300}
					alt={attachment.description}
				/>
			}>
				<div className="px-4">
					<input
						type="file"
						placeholder="Add an image"
						className={`block w-full text-sm text-slate-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						${noImage ?
			'file:bg-danger-50 file:text-danger-700 hover:file:bg-danger-300' : 
			'file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-300'
		}}`}
						onChange={handleImageChange}
					/>
					{noImage && <p className="text-red-500 text-sm">Image cannot be empty</p>}
				</div>
			</Tooltip>
			<Button isIconOnly onPress={handleDeleteAttachment} color="danger">
				<span className="material-icons">delete</span>
			</Button>
			<Textarea
				className="col-span-2"
				label="Description"
				placeholder="Add a description for this image"
				value={attachment.description}
				onValueChange={handleDescriptionChange} />
		</div>
	);
};

const AttachmentInput: React.FC<AttachmentInputProps> = ({
	index
}) => {
	const {
		isCodeAttachmentType,
		isImageAttachmentType,
		deleteAttachment,
		deleteAttachmentError,
	} = useQuestionFormStore(useShallow((state) => {
		const currentAttachment = state.question.attachments[index];
		return {
			isCodeAttachmentType: isCodeAttachment(currentAttachment),
			isImageAttachmentType: isImageAttachment(currentAttachment),
			deleteAttachment: () => {
				const newAttachments = [...state.question.attachments];
				newAttachments.splice(index, 1);
				state.setQuestion({
					...state.question,
					attachments: newAttachments
				});
			},
			deleteAttachmentError: (key: string) => state.deleteError(`attachment${index}-${key}`),
		};
	}));


	const handleDeleteAttachment = () => {
		deleteAttachmentError('title');
		deleteAttachmentError('code');
		deleteAttachmentError('language');
		deleteAttachment();
	};

	if (isCodeAttachmentType) {
		return (
			<CodeAttachmentInput
				index={index}
				handleDeleteAttachment={handleDeleteAttachment}
			/>
		);
	}
	if (isImageAttachmentType) {
		return (
			<ImageAttachmentInput
				index={index}
				handleDeleteAttachment={handleDeleteAttachment}
			/>
		);
	}

	return (
		<p>This attachment type is not supported</p>
	);
};

export default AttachmentInput;
