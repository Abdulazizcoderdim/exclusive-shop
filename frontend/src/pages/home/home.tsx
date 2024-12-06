import Categories from '@/components/category/categories';
import Featured from '@/components/featured/featured';
import MaxWidth from '@/components/max-width';
import ThisMonth from '@/components/month/this-month';
import OurProducts from '@/components/our_products/our-products';
import TimeCategories from '@/components/time-categories';
import TodayProduct from "@/components/today's/today-product";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import HomeSlider from './home-slider';
import { category } from './items';

const Home = () => {
  const [podCategory, setPodCategory] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  return (
    <MaxWidth>
      <div className="flex mb-16">
        <div className="max-[805px]:hidden w-1/3 pt-7 pr-2 border-r">
          <div className="flex flex-col">
            {category.map((item, i) => (
              <>
                <Button
                  onClick={() => {
                    setIndex(i);
                    setPodCategory(prev => !prev);
                  }}
                  variant={'ghost'}
                  key={i}
                  className="flex text-black items-center cursor-pointer justify-between"
                >
                  <p className="font-normal text-base">{item.name}</p>
                  <p
                    className={cn(
                      'transition-all duration-300',
                      podCategory && i === index && 'rotate-90'
                    )}
                  >
                    {item.icon && <item.icon />}
                  </p>
                </Button>
                {podCategory && i === index && (
                  <div className="pl-5">
                    {category[index].subcategories?.map((sub, i) => (
                      <Button
                        variant={'link'}
                        key={i}
                        className="flex text-black items-center cursor-pointer justify-between"
                      >
                        <p className="font-normal text-sm">{sub}</p>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="max-[805px]:w-full xl:max-w-[892px] lg:max-w-3xl min-[805px]:max-w-xl w-full min-[805px]:px-7 h-full pt-7">
          <HomeSlider />
        </div>
      </div>
      {/* today's product */}
      <TodayProduct />
      {/* category */}
      <Categories />
      {/* this month */}
      <ThisMonth />
      {/* categories */}
      <div className="sm:mt-20 max-sm:relative mt-10 bg-black sm:p-10 max-sm:py-14 p-2.5">
        <div className="flex justify-between items-center">
          <div className="sm:w-1/2 z-10 sm:space-y-8 space-y-5">
            <h3 className="font-semibold text-base text-[#00FF66]">
              Categories
            </h3>
            <p className="font-semibold md:text-5xl sm:text-3xl text-xl text-white">
              Enhance Your Music Experience
            </p>
            <div className="flex items-center">
              <TimeCategories daysToCount={4} />
            </div>
            <Button variant={'ghost'} className="bg-[#00FF66] text-white px-7">
              Buy Now!
            </Button>
          </div>
          <div className="sm:w-1/2 max-sm:absolute ">
            <img src="11.png" className="sahdow-image object-cover" alt="" />
          </div>
        </div>
      </div>
      {/* our products */}
      <OurProducts />
      {/* Featured */}
      <Featured />

      <div className="sm:py-28 py-10 flex justify-center items-center">
        <div className="flex max-sm:flex-col items-center gap-16 text-black">
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon1.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              FREE AND FAST DELIVERY
            </p>
            <p className="font-normal text-sm">
              Free delivery for all orders over $140
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon2.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              24/7 CUSTOMER SERVICE
            </p>
            <p className="font-normal text-sm">
              Friendly 24/7 customer support
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon3.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              MONEY BACK GUARANTEE
            </p>
            <p className="font-normal text-sm">We reurn money within 30 days</p>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default Home;
