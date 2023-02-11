import { Link, Route, Routes } from "react-router-dom";
import { Tateti } from "./Tateti";
import { AiFillGithub } from "react-icons/ai";
import { Memo } from "./Memo";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<boolean>(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div
      className={`${theme ? "bg-gray-800" : "bg-gray-100"} text-gray-300
      flex
      flex-col
      justify-between
      items-center
      h-[100vh]`}
    >
      <header
        className="
        mt-6
        flex
        items-center
        justify-center
        bg-gray-600
        p-6
        w-[90%]
        sm:w-[60%]
        rounded-lg
        shadow-lg
        "
      >
        <nav>
          <ul
            className="
          flex
          flex-row
          items-center
          justify-between
          font-bold
          text-lg
          text-gray-100
          gap-3
         
        "
          >
            <li>
              <Link to="/tateti">Tateti</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <button
              className="
            absolute
            right-[2%]
            top-[1%]
            p-3
            rounded-lg
            sm:right-[17%]
            sm:top-[1%]
            md:right-[18%]
            lg:right-[19%]
            shadow-lg
            bg-gray-500
            "
              onClick={toggleTheme}
            >
              {theme ? (
                <BsSunFill className="font-bold text-gray-300 w-fill" />
              ) : (
                <FaMoon className="font-bold text-gray-300" />
              )}
            </button>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route element={<Tateti theme={theme} />} path="/tateti" />
        <Route element={<Memo theme={theme} />} path="/memo" />
      </Routes>
      {/* <div
        className={`
        ${theme ? "bg-gray-800" : "bg-gray-100"}
            flex
            flex-row
            items-center
            justify-center
            w-full
            h-20
              `}
      > */}
      <footer
        className={`
        ${theme ? "bg-gray-800" : "bg-gray-100"}
          flex
          flex-row
          text-lg 
          text-gray-400
          gap-2
          justify-center 
          items-center
          mb-3
        `}
      >
        <h3>Desarrollado por Juan Cruz</h3>
        <a href="https://github.com/juancruzmarq" target="_blank">
          <AiFillGithub className="" />
        </a>
      </footer>
      {/* </div> */}
    </div>
  );
}

export default App;
