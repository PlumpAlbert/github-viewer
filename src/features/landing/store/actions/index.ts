/**
 * Helper for creating action types
 *
 * @param store - store name to target
 * @param action - type of action to perform
 * @param [property] - path to property
 */
export const actionTypeCreator = (
  store = "_",
  action: ACTION_TYPE,
  property?: string
) => {
  let type = `${store}-${action}`;
  if (property) type += `-${property}`;
  return type;
};

export enum ACTION_TYPE {
  CHANGE = "change",
  GROUPED = "grouped",
}

export type Action<P = any> = {type: string; payload: P};
export type GroupedAction = {type: ACTION_TYPE.GROUPED; payload: Action[]};
