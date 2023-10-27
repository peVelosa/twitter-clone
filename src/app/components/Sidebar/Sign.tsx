"use client";
import type { FC } from "react";
import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, type LucideIcon } from "lucide-react";

type SignProps = {
  mode: "sign-in" | "sign-out";
};

type signComponent = {
  label: string;
  icon: LucideIcon;
  fn: () => void;
  stroke: "stroke-green-400" | "stroke-red-400";
};

const signInComponent: signComponent = {
  label: "sign in",
  fn: signIn,
  icon: LogIn,
  stroke: "stroke-green-400",
};
const signOutComponent: signComponent = {
  label: "sign out",
  fn: signOut,
  icon: LogOut,
  stroke: "stroke-red-400",
};

const Sign: FC<SignProps> = ({ mode }) => {
  const {
    label,
    icon: Icon,
    fn,
    stroke,
  } = mode === "sign-in" ? signInComponent : signOutComponent;

  return (
    <>
      <button
        className="hover:bg-ghost flex w-fit items-center rounded-full p-2 capitalize"
        onClick={() => fn()}
      >
        <Icon className={stroke} />
        <span className="ml-4 hidden empty:hidden md:block">{label}</span>
      </button>
    </>
  );
};

export default Sign;
