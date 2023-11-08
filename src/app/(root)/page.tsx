import PageTitle from "@/components/PageTitle";
import { getTweets } from "@/utils/tweets";
import ClientHomePage from "./ClientHomePage";

const Home = async () => {
  const data = await getTweets({});
  return (
    <main className="w-full">
      <PageTitle title={"home"} />
      <section>{/* <ClientHomePage initialTweetData={data} /> */}</section>
    </main>
  );
};

export default Home;
