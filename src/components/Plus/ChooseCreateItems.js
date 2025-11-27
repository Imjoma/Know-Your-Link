import Link from "next/link";

import { chooseCreateItems } from "@/constant";
import { removeSearchParam } from "@/utils";
import { usePathname, useRouter } from "next/navigation";

import { TbPlus } from "react-icons/tb";

const ChooseCreateItems = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRemoveModal = () => {
    removeSearchParam("addMeeting", pathname, router);
  };
  return (
    <div className="pt-6 pb-4">
      <div className="flex flex-row justify-between">
        <h4 className="px-6 pb-4 text-lg font-semibold">Create New</h4>
        <button onClick={handleRemoveModal} className="mr-6 rotate-45 h-fit">
          <span className="text-2xl">
            <TbPlus />
          </span>
        </button>
      </div>
      <hr />

      <ul className="flex flex-col pt-4">
        {chooseCreateItems.map((item, idx) => (
          <Link
            href={`/create${item.slug}`}
            className="py-4 px-6 w-full cursor-pointer  hover:bg-[#EDEDED]"
            key={item.id}
          >
            <div className="flex flex-row gap-2 font-medium">
              <span className="text-xl">{<item.icon />}</span>
              {item.name}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ChooseCreateItems;
