import React from "react";
import { getInitals } from "../../utils/helper";
const ProfileInfo = ({ onLogout, userInfo }) => {

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-12 h-12 items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
    
        {getInitals(userInfo?.userName)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo?.userName}</p>
      </div>

      <button
        onClick={onLogout}
        className="text-sm bg-red-500 py-2 px-3 rounded-md text-white hover:opacity-80"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
