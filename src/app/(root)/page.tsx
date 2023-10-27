"use client";
import { signIn, signOut } from "next-auth/react";

// import { UserButton } from "@clerk/nextjs";

const Home = () => {
  return (
    <div>
      <button onClick={() => signIn()}>login</button>
      <button onClick={() => signOut()}>signout</button>
      <p>This is home page</p>
    </div>
  );
};

export default Home;
