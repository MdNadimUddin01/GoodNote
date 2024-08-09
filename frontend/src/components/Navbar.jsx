import React, { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({userInfo , handleClearSearch , onsearchNote}) => {
  
  const [searchquery, setSearchquery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {

    if(searchquery){
      onsearchNote(searchquery);
    }
    
  }

  const onClearSearch = () => {
    setSearchquery("");
    handleClearSearch();
  }

  const onLogout = async() => {

    try{
      dispatch(signOutStart());

      const res = await axios.get("http:///localhost:4000/api/auth/signout" , {withCredentials: true,})

      if(res.data.success === false){
        dispatch(signOutFailure(res.data.message));
        toast.error(res.data.message);
      }

      // console.log("success");
      dispatch(signOutSuccess());
      toast.success(res.data.message);

      navigate("/login");

      
      
    }catch(error){
      console.log(error);
      toast.error(error.message);
      dispatch(signOutFailure(error.message));
    }

    // navigate("/Login");
  };

  return (
    <div className="flex bg-white items-center justify-between py-2 px-6 drop-shadow">
      {/* <Link to="/">
        <h2 className="text-2xl font-medium text-black py-2">
          <span className="text-slate-500">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link> */}
      <Link to="/">
        <h2 className="text-2xl font-medium text-black py-2">
          <span className="text-slate-500">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>

      {/* //searchBar */}

      <SearchBar
        value={searchquery}
        onChange={({ target }) => setSearchquery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      ></SearchBar>

      {/* ProfileInfo */}

      <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>
    </div>
  );
};

export default Navbar;
