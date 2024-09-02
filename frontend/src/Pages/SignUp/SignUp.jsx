import React, { useState } from "react";
import PasswordIp from "../../components/input/PasswordIp";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please Enter Your Name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter the valid email address");
      return;
    }

    if (!password) {
      setError("Please Enter the valid password");
      return;
    }

    setError("");

    //signUp API

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        { userName: name, email, password },
        { withCredintials: true }
      );

      if (res.data.success === false) {
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message);

      setError("");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border bg-white rounded px-7 py-10 ">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full text-sm  border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            value={name}
          />

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

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button
            type="submit"
            className="w-full text-sm bg-[#2B85FF] text-white mb-4 p-2 rounded my-1 hover:bg-blue-700"
          >
            SIGN UP
          </button>

          <p>
            Already have an account?{" "}
            <Link
              to={"/Login"}
              className="font-medium text-[#2B85FF] underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
