"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <>
      <button
        className="flex w-fit items-center rounded-full p-2 capitalize hover:bg-ghost"
        onClick={() => signOut()}
      >
        <LogOut className={"stroke-red-400"} />
        <span className="ml-4 hidden empty:hidden md:block">sign out</span>
      </button>
    </>
  );
};

export default SignOut;
