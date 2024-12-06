import { cn } from '@/lib/utils';

const MaxWidth = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('max-w-[1170px] w-full mx-auto px-5', className)}>
      {children}
    </div>
  );
};

export default MaxWidth;
