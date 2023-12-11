import PageTitle from '@/components/PageTitle';
import { getTweets } from '@/utils/tweets';
import ClientHomePage from './ClientHomePage';
import { QueryClient } from '@tanstack/react-query';

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['tweets'],
    queryFn: async ({ signal }) => await getTweets({ signal }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage?.cursor ?? undefined,
    pages: 1,
  });

  return (
    <div className='flex-grow'>
      <PageTitle title={'home'} />
      <section>
        <ClientHomePage />
      </section>
    </div>
  );
};

export default Home;
