import {ErrorType} from "api";
import {RepoState, RepoType, STORE_NAME} from ".";
import {Action, actionTypeCreator, ACTION_TYPE} from "../../actions";
import * as fetchActionCreators from "../fetch/actionCreators";

/** Action creator for handling fetch request of repos */
export const fetchRepos = () =>
  fetchActionCreators.fetchRequestSaga<RepoState>({
    store: STORE_NAME,
    property: "repos",
  });

/**
 * Action creator for handling response of repos fetch
 * @param repos - list of repos to append to store
 */
export const fetchReposSuccess = (repos: RepoType[]) =>
  fetchActionCreators.fetchSuccessSaga<RepoType[], RepoState>(
    {store: STORE_NAME, property: "repos"},
    repos
  );

/**
 * Action creator for handling errors that occurred while fetching repos
 * @param error - error object to set
 */
export const fetchReposError = (error: ErrorType) =>
  fetchActionCreators.fetchErrorSaga<ErrorType, RepoState>(
    {store: STORE_NAME, property: "repos"},
    error
  );

/**
 * Action creator for changing current organization name
 * @param name - new name to set
 */
export const changeOrganizationName = (
  name: string
): Action<string, RepoState> => ({
  type: actionTypeCreator(STORE_NAME, ACTION_TYPE.CHANGE, "name"),
  payload: name,
});
