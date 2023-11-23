import PageTitle from "@/components/PageTitle";
import { getTweets } from "@/utils/tweets";
import ClientHomePage from "./ClientHomePage";
import { QueryClient } from "@tanstack/react-query";

const Home = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['tweets'],
    queryFn: async ({ signal, pageParam }) =>
      await getTweets({}),
    initialPageParam: "0",
    getNextPageParam: (lastPage, pages) => lastPage?.cursor ?? undefined,
    pages: 1
  })


  return (
    <div className="flex-grow">
      <PageTitle title={"home"} />
      <section>
        <ClientHomePage />
      </section>
    </div>
  );
};

export default Home;
