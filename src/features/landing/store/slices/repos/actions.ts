import {RepoState, STORE_NAME} from ".";
import {Action, actionTypeCreator, ACTION_TYPE} from "app/actions";
import {getOrganizationRepos} from "features/landing/services/getOrganizationRepos";

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

/**
 * Action creator for fetching repositories
 */
export const fetchRepos = (
  ...params: Parameters<typeof getOrganizationRepos>
): Action<Parameters<typeof getOrganizationRepos>, RepoState> => ({
  type: actionTypeCreator(STORE_NAME, ACTION_TYPE.FETCH, "repos"),
  payload: params,
});
