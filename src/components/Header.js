import React, { useState, useEffect } from "react";
import logo from "../assests/images/logo.jpg";

const Header = ({ startTimer, score }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let intervalId;

    if (startTimer) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(intervalId);
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
      <div>
        <img src={logo} alt="" width={120} />
      </div>
      {startTimer && (
        <div className="flex gap-4 justify-center items-center">
          <div className="text-lg font-bold bg-gray-200 py-2 px-4 rounded shadow-xl">
            Score: {score}
          </div>

          <div className="text-xl font-bold text-gray-800 bg-gray-200 py-2 px-4 rounded shadow-xl">
            {formatTime(timer)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
