const attachment1 = {
	language: 'javascript',
	title: 'helloworld.js',
	code: 'console.log("Hello World")'
};

type AttachmentData = typeof attachment1;

const question1 = {
	id: '1',
	statement: 'This is a MCQ',
	type: 'mcq',
	attachments: [] as AttachmentData[],
	coefficient: 1,
	options: [
		{
			statement: 'Option 1',
			isCorrectOption: true
		},
		{
			statement: 'Option 2',
			isCorrectOption: false
		},
		{
			statement: 'Option 3',
			isCorrectOption: false
		},
		{
			statement: 'Option 4',
			isCorrectOption: false
		}
	]
};

const question2 = {
	id: '2',
	statement: 'This is a MCQ',
	type: 'mcq',
	attachments: [] as AttachmentData[],
	coefficient: 1,
	options: [
		{
			statement: 'Option 1',
			isCorrectOption: true
		},
		{
			statement: 'Option 2',
			isCorrectOption: true
		},
		{
			statement: 'Option 3',
			isCorrectOption: false
		},
		{
			statement: 'Option 4',
			isCorrectOption: false
		}
	]
};



const question3 = {
	id: '3',
	statement: 'This is a text question',
	type: 'text',
	attachments: [attachment1],
	coefficient: 1,
};

const question4 = {
	id: '4',
	statement: 'This is a code question',
	type: 'code',
	attachments: [attachment1],
	coefficient: 1,
	defaultLanguage: 'javascript',
	initialCode:  'function hello() {\n' +
                '  console.log("Hello World");\n' +
                '}'
};

type QuestionData = typeof question1 | typeof question2 | typeof question3 | typeof question4;

export const mockQuestions = new Map<string, QuestionData>(
	[
		[question1.id, question1],
		[question2.id, question2],
		[question3.id, question3],
		[question4.id, question4]
	]
);
