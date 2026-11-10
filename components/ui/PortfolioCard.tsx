import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PortfolioCardProps = {
  tag: string;
  caseStudyTitle: string;
  image: string;
  slug?: string;
};

export default function PortfolioCard({
  tag,
  caseStudyTitle,
  image,
  slug,
}: PortfolioCardProps) {
  return (
    <Link
      href={`/projects/${slug || '#'}`}
      className="rounded-[30px] h-[40vh] md:h-auto lg:h-auto flex flex-col justify-end overflow-hidden relative group w-full aspect-[3/4] md:aspect-[4/3] cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={caseStudyTitle}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        quality={100}
        loading="lazy"
      />


      {/* Gradient overlay */}
      <div
        className="absolute bottom-0 h-[45%] sm:h-[40%] md:h-[60%] lg:h-[40%] group-hover:h-[40%] group-hover:sm:h-[50%] group-hover:md:h-[70%] group-hover:lg:h-[40%] left-0 right-0 pointer-events-none transition-all duration-300"
        style={{
          borderRadius: '0 0 30px 30px',
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)',
        }}
      />

      {/* Content */}
      <div className="  z-10 px-4  md:px-4 md:py-0 lg:py-2 lg:px-10 transition-transform duration-300 group-hover:-translate-y-2">
        {/* Tag */}
        <div className="mb-3 inline-block">
          <span
            className="text-[10px] md:text-[10px] lg:text-sm text-white font-light inline-flex items-center justify-center px-4 py-1.5 md:py-2 lg:py-2.5 whitespace-nowrap"
            style={{
              borderRadius: '24px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: '#EBEBEB4D',
              background: 'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(253, 253, 253, 0.06) 0%, rgba(61, 61, 58, 0.3) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              width: 'fit-content',
              minWidth: 'fit-content',
              maxWidth: 'fit-content',
            }}
          >
            {tag}
          </span>
        </div>

        {/* Case Study Title */}
        <h3 className="text-sm sm:text-lg md:text-base lg:text-2xl text-white font-light tracking-tight">
          {caseStudyTitle}
        </h3>

        {/* Read the Full Case Study Link - Hidden by default, appears on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white w-fit">
          <span className="text-sm font-light  underline">Read the Full Case Study</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </div>
      </div>
    </Link>
  );
}
