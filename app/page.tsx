"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LANGUAGES, TEXTS } from "@/lib/lang";
import { speak, translateText } from "@/lib/audio";
import { setCookie, getCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();
  const lang = getCookie("lang")?.toString() || "en";

  const playInstructions = async (language: keyof typeof LANGUAGES) => {
    if (language === "english") {
      speak(TEXTS.welcome, LANGUAGES.english);
      setCookie("lang", LANGUAGES.english);
    } else {
      const translatedlang = LANGUAGES[language];
      const translatedText = await translateText(
        TEXTS.welcome,
        "en",
        translatedlang
      );
      speak(translatedText, translatedlang);
      setCookie("lang", translatedlang);
    }
  };
  useEffect(() => {
    const key = Object.keys(LANGUAGES).find(
      (k) => LANGUAGES[k as keyof typeof LANGUAGES] === lang
    ) as keyof typeof LANGUAGES;
    playInstructions(key);
  }, [lang]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black">
      <h1
        className="text-[7.5rem] font-bold text-center"
        style={{
          lineHeight: "1",
        }}
      >
        QuikChange
      </h1>
      <h3 className="font-bold text-4xl ml-80">
        Change Dispensed...Happiness Increased!!
      </h3>
      <div className="flex flex-row mt-16 justify-around items-center w-full">
        <button
          className="bg-black hover:bg-white hover:text-black text-white text-3xl py-7 px-[6.5rem] rounded-lg"
          style={{ border: "ridge" }}
          onClick={() => router.push("/login")}
        >
          Admin
        </button>
        <button
          className="bg-white hover:bg-black hover:text-white text-black text-3xl py-7 px-[6.5rem] rounded-lg"
          style={{ border: "ridge" }}
          onClick={() => router.push("/deposit")}
        >
          User
        </button>
      </div>
      <div className="flex flex-row justify-around items-center w-full mt-16">
        <button
          className="bg-white border-black border-[medium] hover:bg-black hover:text-white text-black text-base p-8 rounded-lg"
          onClick={async () => await playInstructions("english")}
        >
          Play Instructions (English)
        </button>
        <button
          className="bg-white border-black border-[medium] hover:bg-black hover:text-white text-black text-base p-8 rounded-lg"
          onClick={async () => await playInstructions("hindi")}
        >
          Play Instructions (Hindi)
        </button>
        <button
          className="bg-white border-black border-[medium] hover:bg-black hover:text-white text-black text-base p-8 rounded-lg"
          onClick={async () => await playInstructions("tamil")}
        >
          Play Instructions (Tamil)
        </button>
      </div>
    </div>
  );
}
