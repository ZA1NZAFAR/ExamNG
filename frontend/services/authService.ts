import { testUser } from '@/mockData/user';
import { User } from '@/types/user';

export class AuthService {
  user: User | null;
  constructor() {
    this.user = testUser;
  }

  login = async (email: string = '', password: string = '') => {
    // temporary login
    this.user = testUser;
  }
  logout = async () => {
    this.user = null;
  }
}