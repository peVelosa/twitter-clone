import { getUserFollowers } from '@/app/utils/user'
import { useQuery } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import Modal from '../Modal'
import ListUser from './ListUser'



type FollowersButtonProps = {
    userName: string
}


const FollowersButton: FC<FollowersButtonProps> = ({ userName }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)


    const { data: followers } = useQuery({
        queryKey: ['profile', userName, "followers"],
        queryFn: async ({ signal }) => await getUserFollowers({ userName, signal }),
    })

    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)

    return (
        <>
            <button onClick={onOpen}>Following {followers.data.length}</button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                header='Followers'
                size={'xl'}
            >
                <ListUser list={followers?.data} />
            </Modal>
        </>
    )
}

export default FollowersButton
