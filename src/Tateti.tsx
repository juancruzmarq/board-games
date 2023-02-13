import { MouseEventHandler, useState } from "react";
import { GiPawn } from "react-icons/gi";
import { BiCoffeeTogo } from "react-icons/bi";

interface TatetiProps {
  theme: Boolean;
}

export function Tateti({ theme }: TatetiProps) {
  const [turn, setTurn] = useState<number>(0);
  const [winner, setWinner] = useState<null | number>(null);
  const [draw, setDraw] = useState(false);
  const [board, setBoard] = useState<(number | null)[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const checkWinner = (board: (number | null)[][]) => {
    const winner =
      checkRows(board) || checkColumns(board) || checkDiagonals(board);
    return winner;
  };

  const checkRows = (board: (number | null)[][]) => {
    for (let i = 0; i < board.length; i++) {
      const row = board[i];
      if (row[0] !== null && row[0] === row[1] && row[0] === row[2]) {
        return row[0];
      }
    }
    return null;
  };

  const checkColumns = (board: (number | null)[][]) => {
    for (let i = 0; i < board.length; i++) {
      const column = board.map((row) => row[i]);
      if (
        column[0] !== null &&
        column[0] === column[1] &&
        column[0] === column[2]
      ) {
        return column[0];
      }
    }
    return null;
  };

  const checkDiagonals = (board: (number | null)[][]) => {
    const diagonal1 = board[0][0];
    const diagonal2 = board[0][2];

    if (
      diagonal1 !== null &&
      diagonal1 === board[1][1] &&
      diagonal1 === board[2][2]
    ) {
      return diagonal1;
    }

    if (
      diagonal2 !== null &&
      diagonal2 === board[1][1] &&
      diagonal2 === board[2][0]
    ) {
      return diagonal2;
    }

    return null;
  };

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    if (board[rowIndex][cellIndex] !== null) return; // Si la celda ya tiene un valor, no se puede cambiar
    if (winner) return; // Si hay un ganador, no se puede seguir jugando

    const newBoard = [...board];
    newBoard[rowIndex][cellIndex] = turn === 1 ? 1 : 2;
    setBoard(newBoard);

    const newTurn = turn === 1 ? 2 : 1;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    setWinner(newWinner);

    const newDraw = newBoard.every((row) => row.every((cell) => cell !== null));
    setDraw(newDraw);
  };

  const handleReset = () => {
    setTurn(1);
    setWinner(null);
    setDraw(false);
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
  };

  return (
    <main className="flex flex-col">
      <div className="flex justify-center">
        <h1
          className={`text-4xl tracking-widest mb-4 ${
            theme ? "text-gray-200" : "text-gray-500"
          }
            font-extrabold
            
          `}
        >
          TATETI
        </h1>
      </div>
      <div
        className="
        flex flex-col
        w-96 h-96
        justify-evenly
        items-center
      "
      >
        {board.map((row, rowIndex) => (
          <div className="flex justify-evenly w-full">
            {row.map((cell, cellIndex) => (
              <button
                key={cellIndex}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                className={`w-24 h-24 group flex items-center justify-center rounded-lg ${
                  theme ? "bg-gray-100" : "bg-gray-200"
                } px-4 py-3 shadow-[-2px_-2px_10px_rgba(255,255,255,1),3px_3px_10px_rgba(0,0,0,0.2)] active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_3px_3px_5px_rgba(0,0,0,0.1)]
                active:bg-gray-300 hover:bg-gray-200 hover:zoom-140 transition-all duration-300 ease-in-out hover:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_3px_3px_5px_rgba(0,0,0,0.1)]`}
              >
                {cell === 1 && (
                  <GiPawn className="text-4xl  font-bold  text-gray-600 flex text-center" />
                )}
                {cell === 2 && (
                  <BiCoffeeTogo className="text-4xl font-bold text-gray-600 flex text-center" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          {winner == null && !draw && (
            <div className="flex justify-center items-center gap-2">
              <h2
                className={`text-2xl font-bold mb-4  flex text-center ${
                  theme ? "text-gray-100" : "text-gray-500"
                }`}
              >
                Turno de
              </h2>
              {turn === 1 ? (
                <GiPawn
                  className={`text-2xl font-bold mb-4 ${
                    theme ? "text-gray-100" : "text-gray-600"
                  } flex text-center`}
                />
              ) : (
                <BiCoffeeTogo
                  className={`text-2xl font-bold mb-4 ${
                    theme ? "text-gray-100" : "text-gray-500"
                  } flex text-center`}
                />
              )}
            </div>
          )}

          <h2 className="text-2xl font-bold mb-4">
            {winner === 1 && (
              <>
                <div className="flex justify-center items-center gap-2">
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme ? "text-gray-100" : "text-gray-500"
                    } flex text-center`}
                  >
                    Ganó
                  </h2>
                  <GiPawn
                    className={`text-2xl font-bold mb-4 ${
                      theme ? "text-gray-100" : "text-gray-500"
                    } flex text-center`}
                  />
                </div>
              </>
            )}
            {winner === 2 && (
              <>
                <div className="flex justify-center items-center gap-2">
                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      theme ? "text-gray-100" : "text-gray-500"
                    } flex text-center`}
                  >
                    Ganó
                  </h2>
                  <BiCoffeeTogo
                    className={`text-2xl font-bold mb-4 ${
                      theme ? "text-gray-100" : "text-gray-500"
                    } flex text-center`}
                  />
                </div>
              </>
            )}
            {draw && !winner && (
              <div className="flex justify-center items-center gap-2">
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    theme ? "text-gray-100" : "text-gray-500"
                  } flex text-center`}
                >
                  Empate
                </h2>
              </div>
            )}
          </h2>
          <button
            onClick={handleReset}
            className="bg-gray-600 p-4 rounded-lg text-lg font-bold text-gray-200 shadow-lg"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </main>
  );
}
