'use client';

import { testUser, testUser2 } from '@/mockData/user';
import { User } from '@/types';

export class AuthService {
	user: User | null;
	config = {
		useWordwrapByDefault: false,
	};
	constructor() {
		this.user = JSON.parse(window.localStorage.getItem('user') || 'null');
	}

	get isTeacher() {
		return this.user?.type === 'teacher';
	}

	get isLoggedIn() {
		return !!this.user; // TODO: might need to rework once we have a real auth
	}
  
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	login = async (email: string = '', password: string = '') => {
		// temporary login
		if (email === 'abc@xyz.com') {
			this.user = testUser;
		} else {
			this.user = testUser2;
		}
		window.localStorage.setItem('user', JSON.stringify(this.user));
	};
	logout = async () => {
		this.user = null;
		window.localStorage.removeItem('user');
	};
}
