const Reels = () => {
  return (
    <>
      <div className="relative">
        <ul className="flex flex-row w-full p-6 flex-nowrap">
          {[...Array(8).keys()].map((item, idx) => (
            <li
              key={idx}
              className="w-14 mr-5  shrink-0 h-14 rounded-full ring-2 ring-offset-4 ring-offset-[#0a0a0a] bg-slate-800"
            ></li>
          ))}
        </ul>
        <div className="right-gradient-fade"></div>
      </div>
    </>
  );
};

export default Reels;
