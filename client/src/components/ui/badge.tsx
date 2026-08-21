import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "gold" | "glass";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-amber-400 text-slate-950 font-bold",
    secondary: "bg-slate-800 text-slate-200",
    outline: "border border-white/20 text-slate-200",
    gold: "border border-amber-400/80 bg-amber-400/20 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]",
    glass: "glass-card text-white border-white/20 backdrop-blur-md"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
