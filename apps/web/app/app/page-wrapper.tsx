import { cn } from '../../lib/utils';

export function PageWrapper({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('p-10 w-full h-full', className)} {...props}>
      {children}
    </div>
  );
}
