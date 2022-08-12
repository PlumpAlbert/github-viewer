import {ACTION_TYPE, Action, GroupedAction} from "..";
import {changeIsFetching, changeValue, setFetchError} from "./actions";

/** Action creator for handling fetch requests */
export const fetchRequest = ({
  store,
  property,
  clearState,
}: IFetchParams): GroupedAction => {
  const path = {store, property};
  const actions: Action[] = [changeIsFetching(path, false)];
  if (clearState) {
    actions.push(changeValue(path, {clear: true}));
  }
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

/** Action creator for handling fetch errors */
export const fetchError = <T = any>(
  {store, property, clearState}: IFetchParams,
  error: T
): GroupedAction => {
  const path = {store, property};
  const actions: Action[] = [changeIsFetching(path, false)];
  if (clearState) {
    actions.push(changeValue(path, {clear: true}));
  }
  actions.push(setFetchError(path, error));
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

/** Action creator for handling fetch response */
export const fetchSuccess = <T = any>(
  {store, property, clearState}: IFetchParams,
  value: T
): GroupedAction => {
  const path = {store, property};
  const actions = [
    changeIsFetching(path, false),
    changeValue(path, {clear: !!clearState, value}),
  ];
  return {
    type: ACTION_TYPE.GROUPED,
    payload: actions,
  };
};

interface IFetchParams {
  /** Name of store to update */
  store: string;
  /** Path to `IFetchable` property. If empty - perform on root */
  property?: string;
  /** If `true` - clear current state */
  clearState?: boolean;
}
