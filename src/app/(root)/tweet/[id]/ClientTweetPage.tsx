'use client'
import Tweet from '@/app/components/Tweet/Tweet';
import { getTweet } from '@/app/utils/tweets';
import { useQuery } from '@tanstack/react-query';
import SingleTweet from '@/app/components/Tweet/SingleTweet';

const ClientTweetPage = ({ id }: { id: string }) => {

    const { data: tweet } = useQuery({
        queryKey: ['tweet', id],
        queryFn: async ({ signal }) => await getTweet({ tweetId: id, signal }),

    });

    if (!tweet) return <></>

    return (
        <SingleTweet {...tweet} />
    )
}

export default ClientTweetPage
