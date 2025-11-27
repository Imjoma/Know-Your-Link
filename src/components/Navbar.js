"use client";

import { navigation } from "@/constant";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { removeSearchParam } from "@/utils";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdd = searchParams.get("addMeeting") === "true";

  const currentPath = pathname.split("/")[1] === "" ? "home" : pathname;

  return (
    <nav className="fixed bottom-0 z-50 w-full p-2 mx-auto -translate-x-1/2  bg-gradient-to-b from-transparent to-[#fff] dark:to-[#0a0a0a] left-1/2">
      <ul className="flex flex-row justify-between max-w-screen-sm mx-auto">
        {navigation.map((item, idx) => {
          const IconComponent = item.icon;
          const isHome = item.name === "Home" ? "/" : item.slug;
          const isPlus = item.name === "Add" ? "" : item.name;
          const isAddMeetingTrue = item.slug === "?addMeeting=true";
          const isCurrentPage = isAdd
            ? isAddMeetingTrue
            : item.slug === currentPath;

          return (
            <li key={item.id} className="flex-1 py-4 relative">
              {isAdd && item.name === "Add" && (
                <button
                  onClick={() =>
                    removeSearchParam("addMeeting", searchParams, router)
                  }
                  className={`absolute z-[100] top-0 left-0 w-full h-full`}
                ></button>
              )}

              <Link
                href={`${isHome}`}
                key={item.id}
                className={`${
                  !isCurrentPage && "text-[#aaaaaa]"
                } hover:text-[#EDEDED] flex flex-col items-center h-full gap-[2px] justify-center`}
              >
                <IconComponent
                  className={`
                    ${item.name !== "Add" ? "text-2xl" : "text-3xl"}
                    ${
                      isCurrentPage &&
                      `${
                        item.name !== "Add"
                          ? "translate-y-2"
                          : "-translate-y-2 rotate-45"
                      } scale-125  `
                    } duration-150 `}
                />

                <span
                  className={`${
                    isCurrentPage ? "translate-y-2 opacity-0" : "opacity-100"
                  } duration-150 font-sans text-[11px] font-medium`}
                >
                  {isPlus}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
