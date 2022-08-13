import {useCallback, useEffect} from "react";

import {useAppDispatch, useAppSelector} from "app/hooks";

import * as actions from "../store/slices/repos/actions";

const LandingPage: React.FC = () => {
  const organizationName = useAppSelector(state => state.organization.name);
  const error = useAppSelector(state => state.organization.repos.fetchError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.fetchRepos({name: "fa"}));
  }, [dispatch]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        const value = e.currentTarget.value;
        dispatch(actions.changeOrganizationName(value));
      },
      [dispatch]
    );

  return (
    <main className="w-full h-full flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl text-blue-600 font-semibold uppercase dark:text-blue-400">
        Github Viewer
      </h1>
      <form action="" className="flex flex-col gap-4 max-w-lg w-1/2">
        <div className="flex flex-col gap-2">
          <input
            id="search-field"
            aria-labelledby="search-field-label"
            type="text"
            placeholder="Enter organization name here..."
            onChange={handleInputChange}
            value={organizationName}
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
      </form>
    </main>
  );
};

export default LandingPage;
