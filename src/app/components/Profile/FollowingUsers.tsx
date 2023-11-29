import React, { useState, type FC } from 'react'
import Modal from '../Modal'
import { useQuery } from '@tanstack/react-query'
import { getUserFollowing } from '@/app/utils/user'
import ListUser from './ListUser'

type FollowingUsersProps = { following: number, userName: string }

const FollowingUsers: FC<FollowingUsersProps> = ({ following, userName }) => {
    const [isOpenFollowing, setIsOpenFollowing] = useState<boolean>(false)

    const { data } = useQuery({
        queryKey: ['profile', userName, 'following'],
        queryFn: async ({ signal }) => await getUserFollowing({ userName, signal }),
        enabled: isOpenFollowing
    })

    const onClose = () => setIsOpenFollowing(false)
    const onOpen = () => setIsOpenFollowing(true)

    return (
        <>
            <button onClick={onOpen}>Following {following}</button>
            <Modal
                isOpen={isOpenFollowing}
                onClose={onClose}
                header='Following'
                size={'xl'}
            >
                <ListUser list={data?.data} />
            </Modal>
        </>
    )
}

export default FollowingUsers
