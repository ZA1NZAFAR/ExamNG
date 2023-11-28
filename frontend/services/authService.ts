'use client'

import { testUser } from '@/mockData/user';
import { User } from '@/types/user';
import React from 'react';

class AuthService {
  private static _instance: AuthService;
  static get instance() {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }
    return AuthService._instance;
  }
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

export const AuthContext = React.createContext<AuthService>(AuthService.instance);