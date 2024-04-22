import React, { memo, useState } from "react";
import MainGrid from "../components/MainGrid";
import Header from "../components/Header";

const Home = () => {
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  console.log("score:", score, "isstart", isStart, "isfinished", isFinished);
  return (
    <div className=" bg-slate-300">
      <Header
        startTimer={isStart}
        score={score}
        setIsFinished={setIsFinished}
        isFinished={isFinished}
        setIsStart={setIsStart}
      />
      <div className="w-[100%] h-[96vh] flex justify-center items-center text-center">
        <MainGrid
          setScore={setScore}
          setIsStart={setIsStart}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
      </div>
    </div>
  );
};
export default memo(Home);
