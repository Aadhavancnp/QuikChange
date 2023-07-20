import React from "react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-[600px] lg:w-[800px] sm:max-w-md">
          <div className="bg-white py-12 px-6 shadow rounded-lg sm:px-12">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
              LOGIN
            </h2>
            <LoginForm />
            <div className="mt-5 text-sm text-center text-gray-900">
              Create an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
