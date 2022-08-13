import {Reducer} from "@reduxjs/toolkit";
import {ACTION_TYPE, parseActionType} from "app/actions";
import * as actions from "./actions";

export type FetchableValue<T> = {[key: string | number]: T};
export interface IFetchable<T, E = any> {
  /** If `true` object value is currently been fetched */
  isFetching: boolean;
  /** Object's state */
  value?: FetchableValue<T>;
  /** Fetch error state */
  fetchError?: E;
}

type ActionTypes = ReturnType<typeof actions[keyof typeof actions]>;

const initialState: IFetchable<any> = {
  isFetching: false,
};

const reducer: Reducer<IFetchable<any>, ActionTypes> = (
  state = initialState,
  action
) => {
  const {type, property} = parseActionType<typeof state>(action.type);
  switch (type) {
    case ACTION_TYPE.CHANGE: {
      switch (property) {
        case "isFetching": {
          return {...state, isFetching: action.payload as boolean};
        }
        case "value": {
          const {clear, value} = action.payload as actions.IClearable;
          const newValue: any = clear ? value : {...state.value, ...value};
          return {...state, value: newValue};
        }
        case "fetchError": {
          return {...state, fetchError: action.payload};
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export default reducer;
