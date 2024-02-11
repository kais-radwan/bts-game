"use client";

import { useState } from "react";
import "@/styles/title.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [select, setSelect] = useState<string>("");

  const handleSelect = (value: string) => {
    setSelect(value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("name", name);
      localStorage.setItem("bias", select);
      window.location.href = "/";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="title text-3xl sm:text-5xl font-bold text-center gap-3 mb-2">
          Welcome to ARMY Arena
        </h1>
      </div>
      <input
        defaultValue={name}
        onChange={handleName}
        type="text"
        placeholder="Enter your name"
        className="w-full max-w-xs mt-10 p-3 text-xs text-center outline-0 rounded-xl border-1 border-white/20 bg-black/20 hover:border-white/30 focus:border-white/30"
      />

      <Select onValueChange={handleSelect} defaultValue={select}>
        <SelectTrigger className="border-1 border-white/20 w-[200px] mt-10 rounded-xl">
          <SelectValue placeholder="Select your bias" />
        </SelectTrigger>
        <SelectContent className="w-full max-w-xs mt-10 text-xs text-center outline-0 rounded-xl bg-black/20 backdrop-blur-xl border-white/20">
          <SelectGroup>
            <SelectLabel>Select your bias</SelectLabel>
            <SelectItem value="Jungkook">Jungkook</SelectItem>
            <SelectItem value="V">V</SelectItem>
            <SelectItem value="Jimin">Jimin</SelectItem>
            <SelectItem value="SUGA">SUGA</SelectItem>
            <SelectItem value="Jin">Jin</SelectItem>
            <SelectItem value="j-hope">j-hope</SelectItem>
            <SelectItem value="RM">RM</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <button
        onClick={() => handleSubmit()}
        className="w-full max-w-xs mt-10 p-3 text-sm text-center outline-0 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 transition-all"
      >
        Get started
      </button>

      {/* <div className="mt-10 opacity-70 flex flex-col gap-3">
        <p className="text-center mb-4">
          An open source project - Made with ❤️
        </p>
        <p className="text-center">DISCLAIMER:</p>
        <p className="text-center">
          1. This website is created by a fan and is not affiliated with BTS or
          Big Hit Entertainment.
        </p>
        <p className="text-center">
          2. All content is for entertainment purposes only and does not claim
          official endorsement.
        </p>
        <p className="text-center">
          3.This website is a tribute to BTS, made with love by an ARMY.
        </p>
      </div> */}
    </main>
  );
}
