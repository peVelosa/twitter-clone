import { HeartIcon, MessageCircleIcon } from "lucide-react";

const SkeletonTweet = () => {

  return (
    <>
      <article>
        <div
          className="grid cursor-pointer grid-cols-[auto_4fr] grid-rows-[auto_1fr] gap-4 border-x border-b border-default p-4 hover:bg-slate-800"
        >
          <div>
            <div
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
              style={{ backgroundColor: "green" }}
            >

            </div>
          </div>
          <div className="flex justify-between items-start">
            <div
              className="flex items-center gap-2"
            >
              <span className="font-bold hover:underline">aaaaaa</span>
              <span className="text-slate-200">@aaaaaaaa</span>
            </div>
          </div>
          <div className="col-start-2 row-start-2">
            <p className="whitespace-nowrap">aaaaaaaaaaaaaaaaa</p>
            <div className="mt-4 flex items-center gap-4">
              <div
                className="inline-flex gap-1 items-center group"
              >
                <span className='group-hover:bg-red-400 p-2 rounded-full group-disabled:hover:bg-slate-400'><HeartIcon /></span>
                <span className='group-hover:text-red-400 group-disabled:hover:text-slate-400'>20</span>
              </div>
              <div className="inline-flex gap-2">
                <MessageCircleIcon /> 20
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default SkeletonTweet;
