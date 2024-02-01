import Dexie from 'dexie';

export class DexieService extends Dexie {

	constructor() {
		super('DexieService');
		this.version(1).stores({
			userConfig: 'id',
			answer: '++questionId',
			examInfo: '++examId,lastModifiedTimestamp'
		});
	}
}
