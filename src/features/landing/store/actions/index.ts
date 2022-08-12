import {Action as ReduxAction} from "@reduxjs/toolkit";

//#region Functions

/**
 * Helper for creating action types
 *
 * @param store - store name to target
 * @param action - type of action to perform
 * @param [property] - path to property
 */
export const actionTypeCreator = <R>(
  store: string,
  action: ACTION_TYPE,
  property?: keyof R
): ActionType<R> => ({
  storeName: store,
  type: action,
  property,
});

//#endregion

export enum ACTION_TYPE {
  CHANGE = "change",
  GROUPED = "grouped",
}

/**
 * Type of action's `type` property
 * @template RootType - type of root state
 */
type ActionType<RootType> = {
  /** Name of slice in `RootState` */
  storeName: string;
  /** Type of action to perform */
  type: ACTION_TYPE;
  /** Path of property inside slice's state */
  property?: keyof RootType;
};
/**
 * @template PayloadType - type of payload
 * @template RootType - type of root state
 * */
export type Action<PayloadType = any, RootType = any> = ReduxAction<
  ActionType<RootType>
> & {
  payload?: PayloadType;
};
export type GroupedAction = {type: ACTION_TYPE.GROUPED; payload: Action[]};
