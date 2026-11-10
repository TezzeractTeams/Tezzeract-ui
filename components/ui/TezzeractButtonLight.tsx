import React from "react";
import { cn } from "cn";

export interface TezzeractButtonLightProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const TezzeractButtonLight = React.forwardRef<HTMLButtonElement, TezzeractButtonLightProps>(
  ({ className, fullWidth = false, children, style, ...props }, ref) => {
    // Base styles
    const baseStyles = "inline-flex cursor-pointer flex-row items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden whitespace-nowrap w-auto";

    // Text styles: Figtree, 500 weight, 14px, line-height 20px, letter-spacing 0%, center aligned
    const textStyles = "font-sans font-medium text-[14px] leading-5 tracking-normal text-center";

    // Layout and spacing (same padding as TezzeractButton)
    const layoutStyles = "h-10 px-6 py-2 rounded-xl";

    // Border
    const borderStyles = "border border-[#FFFFFF66]";

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    // Background gradient
    const backgroundGradient = "radial-gradient(64.46% 80% at 50.53% 0%, #FFFFFF 0%, rgba(255, 255, 255, 0.8) 100%)";

    // Text gradient
    const textGradient = "linear-gradient(90deg, #00A9EE 0%, #00378A 100%)";

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          textStyles,
          layoutStyles,
          borderStyles,
          widthStyle,
          className
        )}
        style={{
          background: backgroundGradient,
          ...style,
        }}
        {...props}
      >
        <div
          className="relative z-10 inline-flex items-center gap-2"
          style={{
            backgroundImage: textGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {children}
        </div>
      </button>
    );
  }
);

TezzeractButtonLight.displayName = "TezzeractButtonLight";

export default TezzeractButtonLight;
