import { Button } from 'flowbite-react'
import React, { FC } from 'react'
import useIsFollowing from '@/hooks/useIsFollowing'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unfollowUser, followUser } from '@/utils/user'
import { TUser } from '@/types/db'

type IsFollowingComponentProps = {
    user: TUser
}

const IsFollowingComponent: FC<IsFollowingComponentProps> = ({ user }) => {

    const { data: session } = useSession()
    const queryClient = useQueryClient()

    const { isFollowing } = useIsFollowing({ userName: session?.user.userName, targetId: user.id })

    const mutation = useMutation({
        mutationKey: ['profile', session?.user.userName, 'following'],
        mutationFn: async ({ id }: { id: string }) => (
            isFollowing ?
                await unfollowUser({ userName: session?.user.userName, id })
                :
                await followUser({ userName: session?.user.userName, id })
        ),
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries({ queryKey: ['profile', session?.user.userName, 'following'] })

            const previousFollowing = queryClient.getQueryData(['profile', session?.user.userName, 'following'])

            queryClient.setQueryData(['profile', session?.user.userName, 'following'], (old: { data: TUser[] }) => (
                { data: isFollowing ? [...old.data.filter(user => user.id !== id)] : [...old.data, { ...user }] }
            ))

            return { previousFollowing }
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['profile', session?.user.userName, 'following'], context?.previousFollowing)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile', session?.user.userName, 'following'], })
        },
    })

    return (
        <>
            {session?.user && session.user?.id !== user.id && (
                <Button
                    className='ml-auto'
                    onClick={() => mutation.mutate({ id: user.id })}
                    disabled={mutation.isPending}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            )
            }
        </>
    )
}

export default IsFollowingComponent
