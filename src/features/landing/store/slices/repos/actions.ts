import {STORE_NAME} from ".";
import {
  actionTypeCreator,
  joinPath,
  ACTION_TYPE,
  PayloadedAction,
} from "app/actions";
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

type FetchReposPayload = {
  params: Parameters<typeof getOrganizationRepos>[0];
  clear: boolean;
};
/**
 * Action creator for fetching repositories
 */
export const fetchRepos = (
  payload: FetchReposPayload
): PayloadedAction<FetchReposPayload> => ({
  type: actionTypeCreator(STORE_NAME, ACTION_TYPE.FETCH, "repos"),
  payload,
});

/**
 * Action creator for clearing fetch error
 */
export const clearError = (): PayloadedAction => ({
  type: actionTypeCreator(
    joinPath(STORE_NAME, "repos"),
    ACTION_TYPE.CLEAR,
    "fetchError"
  ),
});
