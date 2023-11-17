import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";
import { Button, Modal } from 'flowbite-react'
import { type FC, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Input from "../Input";

export type TForm = {
    email: string,
    name: string,
    userName: string,
    image: string,
    background: string
}

type EditProfileProps = {
    name: string,
    userName: string,
    image?: string,
    background?: string,
    email: string,
}


const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EditProfile: FC<EditProfileProps> = ({ name, userName, image, background, email }) => {

    const { data: session } = useSession()
    const { userName: profileUserName } = useParams()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<TForm>({
        defaultValues: {
            name, userName, image: image ?? '', background: background ?? '', email
        },

    })
    const onSubmit: SubmitHandler<TForm> = (data) => console.log(data)

    useEffect(() => {
        return () => reset()
    }, [isOpen, reset, session])

    if (!session?.user) {
        return <></>
    }

    return (
        <>
            {session?.user.userName === profileUserName ?
                <>
                    <div className='text-black row-start-3 col-start-1 ml-auto w-fit h-fit mt-4 mr-4'>
                        <button onClick={() => setIsOpen(true)} className='border border-neutral-300 px-4 py-1 rounded-full hover:bg-neutral-200 transition-all font-bold'>
                            Edit profile
                        </button>
                    </div>
                    <Modal show={isOpen} onClose={() => setIsOpen(false)} dismissible>
                        <Modal.Header>Edit your profile</Modal.Header>
                        <Modal.Body>
                            <form className="text-black space-y-2" onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input field={field} error={errors} />
                                    }
                                />
                                <Controller
                                    name="userName"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <Input field={field} error={errors} />}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: true, pattern: {
                                            value: emailReg,
                                            message: 'Please enter a valid email',
                                        },
                                    }}
                                    render={({ field }) => <Input field={field} error={errors} />}
                                />
                                <Controller
                                    name="image"
                                    control={control}
                                    render={({ field }) => <Input field={field} error={errors} />}
                                />
                                <Controller
                                    name="background"
                                    control={control}
                                    rules={{ required: false }}
                                    render={({ field }) => <Input field={field} error={errors} />}
                                />
                                <Button className="mt-4" type="submit">Save</Button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </> : null
            }
        </>
    )
}

export default EditProfile
