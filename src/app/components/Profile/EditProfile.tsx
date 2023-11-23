'use client'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";
import { Button, Modal } from 'flowbite-react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import Input from "../Input";
import { useState } from "react";
import { updateUser } from "@/app/utils/user";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TUserProfile } from "@/app/types/db";

export type TForm = {
    email: string,
    name: string,
    userName: string,
    image: string,
    background: string
}

const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const EditProfile = ({ user }: { user: TUserProfile }) => {
    const key = ['profile', user.userName]
    const queryClient = useQueryClient()

    const { data: session, update } = useSession()
    const params = useParams()

    const router = useRouter()

    const { mutate } = useMutation({
        mutationKey: key,
        mutationFn: async (variables: TForm) => {
            if (variables.name !== user.name || variables.userName !== user.userName) {
                setHasNameOrUserNameChanged(true)
            }
            setIsOpen(false)
            await updateUser({ originalUserName: user?.userName ?? '', ...variables, signal: new AbortController().signal })
        },
        onMutate: async (variables: TForm | void) => {
            await queryClient.cancelQueries({ queryKey: key })
            const prevUser = queryClient.getQueryData<TUserProfile>(key)
            queryClient.setQueryData(key, (old: TUserProfile) => ({
                ...old,
                ...variables,
            }))

            return { prevUser }
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(key, context?.prevUser)
        },
        onSettled: () => {
            update()
            if (hasNameOrUserNameChanged) {
                queryClient.invalidateQueries({ queryKey: ['tweets', user.userName] })
            }
            queryClient.invalidateQueries({ queryKey: key })
            setHasNameOrUserNameChanged(false)
            router.replace(`/${user?.userName}`)
        }
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TForm>({
        defaultValues: {
            name: user?.name, userName: user?.userName, image: user?.image, background: user?.background, email: user?.email
        },
    })

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [hasNameOrUserNameChanged, setHasNameOrUserNameChanged] = useState<boolean>(false)

    const onSubmit: SubmitHandler<TForm> = async (data: TForm) => {
        data.userName = data.userName.replaceAll(' ', '-')
        mutate(data)
    }

    const isOwnProfile = user.userName === params?.userName

    if (!session?.user || !user || !isOwnProfile) {
        return <></>
    }

    return (
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
        </>
    )
}

export default EditProfile
