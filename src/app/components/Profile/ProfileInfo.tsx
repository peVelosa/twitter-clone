import { Calendar } from "lucide-react";
import { TUserProfile } from "@/types/db";

type ProfileInfoProps = Pick<TUserProfile, "name" | 'userName' | "createdAt" | "following" | "followedBy">

const ProfileInfo = ({ name, userName, createdAt, following, followedBy }: ProfileInfoProps) => {
    return (
        <div className="col-start-1 row-span-full row-start-4 h-full p-4 pt-0 text-slate-600">
            <div>
                <h2 className="text-xl font-bold text-black">{name}</h2>
                <h3 className="mb-4 text-slate-600">@{userName}</h3>
            </div>
            <h4 className="mb-4 flex items-center gap-2">
                <Calendar className="stroke-slate-500" />
                Joined{" "}
                {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    year: "numeric",
                }).format(new Date(createdAt))}
            </h4>
            <div className="flex items-center gap-4">
                <h4>Following {following.length}</h4>
                <h4>Followers {followedBy.length}</h4>
            </div>
        </div>
    )
}

export default ProfileInfo