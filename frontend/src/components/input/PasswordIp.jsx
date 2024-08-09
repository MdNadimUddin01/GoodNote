import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordIp = ({ value, onchange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-4">
      <input
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onchange}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          onClick={toggleShowPassword}
          className="text-[#2B85FF] cursor-pointer"
        ></FaRegEye>
      ) : (
        <FaRegEyeSlash
        onClick={toggleShowPassword}
          size={22}
          className="text-slate-400 cursor-pointer"
        ></FaRegEyeSlash>
      )}
    </div>
  );
};

export default PasswordIp;
