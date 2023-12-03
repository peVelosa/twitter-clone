import { useQuery } from '@tanstack/react-query'
import { getUserFollowing } from '../utils/user'

type useIsFollowingProps = {
    userName: string,
    targetId: string
}

const useIsFollowing = ({ userName, targetId }: useIsFollowingProps) => {
    const { data: following } = useQuery({
        queryKey: ['profile', userName, "following"],
        queryFn: async ({ signal }) => await getUserFollowing({ userName, signal }),
    })
    const isFollowing = following?.data?.find(({ id }: { id: string }) => id === targetId)

    return { user: isFollowing, isFollowing: !!isFollowing }
}

export default useIsFollowing
