import React from "react";
import Image from "next/image";

interface UserCardProps {
  name: string;
  position: string;
  avatar: string;
}

const UserCard = ({ name, position, avatar }: UserCardProps) => {
  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Profile Picture */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={128}
          height={128}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Name and Title */}
      <div className="flex flex-col">
        <span className="text-black font-normal text-sm md:text-base">
          {name}
        </span>
        <span className="text-gray-500 text-xs md:text-sm">
          {position}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
