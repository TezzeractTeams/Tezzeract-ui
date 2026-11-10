import React from "react";
import { cn } from "cn";

export interface TezzeractH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "light" | "dark";
  children: React.ReactNode;
}

export const TezzeractH1 = React.forwardRef<HTMLHeadingElement, TezzeractH1Props>(
  ({ className, variant = "light", children, style, ...props }, ref) => {
    // Mobile-first styles: base (mobile) then md: (desktop)
    const baseStyles = "text-[36px] leading-[42px] tracking-[-0.05em] text-center font-light bg-clip-text text-transparent md:text-[72px] md:leading-[84px] md:text-left";

    // Light variant gradient
    const lightGradient = "linear-gradient(257.31deg, #FFFFFF 16.02%, #D6D6D6 49.66%, #FFFFFF 83.98%)";

    // Dark variant gradient (adjusted for dark theme)
    const darkGradient = "linear-gradient(90deg, #27AAE1 0%, #1C75BC 100%)";

    const gradientStyle = variant === "dark" ? darkGradient : lightGradient;

    return (
      <h1
        ref={ref}
        className={cn(baseStyles, className)}
        style={{
          backgroundImage: gradientStyle,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "var(--font-manrope), sans-serif",
          ...style,
        }}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

TezzeractH1.displayName = "TezzeractH1";

export default TezzeractH1;
