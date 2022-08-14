import {useState, useCallback} from "react";

import {useAppDispatch, useAppSelector} from "app/hooks";
import * as actions from "features/landing/store/slices/repos/actions";

import Table from "../components/Table";

const SearchResults: React.FC = () => {
  const {repoState, organizationName} = useAppSelector(state => ({
    repoState: state.organization.repos,
    organizationName: state.organization.name,
  }));
  const [inputValue, setInputValue] = useState(organizationName);

  const dispatch = useAppDispatch();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      setInputValue(e.target.value);
    }, []);

  const handleSearchClick = useCallback(() => {
    dispatch(actions.changeOrganizationName(inputValue));
    dispatch(actions.fetchRepos({name: inputValue}));
  }, [dispatch, inputValue]);

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex gap-4 p-4 items-center bg-gray-100 dark:bg-gray-800">
        <img className="h-10" src="/assets/images/github.png" />
        <input
          className={`${
            repoState.fetchError && inputValue === organizationName
              ? "error"
              : ""
          } rounded-full px-5 py-2.5`}
          id="search-field"
          aria-labelledby="search-field-label"
          type="text"
          placeholder="Enter organization name here..."
          defaultValue={organizationName}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="icon-button" onClick={handleSearchClick}>
          <i className="material-symbols-rounded">search</i>
          <span className="sr-only"> Search </span>
        </button>
      </header>
      {repoState.isFetching && (
        <div className="m-auto" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 animate-spin text-gray-200 fill-blue-600 dark:fill-blue-400 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!repoState.value ? (
        <main className="flex flex-col flex-1 gap-2">
          <h2 className="m-auto text-xl text-center p-4">
            Sorry, but nothing was found!
          </h2>
        </main>
      ) : (
        <main className="flex flex-col flex-1 gap-2 py-4">
          <h2 className="text-2xl text-center px-4 uppercase">
            {organizationName}
          </h2>
          <Table data={repoState.value} />
        </main>
      )}
    </div>
  );
};

export default SearchResults;
