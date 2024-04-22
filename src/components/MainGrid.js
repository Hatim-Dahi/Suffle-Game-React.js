import React, { memo, useState, useEffect } from "react";
import backImage from "../assests/images/card-back2.png";
import cardImages from "./AllCards";
import gameOver from "../assests/images/game.gif";
import cardFlipSound from "../assests/audio/pageTurn.mp3";
import matched from "../assests/audio/matched.mp3";
import cardImg from "../assests/images/card.jpg";

const MainGrid = ({
  setIsStart,
  setScore,
  isFinished,
  setIsFinished,
  timer,
}) => {
  const [cards, setCards] = useState([]);
  const [start, setStart] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [cardFlipAudio] = useState(new Audio(cardFlipSound));
  const [match] = useState(new Audio(matched));

  let matchedPairs = [];
  // Function to shuffle the array
  const shuffleArray = (array) => {
    console.log("suffle----", array);
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    setCards(shuffleArray(cardImages));
  }, []);

  // Handle card click event
  const handleCardClick = (clickedCardId) => {
    if (isWaiting) return;

    const updatedCards = cards.map((card) => {
      if (card.id === clickedCardId && !card.isFlipped) {
        cardFlipAudio.currentTime = 0;
        cardFlipAudio.play();
        return { ...card, isFlipped: true };
      }
      return card;
    });

    const flippedCard = updatedCards.find((card) => card.id === clickedCardId);

    if (flippedCard) {
      const flippedPair = flippedCards.concat(flippedCard);

      if (flippedPair.length === 2) {
        setIsWaiting(true);

        if (
          flippedPair[0].name === flippedPair[1].name &&
          flippedPair[0].id !== flippedPair[1].id
        ) {
          const updatedCardsAfterMatch = updatedCards.map((card) =>
            flippedPair.some((flipped) => flipped.id === card.id)
              ? { ...card, isFlipped: true }
              : card
          );

          match.currentTime = 0;
          match.play();
          setCards(updatedCardsAfterMatch);

          const currScore = myScore + 10;
          setMyScore(currScore);
          setScore(currScore);
          matchedPairs.push(flippedPair[0].name);
        }

        setTimeout(() => {
          const newCards = updatedCards.map((card) =>
            flippedPair.some((flipped) => flipped.id === card.id)
              ? { ...card, isFlipped: matchedPairs.includes(card.name) }
              : card
          );
          setCards(newCards);
          console.log("new cards:", newCards);
          console.log("matched", matchedPairs);
          setFlippedCards([]);
          setIsWaiting(false);
        }, 500);
      } else {
        setFlippedCards(flippedPair);
      }
    }

    setCards(updatedCards);
  };

  const handleStart = () => {
    setIsStart(true);
    setStart(true);
  };
  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
    console.log("chala ye");
  }, [matchedPairs]);

  useEffect(() => {
    if (myScore === 90 && !isFinished) {
      setIsFinished(true);
    }
  }, [myScore, isFinished]);

  return (
    <div
      className={` w-[95%] lg:w-[70%]  h-[98%]  lg:h-[88%] flex flex-wrap justify-center items-center mt-4 mb-4 lg:mt-[-50px] rounded-md text-white
    ${
      !start
        ? "items-baseline mt-12"
        : isFinished
        ? "items-baseline mt-48 "
        : ""
    }`}
    >
      {isFinished ? (
        <div className="flex-col justify-center items-center text-center text-black font-bold">
          <img src={gameOver} alt="gameover" width={200} />
          <div className="mt-6 font-bold text-lg">
            Well Done! You Score {myScore}
          </div>
          <div className="font-bold text-md">in {40 - timer} seconds</div>
          <button className="button-85 mt-4" onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : start ? (
        cards.map((card) => (
          <div
            key={card.id}
            className={`p-2 cursor-pointer card-container ${
              card.isFlipped ? "flipped" : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              className={`w-24 h-28  lg:w-40 lg:h-48 rounded-md border-2 shadow-xl ${
                card.isFlipped ? "flipped" : ""
              }`}
              src={card.isFlipped ? card.image : backImage}
              alt={card.isFlipped ? `Card ${card.id}` : "Card Back"}
            />
          </div>
        ))
      ) : (
        <div className="flex-col justify-center items-center text-center">
          <div className="flex justify-center items-center">
            <img src={cardImg} alt="cards" width={250} />
          </div>
          <p className="mb-8 font-semibold text-lg text-black font-bold">
            You will have one minute to match all the pairs. Each matched pair
            will give you 10 points
          </p>
          <button className="button-85" onClick={handleStart}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(MainGrid);
