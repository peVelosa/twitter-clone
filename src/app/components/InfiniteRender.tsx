import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type InfiniteRenderProps = {
  children: React.ReactNode;
  fetchNextPage: () => void;
};

const InfiniteRender = ({ children, fetchNextPage }: InfiniteRenderProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
