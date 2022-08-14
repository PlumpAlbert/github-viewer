import {put} from "redux-saga/effects";
import {joinPath} from "app/actions";
import {changeIsFetching, updateValue, setFetchError} from "./actions";
import {FetchableValue} from ".";

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
  error?: T
) {
  const path = joinPath(store, property?.toString() || "");
  yield put(changeIsFetching(path, false));
  if (clearState) {
    yield put(updateValue(path, {clear: true}));
  }
  yield put(setFetchError(path, error));
}

/** Action creator for handling fetch response */
export function* fetchSuccessSaga<T = any, R = any>(
  {store, property, clearState}: IFetchParams<R>,
  value: FetchableValue<T>
) {
  const path = joinPath(store, property?.toString() || "");
  yield put(changeIsFetching(path, false));
  yield put(setFetchError(path, undefined));
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
