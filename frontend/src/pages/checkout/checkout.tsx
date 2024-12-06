import MaxWidth from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import $axios from '@/http';
import { billingSchema } from '@/lib/validation';
import { getCart } from '@/redux/cartSlice';
import { ProductType } from '@/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';

type BillingFormValues = z.infer<typeof billingSchema>;

const Checkout = () => {
  const cart = useSelector(getCart);
  const [buyProducts, setbuyProducts] = useState<ProductType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await $axios.get(`/product/get-product/${id}`);
        if (!res.data) return;
        setbuyProducts([res.data as ProductType]); // buyProducts ni massivga o'rab qo'yasiz
        // @ts-ignore
        setImage(res.data.imageUrl);
      } catch (error) {
        console.log('get one product errorrr', error);
      }
    };
    fetchData();
  }, [id]);
  console.log(buyProducts);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const mainPrice = buyProducts.reduce(
    (sum, item) => sum + item.price.currentPrice * 1,
    0
  );

  const onSubmit = (data: BillingFormValues) => {
    console.log(data);
  };

  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 flex-wrap">
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          Account
        </Link>
        /
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          My Account
        </Link>
        /
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          Product
        </Link>
        /
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          View Cart
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          CheckOut
        </span>
      </div>
      <h1 className="font-medium text-4xl">Billing Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 max-md:flex-col justify-between items-center"
      >
        <div className="md:max-w-[470px] w-full space-y-2">
          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="FirstName">
              First Name <span className="text-red">*</span>
            </Label>
            <Input
              {...register('firstName')}
              className="bg-[#F5F5F5]"
              type="text"
              id="FirstName"
            />
            {errors.firstName && (
              <span className="text-red text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              {...register('companyName')}
              className="bg-[#F5F5F5]"
              type="text"
              id="companyName"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center">
              Address <span className="text-red">*</span>
            </Label>
            <Input
              {...register('address')}
              className="bg-[#F5F5F5]"
              type="text"
              id="address"
            />
            {errors.address && (
              <span className="text-red text-xs">{errors.address.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="townCity">
              Town/City <span className="text-red">*</span>
            </Label>
            <Input
              {...register('city')}
              className="bg-[#F5F5F5]"
              type="text"
              id="townCity"
            />
            {errors.city && (
              <span className="text-red text-xs">{errors.city.message}</span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="phoneNumber">
              Phone Number <span className="text-red">*</span>
            </Label>
            <Input
              {...register('phoneNumber')}
              className="bg-[#F5F5F5]"
              type="text"
              id="phoneNumber"
            />
            {errors.phoneNumber && (
              <span className="text-red text-xs">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="emailAddress">
              Email Address <span className="text-red">*</span>
            </Label>
            <Input
              {...register('email')}
              className="bg-[#F5F5F5]"
              type="text"
              id="emailAddress"
            />
            {errors.email && (
              <span className="text-red text-xs">{errors.email.message}</span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox />{' '}
            <p className="text-base font-normal">
              Save this information for faster check-out next time
            </p>
          </div>
        </div>
        <div className="space-y-3 max-md:w-full">
          <div className="md:w-[422px] max-md:w-full space-y-3">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center w-full justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      item.imageUrl
                    }`}
                    className="object-contain w-[54px] h-[54px]"
                    alt=""
                  />
                  <p className="font-normal text-base">{item.name}</p>
                </div>
                <p className="font-normal text-base">${item.price}</p>
              </div>
            ))}
            {buyProducts.map((item, i) => (
              <div key={i} className="flex items-center w-full justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      item.imageUrl
                    }`}
                    className="object-contain w-[54px] h-[54px]"
                    alt=""
                  />
                  <p className="font-normal text-base">{item.name}</p>
                </div>
                <p className="font-normal text-base">
                  ${item.price.currentPrice}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between border-b pb-3 border-black">
              <p className="font-normal text-base">Subtotal:</p>
              <p className="font-normal text-base">${totalPrice + mainPrice}</p>
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-black">
              <p className="font-normal text-base">Shipping:</p>
              <p className="font-normal text-base">Free</p>
            </div>
            <div className="flex items-center justify-between ">
              <p className="font-normal text-base">Total:</p>
              <p className="font-normal text-base">${totalPrice + mainPrice}</p>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <input
                  title="payment"
                  {...register('paymentMethod')}
                  type="radio"
                  value="bank"
                />
                <p>Bank</p>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/pay.png"
                  className="w-[42px] h-[28px] object-contain"
                  alt=""
                />
                <img
                  src="/pay2.png"
                  className="w-[42px] h-[28px] object-contain"
                  alt=""
                />
                <img
                  src="/pay3.png"
                  className="w-[42px] h-[28px] object-contain"
                  alt=""
                />
                <img
                  src="/pay4.png"
                  className="w-[42px] h-[28px] object-contain"
                  alt=""
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                value="cash"
                {...register('paymentMethod')}
                type="radio"
                title="payment"
              />
              <p>Cash on delivery</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Input {...register('couponCode')} placeholder="Coupon Code" />
            <Button type="button" variant={'destructive'} size={'lg'}>
              Apply Coupon
            </Button>
          </div>
          <div className="flex justify-start">
            <Button type="submit" variant={'destructive'} size={'lg'}>
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </MaxWidth>
  );
};

export default Checkout;
