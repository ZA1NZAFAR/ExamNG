type UserConfig = {
	isWordwrapByDefault: boolean
}

export class UserService {
	private _window: Window | undefined;
	
	private _userConfig: UserConfig = {
		isWordwrapByDefault: false
	};
	
	private _setLocalStorage(key: string, value: string) {
		if (this._window !== undefined) {
			this._window.localStorage.setItem(key, value);
			return;
		}
		console.log('[WARNING] window is undefined');
	}
	constructor(windowParam?: Window) {
		if (windowParam !== undefined) {
			this._window = windowParam;
			this._userConfig.isWordwrapByDefault = this._window.localStorage.getItem('isWordwrapByDefault') === 'true';
		} else {
			console.log('[WARNING] window is undefined');
		}
	}

	get isWordwrapByDefault() {
		return this._userConfig.isWordwrapByDefault;
	}

	set isWordwrapByDefault(value: boolean) {
		this._userConfig.isWordwrapByDefault = value;
		this._setLocalStorage('iseWordwrapByDefault', value.toString());
	}
}
