"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { speak } from "../../lib/audio";
import { TEXTS } from "../../lib/lang";
import { getCookie } from "cookies-next";

export default function Deposit() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dots, setDots] = useState("");
  const [nextDisabled, setNextDisabled] = useState(true);
  const lang = getCookie("lang")?.toString() || "en";
  useEffect(() => {
    speak(TEXTS.depositAmount, lang);
  }, [lang]);
  const handleDepositClick = () => {
    setMessage("Collecting cash");
    const interval = setInterval(() => {
      setDots((dots) => (dots.length < 6 ? dots + "." : ""));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setDots("");
      setMessage("Cash collected!");
      speak("Click on the Next button.", lang);
      setNextDisabled(false);
    }, 3000);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-black">
      <h1
        className="text-[5.5rem] font-bold text-center"
        style={{ lineHeight: "1" }}
      >
        Deposit Your Amount
      </h1>
      <div className="flex flex-col items-center justify-center mt-10">
        <button
          className="bg-white border-black border-2 hover:bg-black hover:text-white text-black text-3xl py-9 px-[4.5rem] rounded-3xl"
          onClick={handleDepositClick}
        >
          Deposit Amount
        </button>
      </div>
      <p id="message" className="text-center mt-10 text-[1.5rem]">
        {message}
        {dots}
      </p>
      <div className="flex flex-col items-end w-full justify-center mt-20 ml-80">
        <button
          className="bg-white border-black border-2 hover:bg-black hover:text-white text-black text-3xl py-9 px-[4.5rem] rounded-3xl disabled:opacity-[0.3] disabled:cursor-not-allowed"
          disabled={nextDisabled}
          onClick={() => router.push("/denominations")}
        >
          Next
        </button>
      </div>
    </div>
  );
}
