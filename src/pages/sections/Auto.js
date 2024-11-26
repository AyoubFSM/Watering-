// src/sections/Auto/Auto.js
import React, { useState, useEffect } from 'react';

const Auto = ({ isDarkMode }) => {
  const [autoTime, setAutoTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Example of an effect that could start an automatic timer
  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setAutoTime(prevTime => prevTime + 1); // Increment time every second
      }, 1000);
    }
    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [isActive]);

  const handleStartAuto = () => {
    setIsActive(true);
  };

  const handleStopAuto = () => {
    setIsActive(false);
  };

  const handleResetAuto = () => {
    setAutoTime(0);
    setIsActive(false);
  };

  return (
    <div className={`bg-${isDarkMode ? 'gray-800' : 'gray-200'} border-blue-500 rounded-lg shadow-md text-center p-4 md:p-6 flex-1`}>
      <h3 className="text-sm font-medium mb-4">Automatic Timer</h3>
      <div className="mb-4">
        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {String(Math.floor(autoTime / 3600)).padStart(2, '0')}:
          {String(Math.floor((autoTime % 3600) / 60)).padStart(2, '0')}:
          {String(autoTime % 60).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleStartAuto}
          className={`p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 ${isActive ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isActive}
        >
          Start Auto
        </button>
        <button
          onClick={handleStopAuto}
          className={`p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isActive}
        >
          Stop Auto
        </button>
        <button
          onClick={handleResetAuto}
          className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Auto;