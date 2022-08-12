import {call} from "@redux-saga/core/effects";
import {getOrganizationRepos} from "../../../services/getOrganizationRepos";
import {ErrorType} from "api";
import * as fetchSagas from "../fetch/sagas";
import {STORE_NAME, RepoState, RepoType} from ".";

/** Saga for handling fetch request of repos */
export const reposFetchStart = () =>
  fetchSagas.fetchRequestSaga<RepoState>({
    store: STORE_NAME,
    property: "repos",
  });

/**
 * Saga for handling response of repos fetch
 * @param repos - list of repos to append to store
 */
export const reposFetchSuccess = (repos: RepoType[]) =>
  fetchSagas.fetchSuccessSaga<RepoType[], RepoState>(
    {store: STORE_NAME, property: "repos"},
    repos
  );

/**
 * Saga for handling errors that occurred while fetching repos
 * @param error - error object to set
 */
export const reposFetchError = (error: ErrorType) =>
  fetchSagas.fetchErrorSaga<ErrorType, RepoState>(
    {store: STORE_NAME, property: "repos"},
    error
  );

/**
 * Saga for getting list of repositories using `params`
 *
 *  @param params
 *  filters used for fetching repos
 */
export default function* getRepos(
  ...params: Parameters<typeof getOrganizationRepos>
) {
  try {
    yield call(reposFetchStart);
    const repos: Awaited<ReturnType<typeof getOrganizationRepos>> = yield call(
      getOrganizationRepos,
      ...params
    );
    yield call(reposFetchSuccess, repos);
  } catch (error: any) {
    yield call(reposFetchError, error.message);
  }
}
