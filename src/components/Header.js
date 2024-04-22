import React, { useState, useEffect } from "react";
import logo from "../assests/images/logo.jpg";
import { GiThreePointedShuriken } from "react-icons/gi";

const Header = ({
  startTimer,
  score,
  setIsFinished,
  isFinished,
  setIsStart,
  timer,
  setTimer,
}) => {
  useEffect(() => {
    let intervalId;

    if (startTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
            setIsFinished(true);

            setIsStart(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTimer]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex justify-between px-10 pt-4 items-center">
      <div className="lg:w-32">
        <img src={logo} alt="" />
      </div>
      {startTimer && !isFinished && (
        <div className="flex gap-4 justify-center items-center ml-4">
          <button className="text-lg font-bold bg-gray-200 py-2 px-4 rounded shadow-xl flex justify-center items-center button-83">
            <GiThreePointedShuriken className="mr-[-10px]" /> {score}
          </button>

          <div
            className={`button-83 ${
              timer < 5 ? "bg-red-500!important text-white" : "bg-gray-200"
            }`}
          >
            {formatTime(timer)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
