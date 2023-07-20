"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import box from "@/public/assets/svg/box.svg";
import cross from "@/public/assets/svg/cross.svg";
import textbox from "@/public/assets/images/textbox.png";
import blackbox from "@/public/assets/svg/black-box.svg";

const denominations = [500, 200, 100, 50, 20, 10];

export default function Denominations() {
  const router = useRouter();
  const [values, setValues] = useState(
    Object.fromEntries(denominations.map((denomination) => [denomination, 0]))
  );

  const handleValueChange = (denomination: number, value: string) => {
    setValues((values) => ({ ...values, [denomination]: Number(value) }));
  };

  const total = denominations.reduce(
    (sum, denomination) => sum + values[denomination] * denomination,
    0
  );

  return (
    <div className="flex w-full justify-between text-black">
      <div className="flex flex-col w-1/2">
        {denominations.map((denomination) => (
          <div
            key={denomination}
            className="flex flex-row m-2 justify-around items-center"
          >
            <div className="relative">
              <Image src={box} alt="box" width={200} height={200} />
              <p className="text-bold text-3xl absolute top-20 left-35">
                {denomination}
              </p>
            </div>
            <Image src={cross} alt="cross" width={50} height={50} />
            <div className="relative">
              <Image src={textbox} alt="box" width={75} height={75} />
              <input
                type="number"
                value={values[denomination]}
                onChange={(event) =>
                  handleValueChange(denomination, event.target.value)
                }
                className="absolute top-1 left-1 box-input form-input rounded"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/2">
        <div className="mt-20">
          <div className="flex flex-row mt-7 p-5 justify-around items-center">
            <h1 className="text-4xl">AMOUNT :</h1>
            <div className="relative">
              <Image src={blackbox} alt="box" width={200} height={200} />
              <input
                type="number"
                defaultValue={total}
                className="absolute top-1 left-1 box-input-extended form-input rounded"
              />
            </div>
          </div>
          <div className="flex flex-row mt-7 p-5 justify-around items-center">
            <h1 className="text-4xl">TOTAL :</h1>
            <div className="relative">
              <Image src={blackbox} alt="box" width={200} height={200} />
              <input
                type="number"
                value={total}
                readOnly
                className="absolute top-1 left-1 box-input-extended form-input rounded"
              />
            </div>
          </div>
          <div className="flex flex-row justify-around items-center mt-16">
            <button
              className="bg-white border-black border-2 hover:bg-black hover:text-white text-black text-3xl py-7 px-[4rem] rounded-3xl disabled:opacity-[0.3] disabled:cursor-not-allowed"
              disabled={total === 0}
              onClick={() => router.push("/thanks")}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
