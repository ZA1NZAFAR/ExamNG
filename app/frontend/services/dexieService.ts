import Dexie from 'dexie';

export class DexieService extends Dexie {

	constructor() {
		super('DexieService');
	}
}
