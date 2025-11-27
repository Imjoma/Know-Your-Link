import { actions } from "@/constant";
import Link from "next/link";

const ActionCards = () => {
  return (
    <div className="px-4 text-white">
      <ul className="grid gap-4 md:grid-cols-2 ">
        {actions.map((item, idx) => {
          const ActionIcon = item.icon;
          const isUnlock = [1];
          return (
            <li
              key={item.id}
              className={`${
                !isUnlock.includes(item.id) &&
                "grayscale pointer-events-none select-none"
              } hover:scale-[.98] duration-150  h-36 w-full relative rounded-xl overflow-hidden`}
              style={{ background: item.color }}
            >
              <Link href={`${item.slug}`}>
                <div className="flex flex-col justify-between w-full h-full p-4 bg-black bg-opacity-15">
                  <div
                    style={{ background: item.color }}
                    className="p-2 rounded-lg w-fit"
                  >
                    <span className="text-2xl">
                      <ActionIcon />
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm opacity-80">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 scale-[220%]  rotate-6 opacity-30 right-0 text-7xl">
                  <ActionIcon />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActionCards;
