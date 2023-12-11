import { TInfiniteResponse, TTweet } from '@/app/types/db'
import { unlikeTweet, likeTweet } from '@/app/utils/tweets'
import { type QueryKey, type InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import { HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type { FC } from 'react'

type LikeTweetProps = {
    likes: { id: string }[]
    count: number
    Qkey: QueryKey,
    tweetId: string
    isInfiniteQuery?: boolean
}

const LikeTweet: FC<LikeTweetProps> = ({ likes, count, Qkey, tweetId, isInfiniteQuery = true }) => {

    const { data: session } = useSession()
    const queryClient = useQueryClient()
    const userHasLiked = likes.find(like => like.id === session?.user.id)

    const { mutate, isPending } = useMutation({
        mutationKey: Qkey,
        mutationFn: async () => (
            userHasLiked ? await unlikeTweet({ userId: session?.user.id, tweetId }) : await likeTweet({ userId: session?.user.id, tweetId })
        ),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: Qkey })
            const previousLikes = queryClient.getQueryData(Qkey)

            if (isInfiniteQuery) {
                queryClient.setQueryData<unknown>(Qkey, (old: InfiniteData<TInfiniteResponse<TTweet[]>>) => (
                    {
                        ...old,
                        pages: old.pages.map(page => ({
                            ...page,
                            data: page.data.map(tweet => {
                                if (tweet.id === tweetId) {
                                    return {
                                        ...tweet,
                                        likes: userHasLiked ? (
                                            tweet.likes.filter(t => t.id !== session?.user.id)
                                        ) : (
                                            [...tweet.likes, { id: session?.user.id }]
                                        ),
                                        _count: { ...tweet._count, likes: userHasLiked ? tweet._count.likes - 1 : tweet._count.likes + 1 }
                                    }
                                }
                                return { ...tweet }
                            }),
                        }))
                    }
                ))
            } else {
                queryClient.setQueryData<unknown>(Qkey, (old: TTweet) => (
                    {
                        ...old,
                        likes: userHasLiked ? (
                            old.likes.filter(t => t.id !== session?.user.id)
                        ) : (
                            [...old.likes, { id: session?.user.id }]
                        ),
                        _count: { ...old._count, likes: userHasLiked ? old._count.likes - 1 : old._count.likes + 1 }
                    }
                ))
            }


            return { previousLikes }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(Qkey, context?.previousLikes)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: Qkey, })
        },
    })

    return (
        <>
            <button
                className="inline-flex gap-1 items-center group"
                onClick={() => mutate()}
                disabled={isPending}
            >
                <span className='group-hover:bg-red-400 p-2 rounded-full group-disabled:hover:bg-slate-400'><HeartIcon /></span>
                <span className='group-hover:text-red-400 group-disabled:hover:text-slate-400'>{count}</span>
            </button>
        </>
    )
}

export default LikeTweet
