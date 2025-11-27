"use client";
import { useState } from "react";
import { TbZoom } from "react-icons/tb";

const Searchbar = () => {
  const [typing, setTyping] = useState(false);

  const handleChange = (e) => {
    setTyping(e.target.value);
  };

  const isTyping = !typing && (
    <span className="absolute top-1/2 -translate-y-1/2 text-xl left-4 opacity-60">
      <TbZoom />
    </span>
  );

  return (
    <div>
      <div className="relative w-full placeholder:text-red-500">
        {isTyping}
        <input
          onChange={handleChange}
          className={`${
            typing ? "pl-6" : "pl-12"
          } pr-4 outline-none py-3 bg-white bg-opacity-10 rounded-full w-full`}
          type="text"
          name="search"
          id="search"
          placeholder="Search Meetings"
        />
      </div>
    </div>
  );
};

export default Searchbar;
