import {actionTypeCreator, ACTION_TYPE} from "app/actions";
import {IFetchable} from ".";

//#region Actions

/** Action creator for changing current state of `IFetchable` */
export const changeIsFetching = (store: string, value: boolean) => ({
  type: actionTypeCreator<IFetchable<any>>(
    store,
    ACTION_TYPE.CHANGE,
    "isFetching"
  ),
  payload: value,
});

/** Action creator for updating current state of `IFetchable` */
export const updateValue = <V = any>(store: string, value: IClearable<V>) => ({
  type: actionTypeCreator<IFetchable<V>>(store, ACTION_TYPE.CHANGE, "value"),
  payload: value,
});

/** Action creator for setting current error state of `IFetchable` */
export const setFetchError = <V = any>(store: string, value: V) => ({
  type: actionTypeCreator<IFetchable<any, V>>(
    store,
    ACTION_TYPE.CHANGE,
    "fetchError"
  ),
  payload: value,
});

//#endregion

//#region Type definitions

export interface IClearable<T = any> {
  /** If `true` - replace existing value with new one.
   * Otherwise merge values together */
  clear: boolean;
  /** New value */
  value?: T;
}

//#endregion
