import SubTable from "./components/SubTable";
import subService from "./services/sub-service";

export default async function Home() {
  const subs = await subService.getAllSubs();

  return (
    <main>
      <h1 className="text-center font-bold text-3xl mb-6">Subscriber</h1>
      <SubTable subs={subs} />
    </main>
  );
}
