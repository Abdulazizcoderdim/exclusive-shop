import { Label } from '@/components/ui/label';
import { IUser } from '@/interfaces';
import { cn } from '@/lib/utils';
import { editUserSchema } from '@/lib/validation';
import { editUser } from '@/service/user';
import { authStore } from '@/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import MaxWidth from '../max-width';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const MyAccount = () => {
  const { user, isLoading, setIsUser } = authStore();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      address: '',
      password: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
    },
  });

  async function onSubmit(values: z.infer<typeof editUserSchema>) {
    try {
      setLoading(true);
      if (!user.id) {
        return console.log('User not found');
      }
      let parol;
      if (
        values.password.newPassword.trim() ===
        values.password.confirmNewPassword.trim()
      ) {
        parol = values.password.confirmNewPassword;
      }
      console.log(values);
      const editInfo = {
        name: values.name,
        password: parol,
        lastName: values.lastName,
        email: values.email,
        address: values.address,
      };
      const res = await editUser(editInfo, user.id);

      if (!res) {
        throw new Error('User updating error!!');
      }

      setIsUser(res as IUser);
      toast.success('User updated successfully');
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MaxWidth className="py-20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Link to={'/'} className="font-normal text-sm text-zinc-400">
            Home
          </Link>{' '}
          /{' '}
          <span className="text-black font-normal text-sm cursor-pointer">
            My Account
          </span>
        </div>
        <p className="flex items-center font-normal gap-2 text-sm">
          Welcome!{' '}
          <span className="text-red">
            {' '}
            {isLoading ? (
              <Skeleton className="w-10 h-5 rounded-md"></Skeleton>
            ) : (
              user.name
            )}
          </span>
          <span>
            {user.lastName && (
              <span className="text-red"> {user.lastName}</span>
            )}
          </span>
        </p>
      </div>
      <div className="py-10 flex max-md:flex-col justify-between gap-10">
        <div className="md:w-1/3">
          <div className="space-y-5">
            <h1 className="font-medium text-base">Manage My Account</h1>
            <ul className="pl-5 space-y-2 text-zinc-400">
              <li
                className={cn(
                  'text-base cursor-pointer font-normal',
                  pathname === '/account' && 'text-red'
                )}
              >
                <Link to={'/account'}>My Profile</Link>
              </li>
              <li
                className={cn(
                  'text-base cursor-pointer font-normal',
                  pathname === '/address-book' && 'text-red'
                )}
              >
                <Link to={'/address-book'}>Address Book</Link>
              </li>
              <li
                className={cn(
                  'text-base cursor-pointer font-normal',
                  pathname === '/my-payment-options' && 'text-red'
                )}
              >
                <Link to={'/my-payment-options'}>My Payment Options</Link>
              </li>
            </ul>
            <h1 className="font-medium text-base">My Orders</h1>
            <ul className="pl-5 space-y-2 text-zinc-400">
              <li
                className={cn(
                  'text-base cursor-pointer font-normal',
                  pathname === '/my-returns' && 'text-red'
                )}
              >
                <Link to={'/my-returns'}>My Returns</Link>
              </li>
              <li
                className={cn(
                  'text-base cursor-pointer font-normal',
                  pathname === '/my-cancellations' && 'text-red'
                )}
              >
                <Link to={'/my-cancellations'}>My Cancellations</Link>
              </li>
            </ul>
            <h1 className="font-medium text-base">My WishList</h1>
          </div>
        </div>
        <div className="w-full shadow-lg px-10 py-5">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="font-medium text-xl text-red">Edit Your Profile</h1>
            <div className="flex max-md:flex-col items-center gap-10">
              <div className="space-y-1 w-full">
                <Label htmlFor="name">First Name</Label>
                <Input
                  {...form.register('name')}
                  placeholder={user.name}
                  type="text"
                  name="name"
                  id="name"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  {...form.register('lastName')}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex max-md:flex-col items-center gap-10">
              <div className="space-y-1 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...form.register('email')}
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="lastName">Address</Label>
                <Input
                  {...form.register('address')}
                  type="text"
                  name="address"
                  id="address"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="passwordChanges">Change Password</Label>
              <Input
                {...form.register('password.currentPassword')}
                type="password"
                id="passwordChanges"
                placeholder="Current Password"
              />
              <Input
                {...form.register('password.newPassword')}
                type="password"
                id="password"
                placeholder="New Password"
              />
              <Input
                {...form.register('password.confirmNewPassword')}
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant={'ghost'} size={'lg'}>
                Cancel
              </Button>
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
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MaxWidth>
  );
};

export default MyAccount;
