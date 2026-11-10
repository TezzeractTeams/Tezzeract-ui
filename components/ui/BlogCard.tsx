import React from "react";
import Image from "next/image";
import Link from "next/link";
import UserCard from "./UserCard";

interface BlogCardProps {
  postImage: string;
  postTitle: string;
  tag?: string;
  slug: string;
  author: {
    name: string;
    position: string;
    avatar: string;
  };
}

const BlogCard = ({ postImage, postTitle, tag, slug, author }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="block h-full" target="_blank" rel="noopener noreferrer">
      <div className="relative flex flex-col h-full rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9F9F9' }}>
        {/* Image area - at the top */}
        <div className="relative bg-white h-[265px] flex items-center rounded-3xl justify-center overflow-hidden aspect-square">
          <Image
            src={postImage}
            alt={postTitle}
            width={600}
            height={600}
            className="object-cover w-full h-full"
            unoptimized={postImage.startsWith('http://localhost')}
          />
          {/* Tag overlay - bottom left */}
          <div className="absolute bottom-4 left-4 z-10">
            <span
              className="text-[12px] md:text-[10px] lg:text-sm text-white font-light inline-block px-4 py-2 whitespace-nowrap"
              style={{
                borderRadius: '24px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#EBEBEB4D',
                background: 'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(253, 253, 253, 0.06) 0%, rgba(61, 61, 58, 0.3) 100%)',
                backdropFilter: 'blur(200px)',
                WebkitBackdropFilter: 'blur(200px)',
                width: 'fit-content',
                minWidth: 'fit-content',
                maxWidth: 'fit-content',
              }}
            >
              {tag || 'Article'}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h2 className="text-[#340E0E] text-[20px] md:text-2xl font-light mb-3 leading-tight">
              {postTitle}
            </h2>
          </div>

          <div>
            {/* User Card */}
            <UserCard
              name={author.name}
              position={author.position}
              avatar={author.avatar}
            />
          </div>

        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
