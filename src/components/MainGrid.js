import React, { memo, useState, useEffect } from "react";
import backImage from "../assests/images/card-back.jpg";
import cardImages from "./AllCards";
import gameOver from "../assests/images/game.gif";

const MainGrid = ({ setIsStart, setScore, isFinished }) => {
  const [cards, setCards] = useState([]);
  const [start, setStart] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);
  const [finished, setFinished] = useState(isFinished);
  let matchedPairs = [];
  // Function to shuffle the array
  const shuffleArray = (array) => {
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
    const updatedCards = cards.map((card) => {
      if (card.id === clickedCardId && !card.isFlipped) {
        return { ...card, isFlipped: true };
      }
      return card;
    });

    const flippedCard = updatedCards.find((card) => card.id === clickedCardId);

    // Check for matching cards
    if (flippedCard) {
      const flippedPair = flippedCards.concat(flippedCard);

      if (flippedPair.length === 2) {
        // Check if both flipped cards match
        if (flippedPair[0].name === flippedPair[1].name) {
          const updatedCardsAfterMatch = updatedCards.map((card) =>
            flippedPair.some((flipped) => flipped.id === card.id)
              ? { ...card, isFlipped: true }
              : card
          );

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
        }, 500);
      } else {
        setFlippedCards(flippedPair);
      }
    }

    setCards(updatedCards);
  };

  const handleStart = () => {
    setFinished(false);
    setIsStart(true);
    setStart(true);
  };

  useEffect(() => {
    console.log("chala ye");
  }, [matchedPairs]);

  return (
    <div className="w-[70%] h-[88%] bg-neutral-50 shadow-md flex flex-wrap justify-center items-center mt-[-50px] rounded-md">
      {isFinished ? (
        <div className="flex-col justify-center items-center text-center">
          <img src={gameOver} alt="gameover" width={200} className="ml-4" />
          <div className="mt-4 font-bold text-lg">
            Well Done! You Score {myScore}/90
          </div>
          <button className="button-89 mt-4" onClick={handleStart}>
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
              className="w-40 h-48"
              src={card.isFlipped ? card.image : backImage}
              alt={card.isFlipped ? `Card ${card.id}` : "Card Back"}
            />
          </div>
        ))
      ) : (
        <div>
          <p className="w-96 mb-4 font-semibold text-lg">
            You will have one minute to match all the pairs. Each matched pair
            will give you 10 points.
          </p>
          <button className="button-89" onClick={handleStart}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(MainGrid);
