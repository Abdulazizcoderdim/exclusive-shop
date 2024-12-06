// import Swiper core and required modules
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const HomeSlider = () => {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 2000,
        // pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      speed={1000}
      className="min-h-[344px] h-full"
      modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      // onSwiper={swiper => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide className="bg-yellow-500 h-[344px]">
        <div className="h-full w-full bg-black flex justify-between px-5 py-4">
          <div className="w-1/2 text-white h-full flex flex-col justify-between sm:pt-10 pt-5 md:pl-10 pb-10">
            <div className="flex items-center gap-4">
              <img src="/iphone.png" alt="" className="w-[40px] h-[49px]" />
              <p className="font-normal text-base">iPhone 14 Series</p>
            </div>
            <p className="font-semibold lg:text-5xl text-3xl">
              Up to 10% off Voucher
            </p>
            <Link
              to={'#'}
              className="underline flex items-center gap-2 font-medium text-base"
            >
              Shop Now <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="/slider.png"
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-yellow-500 h-[344px]">
        <div className="h-full w-full bg-black flex justify-between px-5 py-4">
          <div className="w-1/2 text-white h-full flex flex-col justify-between sm:pt-10 pt-5 md:pl-10 pb-10">
            <div className="flex items-center gap-4">
              <img src="/iphone.png" alt="" className="w-[40px] h-[49px]" />
              <p className="font-normal text-base">iPhone 14 Series</p>
            </div>
            <p className="font-semibold lg:text-5xl text-3xl">
              Up to 10% off Voucher
            </p>
            <Link
              to={'#'}
              className="underline flex items-center gap-2 font-medium text-base"
            >
              Shop Now <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="/slider.png"
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="bg-yellow-500 h-[344px]">
        <div className="h-full w-full bg-black flex justify-between px-5 py-4">
          <div className="w-1/2 text-white h-full flex flex-col justify-between sm:pt-10 pt-5 md:pl-10 pb-10">
            <div className="flex items-center gap-4">
              <img src="/iphone.png" alt="" className="w-[40px] h-[49px]" />
              <p className="font-normal text-base">iPhone 14 Series</p>
            </div>
            <p className="font-semibold lg:text-5xl text-3xl">
              Up to 10% off Voucher
            </p>
            <Link
              to={'#'}
              className="underline flex items-center gap-2 font-medium text-base"
            >
              Shop Now <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="w-1/2">
            <img
              src="/slider.png"
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
