import React, { memo, useState } from "react";
import MainGrid from "../components/MainGrid";
import Header from "../components/Header";

const Home = () => {
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  return (
    <div className=" bg-slate-300">
      <Header startTimer={isStart} score={score} />
      <div className="w-[100%] h-[96vh] flex justify-center items-center text-center">
        <MainGrid setScore={setScore} setIsStart={setIsStart} />
      </div>
    </div>
  );
};
export default memo(Home);
