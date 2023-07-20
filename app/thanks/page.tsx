"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { speak } from "../../lib/audio";
import { TEXTS } from "../../lib/lang";
import { getCookie } from "cookies-next";

export default function Thanks() {
  const router = useRouter();
  const lang = getCookie("lang")?.toString() || "en";
  useEffect(() => {
    speak(TEXTS.thanks, lang);
  }, [lang]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 text-black">
      <h1 className="text-8xl font-bold text-center">
        Change dispensed Successfully!!
      </h1>
      <p className="text-5xl mt-10 text-center">
        Thank you for using QuikChange!
      </p>
      <div className="flex flex-row mt-16 justify-around items-center w-full">
        <button
          className="bg-black hover:bg-white hover:text-black text-white text-3xl py-10 px-[6.5rem] rounded-lg"
          style={{ border: "ridge" }}
          onClick={() => router.push("/feedback")}
        >
          Feedback
        </button>
        <button
          className="bg-white hover:bg-black hover:text-white text-black text-3xl py-10 px-[6.5rem] rounded-lg"
          style={{ border: "ridge" }}
          onClick={() => router.push("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
