import { Link } from 'react-router-dom';
import MaxWidth from '../max-width';
import TableCart from './table';

const Cart = () => {
  return (
    <div>
      <MaxWidth className="py-20">
        <div className="flex items-center gap-3">
          <Link to={'/'} className="font-normal text-sm text-zinc-400">
            Home
          </Link>{' '}
          /{' '}
          <span className="text-black font-normal text-sm cursor-pointer">
            Cart
          </span>
        </div>

        <div className="py-10">
          <TableCart />
        </div>
      </MaxWidth>
    </div>
  );
};

export default Cart;
