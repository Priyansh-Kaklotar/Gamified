import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddHabit() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post("http://localhost:3000/habit", {
        name: data.habit,
        description: data.description,
        frequency: data.frequency,
        category: data.category,
        user: userId,
      });
      reset();
      console.log(response);

      toast.success("Habit Added Successfully");
    } catch (err) {
      console.log("error in add habit component");
      console.log(err.message);
    }
  };
  return (
    // without responsive
    // <>
    //   <div className="min-h-screen flex-col bg-gradient-to-b from-purple-200 via-pink-100 to-blue-100 flex items-center">
    //     {/* navbar */}
    //     <nav className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md shadow-sm">
    //       <h1 className="text-2xl font-bold text-white">HabitTracker</h1>
    //       <ul className="flex gap-4 mr-5 text-white font-medium">
    //         <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
    //           <Link to="/dashboard">Dashboard</Link>
    //         </li>
    //         <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
    //           <Link to="/habitlist">Habits</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6 mt-5 tracking-wide">
    //       Add a New Habit
    //     </h1>
    //     {/* add habit container */}
    //     <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl mt-5 p-8 w-full max-w-md border border-white/30">
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <div>
    //           <input
    //             type="text"
    //             {...register("habit")}
    //             className="w-full p-3 rounded-lg border border-white/40 bg-white/30 placeholder-green-500 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:placeholder-white"
    //             placeholder="Habit Name"
    //             required
    //           />
    //         </div>
    //         <br />
    //         <div>
    //           <input
    //             type="text"
    //             {...register("description")}
    //             className="w-full p-3 rounded-lg border border-white/40 bg-white/30 placeholder-green-500 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:placeholder-white"
    //             placeholder="Description"
    //             required
    //           />
    //         </div>
    //         <div className="w-96">
    //           <label
    //             htmlFor="repeat"
    //             className="block text-black text-sm font-semibold mb-1 mt-2"
    //           >
    //             Repeat
    //           </label>
    //           <div className="relative">
    //             <select
    //               id="repeat"
    //               {...register("frequency")}
    //               className="appearance-none w-96 bg-white text-gray-700 py-2 px-4 pr-8 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
    //             >
    //               <option>Daily</option>
    //               <option>Weekly</option>
    //               <option>Monthly</option>
    //               <option>Yearly</option>
    //             </select>
    //             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
    //               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    //                 <path d="M5.5 7l4.5 4.5L14.5 7z" />
    //               </svg>
    //             </div>
    //           </div>

    //           <div className="relative">
    //             <select
    //               id="repeat"
    //               {...register("category")}
    //               className="appearance-none w-96 bg-white text-gray-700 py-2 px-4 pr-8 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
    //             >
    //               <option>Health</option>
    //               <option>Education</option>
    //               <option>Skills</option>
    //               <option>Hobbies</option>
    //             </select>
    //             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
    //               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    //                 <path d="M5.5 7l4.5 4.5L14.5 7z" />
    //               </svg>
    //             </div>
    //           </div>
    //         </div>
    //         <br />
    //         <button
    //           type="submit"
    //           className="text-white bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-96 mt-3 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
    //         >
    //           Add Habit
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </>

    // with responsive
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-200 via-pink-100 to-blue-100 items-center px-4 sm:px-8">
      {/* navbar */}

      <nav className="w-full py-4 px-2 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-white/10 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-white">HabitTracker</h1>
        <ul className="flex flex-wrap justify-center sm:justify-end gap-4 text-white font-medium">
          <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="relative text-black font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-400 hover:after:w-full">
            <Link to="/habitlist">Habits</Link>
          </li>
        </ul>
      </nav>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6 mt-6 text-center tracking-wide">
        Add a New Habit
      </h1>

      {/* Form Container */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl mt-5 p-6 w-full max-w-md border border-white/30">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              {...register("habit")}
              className="w-full p-3 rounded-lg border border-white/40 bg-white/30 placeholder-green-500 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:placeholder-white"
              placeholder="Habit Name"
              required
            />
          </div>
          <br />
          <div>
            <input
              type="text"
              {...register("description")}
              className="w-full p-3 rounded-lg border border-white/40 bg-white/30 placeholder-green-500 text-black focus:outline-none focus:ring-2 focus:ring-purple-400 focus:placeholder-white"
              placeholder="Description"
              required
            />
          </div>

          {/* Frequency Dropdown */}
          <div className="w-full mt-4">
            <label
              htmlFor="repeat"
              className="block text-black text-sm font-semibold mb-1"
            >
              Notify Me
            </label>
            <div className="relative">
              <select
                id="repeat"
                {...register("frequency")}
                className="appearance-none w-full bg-white text-gray-700 py-2 px-4 pr-8 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.5 7l4.5 4.5L14.5 7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="w-full mt-4">
            <label
              htmlFor="category"
              className="block text-black text-sm font-semibold mb-1"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                {...register("category")}
                className="appearance-none w-full bg-white text-gray-700 py-2 px-4 pr-8 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-purple-400 font-semibold"
              >
                <option>Health</option>
                <option>Education</option>
                <option>Skills</option>
                <option>Hobbies</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.5 7l4.5 4.5L14.5 7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-full mt-6 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddHabit;
