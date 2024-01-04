'use client';

import { Feather } from 'lucide-react';
import { useState, ElementRef, useRef } from 'react';
import Modal from '../Modal';
import { adjustTextAreaHeight } from '@/app/utils/helpers';
import { useSession } from 'next-auth/react';
import ImageWithFallback from '../ImageWithFallback';
import { Button } from 'flowbite-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTweet } from '@/app/utils/tweets';

const SidebarTweet = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const replyRef = useRef<ElementRef<'textarea'>>(null);
  const [reply, setReply] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['tweets'],
    mutationFn: async (reply: string) => {
      setReply('');
      await postTweet({ userId: session?.user.id, body: reply });
      handleClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!replyRef.current) return;
    adjustTextAreaHeight(replyRef.current);
    setReply(e.target.value);
  }

  function handleClose() {
    setIsOpen(false);
    setReply('');
  }

  return (
    <>
      <button
        className='flex w-full items-center justify-center rounded-full bg-blue py-2 capitalize hover:bg-opacity-default'
        onClick={() => setIsOpen(true)}
      >
        <Feather className='md:hidden' />
        <span className='hidden md:block'>Tweet</span>
      </button>
      <Modal
        header='Tweet'
        isOpen={isOpen}
        onClose={handleClose}
      >
        <div className='flex h-full items-start gap-4 overflow-hidden'>
          <div className='h-10 w-10'>
            <ImageWithFallback
              alt='profile image'
              src={session?.user?.image}
              width={20}
              height={20}
              className='h-full w-full rounded-full'
            />
          </div>
          <textarea
            ref={replyRef}
            value={reply}
            placeholder='What is happening?'
            className='min-h-[4rem] flex-grow resize-none bg-transparent text-lg'
            onChange={onChange}
          />
          <Button
            className='ml-auto rounded-full p-0'
            disabled={reply.length === 0 || reply.length > 256}
            onClick={() => mutation.mutate(reply)}
          >
            Post
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SidebarTweet;
