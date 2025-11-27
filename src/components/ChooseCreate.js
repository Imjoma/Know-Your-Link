"use client";

import { removeSearchParam } from "@/utils";
import { useSearchParams, useRouter } from "next/navigation";
import ChooseCreateItems from "./Plus/ChooseCreateItems";

const ChooseCreate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdd = searchParams.get("addMeeting");

  const isParams = !isAdd || isAdd === "false";

  const modalVisibility = isParams
    ? "opacity-0 pointer-events-none"
    : "opacity-100";
  // const modalSlide = isParams ? "translate-y-[110%]" : "-translate-y-16";
  const modalSlide = isParams
    ? `translate-y-full ${modalVisibility}`
    : "-translate-y-24 sm:bottom-1/2";
  //flex justify-center sm:items-center items-end
  return (
    <>
      <div
        onClick={() => removeSearchParam("addMeeting", searchParams, router)}
        className={`${modalVisibility} fixed top-0  z-40 w-full p-6 h-screen max-w-screen-md -translate-x-1/2 left-1/2 bg-black/70 backdrop-blur-sm`}
      >
        <div className="w-full h-full text-black "></div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalSlide} sm:w-[500px] left-1/2 bottom-0 -translate-x-1/2 z-[45] sm:translate-y-1/2 text-black fixed transform transition-all duration-200 w-[calc(100%-48px)] bg-white rounded-xl`}
      >
        <ChooseCreateItems />
      </div>
    </>
  );
};

export default ChooseCreate;
