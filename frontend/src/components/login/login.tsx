import { IUser } from '@/interfaces';
import { authSchema } from '@/lib/validation';
import { loginUser } from '@/service/user';
import { authStore } from '@/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setIsUser } = authStore();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    const info = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const res = await loginUser(info);
      if (!res) throw new Error('Login failed');

      setIsUser(res?.user as IUser);
      setIsAuth(true);
      localStorage.setItem('accessToken', res?.accessToken as string);

      toast.success('Login Successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-14 max-sm:px-5 mb-10 flex items-center max-md:justify-center md:justify-between">
      <div className="md:w-1/2 max-md:hidden">
        <img className="w-full h-full object-cover" src="/sign-up.png" alt="" />
      </div>
      <div className="md:w-1/2 flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex md:max-w-sm space-y-5 w-full flex-col text-center"
        >
          <h1 className="font-medium sm:text-4xl text-3xl w-fit">
            Log in to Exclusive
          </h1>
          <p className="font-normal text-base w-fit">
            Enter your details below
          </p>
          <div className="flex flex-col">
            <input
              {...form.register('email', { required: true })}
              className="border-b-2 border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder="Email"
            />
            {form.formState.errors.email && (
              <span className="text-red text-start text-xs">
                Email is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              {...form.register('password', { required: true })}
              className="border-b-2 border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="password"
              placeholder="Password"
            />
            {form.formState.errors.password && (
              <span className="text-red text-start text-xs">
                Password is required
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            {loading ? (
              <Button
                type="submit"
                className="flex items-center gap-1"
                variant={'destructive'}
                size={'lg'}
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </Button>
            ) : (
              <Button type="submit" variant={'destructive'} size={'lg'}>
                Log In
              </Button>
            )}
            <Button asChild variant={'link'}>
              <Link to={'#'} className="text-red font-normal text-base">
                Forgot Password?
              </Link>
            </Button>
          </div>

          {/* <Button
            onClick={() => login()}
            type="button"
            size={'lg'}
            className="flex items-center gap-3"
            variant={'outline'}
          >
            <img src="/g2.png" width={24} height={24} alt="" />
            <p className="text-black text-base font-normal">
              Sign in with Google
            </p>
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
