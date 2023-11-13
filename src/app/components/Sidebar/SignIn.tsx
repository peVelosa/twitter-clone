"use client";
import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Modal from "../Modal";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username_email = e.target["username-email"].value as string;
    const password = e.target.password.value;
    await signIn("credentials", {
      username: username_email,
      password: password,
    });
  };

  return (
    <>
      <button
        className="flex w-fit items-center rounded-full p-2 capitalize hover:bg-ghost"
        onClick={() => setIsOpen(true)}
      >
        <LogIn className={"stroke-green-400"} />
        <span className="ml-4 hidden empty:hidden md:block">sign in</span>
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <form
          className="grid w-full gap-4"
          onSubmit={onSubmit}
        >
          <div>
            <label htmlFor="username-email">Username or Email</label>
            <input
              name="username-email"
              type="text"
              id="username-email"
              className="block w-full rounded-md px-2 py-1"
              required
              placeholder="Username or email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              className="block w-full rounded-md px-2 py-1"
              required
              placeholder="Password"
            />
          </div>
          <div className="mx-auto w-full">
            <button
              className="flex w-full items-center justify-start rounded-md bg-white p-4"
              type="submit"
            >
              <span className="w-full text-center">Log in</span>
            </button>
          </div>
        </form>
        <div className="relative isolate w-full before:absolute before:left-0 before:top-1/2 before:-z-10 before:h-[1px] before:w-full before:-translate-y-1/2 before:bg-neutral-400 before:content-['']">
          <p className="relative z-10 mx-auto w-fit bg-slate-300 px-4 text-center">
            or
          </p>
        </div>
        <div className="mx-auto w-full">
          <button
            className="flex w-full items-center justify-start rounded-md bg-black p-4 text-white"
            onClick={() => signIn("github")}
          >
            <Github className="h-8 w-8 rounded-full bg-white fill-white stroke-black p-1" />
            <span className="w-full text-center">Sign in With Github</span>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SignIn;
