import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = (props?: {
  variant?: 'default' | 'outline' | 'yellowGlow' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}) => {
  const { variant = 'default', size = 'default', className = '' } = props || {};
  
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95";
  
  const variants: Record<string, string> = {
    default: "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20 font-semibold",
    outline: "border border-amber-400/80 text-amber-300 bg-amber-400/10 hover:bg-amber-400 hover:text-slate-950 hover:shadow-lg hover:shadow-amber-400/30",
    yellowGlow: "border border-amber-400 text-amber-300 bg-amber-400/15 hover:bg-amber-400 hover:text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.35)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] font-medium",
    ghost: "text-slate-200 hover:text-white hover:bg-white/10",
    glass: "glass-card text-slate-100 hover:bg-white/15 border-white/20"
  };

  const sizes: Record<string, string> = {
    default: "h-11 px-6 py-2.5 text-sm",
    sm: "h-9 px-4 text-xs",
    lg: "h-13 px-8 text-base font-semibold",
    icon: "h-10 w-10 p-2"
  };

  return cn(base, variants[variant], sizes[size], className);
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'outline' | 'yellowGlow' | 'ghost' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
