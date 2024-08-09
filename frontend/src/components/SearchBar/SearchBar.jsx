import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";



const SearchBar = ({value , onChange , handleSearch , onClearSearch}) => {

  return (
    <div className="flex items-center justify-center w-100 sm:w-60 md:w-80  px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes..."
        value={value}
        onChange={onChange}
        className="w-full text-xs bg-transparent outline-none py-[11px]"
      ></input>

      {/* closeSearch */}

      {value && (
        <IoMdClose onClick={onClearSearch} className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" ></IoMdClose>
      )}

      <FaMagnifyingGlass
        onClick={handleSearch}
        className="cursor-pointer hover:text-black text-slate-500 text-xl"
      ></FaMagnifyingGlass>
    </div>
  );
};

export default SearchBar;
