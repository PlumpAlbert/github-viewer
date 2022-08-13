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
): string => {
  let result = `${store}-${action}`;
  if (property) {
    result += `-${property.toString()}`;
  }
  return result;
};

/**
 * Helper that parses action's `type` property to retrieve store name,
 * action type and property
 *
 * @param {string} type
 * Value of action's `type` property
 */
export const parseActionType = <R>(type: string): ActionType<R> => {
  const [store, action, property] = type.split("-");
  return {
    storeName: store,
    type: action as ACTION_TYPE,
    property: property as keyof R,
  };
};

//#endregion

export enum ACTION_TYPE {
  CHANGE = "change",
  FETCH = "fetch",
}

/**
 * Type of action's `type` property
 * @template RootType - type of root state
 */
export type ActionType<RootType> = {
  /** Name of slice in `RootState` */
  storeName: string;
  /** Type of action to perform */
  type: ACTION_TYPE;
  /** Path of property inside slice's state */
  property?: keyof RootType;
};
/** @template PayloadType - type of payload */
export type PayloadedAction<PayloadType = any> = ReduxAction<string> & {
  payload?: PayloadType;
};
