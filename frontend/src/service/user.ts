import $axios from '@/http';
import { IUser } from '@/interfaces';
import { EditTypeUser, RegisterType } from '@/type';
import { toast } from 'sonner';

interface ResUser {
  user: {
    id: string;
    name: string;
    email: string;
    isActivated: boolean;
    role: 'admin' | 'user' | 'superadmin';
  };
  accessToken: string;
  refreshToken: string;
}

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await $axios.post('/auth/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 200) {
      throw new Error('Failed to login user');
    }

    return res.data as ResUser;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'An error occurred');
    console.log('login user error', error);
  }
};

export const registerUser = async (data: RegisterType) => {
  try {
    const res = await $axios.post('/auth/register', data);
    
    if (res.status !== 201) {
      throw new Error('Failed to register user');
    }

    return res.data as ResUser;
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data.message);
    console.log('register user error', error);
  }
};

export const editUser = async (data: EditTypeUser, userId: string) => {
  try {
    const res = await $axios.put(`/auth/edit-user/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 200) {
      throw new Error('Failed to edit user data');
    }

    return res.data as IUser;
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data.message);
    console.log('edit user error', error);
  }
};
