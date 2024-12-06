import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import $axios from '@/http';
import { IUser } from '@/interfaces';
import { authStore } from '@/store/auth.store';
import { CircleX, LogOut, ShoppingBag, Star, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';


const DropdownMenuUser = () => {
  const { setIsAuth, setIsUser } = authStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await $axios.post('/auth/logout');
      localStorage.removeItem('accessToken');
      setIsAuth(false);
      setIsUser({} as IUser);
      localStorage.removeItem('googleToken');
      googleLogout();
      navigate('/sign-up');
    } catch (error) {
      // @ts-ignore
      toast.error(error.response.data.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-8 h-8 cursor-pointer bg-red rounded-full text-white flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none bg-opacity-85 backdrop-blur-sm bg-zinc-500 text-white"
      >
        <DropdownMenuItem className="cursor-pointer">
          <Link className="flex items-center" to={'/account'}>
            <User className="w-4 h-4 mr-2" />
            Manage My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center cursor-pointer">
          <ShoppingBag className="w-4 h-4 mr-2" /> My Order
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CircleX className="w-4 h-4 mr-2" />
          My Cancellations
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Star className="w-4 h-4 mr-2" />
          My Reviews
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuUser;
