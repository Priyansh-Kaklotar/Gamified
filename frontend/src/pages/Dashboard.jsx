import React, { useEffect, useState } from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeslice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const [username, setUsername] = useState("");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <>
      <div
        className={`flex flex-col w-full min-h-screen items-center ${
          isDark
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-b from-purple-300 via-sky-200 to-emerald-200"
        } px-4 sm:px-8`}
      >
        {/* Navbar */}
        <nav
          className={`${
            isDark ? "text-white" : "text-black"
          } w-full py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-white/10 backdrop-blur-md shadow-sm`}
        >
          <h1 className="text-2xl font-bold">HabitTracker</h1>
          <ul className="flex flex-wrap justify-center items-center sm:justify-end gap-4 font-medium">
            <li className="relative font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="relative  font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
              <Link to="/habitlist">Habits</Link>
            </li>

            <li>
              <button
                className="relative group overflow-hidden px-6 py-2 text-sm sm:text-[18px] font-semibold text-[#c1a362] border-2 border-[#c1a362] rounded-[34px] bg-transparent transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#212121] hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("username");
                  localStorage.removeItem("userId");
                  navigate("/login");
                }}
              >
                <span className="absolute inset-0 m-auto w-[50px] h-[50px] rounded-[inherit] bg-[#c1a362] scale-0 z-[-1] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[3]"></span>
                Log Out
              </button>
            </li>
          </ul>
        </nav>

        {/* Header */}
        <div className="text-center mt-6 px-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide mb-1">
            Dashboard
          </h1>
          <p className=" mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#280fe3] via-[#c0125e] to-[#1683db] text-2xl">
            Welcome,
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-sky-400 font-bold">
              &nbsp;{username || "User"}
            </span>
          </p>
        </div>

        {/* Main Cards */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl mt-8 shadow-lg border border-white/20 p-6 w-full max-w-md sm:max-w-xl">
          {/* Level Card */}
          <div className="mt-2 flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between bg-gradient-to-r from-purple-600 via-10% to-blue-500 text-white p-4 rounded-2xl shadow-md">
            <div className="w-full sm:w-[70%]">
              <div className="text-sm font-semibold">Level 4</div>
              <div className="w-full bg-white/20 rounded-full h-4 mt-2">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-4 rounded-full w-[72%] animate-pulse"></div>
              </div>
              <div className="text-xs font-medium mt-1">2175 / 3000 XP</div>
            </div>
            {/* <button className="bg-orange-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg font-bold cursor-pointer">
              +
            </button> */}
          </div>

          {/* Action Cards */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* Add Habit */}
            <div className="bg-yellow-600 flex flex-col items-center justify-center w-full sm:w-1/2 p-5 rounded-xl">
              <button
                onClick={() => navigate("/addhabit")}
                className="bg-orange-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-5xl font-bold cursor-pointer"
              >
                +
              </button>
              <p className="font-semibold text-[#00786f] mt-2 text-center">
                Add Habit
              </p>
            </div>

            {/* Badges */}
            <div className="w-full sm:w-1/2 rounded-xl">
              <div className="bg-purple-500 h-24 flex justify-center items-center rounded-t-xl text-white font-semibold text-xl">
                <BiBadgeCheck className="text-3xl text-red-800 mr-2" />
                Badges
              </div>
              <div className="flex justify-center items-center text-white bg-blue-500 h-16 rounded-b-xl text-lg">
                3/10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed bottom-3 right-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            onChange={() => dispatch(toggleTheme())}
            checked={isDark}
            className="sr-only peer"
            type="checkbox"
          />
          <div className="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400 peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500 after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙'] after:shadow-md after:text-lg"></div>
          <span
            className={`ml-3 text-sm font-medium ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Theme
          </span>
        </label>
      </div>
    </>
  );
}

export default Dashboard;
