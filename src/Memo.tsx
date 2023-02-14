import { GiElephant } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaSpider } from "react-icons/fa";
import { FaHorse } from "react-icons/fa";
import { GiBearFace } from "react-icons/gi";
import { IoFishSharp } from "react-icons/io5";
import { GiFly } from "react-icons/gi";
import { useEffect, useState } from "react";

interface MemoProps {
  theme: Boolean;
}

export function Memo({ theme }: MemoProps) {
  const animals = [
    { id: "1", icon: <GiElephant /> },
    { id: "2", icon: <FaDog /> },
    { id: "3", icon: <FaCat /> },
    { id: "4", icon: <FaSpider /> },
    { id: "5", icon: <FaHorse /> },
    { id: "6", icon: <GiBearFace /> },
    { id: "7", icon: <IoFishSharp /> },
    { id: "8", icon: <GiFly /> },
  ]
    .flatMap((animal) => [animal, animal])
    .sort(() => Math.random() - 0.5);

  const [time, setTime] = useState<number>(60);
  const [cards, setCards] = useState(animals);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    if (selected.length === 2) {
      if (cards[selected[0]].id === cards[selected[1]].id) {
        setGuessed([...guessed, cards[selected[0]].id]);
        setSelected([]);
      } else {
        setTimeout(() => {
          setSelected([]);
        }, 900);
      }
    }
  }, [selected]);

  const checkWinner = (guessed: (string | null)[]) => {
    if (guessed.length === 8) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (checkWinner(guessed)) {
      setPlay(false);
    }
  }, [guessed]);

  const reset = () => {
    setCards(animals);
    setGuessed([]);
    setSelected([]);
    setTime(60);
    setPlay(false);
  };

  const handleClick = (index: number) => {
    setSelected([...selected, index]);
    checkWinner(guessed);
  };

  useEffect(() => {
    let interval: number = 0;
    if (play) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [play, guessed]);

  useEffect(() => {
    if (time === 0) {
      setPlay(false);
      setGuessed([]);
    }
  }, [time]);

  return (
    <>
      <main className="flex flex-col">
        <div className="justify-center items-center flex flex-col">
          <h2
            className={`${
              theme ? "text-gray-300" : "text-gray-500"
            } text-4xl font-bold`}
          >
            {time}
          </h2>
        </div>
        <div
          className={`${
            theme ? "bg-gray-800" : "bg-gray-100"
          }  grid grid-flow-row grid-cols-4 grid-rows-4 gap-4 p-4`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex justify-center items-center w-20 h-20 rounded-lg shadow-md`}
            >
              {guessed.includes(card.id) || selected.includes(index) ? (
                <button
                  className={`${
                    theme
                      ? "bg-gray-500 text-gray-200"
                      : "bg-gray-200 text-gray-500 "
                  } flex  justify-center text-6xl items-center  rounded-lg shadow-md w-full h-full
                  `}
                >
                  {card.icon}
                </button>
              ) : (
                <button
                  className={`${
                    theme
                      ? "bg-gray-500 text-gray-100"
                      : "bg-gray-200 text-gray-500"
                  }  flex justify-center font-semibold text-6xl items-center w-full h-full rounded-lg shadow-lg
                  hover:bg-gray-300 hover:text-gray-500 transition duration-500 ease-in-out`}
                  onClick={() => handleClick(index)}
                  disabled={
                    selected.includes(index) ||
                    selected.length === 2 ||
                    play === false
                  }
                >
                  ?
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="container mt-3">
          <div className="flex flex-col items-center justify-center">
            {play ? (
              <button
                className="bg-gray-600 p-4 rounded-lg text-lg font-bold text-gray-200 w-[30%] shadow-lg"
                onClick={() => reset()}
              >
                Reset
              </button>
            ) : (
              <button
                className="bg-gray-600 p-4 rounded-lg text-lg font-bold text-gray-200 w-[30%] shadow-lg"
                onClick={() => {
                  setTime(60);
                  setPlay(true);
                  setGuessed([]);
                }}
              >
                Play
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
