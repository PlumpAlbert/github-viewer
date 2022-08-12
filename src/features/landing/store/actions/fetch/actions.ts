import {actionTypeCreator, ACTION_TYPE} from "..";
import {IFetchable} from ".";

//#region Actions

/** Action creator for changing current state of `IFetchable` */
export const changeIsFetching = (
  {store, property}: IPathParam,
  value: boolean
) => ({
  type: actionTypeCreator(
    store,
    ACTION_TYPE.CHANGE,
    templateProperty`${property}.${"isFetching"}`
  ),
  payload: value,
});

/** Action creator for changing current state of `IFetchable` */
export const changeValue = <V = any>(
  {store, property}: IPathParam,
  value: IClearable<V>
) => ({
  type: actionTypeCreator(
    store,
    ACTION_TYPE.CHANGE,
    templateProperty`${property}.${"isFetching"}`
  ),
  payload: value,
});
interface IClearable<T = any> {
  /** If `true` - replace existing value with new one.
   * Otherwise merge values together */
  clear: boolean;
  /** New value */
  value?: T;
}

/** Action creator for setting current error state of `IFetchable` */
export const setFetchError = <V = any>(
  {store, property}: IPathParam,
  value: V
) => ({
  type: actionTypeCreator(
    store,
    ACTION_TYPE.CHANGE,
    templateProperty`${property}.${"fetchError"}`
  ),
  payload: value,
});

//#endregion

//#region Type definitions

interface IPathParam {
  /** name of store to update */
  store: string;
  /** path to `IFetchable` property. If empty - perform action on root */
  property?: string;
}

//#endregion

/**
 * Template function that simplifies property path creation for `IFetchable`
 * objects
 *
 * @param property - path to property with type `IFetchable`
 * @param fetchableProperty - property of `IFetchable` type
 */
function templateProperty(
  _: TemplateStringsArray,
  property: string | undefined,
  fetchableProperty: keyof IFetchable<any>
): string {
  if (property) {
    return `${property}.${fetchableProperty}`;
  }
  return fetchableProperty;
}
