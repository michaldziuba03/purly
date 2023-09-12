import * as React from 'react';

import { cn } from '../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const ColorPicker = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    function handleHex(hex: string) {
      if (!hex.startsWith('#')) {
        return '#000000';
      }

      if (hex.length === 4) {
        const [_, r, g, b] = hex;
        return `#${r}${r}${g}${g}${b}${b}`;
      }

      if (hex.length < 7) {
        return '#000000';
      }

      return hex;
    }

    return (
      <div
        className={cn(
          'group h-10 flex items-center border max-w-fit rounded',
          className
        )}
      >
        <div
          className="h-10 w-10 rounded-l"
          style={{
            backgroundColor: handleHex(props.value as string),
          }}
        >
          <input
            className="rounded-l cursor-pointer w-10 h-[inherit] border-transparent bg-inherit appearance-none"
            type="color"
            ref={ref}
            {...props}
            value={handleHex(props.value as string)}
          />
        </div>
        <input
          maxLength={7}
          className="h-full px-3 py-2 max-w-[150px]"
          {...props}
        />
      </div>
    );
  }
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
