'use client';
import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <>
      <button
        className='flex w-fit items-center rounded-full p-2 capitalize hover:bg-ghost'
        onClick={() => signIn('github')}
      >
        <LogIn className={'stroke-green-400'} />
        <span className='ml-4 hidden empty:hidden md:block'>sign in</span>
      </button>
    </>
  );
};

export default SignIn;
