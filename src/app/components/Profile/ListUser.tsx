import ImageWithFallback from '../ImageWithFallback'
import Link from 'next/link'
import IsFollowingComponent from '../IsFollowing'
import { type TUser } from '@/app/types/db'
import { type FC } from 'react'

type ListUserProps = {
    list: TUser[]
}

const ListUser: FC<ListUserProps> = ({ list }) => {

    return (
        <>
            <div className='flex flex-col gap-4'>
                {list?.map(user => {

                    return (
                        <div key={user.userName} className='flex items-center gap-4'>
                            <Link
                                href={`/${user.userName}`}
                                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
                                style={{ backgroundColor: "green" }}
                            >
                                <ImageWithFallback
                                    alt="user image profile"
                                    src={user?.image}
                                    width={20}
                                    height={20}
                                    className="h-full w-full"
                                />
                            </Link>
                            <div>
                                <Link
                                    href={`/${user.userName}`}
                                    className="flex items-center gap-2"
                                >
                                    <span className="font-bold hover:underline">{user.name}</span>
                                </Link>
                                <Link
                                    href={`/${user.userName}`}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-slate-200">@{user.userName}</span>
                                </Link>
                            </div>
                            <IsFollowingComponent targetId={user.id} />
                        </div>
                    )
                })}
            </div >
        </>
    )
}

export default ListUser
