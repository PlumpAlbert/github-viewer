import SearchReposField from "components/SearchReposField";

const LandingPage: React.FC = () => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-8 max-w-2xl m-auto px-4">
      <h1 className="text-4xl text-blue-600 font-semibold uppercase dark:text-blue-400">
        Github Viewer
      </h1>
      <SearchReposField />
    </main>
  );
};

export default LandingPage;
