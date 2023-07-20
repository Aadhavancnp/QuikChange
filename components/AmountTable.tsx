"use client";
import { Amount } from "@/interface/amount";
import React from "react";
import AmountTask from "./AmountTask";

interface Props {
  amounts: Amount[];
}

export default function AmountTable({ amounts }: Props) {
  return (
    <table className="table table-auto w-full text-center">
      <thead className="text-white bg-gray-800">
        <tr>
          <th>S.no</th>
          <th>Amount (INR)</th>
          <th>Available Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {amounts.map((amount: Amount) => {
          return <AmountTask key={amount.amount} amount={amount} />;
        })}
      </tbody>
    </table>
  );
}
