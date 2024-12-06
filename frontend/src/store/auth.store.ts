import { IUser } from '@/interfaces';
import { create } from 'zustand';

type AuthStoreType = {
  isLoading: boolean;
  isAuth: boolean;
  user: IUser;
  setIsUser: (user: IUser) => void;
  setLoading: (bool: boolean) => void;
  setIsAuth: (bool: boolean) => void;
};

export const authStore = create<AuthStoreType>(set => ({
  isLoading: false,
  isAuth: false,
  user: {} as IUser,
  setIsUser: (user: IUser) => set({ user }),
  setLoading: (bool: boolean) => set({ isLoading: bool }),
  setIsAuth: (bool: boolean) => set({ isAuth: bool }),
}));
