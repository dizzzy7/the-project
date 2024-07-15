import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';

export interface IconBadgeProps extends PropsWithChildren {
  text: string; // text that is attached to the icon badge
  className?: string;
}

const IconBadge = (props: IconBadgeProps) => (
  <figure
    className={cn(
      'w-24 h-24 my-0 border rounded p-3 inline-flex flex-col items-center',
      props.className
    )}
  >
    <div className="flex-shrink [&>svg]:h-12 [&>svg]:max-w-[70px]">
      {props.children}
    </div>
    <figcaption
      className={
        'text-md mt-1 text-center text-inherit tracking-widest flex-shrink-0'
      }
    >
      {props.text}
    </figcaption>
  </figure>
);

IconBadge.displayName = 'IconBadge';

export { IconBadge };
