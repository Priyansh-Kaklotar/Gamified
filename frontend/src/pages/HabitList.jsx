import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  // const [isCompleted, setIsCompleted] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleDelete = async (id, event) => {
    // Make API call to delete habit by id
    console.log("Delete habit with ID:", id);
    event.stopPropagation();
    try {
      const response = await axios.delete(`http://localhost:3000/habit/${id}`);
      console.log(response.data);
      toast.success("Habit deleted Successfully");
      setHabits((prev) => prev.filter((habit) => habit._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchHabitsFirst = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/${userId}`);
        setHabits(res.data);
      } catch (err) {
        console.error("Error fetching habits:", err);
      }
    };

    if (userId) {
      fetchHabitsFirst();
    }
  }, [userId]);

  const fetchHabitsFirst = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/${userId}`);
      setHabits(res.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  const fetchHabits = async (category) => {
    try {
      let res = await axios.get(`http://localhost:3000/${userId}/${category}`);
      setHabits(res.data);
    } catch (err) {
      console.error("Error fetching habits:", err.message);
    }
  };

  const markAsCompleted = async (id, e) => {
    console.log("event:", e, "id", id);
    e.stopPropagation();
    try {
      console.log(id);
      const response = await axios.put(`http://localhost:3000/${id}/complete`);
      setHabits([response.data]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const categories = ["Health", "Education", "Skills", "Hobbies"];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen items-center bg-gradient-to-b from-purple-300 via-sky-200 to-emerald-200 px-4 sm:px-8">
      {/* navbar */}
      <nav className="w-full py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-white/10 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-white">HabitTracker</h1>
        <ul className="flex flex-wrap justify-center items-center sm:justify-end gap-4 text-white font-medium">
          <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
            <Link to="/addhabit">Add Habits</Link>
          </li>
          <li>
            <button
              className="relative group overflow-hidden px-6 py-2 text-sm sm:text-[18px] font-semibold text-[#c1a362] border-2 border-[#c1a362] rounded-[34px] bg-transparent transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#212121] hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100"
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("token");
              }}
            >
              <span className="absolute inset-0 m-auto w-[50px] h-[50px] rounded-[inherit] bg-[#c1a362] scale-0 z-[-1] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[3]"></span>
              Log Out
            </button>
          </li>
        </ul>
      </nav>

      {/* category buttons */}
      <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
        <button
          className="relative group px-4 py-2 bg-gradient-to-r focus:border-4 focus:border-black from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 border-2 border-white/10"
          onClick={() => fetchHabitsFirst()}
        >
          <span className="absolute -inset-px rounded-2xl group-hover:blur-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-50 z-0"></span>
          <span className="relative z-10">All</span>
        </button>

        {categories.map((category, id) => (
          <button
            key={id}
            className="relative group px-4 py-2 focus:border-4 focus:border-black bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 border-2 border-white/10"
            onClick={() => fetchHabits(category)}
          >
            <span className="absolute -inset-px rounded-2xl group-hover:blur-sm bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-50 z-0"></span>
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* habits container */}
      <div className="w-full max-w-2xl py-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 ml-2 text-center sm:text-left">
          Your Habits
        </h2>
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li
              key={habit._id}
              className="bg-white/20 backdrop-blur-lg flex flex-col sm:flex-row justify-between sm:items-center rounded-2xl p-4 shadow-md border border-white/20 hover:scale-[1.02] transition-transform duration-300 text-black"
            >
              <div className="w-full sm:w-[250px] overflow-hidden">
                <h3 className="font-semibold text-black truncate">
                  {habit.name}
                </h3>
                <p className="text-gray-900 truncate">{habit.description}</p>
                <p className="text-md text-gray-400 mt-1">
                  Notify me: {habit.frequency}
                </p>
              </div>

              <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0">
                <button
                  onClick={(event) => markAsCompleted(habit._id, event)}
                  className="text-sm rounded-xl px-4 py-2 bg-green-500 hover:bg-green-600 text-white shadow transition duration-200"
                >
                  Complete
                </button>
                <button
                  onClick={(event) => handleDelete(habit._id, event)}
                  className="text-sm rounded-xl px-4 py-2 bg-red-500 hover:bg-red-600 text-white shadow transition duration-200"
                >
                  Delete
                </button>
              </div>

              <div className="flex justify-between sm:flex-col gap-2 text-sm sm:text-base mt-4 sm:mt-0">
                <p>🔥 Streak: {habit.currentStreak}</p>
                <p>🏆 Best: {habit.bestStreak}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HabitList;
