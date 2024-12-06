import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { getTotalWishListQuantity } from '@/redux/wishlistSlice';
import { Menu, Search } from 'lucide-react';
import { CiHeart } from 'react-icons/ci';
import { PiShoppingCartThin } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { navItems } from './items';
import { getTotalCartQuantity } from '@/redux/cartSlice';

const MobileNav = () => {
  const { pathname } = useLocation();
  const totalWishListItems = useSelector(getTotalWishListQuantity);
  const totalItems = useSelector(getTotalCartQuantity);

  return (
    <Sheet>
      <SheetTrigger>
        <Button size={'icon'} variant={'ghost'}>
          <Menu className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-black text-2xl font-bold">
              <Link to={'/'}>Exclusive</Link>
            </h1>
          </SheetTitle>
          <SheetDescription>
            <div className="flex flex-col">
              {navItems.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    className={cn('w-full', isActive && 'underline')}
                    variant={'ghost'}
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
          </SheetDescription>
          <div className="flex items-center flex-col justify-start gap-5">
            <div className="flex gap-7 justify-between items-center px-4 py-2 rounded-md bg-[#F5F5F5] text-zinc-400">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="border-none outline-none bg-transparent"
              />
              <Search className="text-black w-6 h-6" />
            </div>
            <div className="flex justify-start">
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
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
