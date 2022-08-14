import {useCallback, useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {REPOS_PER_PAGE} from "const";
import {useAppSelector, useAppDispatch} from "app/hooks";
import * as actions from "features/landing/store/slices/repos/actions";
import Spinner from "./Spinner";

const SearchReposField: React.FC<SearchReposFieldProps> = ({value = ""}) => {
  const {organizationName, isFetching, error} = useAppSelector(state => ({
    organizationName: state.organization.name,
    isFetching: state.organization.repos.isFetching,
    error: state.organization.repos.fetchError,
  }));
  const [inputValue, setInputValue] = useState(value || organizationName);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && inputValue !== organizationName) {
      dispatch(actions.clearError());
    }
  }, [inputValue]);

  const afterSubmit = useRef(false);
  useEffect(() => {
    if (afterSubmit.current && !error && !isFetching) {
      navigate({pathname: "/search", search: "organization=" + inputValue});
    }
  }, [error, isFetching]);

  const handleFormSubmit: React.FormEventHandler = useCallback(
    e => {
      e.preventDefault();
      dispatch(actions.changeOrganizationName(inputValue));
      dispatch(
        actions.fetchRepos({
          clear: true,
          params: {name: inputValue, page: 1, per_page: REPOS_PER_PAGE},
        })
      );
      afterSubmit.current = true;
    },
    [dispatch, inputValue, navigate]
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(e => {
      const value = e.currentTarget.value;
      setInputValue(value);
    }, []);

  return (
    <form
      action=""
      className="w-full flex gap-4 items-start"
      onSubmit={handleFormSubmit}
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
      <button type="submit" className="icon-button">
        {isFetching ? (
          <Spinner />
        ) : (
          <i className="material-symbols-rounded">search</i>
        )}
        <span className="sr-only"> Search </span>
      </button>
    </form>
  );
};

export default SearchReposField;

type SearchReposFieldProps = {
  value?: string;
};
