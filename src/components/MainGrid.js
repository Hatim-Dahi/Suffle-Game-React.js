import React, { memo, useState, useEffect } from "react";
import backImage from "../assests/images/card-back.jpg";
import cardImages from "./AllCards";

const MainGrid = ({ setIsStart, setScore }) => {
  const [cards, setCards] = useState([]);
  const [start, setStart] = useState(false);
  const [myScore, setMyScore] = useState(0);
  const [flippedCards, setFlippedCards] = useState([]);

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

  const handleCardClick = (clickedCardId) => {
    const updatedCards = cards.map((card) => {
      if (card.id === clickedCardId && !card.flipped) {
        return { ...card, flipped: true };
      }
      return card;
    });

    const flippedCard = updatedCards.find((card) => card.id === clickedCardId);

    // Check for matching cards
    if (flippedCard) {
      console.log("yes flippcard");
      const flippedPair = flippedCards.concat(flippedCard);

      if (flippedPair.length === 2) {
        console.log("yes length =2");
        // Check if both flipped cards match
        if (flippedPair[0].image === flippedPair[1].image) {
          console.log("yes matcheed");

          const currScore = myScore + 10;
          setMyScore(currScore);
          setScore(currScore);
        }

        setTimeout(() => {
          const newCards = updatedCards.map((card) => {
            if (flippedPair.includes(card)) {
              return { ...card, flipped: false };
            }
            return card;
          });
          setCards(newCards);
          setFlippedCards([]);
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
  useEffect(() => {}, [start]);
  return (
    <div className="w-[70%] h-[88%] bg-neutral-50 shadow-md flex flex-wrap justify-center items-center mt-[-50px] rounded-md ">
      {start ? (
        cards.map((card) => (
          <div
            key={card.id}
            className={`p-2 cursor-pointer card-container ${
              card.flipped ? "flipped" : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <img
              className="w-40 h-48"
              src={card.flipped ? card.image : backImage}
              alt={card.flipped ? `Card ${card.id}` : "Card Back"}
            />
          </div>
        ))
      ) : (
        <div>
          <p className="w-96 mb-4 font-semibold text-lg">
            You will have one minute to match all the pairs Each matched pair
            will give you 10 points
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
