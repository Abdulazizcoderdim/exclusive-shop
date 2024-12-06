import MaxWidth from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { valueCount } from '@/hooks/useCountStar';
import $axios from '@/http';
import { cn } from '@/lib/utils';
import { addToWishList, deleteWishList } from '@/redux/wishlistSlice';
import { ProductType } from '@/type';
import { Heart, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Reletaed from './related';

const GetOne = () => {
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState<'S' | 'M' | 'L' | 'XL' | 'XS'>('S');
  const [quantitry, setQuantitry] = useState<number>(1);
  const { id } = useParams();
  const [oneProduct, setOneProduct] = useState<ProductType>();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>();

  // wishlistdagi ma'lumotlar
  const wishlistItems = useSelector((state: any) => state.wishList.wishList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const res = await $axios.get(`/product/get-product/${id}`);
        if (!res.data) return;
        setOneProduct(res.data as ProductType);
        // @ts-ignore
        setImage(res.data.imageUrl);
      } catch (error) {
        console.log('get one product errorrr', error);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [id]);

  console.log(oneProduct);

  const handleItemQuantityChange = (type: string) => {
    if (type === 'increase') {
      setQuantitry(quantitry + 1);
    } else if (type === 'decrease') {
      setQuantitry(quantitry - 1);
      if (quantitry <= 1) {
        setQuantitry(1);
      }
    }
  };

  // wishlist add and delete
  const handleWishListToggle = () => {
    const isInWishList = wishlistItems.some(
      (item: ProductType) => item._id === oneProduct?._id
    );
    if (isInWishList) {
      dispatch(deleteWishList(oneProduct?._id));
      toast.success('Product removed from wishlist');
    } else {
      dispatch(
        addToWishList({
          _id: oneProduct?._id,
          name: oneProduct?.name,
          price: oneProduct?.price.currentPrice,
          quantity: 1,
          imageUrl: oneProduct?.imageUrl,
        })
      );
      toast.success('Product added to wishlist');
    }
  };

  const isInWishList = wishlistItems.some(
    (item: ProductType) => item._id === oneProduct?._id
  );

  return (
    <div>
      <MaxWidth className="py-20">
        <div className="flex items-center gap-3 mb-20">
          <Link to={'/'} className="font-normal text-sm text-zinc-400">
            Account
          </Link>{' '}
          /{' '}
          <Link to={'/'} className="font-normal text-sm text-zinc-400">
            {oneProduct?.category}
          </Link>
          /
          <span className="text-black font-normal text-sm cursor-pointer">
            {oneProduct?.name}
          </span>
        </div>
        <div className="flex max-md:flex-col justify-between gap-5 min-h-[580px]">
          {loading ? (
            <div className="flex max-md:flex-col w-full gap-10">
              <div className="md:max-w-[170px] w-full flex md:flex-col gap-4">
                <div
                  onClick={() => setImage(oneProduct?.imageUrl2)}
                  className={cn(
                    'bg-[#F5F5F5] cursor-pointer border-blue-500 hover:border-2 sm:h-[138px] h-[70px] flex items-center justify-center p-3 rounded-md',
                    oneProduct?.imageUrl2 === image && 'border-2'
                  )}
                >
                  <img
                    className="object-contain h-full w-full"
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      oneProduct?.imageUrl2
                    }`}
                    alt=""
                  />
                </div>
                <div
                  onClick={() => setImage(oneProduct?.imageUrl3)}
                  className={cn(
                    'bg-[#F5F5F5] cursor-pointer border-blue-500 hover:border-2 sm:h-[138px] h-[70px] flex items-center justify-center p-3 rounded-md',
                    oneProduct?.imageUrl3 === image && 'border-2'
                  )}
                >
                  <img
                    className="object-contain h-full w-full"
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      oneProduct?.imageUrl3
                    }`}
                    alt=""
                  />
                </div>
                <div
                  onClick={() => setImage(oneProduct?.imageUrl4)}
                  className={cn(
                    'bg-[#F5F5F5] cursor-pointer border-blue-500 hover:border-2 sm:h-[138px] h-[70px] flex items-center justify-center p-3 rounded-md',
                    oneProduct?.imageUrl4 === image && 'border-2'
                  )}
                >
                  <img
                    className="object-contain h-full w-full"
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      oneProduct?.imageUrl4
                    }`}
                    alt=""
                  />
                </div>
                <div
                  onClick={() => setImage(oneProduct?.imageUrl5)}
                  className={cn(
                    'bg-[#F5F5F5] cursor-pointer border-blue-500 hover:border-2 sm:h-[138px] h-[70px] flex items-center justify-center p-3 rounded-md',
                    oneProduct?.imageUrl5 === image && 'border-2'
                  )}
                >
                  <img
                    className="object-contain h-full w-full"
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      oneProduct?.imageUrl5
                    }`}
                    alt=""
                  />
                </div>
              </div>
              <div className="h-full w-full p-5 rounded-md bg-[#F5F5F5]">
                <div className="sm:h-[550px] h-72">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${image}`}
                    className="object-contain h-full w-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 max-sm:flex-col">
              <div className="flex sm:flex-col gap-2">
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
              </div>
              <div className="h-full p-5 rounded-md">
                <Skeleton className="w-[500px] h-full" />
              </div>
            </div>
          )}
          <div className="space-y-4 flex flex-col justify-between md:w-1/3">
            <h1 className="font-semibold text-2xl">{oneProduct?.name}</h1>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.floor(oneProduct?.ratings.value as number) },
                (_, i) => (
                  <FaStar key={i} className="text-star" />
                )
              )}
              {valueCount(oneProduct?.ratings.value as number)}
              <p className="font-normal text-sm text-zinc-400">
                ({oneProduct?.ratings.count} Reviews)
              </p>
              |
              <p>
                {oneProduct?.inStock ? (
                  <span className="text-sm text-[#00FF66] font-normal">
                    In Stock
                  </span>
                ) : (
                  <span className="text-sm font-normal">Out of Stock</span>
                )}
              </p>
            </div>
            <p className="text-2xl font-normal">
              ${Number(oneProduct?.price.currentPrice) * quantitry}.00
            </p>
            <p className="font-normal text-sm">{oneProduct?.description}</p>
            <p className="h-0.5 w-full bg-zinc-600" />
            <div className="flex items-center gap-5">
              <p className="font-normal text-xl">Colours: </p>
              <div className="flex items-center gap-1">
                <input title="colors" type="radio" />
                <input title="colors" type="radio" />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <p className="font-normal text-xl">Size: </p>
              <div className="flex items-center gap-3">
                <button
                  className={cn(
                    'border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium',
                    sizes === 'XS' && 'bg-red text-white'
                  )}
                  onClick={() => setSizes('XS')}
                >
                  XS
                </button>
                <button
                  className={cn(
                    'border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium',
                    sizes === 'S' && 'bg-red text-white'
                  )}
                  onClick={() => setSizes('S')}
                >
                  S
                </button>
                <button
                  className={cn(
                    'border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium',
                    sizes === 'M' && 'bg-red text-white'
                  )}
                  onClick={() => setSizes('M')}
                >
                  M
                </button>
                <button
                  className={cn(
                    'border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium',
                    sizes === 'L' && 'bg-red text-white'
                  )}
                  onClick={() => setSizes('L')}
                >
                  L
                </button>
                <button
                  className={cn(
                    'border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium',
                    sizes === 'XL' && 'bg-red text-white'
                  )}
                  onClick={() => setSizes('XL')}
                >
                  XL
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-5">
              <div className="border rounded-md w-40 h-11 flex items-center justify-between">
                <button
                  onClick={() => handleItemQuantityChange('decrease')}
                  className="p-2 border-r hover:bg-red transition hover:text-white rounded-l-md"
                  title="minus"
                >
                  <Minus />
                </button>
                <span className="font-medium text-xl">{quantitry}</span>
                <button
                  onClick={() => handleItemQuantityChange('increase')}
                  className="p-2 border-l hover:bg-red transition hover:text-white rounded-r-md"
                  title="plus"
                >
                  <Plus />
                </button>
              </div>
              <Button asChild size={'lg'} variant={'destructive'}>
                <Link to={`/checkout/${oneProduct?._id}`}>Buy Now</Link>
              </Button>
              <Button
                onClick={() => handleWishListToggle()}
                size={'icon'}
                variant={'outline'}
              >
                {isInWishList ? (
                  <BsHeartFill className="w-6 h-6 text-red" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </Button>
            </div>
            <div className="space-y-3 border-2 border-zinc-600 rounded-md">
              <div className="p-2 flex items-center gap-2">
                <img src="/id.png" className="w-10 h-10" alt="" />
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-base">Free Delivery</p>
                  <Link className="font-medium text-xs underline" to={'#'}>
                    Enter your postal code for Delivery Availability
                  </Link>
                </div>
              </div>
              <p className="h-0.5 w-full bg-zinc-600" />
              <div className="p-2 flex items-center gap-2">
                <img src="/id2.png" className="w-10 h-10" alt="" />
                <div className="flex flex-col gap-3">
                  <p className="font-medium text-base">Return Delivery</p>
                  <Link className="font-medium text-xs " to={'#'}>
                    Free 30 Days Delivery Returns.
                    <span className="underline">Details</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sd */}
        <Reletaed id={id} />
      </MaxWidth>
    </div>
  );
};

export default GetOne;
