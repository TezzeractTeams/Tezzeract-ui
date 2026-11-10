"use client";

import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import ServiceItem from "./ServiceItem";

interface Service {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

interface ServiceSliderProps {
  services: Service[];
}

interface SliderRowProps {
  services: Service[];
  direction: "left" | "right";
  speed?: number;
}

// Individual row component with its own animation
function SliderRow({ services, direction, speed = 0.5 }: SliderRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Triplicate services for seamless infinite loop
  const duplicatedServices = [...services, ...services, ...services];

  // Calculate content width after layout
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    // Use requestAnimationFrame to ensure content is fully rendered
    const frameId = requestAnimationFrame(() => {
      if (contentRef.current) {
        const totalWidth = contentRef.current.scrollWidth;
        const calculatedWidth = totalWidth / 3;
        setSingleSetWidth(calculatedWidth);

        // Initialize position for right-scrolling rows
        if (direction === "right") {
          positionRef.current = calculatedWidth;
          // Set initial transform position
          contentRef.current.style.transform = `translateX(-${calculatedWidth}px)`;
        }

        setIsReady(true);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [direction, services]);

  // Animation loop
  useEffect(() => {
    if (!isReady || singleSetWidth === 0 || !contentRef.current) return;

    const animate = () => {
      if (!contentRef.current) return;

      if (direction === "left") {
        // Scroll left (items move right-to-left)
        positionRef.current += speed;

        // Seamless reset: subtract one set width when reaching the boundary
        if (positionRef.current >= singleSetWidth) {
          positionRef.current = positionRef.current - singleSetWidth;
        }
      } else {
        // Scroll right (items move left-to-right)
        positionRef.current -= speed;

        // Seamless reset: add one set width when reaching the start
        if (positionRef.current <= 0) {
          positionRef.current = positionRef.current + singleSetWidth;
        }
      }

      // Apply transform for smooth GPU-accelerated animation
      contentRef.current.style.transform = `translateX(-${positionRef.current}px)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, speed, isReady, singleSetWidth]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div
        ref={contentRef}
        className="flex gap-8 md:gap-10 whitespace-nowrap"
        style={{
          willChange: "transform",
          width: "fit-content",
        }}
      >
        {duplicatedServices.map((service, index) => (
          <div key={`${index}`} className="flex-shrink-0">
            <ServiceItem
              name={service.name}
              avatarSrc={service.avatarSrc}
              avatarAlt={service.avatarAlt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceSlider({ services }: ServiceSliderProps) {
  // Distribute services across 3 rows; ensure each row has enough items to scroll
  const rowSize = Math.max(2, Math.ceil(services.length / 3));
  const row1Services = services.slice(0, rowSize);
  const row2Services = services.slice(rowSize, rowSize * 2);
  const row3Services = services.slice(rowSize * 2);

  // If any row is empty or has too few items to scroll, use full list so it animates
  const minItemsToScroll = 2;
  const filledRow1 = row1Services.length >= minItemsToScroll ? row1Services : services;
  const filledRow2 = row2Services.length >= minItemsToScroll ? row2Services : services;
  const filledRow3 = row3Services.length >= minItemsToScroll ? row3Services : services;

  return (
    <div
      className="relative w-full overflow-hidden  md:pb-8"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
      }}
    >
      {/* 3 horizontal rows with alternating scroll directions and staggered vertical offsets */}
      <div className="flex flex-col pt-6 md:pt-10 lg:pt-0 md:gap-0 gap-0 lg:gap-6 items-center">
        {/* Row 1: Scroll Left - No offset */}
        <div className="w-full flex justify-center" style={{ transform: "translateY(0)" }}>
          <SliderRow services={filledRow1} direction="left" speed={0.5} />
        </div>

        {/* Row 2: Scroll Right - Slight offset */}
        <div className="w-full flex justify-center" style={{ transform: "translateY(8px)" }}>
          <SliderRow services={filledRow2} direction="right" speed={0.5} />
        </div>

        {/* Row 3: Scroll Left - More offset */}
        <div className="w-full pb-10 lg:pb-0 md:pb-4 flex justify-center" style={{ transform: "translateY(16px)" }}>
          <SliderRow services={filledRow3} direction="left" speed={0.5} />
        </div>
      </div>
    </div>
  );
}
