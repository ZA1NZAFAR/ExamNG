import { Table } from 'dexie';
import { DexieService } from './dexieService';

type UserConfig = {
	id: number;
	isWordwrapByDefault: boolean;
}

const defaultUserConfig: UserConfig = {
	id: 1,
	isWordwrapByDefault: false
} as const;

type UserConfigKey = keyof UserConfig;

export class UserService extends DexieService {
	private _userConfig!: Table<UserConfig, number>;
	
	constructor() {
		super();
		this.version(1).stores({
			userConfig: '++id'
		});
		this._userConfig = this.table('userConfig');
		this._userConfig.get(1).then((config) => {
			if (!config) {
				this._userConfig.add(defaultUserConfig);
			}
		});
	}

	async getUserConfig<T extends UserConfigKey> (key: T) {
		const configs = await this._userConfig.get(1);
		if (configs) {
			return configs[key];
		}
		return defaultUserConfig[key];
	}

	async setUserConfig<T extends UserConfigKey> (key: T, value: UserConfig[T]) {
		await this._userConfig.where('id').equals(1).modify({ [key]: value });
	}

	async resetConfig() {
		await this._userConfig.put(defaultUserConfig);
	}
}
