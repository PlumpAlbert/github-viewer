import {call, take, fork, actionChannel} from "@redux-saga/core/effects";
import {TakeableChannel} from "redux-saga";
import {ACTION_TYPE} from "app/actions";
import {getOrganizationRepos} from "../../../services/getOrganizationRepos";
import {ErrorType} from "api";
import * as fetchSagas from "../fetch/sagas";
import * as actions from "./actions";
import {STORE_NAME, RepoState, RepoType} from ".";

/**
 * Saga for handling fetch request of repos
 * @param {boolean} clear
 * If `true` clear current state
 */
export const reposFetchStart = (clear: boolean = false) =>
  fetchSagas.fetchRequestSaga<RepoState>({
    store: STORE_NAME,
    property: "repos",
    clearState: clear,
  });

/**
 * Saga for handling response of repos fetch
 * @param repos - list of repos to append to store
 * @param clear - If `true` clear current state
 */
export const reposFetchSuccess = (repos: RepoType[], clear: boolean = false) =>
  fetchSagas.fetchSuccessSaga<RepoType, RepoState>(
    {store: STORE_NAME, property: "repos", clearState: clear},
    repos.reduce((value, repo) => ({...value, [repo.id]: repo}), {})
  );

/**
 * Saga for handling errors that occurred while fetching repos
 * @param error - error object to set
 * @param clear - If `true` clear current state
 */
export const reposFetchError = (error: ErrorType, clear: boolean = false) =>
  fetchSagas.fetchErrorSaga<ErrorType, RepoState>(
    {store: STORE_NAME, property: "repos", clearState: clear},
    error
  );

/**
 * Saga for getting list of repositories using `params`
 *
 *  @param params
 *  filters used for fetching repos
 */
export function* getRepos(...params: Parameters<typeof getOrganizationRepos>) {
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

type FetchReposAction = ReturnType<typeof actions.fetchRepos>;
export default function* () {
  const fetchChannel: TakeableChannel<FetchReposAction> = yield actionChannel(
    ({type}: FetchReposAction) =>
      type.storeName === STORE_NAME &&
      type.type === ACTION_TYPE.FETCH &&
      type.property === "repos"
  );
  while (true) {
    const {payload}: FetchReposAction = yield take(fetchChannel);
    if (!payload) throw "Payload is not defined!";
    yield fork(getRepos, ...payload);
  }
}
