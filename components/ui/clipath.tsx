import React from 'react';

function ClipPathImage() {
  return (
    <>
      {/* Hidden SVG with clip path definition */}
      <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
        <defs>
          <clipPath id="custom-1768979813052" clipPathUnits="objectBoundingBox">
            <path
              d="M442.106 0.0102539C443.236 -0.0166796"
              fill="black"
            />
          </clipPath>
        </defs>

      </svg>

      {/* Image with clip path applied */}
      <figure style={{ clipPath: 'url(#custom-1768979813052)' }} className="">
        <img
          src="your-image-url.jpg"
          alt="Description"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
    </>
  );
}

export default ClipPathImage;
