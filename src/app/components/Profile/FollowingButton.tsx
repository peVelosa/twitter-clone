import { getUserFollowing } from '@/app/utils/user'
import { useQuery } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import Modal from '../Modal'
import ListUser from './ListUser'

type FollowingButtonProps = {
    userName: string
}

const FollowingButton: FC<FollowingButtonProps> = ({ userName }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)


    const { data: following } = useQuery({
        queryKey: ['profile', userName, "following"],
        queryFn: async ({ signal }) => await getUserFollowing({ userName, signal }),
    })
    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)

    return (
        <>
            <button onClick={onOpen}>Following {following.data.length}</button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                header='Following'
                size={'xl'}
            >
                <ListUser list={following?.data} />
            </Modal>
        </>
    )
}

export default FollowingButton
