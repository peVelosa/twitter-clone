import { FaFeatherAlt } from "react-icons/fa";

const SidebarTweet = () => {
  return (
    <button
      className={
        "flex items-center justify-center mb-4 p-2 rounded-full lg:px-4 gap-2 hover:bg-sky-400 bg-sky-500 w-full"
      }
    >
      <FaFeatherAlt size={28} className={"md:hidden"} />
      <span className="capitalize hidden md:block">Tweet</span>
    </button>
  );
};

export default SidebarTweet;
