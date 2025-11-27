"use client";

import Image from "next/image";

import { TbLink } from "react-icons/tb";
import { TbCopy } from "react-icons/tb";
import { TbCalendarStats } from "react-icons/tb";
import { TbDotsVertical } from "react-icons/tb";

const MeetingItems = ({ item, setOption }) => {
  return (
    <div className="space-y-4 overflow-hidden">
      <header className="relative pr-8 ">
        <div className="text-lg truncate">{item.subject}</div>
        <div className="flex flex-row items-center gap-1 text-sm select-none w-fit opacity-60">
          <span className="text-lg select-none -translate-y-[1px]">
            <TbCalendarStats />
          </span>
          <span className="px-[2px]">•</span>
          <div className="max-w-[280px] w-fit truncate">{item.schedule}</div>
        </div>

        <button
          onClick={() => setOption(item)}
          className="absolute top-0 right-0 p-1 text-xl hover:opacity-60 "
        >
          <TbDotsVertical />
        </button>
      </header>

      <div className="flex flex-col ">
        {/* Guest */}
        <div className="flex flex-row items-center gap-2 py-1 text-sm">
          <Image
            width={32}
            height={32}
            alt={item.guest + "photo"}
            src={
              "https://lh3.googleusercontent.com/a/default-user=s64-p-k-rw-no"
            }
            className="w-8 h-8 bg-gray-800 rounded-full"
          />
          <div className="truncate">{item.guest}</div>
        </div>
        {/* Portal */}
        <div className="flex flex-row gap-5 py-1 ml-4">
          <div className="w-[1px] bg-white bg-opacity-20"></div>
          <div className="space-y-2 text-sm ">
            <div className="flex flex-row items-center gap-1 px-2 py-1 border border-blue-800 rounded-full w-fit max-w-[250px] bg-blue-950">
              <span className="text-lg select-none">
                <TbLink />
              </span>
              <div className="max-w-[250px] w-fit truncate ">{item.link}</div>
            </div>
            <div className="flex flex-row items-center gap-1 px-2 py-1 border border-green-800 rounded-full w-fit max-w-[250px] bg-green-950">
              <span className="text-lg select-none">
                <TbCopy />
              </span>
              <div className="max-w-[250px] w-fit truncate ">{item.code}</div>
            </div>
          </div>
        </div>
        {/* Onboard */}
        <div className="flex flex-row items-center gap-2 py-1 text-sm w-fit">
          <Image
            width={32}
            height={32}
            alt={item.creator + " photo"}
            src={
              "https://avatars.githubusercontent.com/u/33196540?s=400&u=5b95cf8b538160d1f2d032b9343cea9f69698cd8&v=4"
            }
            className="w-8 h-8 bg-gray-800 rounded-full"
          />
          <div className="truncate w-80">{item.creator}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingItems;
