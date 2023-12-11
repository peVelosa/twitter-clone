'use client'

import { useSession } from "next-auth/react"
import ImageWithFallback from "../ImageWithFallback"
import { Button } from "flowbite-react"
import { FC, useState } from "react"
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"
import { commentTweet } from "@/app/utils/tweets"

type NewCommentProps = {
    Qkey: QueryKey,
    tweetId: string
}

const NewComment: FC<NewCommentProps> = ({ Qkey, tweetId }) => {

    const { data: session } = useSession()
    const [reply, setReply] = useState("")
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationKey: Qkey,
        mutationFn: async (reply: string) => {
            setReply("")
            await commentTweet({ tweetId, ownerId: session?.user.id, body: reply })
        },
        onMutate: async (reply) => {
            await queryClient.cancelQueries({ queryKey: [...Qkey, "comments"] })
            const previousComments = queryClient.getQueryData([...Qkey, "comments"])
            queryClient.setQueryData<unknown>([...Qkey, "comments"], (old: any) => (
                {
                    ...old,
                    pages: [...old.pages, [{
                        id: Math.floor(Math.random() + 1000),
                        owner: { ...session?.user },
                        body: reply,
                        likes: [],
                        updatedAt: new Date(),
                        _count: { likes: 0 }
                    }]]
                }
            ))
            return { previousComments }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(Qkey, context?.previousComments)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: Qkey, })
        },
    })


    return (
        <>
            <div className="flex items-center gap-4">
                <div className="h-10 w-10">
                    <ImageWithFallback
                        alt="profile image"
                        src={session?.user?.image}
                        width={20}
                        height={20}
                        className="w-full h-full rounded-full"
                    />
                </div>
                <input
                    placeholder="Post your reply!"
                    className="bg-transparent placeholder-white/80 focus-within:outline-0"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />
                <Button className="ml-auto rounded-full p-0" onClick={() => mutation.mutate(reply)}>Reply</Button>
            </div>
        </>
    )
}

export default NewComment
