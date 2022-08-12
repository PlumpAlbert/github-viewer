import {ACTION_TYPE, Action, GroupedAction} from "../../actions";
import {changeIsFetching, updateValue, setFetchError} from "./actions";

/** Action creator for handling fetch requests */
export const fetchRequest = <R = any>({
  store,
  property,
  clearState,
}: IFetchParams<R>): GroupedAction => {
  const path = joinPath(store, property?.toString() || "");
  const actions: Action[] = [changeIsFetching(path, false)];
  if (clearState) {
    actions.push(updateValue(path, {clear: true}));
  }
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

/** Action creator for handling fetch errors */
export const fetchError = <T = any, R = any>(
  {store, property, clearState}: IFetchParams<R>,
  error: T
): GroupedAction => {
  const path = joinPath(store, property?.toString() || "");
  const actions: Action[] = [changeIsFetching(path, false)];
  if (clearState) {
    actions.push(updateValue(path, {clear: true}));
  }
  actions.push(setFetchError(path, error));
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

/** Action creator for handling fetch response */
export const fetchSuccess = <T = any, R = any>(
  {store, property, clearState}: IFetchParams<R>,
  value: T
): GroupedAction => {
  const path = joinPath(store, property?.toString() || "");
  const actions = [
    changeIsFetching(path, false),
    updateValue(path, {clear: !!clearState, value}),
  ];
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

interface IFetchParams<StoreType = any> {
  /** Name of store to update */
  store: string;
  /** Path to `IFetchable` property. If empty - perform on root */
  property?: keyof StoreType;
  /** If `true` - clear current state */
  clearState?: boolean;
}

/**
 * Helper function for combining list of properties into property path
 *
 * @param properties - path to property with type `IFetchable`
 */
function joinPath(...properties: string[]): string {
  return properties.join(".");
}
