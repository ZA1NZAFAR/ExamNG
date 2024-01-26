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

console.log(Date.now());
console.log(new Date(Date.now() + 2 * (60 * 60 * 1000) ).getTime());
console.log('1706277833722 1706285033724');
	
const socioDE = {
	id: '3',
	startTimestamp: 1706277833722,
	endTimestamp:   1706285033724,
	description: 'Sociology DE',
	isValidated: true,
	isSubmitted: true,
	questions: [ '2', '4', '1' ]
};

type ExamData = typeof javaDE | typeof cyberDE | typeof socioDE;

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
	description: 'Sociology',
	imageURL: '',
	exams: new Map<string, ExamData>(
		[
			[socioDE.id, socioDE]
		]
	)
};

type ModuleData = typeof module1 | typeof module2 | typeof module3;

export const mockModules = new Map<string, ModuleData>(
	[
		[module1.code, module1],
		[module2.code, module2],
		[module3.code, module3]
	]
);
