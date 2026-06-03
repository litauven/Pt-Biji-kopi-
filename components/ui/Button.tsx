import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils'; // I will create this lib

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'secondary' | 'accent';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    
    // Manual tailwind classes mapping for our new theme
    const variants = {
      default: 'bg-emerald-900 text-white hover:bg-emerald-900-light border border-transparent shadow-sm hover:shadow-md transition-all',
      secondary: 'bg-amber-500 text-white hover:bg-amber-500-dark border border-transparent shadow-sm hover:shadow-md transition-all',
      accent: 'bg-orange-600 text-white hover:bg-orange-600-dark border border-transparent shadow-sm hover:shadow-md transition-all',
      outline: 'border border-emerald-900/30 text-emerald-900 hover:bg-emerald-900 hover:text-white',
      ghost: 'hover:bg-gray-100 text-zinc-950 hover:text-emerald-900',
      link: 'text-emerald-900 underline-offset-4 hover:underline',
    };

    const sizes = {
      default: 'h-11 px-6 py-2 text-sm font-semibold tracking-wide',
      sm: 'h-9 rounded-md px-4 text-xs font-semibold tracking-wide',
      lg: 'h-14 rounded-md px-8 text-base font-bold tracking-wide',
      icon: 'h-11 w-11 flex justify-center items-center',
    };

    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const finalClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(props.children)) {
      return React.cloneElement(props.children as React.ReactElement<any>, {
        className: cn(finalClassName, (props.children.props as any).className),
        ref: ref,
      });
    }

    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
