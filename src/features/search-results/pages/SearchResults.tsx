import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {REPOS_PER_PAGE} from "const";
import {useAppDispatch, useAppSelector} from "app/hooks";
import SearchReposField from "components/SearchReposField";
import {
  changeOrganizationName,
  fetchRepos,
} from "features/landing/store/slices/repos/actions";

import Table from "../components/Table";
import Spinner from "components/Spinner";

const SearchResults: React.FC = () => {
  const {repoState, organizationName} = useAppSelector(state => ({
    repoState: state.organization.repos,
    organizationName: state.organization.name,
  }));
  const dispatch = useAppDispatch();

  const [params] = useSearchParams();

  const [page, setPage] = useState(1);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = params.get("organization");
    if (name && organizationName !== name) {
      dispatch(changeOrganizationName(name));
      dispatch(
        fetchRepos({
          clear: true,
          params: {name, per_page: REPOS_PER_PAGE, page},
        })
      );
    }
  }, []);

  useEffect(() => {
    const keys = Object.keys(repoState.value || {});
    // if organizationName is set and this page wasn't previously fetched
    if (organizationName && keys.length < page * REPOS_PER_PAGE) {
      dispatch(
        fetchRepos({
          clear: false,
          params: {name: organizationName, page, per_page: REPOS_PER_PAGE},
        })
      );
      tableWrapperRef.current?.scrollTo({top: 0, left: 0, behavior: "auto"});
      setElevate(false);
    }
  }, [page]);

  const [elevate, setElevate] = useState(false);
  const handleTableScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    e => {
      const {scrollTop} = e.target as HTMLDivElement;
      const newValue = scrollTop > 0;
      if (newValue !== elevate) setElevate(newValue);
    },
    [elevate]
  );

  const handlePageChange: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(e => {
      switch (e.currentTarget.name) {
        case "prev": {
          setPage(oldValue => {
            const newValue = oldValue - 1;
            if (newValue < 1) return 1;
            return newValue;
          });
          break;
        }
        case "next": {
          setPage(oldValue => {
            const newValue = oldValue + 1;
            return newValue;
          });
          break;
        }
        default:
          return;
      }
    }, []);

  const tableData = useMemo(() => {
    if (!repoState.value) return [];
    const repos = Object.values(repoState.value);
    const startIndex = (page - 1) * REPOS_PER_PAGE;
    const endIndex = startIndex + REPOS_PER_PAGE;
    return repos.slice(startIndex, endIndex);
  }, [repoState.value, page]);

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex gap-4 p-4 items-top bg-gray-100 dark:bg-gray-800">
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="p-2 h-8 box-content fill-[#333] dark:fill-[#fafafa]"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <SearchReposField
          value={params.get("organization") || organizationName}
        />
      </header>
      {repoState.isFetching ? (
        <Spinner className="m-auto" />
      ) : !repoState.value ? (
        <main className="flex flex-col flex-1 gap-2">
          <h2 className="m-auto text-xl text-center p-4">
            Sorry, but nothing was found!
          </h2>
        </main>
      ) : (
        <main className="flex flex-col flex-1 overflow-hidden">
          <h2
            className={`${
              elevate ? "shadow-lg shadow-gray-200 dark:shadow-gray-800 " : ""
            }text-2xl text-center px-4 p-4 border-b uppercase`}
          >
            <span className="text-blue-600 dark:text-blue-300">
              {organizationName}
            </span>
          </h2>
          <div
            className="flex flex-1 overflow-auto scroll-smooth"
            ref={tableWrapperRef}
            onScroll={handleTableScroll}
          >
            <Table className="w-full h-full" data={tableData} />
          </div>
          <footer className="flex gap-6 items-center px-4 pb-6 pt-4 bg-gray-100 dark:bg-gray-800">
            <button
              className="flex-1 outlined"
              name="prev"
              onClick={handlePageChange}
            >
              <span className="material-symbols-rounded icon">
                navigate_before
              </span>
              <span className="hidden sm:inline">Previous page</span>
            </button>
            <span className="text-base text-blue-600 dark:text-blue-400">
              {page}
            </span>
            <button
              className="flex-1 outlined"
              name="next"
              onClick={handlePageChange}
            >
              <span className="hidden sm:inline">Next page</span>
              <span className="material-symbols-rounded icon">
                navigate_next
              </span>
            </button>
          </footer>
        </main>
      )}
    </div>
  );
};

export default SearchResults;
