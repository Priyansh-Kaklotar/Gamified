import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeslice';

const Theme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  return (
    <div>
      <div className="absolute top-2 right-1">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isDark}
            onChange={() => dispatch(toggleTheme())}
          />
          <div
            className="w-20 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-orange-400
             peer-checked:from-blue-400 peer-checked:to-indigo-500 transition-all duration-500
             after:content-['☀️'] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full
             after:h-8 after:w-8 after:flex after:items-center after:justify-center after:transition-all
             after:duration-500 peer-checked:after:translate-x-10 peer-checked:after:content-['🌙']
             after:shadow-md after:text-lg"
          ></div>
          <span className={`ml-3 text-sm font-medium ${isDark ? 'text-slate-900' : 'text-white'}`}>
            Theme
          </span>
        </label>
      </div>
    </div>
  );
};

export default Theme;
