import {useCallback, useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "app/hooks";

import * as actions from "../store/slices/repos/actions";

const LandingPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const {organizationName, error} = useAppSelector(state => ({
    organizationName: state.organization.name,
    error: state.organization.repos.fetchError,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error && inputValue !== organizationName) {
      dispatch(actions.clearError());
    }
  }, [inputValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        const value = e.currentTarget.value;
        setInputValue(value);
      },
      [dispatch]
    );

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      dispatch(actions.changeOrganizationName(inputValue));
      dispatch(actions.fetchRepos({name: inputValue}));
    }, [dispatch, inputValue]);

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-8 max-w-2xl m-auto">
      <h1 className="text-4xl text-blue-600 font-semibold uppercase dark:text-blue-400">
        Github Viewer
      </h1>
      <form
        action=""
        className="w-full flex gap-4 items-start"
        onSubmit={e => e.preventDefault()}
      >
        <div className="flex flex-col flex-1 gap-2">
          <input
            id="search-field"
            aria-labelledby="search-field-label"
            type="text"
            placeholder="Enter organization name here..."
            className={error && "error"}
            onChange={handleInputChange}
            value={inputValue}
          />
          {error && (
            <p className="flex items-center gap-1 px-3 text-sm text-red-500 dark:text-red-400">
              <i className="material-symbols-rounded w-6 h-6 text-center text-base">
                error
              </i>
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="icon-button"
          onClick={handleSearchClick}
        >
          <i className="material-symbols-rounded">search</i>
          <span className="sr-only"> Search </span>
        </button>
      </form>
    </main>
  );
};

export default LandingPage;
