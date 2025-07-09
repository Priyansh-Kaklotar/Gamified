
import React, { useState } from "react";
import { EyeIcon, ViewOffIcon } from "hugeicons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { ToastContainer, toast, Bounce } from "react-toastify";
import Theme from "../components/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const Signin = () => {
  const navigate = useNavigate();
  const [eyeon, setEyeon] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      const d = response.data;

      if (d.token) {
        localStorage.setItem("token", d.token);
        localStorage.setItem("username", d.newUser.username);
        localStorage.setItem("userId", d.newUser._id);
        toast.success("✅ Signin Successful");
        navigate("/dashboard");
      } else {
        console.log("Signin failed:", d.message);
      }
      reset();
    } catch (error) {
      console.error("Signin Error:", error);
      toast.error("❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center bg-gradient-to-br from-[#1e3a8a] via-purple-600 to-[#9333ea] text-white relative overflow-hidden px-4">
      {/* Theme Toggle */}
      <div className="fixed top-2 right-2 z-20">
        <Theme />
      </div>

      {/* Toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />

      {/* Twinkle Particle Background */}
      <div className="pointer-events-none absolute w-full h-full overflow-hidden z-0">
        {[...Array(60)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-white rounded-full opacity-70"
            initial={{ y: 0 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 4,
            }}
            style={{
              top: `-${Math.random() * 20}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 2}px`,
              height: `${Math.random() * 2 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Main Animated Form Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl w-full max-w-md z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ rotate: [0, 1, -1, 0], transition: { duration: 0.4 } }}
        transition={{ type: "spring", stiffness: 160 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          🚀 Create Your Account
        </motion.h1>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          <motion.input
            variants={itemVariants}
            {...register("username")}
            placeholder="Username"
            className="bg-white text-black rounded-lg p-2"
          />
          <p className="text-red-300 text-sm">{errors.username?.message}</p>

          <motion.input
            variants={itemVariants}
            {...register("email")}
            type="email"
            placeholder="Email"
            className="bg-white text-black rounded-lg p-2"
          />
          <p className="text-red-300 text-sm">{errors.email?.message}</p>

          <motion.div
            variants={itemVariants}
            className="relative flex items-center"
          >
            <input
              {...register("password")}
              type={eyeon ? "text" : "password"}
              placeholder="Password"
              className="bg-white text-black rounded-lg p-2 w-full pr-10"
            />
            <span
              className="absolute right-3 top-2 cursor-pointer text-black"
              onClick={() => setEyeon(!eyeon)}
            >
              {eyeon ? <EyeIcon /> : <ViewOffIcon />}
            </span>
          </motion.div>
          <p className="text-red-300 text-sm">{errors.password?.message}</p>

          <motion.input
            variants={itemVariants}
            {...register("repassword")}
            type="password"
            placeholder="Confirm Password"
            className="bg-white text-black rounded-lg p-2"
          />
          <p className="text-red-300 text-sm">{errors.repassword?.message}</p>

          <motion.button
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 12px #facc15",
            }}
            whileTap={{
              scale: 0.9,
              rotate: -1,
              transition: { type: "spring", stiffness: 300 },
            }}
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-xl shadow-md mt-4"
          >
            Sign In
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm text-center mt-4"
        >
          Already have an account?
          <a
            href="/login"
            className="text-yellow-300 font-semibold px-2 hover:text-yellow-400"
          >
            Login
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
