import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import React from "react";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-[600px] lg:w-[800px] sm:max-w-md">
          <div className="bg-white py-12 px-6 shadow rounded-lg sm:px-12">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-900">
              Register
            </h2>
            <RegisterForm />
            <div className="mt-5 text-sm text-center text-gray-900">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
