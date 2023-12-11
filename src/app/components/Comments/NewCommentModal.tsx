import { useState } from 'react'
import Modal from '../Modal'
import type { FC } from 'react'

const NewCommentModal = () => {

    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(false)

    return (
        <>
            <button onClick={onOpen}>Post your reply!</button>
            <Modal
                isOpen={isOpen}
                header='asd'
                onClose={onClose}

            >
                <p>oi</p>
            </Modal>
        </>
    )
}

export default NewCommentModal
