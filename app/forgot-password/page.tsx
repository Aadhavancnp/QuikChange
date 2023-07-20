"use client";
import { TEXTS } from "@/lib/lang";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-[600px] lg:w-[800px] sm:max-w-md">
          <div className="bg-white py-12 px-6 shadow rounded-lg sm:px-12">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
              FORGOT PASSWORD
            </h2>
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p className="text-center text-sm text-gray-700">{message}</p>
              <div>
                <button
                  type="submit"
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  onClick={() => setMessage(TEXTS.forgotPassword)}
                >
                  Reset Password
                </button>
              </div>
            </form>
            <div className="mt-5 text-sm text-center">
              <Link
                href="/login"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
