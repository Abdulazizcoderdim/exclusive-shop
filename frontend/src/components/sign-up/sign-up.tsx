import { IUser } from '@/interfaces';
import { registerSchema } from '@/lib/validation';
import { registerUser } from '@/service/user';
import { authStore } from '@/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setIsUser } = authStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', name: '', phoneNumber: '' },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const registerInfoUser = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const res = await registerUser(registerInfoUser);
      if (!res) throw new Error('Register failed');
      toast.success('Register successful');

      setIsUser(res?.user as IUser);
      setIsAuth(true);
      localStorage.setItem('accessToken', res?.accessToken as string);

      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
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
            Create an account
          </h1>
          <p className="font-normal text-base w-fit">
            Enter your details below
          </p>
          <div>
            <input
              {...form.register('name')}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder="Name"
            />
            {form.formState.errors.name && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.name.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...form.register('email')}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder="Email"
            />
            {form.formState.errors.email && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...form.register('phoneNumber')}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder="Phone Number"
            />
            {form.formState.errors.phoneNumber && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div>
            <input
              {...form.register('password')}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="password"
              placeholder="Password"
            />
            {form.formState.errors.password && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>
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
              Create Account
            </Button>
          )}
          {/* <Button
            type='button'
            size={'lg'}
            className="flex items-center gap-3"
            variant={'outline'}
          >
            <img src="/g2.png" width={24} height={24} alt="" />
            <p className="text-black text-base font-normal">
              Sign up with Google
            </p>
          </Button> */}
          <p className="flex items-center justify-center w-full gap-3">
            Already have an account?
            <Link to={'/login'} className="underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
