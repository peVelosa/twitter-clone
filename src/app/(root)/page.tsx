import PageTitle from "../components/PageTitle";

const Home = () => {
  return (
    <main className="w-full">
      <PageTitle title={"home"} />
      <section className="border-r border-default">
        <p>This is home page</p>
      </section>
    </main>
  );
};

export default Home;
