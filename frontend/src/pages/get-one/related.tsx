import { Skeleton } from '@/components/ui/skeleton';
import { valueCount } from '@/hooks/useCountStar';
import $axios from '@/http';
import { cn } from '@/lib/utils';
import { addItem, deleteItem } from '@/redux/cartSlice';
import { addToWishList, deleteWishList } from '@/redux/wishlistSlice';
import { authStore } from '@/store/auth.store';
import { ProductType } from '@/type';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Reletaed = ({ id }: { id: string | undefined }) => {
  const [todayProduct, setTodayProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = authStore();

  // Redux store'dan savatdagi mahsulotlarni olish
  const cartItems = useSelector((state: any) => state.cart.cart);
  // wishlistdagi ma'lumotlar
  const wishlistItems = useSelector((state: any) => state.wishList.wishList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_PUBLIC_API_URL + '/product/get-products'
        );
        if (!response.ok) {
          throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
        }
        const data: ProductType[] = await response
          .json()
          .then(data => data.reverse());
        const res = await $axios.get(`/product/get-product/${id}`);
        if (!res.data) return;
        const filterGamingProduct = data.filter((item: ProductType) => {
          return item.category === (res.data as ProductType).category;
        });
        setTodayProduct(filterGamingProduct);
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(todayProduct);

  const handleCartToggle = (product: ProductType) => {
    
    const isInCart = cartItems.some(
      (item: ProductType) => item._id === product._id
    );

    if (isInCart) {
      dispatch(deleteItem(product._id)); // Agar mahsulot savatda bo'lsa, olib tashlash
      toast.success('Product removed from cart');
    } else {
      dispatch(
        addItem({
          _id: product._id,
          name: product.name,
          price: product.price.currentPrice,
          quantity: 1,
          imageUrl: product.imageUrl,
        })
      );
      toast.success('Product added to cart');
    }
  };

  // wishlist add and delete
  const handleWishListToggle = (product: ProductType) => {
    
    const isInWishList = wishlistItems.some(
      (item: ProductType) => item._id === product._id
    );
    if (isInWishList) {
      dispatch(deleteWishList(product._id));
      toast.success('Product removed from wishlist');
    } else {
      dispatch(
        addToWishList({
          _id: product._id,
          name: product.name,
          price: product.price.currentPrice,
          quantity: 1,
          imageUrl: product.imageUrl,
        })
      );
      toast.success('Product added to wishlist');
    }
  };

  return (
    <div className="pt-24 space-y-14">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">Related Item</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
        className="min-h-[350px]"
      >
        {todayProduct.map((product, i) => {
          const isInCart = cartItems.some(
            (item: ProductType) => item._id === product._id
          ); // Mahsulot savatda ekanligini tekshirish
          const isInWishList = wishlistItems.some(
            (item: ProductType) => item._id === product._id
          );

          return !loading ? (
            <SwiperSlide key={i} className="min-h-[350px]">
              <div className="h-full w-full space-y-3">
                <div className="relative h-[270px] group cursor-pointer rounded-md bg-[#F5F5F5] flex items-center justify-center">
                  <div className="h-44 w-44">
                    <img
                      onClick={() => navigate(`/products/${product._id}`)}
                      src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                        product.imageUrl
                      }`}
                      className="object-contain h-full w-full"
                      alt="Product image"
                    />
                  </div>
                  {/* <span className="absolute top-3 left-3 bg-green-500 px-3 py-0.5 font-medium rounded-md text-white text-center">
                    new
                  </span> */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <span
                      onClick={() => handleWishListToggle(product)}
                      className="bg-white w-10 h-[34px] flex items-center justify-center cursor-pointer rounded-full text-black"
                    >
                      {isInWishList ? (
                        <BsHeartFill className="w-6 h-6 text-red" />
                      ) : (
                        <Heart className="w-6 h-6" />
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCartToggle(product)}
                    title={isInCart ? 'Remove from cart' : 'Add to cart'}
                    className={cn(
                      'absolute scale-0 group-hover:scale-100 transition-all duration-300 rounded-b-md cursor-pointer bottom-0 right-0 left-0 w-full bg-black text-white text-center py-2',
                      isInCart
                        ? 'bg-transparent border border-red text-red'
                        : ''
                    )}
                  >
                    <p className="text-center font-medium text-base">
                      {isInCart ? 'Remove from Cart' : 'Add To Cart'}
                    </p>
                  </button>
                </div>
                <p className="font-medium text-base">{product.name}</p>
                <div className="space-x-3">
                  <span className="font-medium text-base text-red">
                    ${product.price.currentPrice}
                  </span>
                  <span className="line-through font-medium text-base text-zinc-600">
                    ${product.price.originalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: Math.floor(product.ratings.value) },
                    (_, i) => (
                      <FaStar key={i} className="text-star" />
                    )
                  )}

                  {valueCount(product.ratings.value)}
                  <span className="font-medium text-base">
                    ({product.ratings.count})
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ) : (
            <div className="flex items-center gap-5">
              {todayProduct.map((_, i) => (
                <Skeleton key={i} className="w-[270px] h-[150px]" />
              ))}
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Reletaed;