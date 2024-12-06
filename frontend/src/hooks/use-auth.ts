import { AuthType } from '@/interfaces';
import { create } from 'zustand';

type AuthStore = {
  authState: AuthType;
  setAuth: (state: AuthType) => void;
};

export const useAuth = create<AuthStore>(set => ({
  authState: 'login',
  setAuth: state => set({ authState: state }),
}));

// type UserStore = {
//   userState: {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//     isActivated: boolean;
//   } | null;
//   setUser: (state: null | string) => void | null;
// };

// export const useUser = create<UserStore>(set => ({
//   userState: null,
//   setUser: state => set({ userState: state }),
// }));
