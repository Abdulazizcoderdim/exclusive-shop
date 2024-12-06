import MaxWidth from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 mb-20">
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          Home
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          404 Error
        </span>
      </div>

      <div className="flex flex-col h-full space-y-10 items-center justify-center text-center">
        <h1 className="font-medium md:text-[110px] sm:text-5xl text-3xl">
          404 Not Found
        </h1>
        <p className="text-base font-normal">
          Your visited page not found. You may go home page.
        </p>
        <div>
          <Button variant={'destructive'} size={'lg'}>
            <Link to={'/'}>Back to home page</Link>
          </Button>
        </div>
      </div>
    </MaxWidth>
  );
};

export default NotFoundPage;
