import {STORE_NAME} from ".";
import {PayloadedAction, actionTypeCreator, ACTION_TYPE} from "app/actions";
import {getOrganizationRepos} from "features/landing/services/getOrganizationRepos";

/**
 * Action creator for changing current organization name
 * @param name - new name to set
 */
export const changeOrganizationName = (
  name: string
): PayloadedAction<string> => ({
  type: actionTypeCreator(STORE_NAME, ACTION_TYPE.CHANGE, "name"),
  payload: name,
});

/**
 * Action creator for fetching repositories
 */
export const fetchRepos = (
  ...params: Parameters<typeof getOrganizationRepos>
): PayloadedAction<Parameters<typeof getOrganizationRepos>> => ({
  type: actionTypeCreator(STORE_NAME, ACTION_TYPE.FETCH, "repos"),
  payload: params,
});
