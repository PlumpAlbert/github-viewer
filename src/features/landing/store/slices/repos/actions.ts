import {RepoState, STORE_NAME} from ".";
import {Action, actionTypeCreator, ACTION_TYPE} from "app/actions";

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
