import PageTitle from "@/components/PageTitle";
import { getTweets } from "@/utils/tweets";
import ClientHomePage from "./ClientHomePage";

const Home = async () => {
  const data = await getTweets({});

  return (
    <div className="flex-grow">
      <PageTitle title={"home"} />
      <section>
        <ClientHomePage initialTweetData={data} />
      </section>
    </div>
  );
};

export default Home;
