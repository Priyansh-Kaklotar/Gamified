import React, { useState } from "react";
import { EyeIcon, ViewOffIcon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import Theme from "../components/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeslice";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "PASSWORD is not STRONG!!"
    ),
  repassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const Signin = () => {
  const navigate = useNavigate();
  const [eyeon, setEyeon] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      console.log("server wali party key chhe ke ", response.data);
      alert("kai no ghate baki"); //  aa khali backend thi response aavyo chhe
      reset();
      const d = await response.data;

      if (d.token) {
        // store token in local storage
        localStorage.setItem("token", d.token);
        localStorage.setItem("username", d.newUser.username);
        localStorage.setItem("userId", d.newUser._id);
        console.log("Token set:", d.token);

        toast.success("✅ Signin Successfull");
        navigate("/dashboard");
      } else {
        console.log("sigin failed:", d.message);
      }
    } catch (error) {
      console.error("bhai bhul padi whala", error);
      alert("muki dyo tamara thi nai thase");
    }
  };

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center bg-gradient-to-b from-purple-500 via-blue-400 to-cyan-500 text-white p-4 shadow-lg text-center">
      <div className="pointer-events-none absolute w-full h-full overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="fixed top-2 right-2">
        <Theme />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <h1 className="text-4xl font-bold py-5">Sign UP</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form flex gap-2 flex-col justify-center items-center p-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl z-10 border border-white/20 w-[90%] max-w-md"
      >
        <input
          {...register("username")}
          placeholder="Username"
          className="bg-gray-50 text-black rounded-lg p-1.5 w-full"
        />
        <p className="text-red-300 text-sm">{errors.username?.message}</p>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="bg-gray-50 text-black rounded-lg p-1.5 w-full"
        />
        <p className="text-red-300 text-sm">{errors.email?.message}</p>

        <div className="flex justify-center items-center w-full relative">
          <input
            {...register("password")}
            type={eyeon ? "text" : "password"}
            placeholder="Enter Password"
            className="bg-gray-50 text-black rounded-lg p-1.5 w-full pr-10"
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-black"
            onClick={() => setEyeon(!eyeon)}
          >
            {eyeon ? <EyeIcon /> : <ViewOffIcon />}
          </span>
        </div>
        <p className="text-red-300 text-sm w-full text-left">
          {errors.password?.message}
        </p>

        <input
          {...register("repassword")}
          type="password"
          placeholder="Re-Enter Password"
          className="bg-gray-50 text-black rounded-lg p-1.5 w-full"
        />
        <p className="text-red-300 text-sm">{errors.repassword?.message}</p>

        <button
          type="submit"
          className="text-white cursor-pointer bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-full mt-3 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
        >
          Sign In
        </button>
      </form>

      <div className="mt-2">
        <p>
          Already have an account?
          <a
            href="login"
            className="px-2 text-yellow-300 hover:text-yellow-500 "
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
