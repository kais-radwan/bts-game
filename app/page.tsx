"use client";

import { useState, useEffect } from "react";
import {
  IconSearch,
  IconPhoto,
  IconMusic,
  IconHome,
  IconUser,
} from "@tabler/icons-react";
import "@/styles/title.css";
import images from "@/lib/images";
import Image from "next/image";
import Game from "@/components/game";

export default function Home() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [bias, setBias] = useState<string | undefined>(undefined);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const localName = localStorage.getItem("name");
    const localBias = localStorage.getItem("bias");
    const localPoints = localStorage.getItem("points");

    if (localPoints) {
      setPoints(parseInt(localPoints));
    }

    if (!localName || !localBias) {
      window.location.href = "/welcome";
      return;
    }
    setName(localName);
    setBias(localBias);
  }, []);

  if (!name || !bias) {
    return null;
  }

  const addPoints = (p: number) => {
    localStorage.setItem("points", (points + p).toString());
    setPoints((prev) => prev + p);
  };

  const image = images[bias as keyof typeof images];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#a27eac] to-[#5f2568] opacity-20 z-10 backdrop-blur-lg"></div>
      <div className="fixed top-0 left-0 w-screen p-4 h-screen min-h-screen max-h-screen z-50 flex flex-col gap-6">
        <div className="w-full flex items-center z-50">
          <div className="p-3 pr-6 pl-6 h-14 min-w-max rounded-xl bg-black text-white flex items-center gap-3">
            <Image
              src={image}
              alt={bias}
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold">{name}</h1>
            <h1 className="text-xl font-bold">-</h1>
            <h1 className="text-xl font-bold">{bias}</h1>
          </div>
          <div className="w-full"></div>
          <div className="p-3 h-14 min-w-max rounded-xl bg-black text-white flex items-center pr-6">
            <Image
              src="/imgs/diamond.png"
              alt="diamond"
              width={48}
              height={48}
            />
            <div className="font-bold opacity-80">
              <span className="text-3xl">{points}</span>
            </div>
          </div>
        </div>
        <Game points={points} addPoints={addPoints} />
      </div>
    </main>
  );
}
