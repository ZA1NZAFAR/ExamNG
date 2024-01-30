import React from 'react';

type FileInputProps = {
	className?: string;
	fileNameValue?: string;
	placeholder?: string;
	isRequired?: boolean;
	color?: 'primary' | 'danger' | 'success' | 'warning' | 'default' | 'secondary';
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({
	className = '',
	fileNameValue = '',
	placeholder = '',
	isRequired = false,
	color = 'default',
	onChange = (_) => {}
}) => {
  
	const isEmpty = React.useMemo(() => {
		if (!isRequired) return false;
		return fileNameValue === undefined || fileNameValue === '';
	}, [isRequired, fileNameValue]);

	return (
	<div className={className}>
		<input
			type="file"
			placeholder={placeholder}
			className={`block w-full text-sm text-slate-500
				file:mr-4 file:py-2 file:px-4
				file:rounded-full file:border-0
				file:text-sm file:font-semibold
				${isEmpty ?
					'file:bg-danger-50 file:text-danger-700 hover:file:bg-danger-300' : 
					`file:bg-${color}-50 file:text-${color}-700 hover:file:bg-${color}-300`
			}}`}
			onChange={onChange}
		/>
		{isEmpty && <p className="text-red-500 text-sm">Image cannot be empty</p>}
	</div>
	);
}

export default FileInput;
