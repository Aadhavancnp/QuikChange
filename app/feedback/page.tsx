"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TEXTS } from "@/lib/lang";

export default function FeedBack() {
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponseMessage(TEXTS.feedback);
    setFeedback("");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 w-full text-black">
      <h1 className="text-7xl font-bold text-center">FeedBack Form</h1>
      <form
        className="flex flex-col justify-center items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex mt-20 flex-row justify-around items-start w-full">
          <label className="text-3xl font-bold text-center">Feedback:</label>
          <div className="flex flex-col">
            <textarea
              className="text-lg rounded-lg border-2 border-black h-52"
              placeholder="Write something..."
              cols={70}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
            />
          </div>
        </div>
        <p className="text-center mt-8 text-[1.5rem]">{responseMessage}</p>
        <div className="flex flex-row justify-around items-center w-full mt-3">
          <button
            type="submit"
            className="bg-white hover:bg-black hover:text-white text-black text-3xl py-7 px-[4.5rem] rounded-lg"
          >
            Submit
          </button>
          <button
            className="bg-white hover:bg-black hover:text-white text-black text-3xl py-7 px-[4.5rem] rounded-lg"
            onClick={() => router.push("/")}
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
}
