import { getTweet } from '@/app/utils/tweets'
import { getUserFollowing } from '@/app/utils/user'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'
import ClientTweetPage from './ClientTweetPage'

const TweetPage = async ({ params: { id } }: { params: { id: string } }) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['tweet', id],
        queryFn: async ({ signal }) => await getTweet({ id, signal }),
    })

    return (
        <>
            <ClientTweetPage id={id} />
        </>
    )
}

export default TweetPage
