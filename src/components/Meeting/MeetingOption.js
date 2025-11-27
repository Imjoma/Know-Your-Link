import { TbTrash } from "react-icons/tb";
import { TbPencil } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";

import { useRouter } from "next/navigation";

const MeetingOption = ({ setMeetings, setOption, option, setEdit }) => {
  const router = useRouter();

  const modalVisibility = !option
    ? "opacity-0 pointer-events-none"
    : "opacity-100";

  const modalSlide = !option
    ? `translate-y-full ${modalVisibility}`
    : "-translate-y-24 sm:bottom-1/2";

  const DeleteMeeting = async (id) => {
    try {
      const res = await fetch(`/api/meetings?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMeetings((prev) => prev.filter((item) => item.id !== id));
        setOption(false);
      } else {
        console.log("Error deleting");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => setOption(false)}
      className={`${modalVisibility} fixed bottom-0 left-0 z-50 w-full  h-screen bg-black/70 backdrop-blur-sm`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalSlide}  sm:w-[500px] pt-6 pb-4 left-1/2 bottom-0 overflow-hidden -translate-x-1/2 z-[45] sm:translate-y-1/2 text-black fixed transform transition-all duration-200 w-[calc(100%-48px)] bg-white  rounded-xl `}
      >
        <div className="flex flex-row justify-between">
          <h4 className="px-6 pb-4 text-lg font-semibold truncate">
            {option.subject}
          </h4>
          <button
            onClick={() => setOption(false)}
            className="mr-6 rotate-45 h-fit"
          >
            <span className="text-2xl">
              <TbPlus />
            </span>
          </button>
        </div>
        <hr className="pb-4" />

        <button
          onClick={() => {
            setEdit(option);
          }}
          className="py-4 px-6 w-full cursor-pointer  hover:bg-[#EDEDED]"
        >
          <div className="flex flex-row gap-2 font-medium">
            <span className="text-xl">{<TbPencil />}</span>
            Edit
          </div>
        </button>
        <button
          onClick={() => DeleteMeeting(option.id)}
          className="py-4 px-6 w-full cursor-pointer  hover:bg-[#EDEDED]"
        >
          <div className="flex flex-row gap-2 font-medium text-red-500">
            <span className="text-xl">{<TbTrash />}</span>
            Delete
          </div>
        </button>
      </div>
    </div>
  );
};

export default MeetingOption;
