import { cn } from '@/lib/utils';
import { getTotalCartQuantity } from '@/redux/cartSlice';
import { getTotalWishListQuantity } from '@/redux/wishlistSlice';
import { authStore } from '@/store/auth.store';
import { Search } from 'lucide-react';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DropdownMenuUser from '../dropdown-menu';
import MaxWidth from '../max-width';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { navItems } from './items';
import MobileNav from './mobile-nav';

const Navbar = () => {
  const { pathname } = useLocation();
  const totalItems = useSelector(getTotalCartQuantity);
  const totalWishListItems = useSelector(getTotalWishListQuantity);
  const { isAuth, isLoading } = authStore();

  // const googleData = localStorage.getItem('googleToken');

  return (
    <header className="">
      <div className="py-3 bg-black text-white">
        <MaxWidth className="flex max-sm:flex-col gap-4 sm:items-center sm:text-center">
          <p className="flex items-center w-full font-normal sm:text-sm text-xs justify-center text-[#FAFAFA] gap-x-3">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <Link className="underline font-medium" to={'#'}>
              ShopNow
            </Link>
          </p>
          <select
            name="language"
            title="Language"
            defaultValue={'English'}
            className="text-white w-fit items-start bg-transparent font-normal text-sm"
          >
            <option className="bg-black text-white">English</option>
            <option className="bg-black text-white">French</option>
            <option className="bg-black text-white">Spanish</option>
          </select>
        </MaxWidth>
      </div>
      {/* Navbar */}
      <div className="pt-10 pb-4 border-b">
        <MaxWidth className="flex items-center justify-between">
          <h1 className="text-black text-2xl font-bold">
            <Link to={'/'}>Exclusive</Link>
          </h1>
          <div className="flex max-[805px]:hidden items-center gap-5">
            {navItems.map((item, i) => {
              const isActive = pathname === item.href;
              if (
                localStorage.getItem('accessToken') &&
                item.name === 'Sign Up'
              ) {
                return null;
              }
              return (
                <Button
                  className={cn(isActive && 'underline')}
                  variant={'link'}
                  key={i}
                  asChild
                >
                  <Link className="text-base font-normal" to={item.href}>
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </div>
          <div className="flex max-[805px]:hidden items-center gap-3">
            <div className="flex gap-7 justify-between items-center px-4 py-2 rounded-md bg-[#F5F5F5] text-zinc-400">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="border-none outline-none bg-transparent"
              />
              <Search className="text-black w-6 h-6" />
            </div>
            {pathname === '/auth' ? null : (
              <>
                <Link to={'/wishList'}>
                  <span className="text-xl cursor-pointer relative hover:text-red transition duration-200">
                    <CiHeart className="w-8 h-8" />

                    {totalWishListItems == 0 ? null : (
                      <span className="absolute bg-red text-white text-xs w-6 h-6 flex justify-center top-[-8px]  right-[-8px] items-center rounded-full ">
                        {totalWishListItems}
                      </span>
                    )}
                  </span>
                </Link>
                <Link to={'/cart'}>
                  <span className="text-xl cursor-pointer relative hover:text-red transition duration-200">
                    <PiShoppingCartThin className="w-8 h-8" />

                    {totalItems == 0 ? null : (
                      <span className="absolute bg-red text-white text-xs w-6 h-6 flex justify-center top-[-8px]  right-[-8px] items-center rounded-full ">
                        {totalItems}
                      </span>
                    )}
                  </span>
                </Link>
              </>
            )}

            {isLoading ? (
              <Skeleton className="w-8 h-8 rounded-full"></Skeleton>
            ) : isAuth ? (
              <DropdownMenuUser />
            ) : null}
          </div>
          {/* mobile menu */}
          <div className="min-[805px]:hidden">
            <MobileNav />
          </div>
        </MaxWidth>
      </div>
    </header>
  );
};

export default Navbar;
