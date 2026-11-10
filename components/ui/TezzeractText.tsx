import React from "react";
import { cn } from "cn";

export interface TezzeractTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "light" | "dark";
  children: React.ReactNode;
  as?: "span" | "p" | "div";
}

export const TezzeractText = React.forwardRef<HTMLElement, TezzeractTextProps>(
  ({ className, variant = "light", children, as: Component = "span", style, ...props }, ref) => {
    // Base styles
    const baseStyles = "font-sans font-normal not-italic text-[16px] leading-6 tracking-[-0.03em] align-middle";

    // Light variant - white color
    const lightColor = "text-white";

    // Dark variant - #555555 color
    const darkColor = "text-[#555555]";

    const colorStyle = variant === "dark" ? darkColor : lightColor;

    return (
      <Component
        // @ts-expect-error - Polymorphic component ref type limitation
        ref={ref}
        className={cn(baseStyles, colorStyle, className)}
        style={{
          verticalAlign: "middle",
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TezzeractText.displayName = "TezzeractText";

export default TezzeractText;
