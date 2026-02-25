import React, { useState } from "react";
import logo from "../assests/vcart logo.png";
import { useNavigate } from "react-router-dom";
import { GOOGLE_URL } from "../utils/constants";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-[#FFFBF1] w-full h-screen">
      {/* Navigation bar  */}
      <div
        className="flex justify-start items-center px-10 gap-1 cursor-pointer bg-[#E36A6A]"
        onClick={() => navigate("/")}
      >
        <img className="w-8 py-2" src={logo} alt="" />
        <h3 className="text-[20px] font-semibold text-white">Nexify</h3>
      </div>

      <div className="text-center  my-5 mt-15">
        <span className="font-bold text-2xl">Registration page</span>
      </div>

      <div className="w-3/9 bg-zinc-100 p-5 mx-auto rounded-lg flex justify-center flex-col items-center gap-2">
        <div className="bg-green-400 flex items-center px-2 py-1 rounded-lg gap-2">
          <img className="w-10 rounded-full" src={GOOGLE_URL} alt="" />
          <span className="text-white font-semibold">
            Registration With Google
          </span>
        </div>
        <div className="font-bold">OR</div>

        <div className=" w-[80%] gap-4 flex flex-col">
          <input
            type="text"
            placeholder="Enter the name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg w-full outline-1 cursor-pointer"
          />
          <input
            type="email"
            placeholder="Enter the email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg w-full outline-1 cursor-pointer"
          />
          <input
            type="password"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-lg w-full outline-1 cursor-pointer"
          />
          <button className="px-3 py-2 rounded-lg w-full outline-1 bg-blue-500 hover:bg-blue-600 text-white font-bold">
            Register
          </button>
          <p className="text-center cursor-pointer">
            You have any Account? Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
