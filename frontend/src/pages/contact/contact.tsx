import MaxWidth from '@/components/max-width';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 mb-20">
        <Link to={'/'} className="font-normal text-sm text-zinc-400">
          Home
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          Contact
        </span>
      </div>

      <div className="flex gap-5 max-md:flex-col">
        <div className="md:w-1/3 shadow-lg p-5 space-y-5">
          <div className="flex items-center gap-2">
            <img src="/call-icon.png" className="w-10 h-10" alt="" />
            <p className="font-medium text-base">Call To Us</p>
          </div>
          <p className="font-normal text-sm">
            We are available 24/7, 7 days a week.
          </p>
          <p className="font-normal text-sm">Phone: +8801611112222</p>
          <div className="h-0.5 bg-black w-full" />
          <div className="flex items-center gap-2">
            <img src="/icons-mail.png" className="w-10 h-10" alt="" />
            <p className="font-medium text-base">Write To US</p>
          </div>
          <p className="font-normal text-sm">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="font-normal text-sm">Emails: customer@exclusive.com</p>
        </div>
        <div className="w-full shadow-lg p-5 space-y-6">
          <div className="flex max-sm:flex-wrap items-center gap-5">
            <Input className="w-full bg-[#F5F5F5]" placeholder="Your Name" />
            <Input className="w-full bg-[#F5F5F5]" placeholder="Your Email" />
            <Input className="w-full bg-[#F5F5F5]" placeholder="Your Phone" />
          </div>
          <Textarea
            className="w-full bg-[#F5F5F5] min-h-[207px]"
            placeholder="Your Message"
          />
          <div className="flex justify-end">
            <Button size={'lg'} variant={'destructive'}>
              Send Massage
            </Button>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default Contact;
