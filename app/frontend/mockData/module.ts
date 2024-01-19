import javaEE from '@/resources/img/java_ee.png';
import cybersecurity from '@/resources/img/cybersecurity.jpg';

const javaDE = {
	id: '1',
	startTimestamp: new Date('2023-06-12T12:00:00').getTime(),
	endTimestamp: new Date('2023-06-12T15:00:00').getTime(),
	description: 'Java EE DE',
	isValidated: false,
	isSubmitted: false,
	questions: [ '1', '2', '3' ]
};

const cyberDE = {
	id: '2',
	startTimestamp: new Date('2023-12-05T08:00:00').getTime(),
	endTimestamp: new Date('2023-12-05T10:30:00').getTime(),
	description: 'Cybersecurity DE',
	isValidated: false,
	isSubmitted: true,
	questions: [ '2', '3', '4' ]
};

const cSharpDE = {
	id: '3',
	startTimestamp: new Date('2023-12-20T10:00:00').getTime(),
	endTimestamp: new Date('2023-12-20T12:30:00').getTime(),
	description: 'C# DE',
	isValidated: true,
	isSubmitted: true,
	questions: [ '2', '3', '4' ]
};

const cPlusPlusDE = {
	id: '4',
	startTimestamp: new Date('2023-12-22T08:00:00').getTime(),
	endTimestamp: new Date('2023-12-22T11:00:00').getTime(),
	description: 'C++ DE',
	isValidated: true,
	isSubmitted: true,
	questions: [ '2', '3', '4' ]
};

const socioDE = {
	id: '5',
	startTimestamp: new Date('2024-03-15T09:00:00').getTime(),
	endTimestamp: new Date('2024-03-15T11:00:00').getTime(),
	description: 'Sociology DE',
	isValidated: true,
	isSubmitted: true,
	questions: [ '2', '4', '1' ]
};

const politicalSciencesDE = {
	id: '6',
	startTimestamp: new Date('2024-03-10T08:00:00').getTime(),
	endTimestamp: new Date('2024-03-20T10:00:00').getTime(),
	description: 'Political Sciences DE',
	isValidated: true,
	isSubmitted: true,
	questions: [ '2', '4', '1' ]
};

type ExamData = typeof javaDE | typeof cyberDE | typeof cSharpDE | typeof cPlusPlusDE | typeof socioDE | typeof politicalSciencesDE;

const module1 = {
	code: 'AFN111',
	description: 'Java JEE',
	imageURL: javaEE.src,
	exams: new Map<string, ExamData>(
		[
			[javaDE.id, javaDE]
		]
	)
};

const module2 = { 
	code: 'AFN112',
	description: 'Cybersecurity',
	imageURL: cybersecurity.src,
	exams: new Map<string, ExamData>(
		[
			[cyberDE.id, cyberDE]
		]
	)
};

const module3 = { 
	code: 'AFN113',
	description: 'C#',
	imageURL: '',
	exams: new Map<string, ExamData>(
		[
			[cSharpDE.id, cSharpDE]
		]
	)
};

const module4 = { 
	code: 'AFN114',
	description: 'C++',
	imageURL: '',
	exams: new Map<string, ExamData>(
		[
			[cPlusPlusDE.id, cPlusPlusDE]
		]
	)
};

const module5 = {
	code: 'AFN115',
	description: 'Sociology',
	imageURL: '',
	exams: new Map<string, ExamData>(
		[
			[socioDE.id, socioDE]
		]
	)
};

const module6 = {
	code: 'AFN116',
	description: 'Political Sciences',
	imageURL: '',
	exams: new Map<string, ExamData>(
		[
			[politicalSciencesDE.id, politicalSciencesDE]
		]
	)
};

type ModuleData = typeof module1 | typeof module2 | typeof module3 | typeof module4 | typeof module5 | typeof module6;

export const mockModules = new Map<string, ModuleData>(
	[
		[module1.code, module1],
		[module2.code, module2],
		[module3.code, module3],
		[module4.code, module4],
		[module5.code, module5],
		[module6.code, module6]
	]
);
