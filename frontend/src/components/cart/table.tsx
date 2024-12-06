import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  clearCart,
  deleteItem,
  getCart,
  updateQuantity,
} from '@/redux/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const TableCart = () => {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setLocalCart(prevCart =>
        prevCart.map(item =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleBlur = (id: string) => {
    const item = localCart.find(item => item._id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity }));
    }
  };

  console.log(localCart);

  return localCart.length > 0 ? (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localCart.map(item => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                <div className="flex relative items-center gap-2">
                  <img
                    className="object-contain w-[54px] h-[54px]"
                    src={`${import.meta.env.VITE_PUBLIC_IMAGE_URL}/${
                      item.imageUrl
                    }`}
                    alt=""
                  />
                  <p>{item.name}</p>
                  <img
                    onClick={() => handleDelete(item._id)}
                    src="/x.png"
                    className="w-5 rounded-full hover:scale-110 h-5 cursor-pointer absolute -left-2 -top-1"
                    alt=""
                  />
                </div>
              </TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <input
                  type="number"
                  placeholder="1"
                  min={1}
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item._id, parseInt(e.target.value, 10))
                  }
                  onBlur={() => handleBlur(item._id)}
                  className="max-w-[72px] w-full border rounded-md p-2"
                />
              </TableCell>
              <TableCell className="text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between gap-5 mt-5">
        <Button asChild variant={'outline'} size={'lg'}>
          <Link to={'/'}>Return To Shop</Link>
        </Button>
        <Button
          onClick={() => dispatch(clearCart())}
          variant={'outline'}
          size={'lg'}
        >
          Update Cart
        </Button>
      </div>
      <div className="flex justify-between max-md:flex-col gap-5 pb-10 mt-20">
        <div className="flex h-fit items-center gap-3">
          <Input placeholder="Coupon Code" />
          <Button variant="destructive">Apply Coupon</Button>
        </div>
        <div className="border space-y-4 rounded-md border-black p-5 md:max-w-[470px] w-full">
          <h3 className="font-medium text-xl">Cart Total</h3>
          <p className="flex justify-between items-center border-b pb-2">
            <span>Subtotal:</span>
            <span>
              $
              {localCart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </p>
          <p className="flex justify-between items-center border-b pb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Total:</span>
            <span>
              $
              {localCart.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </span>
          </p>
          <div className="flex justify-center">
            <Button asChild variant={'destructive'}>
              <Link to={'/checkout/cart-products'}>Procees to checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center">Cart empty</p>
  );
};

export default TableCart;
