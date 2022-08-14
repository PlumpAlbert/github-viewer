import {call, takeEvery, take, all} from "@redux-saga/core/effects";
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
export const reposFetchError = (error?: ErrorType, clear: boolean = false) =>
  fetchSagas.fetchErrorSaga<ErrorType, RepoState>(
    {store: STORE_NAME, property: "repos", clearState: clear},
    error
  );

/**
 * Saga for getting list of repositories using parameters, specified in
 * `action.payload`
 */
export function* getRepos(action: ReturnType<typeof actions["fetchRepos"]>) {
  if (!action.payload) {
    throw Error("Parameters must be defined!");
  }
  try {
    yield call(reposFetchStart);
    const repos: Awaited<ReturnType<typeof getOrganizationRepos>> = yield call(
      getOrganizationRepos,
      ...action.payload
    );
    yield call(reposFetchSuccess, repos);
  } catch (error: any) {
    yield call(reposFetchError, error.message, true);
  }
}

/**
 * Watch saga that will run `getRepos` on every `actions.fetchRepos` action
 */
export function* watchFetchRepos() {
  const fetchAction = actions.fetchRepos({name: ""});
  yield takeEvery(fetchAction.type, getRepos);
}

/**
 * Watch saga that will run `reposFetchError` on every `actions.clearError` action
 */
export function* watchClearError() {
  const {type} = actions.clearError();
  while (true) {
    yield take(type);
    yield call(reposFetchError, undefined);
  }
}

export default function* () {
  yield all([watchClearError(), watchFetchRepos()]);
}
