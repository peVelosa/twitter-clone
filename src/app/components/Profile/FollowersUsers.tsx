import React, { useState, type FC } from 'react'
import Modal from '../Modal'
import { useQuery } from '@tanstack/react-query'
import { getUserFollowers } from '@/app/utils/user'
import ListUser from './ListUser'
import useCurrentUser from '@/app/hooks/useCurrentUser'

type FollowersUsersProps = { followers: number, userName: string }

const FollowersUsers: FC<FollowersUsersProps> = ({ followers, userName }) => {
    const [isOpenFollowers, setIsOpenFollowers] = useState<boolean>(false)

    const { data } = useQuery({
        queryKey: ['profile', userName, 'followers'],
        queryFn: async ({ signal }) => await getUserFollowers({ userName, signal }),
        enabled: isOpenFollowers
    })

    const onClose = () => setIsOpenFollowers(false)
    const onOpen = () => setIsOpenFollowers(true)

    return (
        <>
            <button onClick={onOpen}>Followers {followers}</button>
            <Modal
                isOpen={isOpenFollowers}
                onClose={onClose}
                header='Followers'
                size={'xl'}
            >
                <ListUser list={data?.data} />
            </Modal>
        </>
    )
}

export default FollowersUsers
