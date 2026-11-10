"use client";

import React from "react";
import Image from "next/image";
import { cn } from "cn";

export interface TalentCardProps {
  imageSrc?: string;
  alt?: string;
  className?: string;
}

export default function TalentCard({
  imageSrc = "/talentImg.png",
  alt = "Talent",
  className = "",
}: TalentCardProps) {
  return (
    <div
      className={cn("relative md:h-[19vh] lg:h-[25vh] h-[25vh]", className)}
      style={{
        width: "14vw", // Approximately 220px at 1920px viewport

        minWidth: "180px", // Fallback for smaller screens
        minHeight: "180px", // Fallback for smaller screens
      }}
    >
      {/* Gradient border wrapper - outer div with gradient background */}
      <div
        className="absolute inset-0 rounded-[24px]"
        style={{
          background: "linear-gradient(226.72deg, rgba(0, 169, 238, 0.1) 9.34%, rgba(0, 55, 138, 0.1) 90.32%)",
        }}
      >
        {/* Inner content card with margin to create border effect */}
        <div
          className="absolute inset-[2px] rounded-[22px] overflow-hidden"
          style={{
            background: "linear-gradient(224.11deg, rgba(255, 255, 255, 0.3) 6.72%, rgba(153, 153, 153, 0.1) 92.37%)",
            backdropFilter: "blur(100px)",
            WebkitBackdropFilter: "blur(100px)",
          }}
        >
          {/* Talent Image */}
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover md:object-contain md:object-bottom"
              sizes="(max-width: 768px) 100px, 220px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
