import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Amount } from "@/interface/amount";
import AddAmount from "@/components/AddAmount";
import AmountTable from "@/components/AmountTable";

async function getAmounts() {
  try {
    const apiUrl = process.env.API_URL;
    const res = await fetch(`${apiUrl}/api/amounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    const amounts: Amount[] = data.data;
    return amounts;
  } catch (error) {
    console.error("Error fetching amounts:", error);
    return [];
  }
}

export default async function Admin() {
  const email = cookies().get("email")?.value;
  const amounts = await getAmounts();
  if (!email) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <p className="absolute top-0 right-0 text-black py-7 mr-5">{email}</p>
      <h1 className="text-3xl text-black font-bold">Admin</h1>
      <AddAmount />
      <div className="w-full max-w-screen-md bg-white rounded-lg shadow-md mt-4">
        <AmountTable amounts={amounts} />
      </div>
    </div>
  );
}
