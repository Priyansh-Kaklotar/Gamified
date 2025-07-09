
import React, { useState } from "react";
import { EyeIcon, ViewOffIcon } from "hugeicons-react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { motion } from "framer-motion";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password is not strong!"
    ),
});

function LoginPage() {
  const [eyeon, setEyeon] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      const d = await response.data;

      if (d.token) {
        localStorage.setItem("token", d.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", d.user._id);
        toast.success("✅ Login Successful");
        navigate("/dashboard");
      } else {
        console.log("Login failed:", d.message);
      }

      reset();
    } catch (error) {
      reset();
      toast.error(
        <div>
          <strong>❌ Login Failed</strong>
          <div className="text-sm">Check username or password</div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-dvh gap-2.5 flex flex-col justify-center items-center bg-gradient-to-b from-purple-500 via-blue-400 to-cyan-500 text-white p-4 shadow-lg text-center relative overflow-hidden">
      {/* Floating stars background */}
      <div className="pointer-events-none absolute w-full h-full overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150 }}
        className="text-4xl font-bold z-10"
      >
        GAMIFIED
      </motion.h1>
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-2xl font-bold z-10"
      >
        HABIT TRACKER
      </motion.h2>

      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/8090/8090406.png"
        width={200}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="z-10"
      />

      {/* Form card with animation */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        className="form flex flex-col justify-center items-center p-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl z-10 border border-white/20"
      >
        <div>
          <motion.input
            whileFocus={{ scale: 1.05, boxShadow: "0 0 10px #9333ea" }}
            {...register("username")}
            type="text"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-300 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <br />
        <div className="flex justify-center items-center relative">
          <motion.input
            whileFocus={{ scale: 1.05, boxShadow: "0 0 10px #9333ea" }}
            {...register("password")}
            type={eyeon ? "text" : "password"}
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-80 p-2.5"
            placeholder="Password"
          />
          <span
            className="cursor-pointer absolute text-black right-3"
            onClick={() => {
              setEyeon(!eyeon);
            }}
          >
            {eyeon ? <EyeIcon /> : <ViewOffIcon />}
          </span>
          {errors.password && (
            <p className="absolute bottom-[-1.5rem] text-red-300 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="text-white cursor-pointer bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-80 mt-6 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300"
        >
          Log in
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-10"
      >
        <p className="text-sm mt-2">
          Don't have an account?
          <Link
            to="/signin"
            className="text-yellow-300 px-1 hover:text-yellow-500 font-semibold cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;
