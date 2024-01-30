import { testUser } from '@/mockData/user';
import { User } from '@/types';

export class AuthService {
	user: User | null;
	config = {
		useWordwrapByDefault: false,
	};
	constructor() {
		this.user = testUser;
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
		this.user = testUser;
	};
	logout = async () => {
		this.user = null;
	};
}
