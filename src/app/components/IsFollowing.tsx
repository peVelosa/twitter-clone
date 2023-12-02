import { Button } from 'flowbite-react'
import React, { FC } from 'react'
import useIsFollowing from '@/hooks/useIsFollowing'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unfollowUser, followUser } from '@/utils/user'

type IsFollowingComponentProps = {
    targetId: string
}

const IsFollowingComponent: FC<IsFollowingComponentProps> = ({ targetId }) => {

    const { data: session } = useSession()
    const queryClient = useQueryClient()

    const isFollowing = useIsFollowing({ userName: session?.user.userName, targetId })

    const mutation = useMutation({
        mutationFn: async ({ isFollowing, id }: { isFollowing: boolean, id: string }) => (
            isFollowing ?
                await unfollowUser({ userName: session?.user.userName, id })
                :
                await followUser({ userName: session?.user.userName, id })
        ),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', session?.user.userName] })
            queryClient.invalidateQueries({ queryKey: ['profile', session?.user.userName, 'following'], })
        },
    })

    return (
        <>
            {session?.user && session.user?.id !== targetId && (
                <Button
                    className='ml-auto'
                    onClick={() => mutation.mutate({ isFollowing, id: targetId })}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )
            }
        </>
    )
}

export default IsFollowingComponent
