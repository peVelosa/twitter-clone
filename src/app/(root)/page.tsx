import PageTitle from "@/components/PageTitle";
import { getTweet } from "@/utils/tweets";
import Tweet from "@/components/Tweet/Tweet";

const Home = async () => {
  const { data: tweets } = await getTweet();
  return (
    <main className="w-full">
      <PageTitle title={"home"} />
      <section className="border-r border-default">
        {tweets?.map((tweet) => (
          <Tweet
            {...tweet}
            key={tweet.id}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
