"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ServiceItemProps {
  name: string;
  avatarSrc: string;
  avatarAlt?: string;
}

export default function ServiceItem({ name, avatarSrc, avatarAlt }: ServiceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Service Item Container - Pill shape on hover */}
      <div
        className="flex items-center gap-3 md:gap-2 px-5 md:px-6 py-2.5 md:py-4 rounded-3xl transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: isHovered ? "rgba(135, 206, 250, 0.25)" : "transparent",
          backdropFilter: isHovered ? "blur(10px)" : "none",
          transform: isHovered ? "scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: isHovered ? "0 0px 12px rgba(0, 0, 0, 0.04)" : "none",
        }}
      >
        {/* Text */}
        <span
          className={`
            text-2xl md:text-2xl lg:text-4xl font-light  tracking-tighter  whitespace-nowrap transition-all duration-300 ease-in-out
            ${isHovered
              ? "text-white font-light"
              : "text-white font-light"
            }
          `}
        >
          {name}
        </span>

        {/* Arrow - smooth opacity transition */}
        <div
          className="flex items-center transition-opacity px-2 duration-300 ease-in-out"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          <Image
            src="/assets/Arrow.svg"
            alt="Arrow"
            width={34}
            height={15}
            className="w-auto h-3 md:h-"
          />
        </div>

        <div
          className={`
            relative w-8 h-8 md:w-10 md:h-10 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ease-in-out
            ${isHovered
              ? "ring-2 ring-white/30"
              : ""
            }
          `}
        >
          <Image
            src={avatarSrc}
            alt={avatarAlt || name}
            width={80}
            height={80}
            className={`
              object-cover w-full h-full transition-all duration-300 ease-in-out
              ${isHovered ? "opacity-100 scale-100" : "opacity-60"}
            `}
            quality={90}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
