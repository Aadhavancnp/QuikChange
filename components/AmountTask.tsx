import { Amount } from "@/interface/amount";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface Props {
  amount: Amount;
}

export default function AmountTask({ amount }: Props) {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [amountToEdit, setAmountToEdit] = useState(amount.amount);
  const [valueToEdit, setValueToEdit] = useState(amount.value);
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const editAmount = async (amount: string, value: number) => {
    const res = await fetch("/api/amounts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, value }),
    });
    const data = await res.json();
    return data;
  };

  const deleteAmount = async (amount: string) => {
    const res = await fetch("/api/amounts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    return data;
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    await editAmount(amountToEdit, valueToEdit);
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleSubmitDelete = async (amount: string) => {
    await deleteAmount(amount);
    setOpenModalDelete(false);
    router.refresh();
  };
  const handleValueChange = (e: any) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setValueToEdit(parseInt(value));
    }
  };

  return (
    <tr key={amount.id} className="text-black">
      <td>{amount.id}</td>
      <td>{amount.amount}</td>
      <td>{amount.value}</td>
      <td>
        <div className="flex justify-around items-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpenModalEdit(true)}
          >
            <FiEdit size={25} />
          </button>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEdit}>
              <div className="flex flex-col items-center justify-center w-full  space-y-6">
                <h2 className="text-2xl font-bold text-center m-2">
                  Edit Amount
                </h2>
                <div className="flex flex-col justify-center w-full items-start">
                  <label className="text-black font-bold text-lg">
                    Amount (INR)
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={amountToEdit}
                    onChange={(e) => setAmountToEdit(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col justify-center w-full items-start">
                  <label className="text-black font-bold text-lg">
                    Available Count
                  </label>
                  <input
                    className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="number"
                    placeholder="Available Count"
                    name="value"
                    value={valueToEdit}
                    onChange={handleValueChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpenModalDelete(true)}
          >
            <FiTrash2 size={25} />
          </button>
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">
              Are you sure want to delete this Amount ?
            </h3>
            <div className="modal-action">
              <button
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleSubmitDelete(amount.amount)}
              >
                Yes
              </button>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  );
}
