import { cn } from '@/lib/utils';
import { addItem, deleteItem, moveAllToCart } from '@/redux/cartSlice';
import {
  clearWishList,
  deleteWishList,
  getTotalWishListQuantity,
} from '@/redux/wishlistSlice';
import { ProductType } from '@/type';
import { Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import JustForYou from '../just-you/just-for-you';
import MaxWidth from '../max-width';
import { Button } from '../ui/button';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart.cart);
  const totalWishListItems = useSelector(getTotalWishListQuantity);

  const wishlistItems = useSelector((state: any) => state.wishList.wishList);

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

  const handleDeleteWishList = (productId: string) => {
    dispatch(deleteWishList(productId));
  };

  const moveAllToBag = () => {
    dispatch(moveAllToCart(wishlistItems));
    dispatch(clearWishList());
    toast.success('All products added to cart');
  };

  return (
    <div>
      <MaxWidth className="py-20 space-y-5">
        <div className="flex justify-between gap-3">
          <p className="font-normal text-xl">Wishlist ({totalWishListItems})</p>
          <Button onClick={moveAllToBag} variant={'outline'} size={'lg'}>
            Move All To Bag
          </Button>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="py-5">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={30}
              className="min-h-[350px]"
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
              }}
            >
              {wishlistItems.map((product: any, i: number) => {
                const isInCart = cartItems.some(
                  (item: ProductType) => item._id === product._id
                );
                // ); // Mahsulot savatda ekanligini tekshirish
                // const isInWishList = wishlistItems.some(
                //   (item: ProductType) => item._id === product._id
                // );

                return (
                  <SwiperSlide key={i} className="min-h-[350px]">
                    <div className="h-full w-full space-y-3">
                      <div className="relative h-[270px] cursor-pointer rounded-md bg-[#F5F5F5] flex items-center justify-center">
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
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          <span
                            onClick={() => handleDeleteWishList(product._id)}
                            className="bg-white w-10 h-[34px] flex items-center justify-center cursor-pointer rounded-full text-black"
                          >
                            <Trash />
                          </span>
                        </div>

                        <button
                          onClick={() => handleCartToggle(product)}
                          title={isInCart ? 'Remove from cart' : 'Add to cart'}
                          className={cn(
                            'absolute transition-all duration-300 rounded-b-md cursor-pointer bottom-0 right-0 left-0 w-full bg-black text-white text-center py-2',
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
                          ${product.price.toString()}
                        </span>
                        {/* <span className="line-through font-medium text-base text-zinc-600">
                        ${product.price.originalPrice}
                      </span> */}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <p className="text-center">WishList Epmty</p>
        )}

        <JustForYou />
      </MaxWidth>
    </div>
  );
};

export default Wishlist;
