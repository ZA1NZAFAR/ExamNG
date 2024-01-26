import { Answer } from '@/types';
import { DexieService } from './dexieService';
import { Table } from 'dexie';

type AnswerEntry = Answer & {
	questionId: string;
}

type ExamInfo = {
	examId: string;
	lastModifiedTimestamp: number;
}

export class LocalAnswerService extends DexieService {
	private _answer!: Table<AnswerEntry, number>;
	private _examInfo!: Table<ExamInfo, string>;
	private _examId: string | null | undefined = undefined;
	private _lastModifiedTimestamp: number | undefined = undefined;

	constructor() {
		super();
		this._answer = this.table('answer');
		this._examInfo = this.table('examInfo');
		this._examInfo.toCollection().first().then((examInfo) => {
			if (examInfo) {
				this._examId = examInfo.examId;
				this._lastModifiedTimestamp = examInfo.lastModifiedTimestamp;
			} else {
				this._examId = null;
			}
		});
	}

	async getAnswer(questionId: string) {
		if (!this._examId) {
			throw new Error('Exam is not initialized');
		}
		return await this._answer.where('questionId').equals(questionId).first();
	}

	async setAnswer(questionId: string, answer: Answer) {
		const lastModifiedTimestamp = Date.now();
		if (!this._examId) {
			throw new Error('Exam is not initialized');
		}
		this._lastModifiedTimestamp = lastModifiedTimestamp;
		await this._answer.put({
			questionId,
			...answer
		});
		await this._examInfo.toCollection().modify({
			examId: this._examId,
			lastModifiedTimestamp
		});
	}

	async getAllAnswers() {
		if (!this._examId) {
			throw new Error('Exam is not initialized');
		}
		return await this._answer.toArray();
	}
	
	get examId() {
		return this._examId;
	}

	get lastModifiedTimestamp() {
		return this._lastModifiedTimestamp;
	}

	async initializeAnswerSheet(examId: string) {
		const lastModifiedTimestamp = Date.now();
		this._examId = examId;
		this._lastModifiedTimestamp = lastModifiedTimestamp;
		await this._examInfo.clear();
		await this._examInfo.put({
			examId,
			lastModifiedTimestamp
		});
		await this._answer.clear();
	}
}
