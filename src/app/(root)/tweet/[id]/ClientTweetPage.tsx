'use client'
import { getTweet } from '@/app/utils/tweets';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const ClientTweetPage = ({ id }: { id: string }) => {

    const { data: tweet } = useQuery({
        queryKey: ['tweet', id],
        queryFn: async ({ signal }) => await getTweet({ id, signal }),

    });

    console.log(tweet)

    return (
        <div>ClientTweetPage</div>
    )
}

export default ClientTweetPage
