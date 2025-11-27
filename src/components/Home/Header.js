import Image from "next/image";

const Header = () => {
  return (
    <header className="px-6">
      <div className="relative">
        {/* BBackground Image */}
        <div className="relative opacity-60 w-full overflow-hidden rounded-xl aspect-[16/6] ">
          <Image
            fill
            priority
            alt="image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={
              "https://images.pexels.com/photos/317385/pexels-photo-317385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            className="absolute object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 flex flex-col justify-between h-full p-4">
          {/* Ping */}
          <div className="flex flex-row px-2 py-1 text-sm rounded-lg bg-slate-800">
            <div className="relative pl-4 -translate-x-[2px]">
              <div className="absolute left-0 w-4 h-4 bg-[#32CD32] rounded-full top-[2px] animate-ping"></div>
              <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-[#32CD32] rounded-full top-1/2 left-1/2"></div>
            </div>
            Meeting at 09:00 AM
          </div>
          {/* Time */}
          <div>
            <div className="text-3xl font-medium">
              11:22 <span className="text-base">PM</span>
            </div>
            <div className="text-sm">Friday, 13 September 2024</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
