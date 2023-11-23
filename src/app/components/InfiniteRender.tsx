import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteRenderProps = {
  children: React.ReactNode;
  fetchNextPage: () => void;
  hasNextPage: boolean
};

const InfiniteRender = ({ children, fetchNextPage, hasNextPage }: InfiniteRenderProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  return (
    <>
      {children}
      <div
        ref={ref}
        className="pointer-events-none opacity-0"
      ></div>
    </>
  );
};

export default InfiniteRender;
