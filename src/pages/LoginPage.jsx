import React, { useState } from "react";
import Login from "../components/Login-Form/Login";
import loginImage from "../assets/loginbg.jpg";
import back from "../assets/backbutton.png";
import StudentLogin from "../components/Login-Form/StudentLogin";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="max-h-screen min-h-screen flex flex-col lg:flex-row">
      {/* Image Container */}
      <div
        className="hidden lg:block relative lg:w-1/2 lg:h-full"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Back Button */}
        <img
          className="absolute w-12 h-12 top-15 left-25 cursor-pointer"
          src={back}
          alt=""
          onClick={() => navigate("/")}
        />

        {/* Text */}
        <div className="flex flex-col w-2/3 gap-3 mx-auto h-full justify-center text-center text-white">
          <h1 className="text-white text-4xl font-sans text-left font-semibold">
            Sign In
          </h1>
          <p className="text-white font-semibold text-left font-sans">
            Sign in to enjoy the best managing experience
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-25 left-2/5 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
          <span className="w-3 h-3 rounded-full bg-white/50"></span>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full lg:w-1/2 lg bg-white flex flex-col gap-5 justify-center px-8 sm:px-16 md:px-24 lg:px-32 py-10">
        {/* Welcome Texts */}
        <div className="text-black flex flex-col gap-4 mb-6">
          <h2 className="text-4xl font-semibold">Welcome Back </h2>
          <p className="text-sm">
            Continue your learning journey with App name LMS.
          </p>
          <p className="text-xs">
            🚀 Access your courses, track progress, and grow your skills
            securely.
          </p>
        </div>

        {/* ADMIN or USER form */}
        {loginType === "ADMIN" ? <Login /> : <StudentLogin />}
      </div>
    </div>
  );
}

export default LoginPage;
