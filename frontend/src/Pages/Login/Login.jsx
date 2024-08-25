import React, { useState } from "react";
import PasswordIp from "../../components/input/PasswordIp";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogin = async(e) => {
  e.preventDefault();

  if(!validateEmail(email)){
    setError("Please Enter the valid email address");
    return ;
  }

  if(!password){
    setError("Please Enter the valid password")
    return
  }

  setError("");

  //Login API

  try{
    dispatch(signInStart());

    const res = await axios.post("https://goodnote.onrender.com/api/auth/login" , 
    {email , password} , {withCredentials:true})

    // if(res.data.success === false){
    //   console.log(res.data);
    //   toast.error(res.data.message);
    //   dispatch(signInFailure(res.data.message));
    // }

    toast.success(res.data.message);
    dispatch(signInSuccess(res.data));
    navigate("/");

  }catch(error){
    // console.log(error);
    toast.error(error.response.data.message);
    dispatch(signInFailure(error.response.data.message));
  }

}
  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border bg-white rounded px-7 py-10 ">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="w-full text-sm  border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            value={email}
          />

          <PasswordIp
            value={password}
            onchange={(e) => setPassword(e.target.value)}
          ></PasswordIp>


          {error && <p className="text-red-500 text-sm pb-1">{error}</p>

          }


          <button
            type="submit"
            className="w-full text-sm bg-[#2B85FF] text-white mb-4 p-2 rounded my-1 hover:bg-blue-700"
          >
            LOGIN
          </button>

          <p>
            Not Registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
