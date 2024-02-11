import { IconQuestionMark } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import getGame from "@/app/functions/getGame";
import Image from "next/image";
import "@/styles/title.css";

export default function Game({
  points,
  addPoints,
}: {
  points: number;
  addPoints: (p: number) => void;
}) {
  const [forceUpdate, setForceUpdate] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "loading">("idle");
  const [game, setGame] = useState<any>();

  const loadNewGame = (setLoading?: boolean) => {
    if (setLoading !== false) {
      setState("loading");
    }
    getGame().then((res) => {
      if (res.success) {
        setGame([res.item, res.options]);
        setState("playing");
        setForceUpdate((prev) => !prev);
      }
    });
  };

  return (
    <div className="w-full h-full p-2 flex items-center justify-center bg-black rounded-xl">
      <Body
        state={state}
        setState={setState}
        addPoints={addPoints}
        loadNewGame={loadNewGame}
        game={game}
      />
    </div>
  );
}

function Body({
  state,
  setState,
  addPoints,
  loadNewGame,
  game,
}: {
  state: "idle" | "playing" | "loading";
  setState: (s: "idle" | "playing" | "loading") => void;
  addPoints: (p: number) => void;
  loadNewGame: (isLoading?: boolean) => void;
  game: any;
}) {
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const reset = () => {
    setWon(false);
    setLost(false);
  };

  if (state === "idle") {
    return (
      <div className="w-full h-full p-2 flex flex-col items-center justify-center bg-black rounded-xl">
        <h1 className="text-3xl font-bold text-white title">ARMY Arena</h1>
        <button
          onClick={() => loadNewGame()}
          className="max-w-xs mt-10 p-3 text-sm text-center outline-0 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transition-all font-bold text-white"
        >
          Start now
        </button>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="w-full h-full p-2 flex flex-col items-center justify-center bg-black rounded-xl">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
        <button
          onClick={() => setState("idle")}
          className="p-3 mt-3 text-sm text-center outline-0 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-white"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  const [item, options] = game;

  // create a clone of options in random order
  let randomOptions = [...options];
  for (let i = randomOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomOptions[i], randomOptions[j]] = [randomOptions[j], randomOptions[i]];
  }

  const selectOption = (right: boolean) => {
    if (right) {
      setWon(true);
      addPoints(10);
    } else {
      setWon(false);
      setLost(true);
    }
  };

  const image = item?.album?.cover_xl;

  return (
    <div className="flex items-cneter gap-6 w-full h-full flex-col justify-center lg:flex-row">
      <div className="w-full lg:min-w-[30%] lg:max-w-[30%] h-full rounded-xl flex items-center justify-center relative">
        <Image
          src={image}
          alt={item.name}
          width={300}
          height={300}
          className="w-full h-full rounded-xl object-cover border-1 blur-3xl opacity-20 absolute"
        />
        <div className="w-full h-full rounded-xl flex flex-col items-center justify-center absolute z-10">
          <audio src={item.preview} autoPlay loop />
          <div
            className={`min-w-[200px] min-h-[200px] rounded-xl bg-white/10 flex items-center justify-center ${won || lost ? "scale-0 hidden" : "scale-100"} transition-all duration-500}`}
          >
            <IconQuestionMark />
          </div>
          <Image
            src={image}
            alt={item.title}
            width={200}
            height={200}
            className={`rounded-xl object-cover border-1 border-white/30 ${won || lost ? "scale-100" : "hidden scale-0"} transition-all duration-500`}
          />
          <div
            className={`flex flex-col items-center ${won || lost ? "scale-100" : "scale-0 hidden"} transition-all duration-500}`}
          >
            <h1 className="text-xl font-bold text-white title mt-6">
              {item?.title}
            </h1>
            <p className="opacity-70">{item?.album?.title}</p>
          </div>
        </div>
      </div>
      {won === false && lost === false && (
        <div className="w-full h-full flex grid grid-cols-2 gap-3">
          {randomOptions.map((option) => (
            <button
              key={option?.item?.title}
              onClick={() => selectOption(option?.right)}
              className="p-2 text-sm outline-0 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-white"
            >
              {option?.item?.title}
            </button>
          ))}
        </div>
      )}
      {won && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white title mb-6">You won!</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                reset();
                loadNewGame();
                randomOptions = [];
              }}
              className="p-3 text-sm text-center outline-0 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transition-all font-bold text-white"
            >
              Next
            </button>
            <button
              className="p-3 text-sm text-center outline-0 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-white"
              onClick={() => {
                reset();
                setState("idle");
                randomOptions = [];
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
      {lost && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-white text-red-500">
            You lost!
          </h1>
          <p className="opacity-70 mb-6">Try again next time</p>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                reset();
                loadNewGame();
                randomOptions = [];
              }}
              className="p-3 text-sm text-center outline-0 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transition-all font-bold text-white"
            >
              Try again
            </button>
            <button
              className="p-3 text-sm text-center outline-0 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-bold text-white"
              onClick={() => {
                reset();
                setState("idle");
                randomOptions = [];
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
