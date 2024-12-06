export interface IUser {
  id: string;
  name: string;
  email: string;
  lastName: string;
  phoneNumber: string;
  isActivated: boolean;
  role: string;
  sub: string;
}

export type AuthType = 'register' | 'login' | 'logout';
