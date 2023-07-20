"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function AddAmount() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [value, setValue] = useState(0);

  const addAmountNo = async (amount: string, value: number) => {
    const res = await fetch("/api/amounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, value }),
    });
    const data = await res.json();
    return data;
  };

  const handleLogout = async () => {
    await fetch("/api/admins/logout", {
      method: "POST",
      body: JSON.stringify({
        key: "email",
      }),
    });
    router.replace("/");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addAmountNo(amount, value);
    setAmount("");
    setValue(0);
    setModalOpen(false);
    router.refresh();
  };

  const handleValueChange = (e: any) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setValue(parseInt(value));
    }
  };

  return (
    <div className="flex justify-around items-center ml-auto mr-8">
      <button
        className="flex flex-row items-center justify-center bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Add <AiOutlinePlus size={20} />
      </button>
      <span className="ml-2"></span>
      <button
        className="flex flex-row items-center justify-center bg-yellow-500 w-full hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout <FiLogOut size={20} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center w-full space-y-6">
            <h2 className="text-2xl font-bold text-center m-2">
              Add New Amount
            </h2>
            <div className="flex flex-col justify-center w-full">
              <label className="text-black font-bold text-lg">
                Amount (INR)
              </label>
              <input
                className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="text"
                placeholder="Amount"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col justify-center w-full">
              <label className="text-black font-bold text-lg">
                Available Count
              </label>
              <input
                className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="number"
                placeholder="Available Count"
                name="value"
                value={value}
                onChange={handleValueChange}
                required
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
