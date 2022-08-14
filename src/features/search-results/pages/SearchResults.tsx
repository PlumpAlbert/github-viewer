import Table from "../components/Table";

const SearchResults: React.FC = () => {
  return (
    <div className="flex flex-col">
      <header className="flex gap-4 p-4 items-center bg-gray-100 dark:bg-gray-800">
        <img className="h-10" src="/assets/images/github.png" />
        <input
          className="rounded-full px-5 py-2.5"
          id="search-field"
          aria-labelledby="search-field-label"
          type="text"
          placeholder="Enter organization name here..."
        />
        <button className="icon-button">
          <i className="material-symbols-rounded">search</i>
          <span className="sr-only"> Search </span>
        </button>
      </header>
      <main className="flex flex-col gap-2 py-4">
        <h2 className="text-xl text-center px-4">Organization name</h2>
        <Table
          data={[
            {
              id: 1,
              name: "repoName",
              private: false,
              html_url: "/",
              language: "typescript",
              full_name: "owner/repoName",
              description: "Some description goes here",
              stargazers_count: 3,
            },
            {
              id: 2,
              name: "another repo",
              private: false,
              html_url: "/hui",
              language: "typescript",
              full_name: "owner/repoName",
              description: "Some description goes here",
              stargazers_count: 3,
            },
          ]}
        />
      </main>
    </div>
  );
};

export default SearchResults;
