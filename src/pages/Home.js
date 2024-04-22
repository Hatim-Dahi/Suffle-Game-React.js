import React, { memo, useEffect, useState } from "react";
import MainGrid from "../components/MainGrid";
import Header from "../components/Header";
import congratsSound from "../assests/audio/congrats.mp3";
import loose from "../assests/audio/loose.mp3";

const Home = () => {
  const [score, setScore] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [congratsAudio] = useState(new Audio(congratsSound));
  const [lowScore] = useState(new Audio(loose));
  const [timer, setTimer] = useState(40);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  useEffect(() => {
    if (!isFinished) {
      setTotalTimeTaken(timer);
    }
  }, [timer]);

  useEffect(() => {
    if (isFinished) {
      setTimer(0);
      if (score > 10) {
        congratsAudio.currentTime = 0;
        congratsAudio.play();
      } else {
        lowScore.currentTime = 0;
        lowScore.play();
      }
    }
  }, [isFinished]);
  return (
    <div>
      <Header
        startTimer={isStart}
        score={score}
        setIsFinished={setIsFinished}
        isFinished={isFinished}
        setIsStart={setIsStart}
        timer={timer}
        setTimer={setTimer}
      />
      <div className="w-[100%] h-[96vh] flex justify-center items-center text-center">
        <MainGrid
          setScore={setScore}
          setIsStart={setIsStart}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
          timer={totalTimeTaken}
        />
      </div>
    </div>
  );
};
export default memo(Home);
