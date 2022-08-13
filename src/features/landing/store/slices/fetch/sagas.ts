import {put} from "redux-saga/effects";
import {Identifiable} from ".";
import {changeIsFetching, updateValue, setFetchError} from "./actions";

/** Action creator for handling fetch requests */
export function* fetchRequestSaga<R = any>({
  store,
  property,
  clearState,
}: IFetchParams<R>) {
  const path = joinPath(store, property?.toString() || "");
  yield put(changeIsFetching(path, true));
  if (clearState) {
    yield put(updateValue(path, {clear: true}));
  }
}

/** Action creator for handling fetch errors */
export function* fetchErrorSaga<T = any, R = any>(
  {store, property, clearState}: IFetchParams<R>,
  error: T
) {
  const path = joinPath(store, property?.toString() || "");
  yield put(changeIsFetching(path, false));
  if (clearState) {
    yield put(updateValue(path, {clear: true}));
  }
  yield put(setFetchError(path, error));
}

/** Action creator for handling fetch response */
export function* fetchSuccessSaga<T extends Identifiable = any, R = any>(
  {store, property, clearState}: IFetchParams<R>,
  value: {[key: Identifiable["id"]]: T}
) {
  const path = joinPath(store, property?.toString() || "");
  yield put(changeIsFetching(path, false));
  yield put(updateValue(path, {clear: !!clearState, value}));
}

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
