import {put} from "redux-saga/effects";
import sagaHelper from "redux-saga-testing";
import {changeIsFetching, setFetchError, updateValue} from "./actions";
import * as sagas from "./sagas";

describe("> fetch sagas", () => {
  describe("fetchRequestSaga", () => {
    const path = {
      store: "root",
      clearState: true,
      property: "test",
    };
    const it = sagaHelper(sagas.fetchRequestSaga(path));

    it("should change `isFetching` property", result => {
      expect(result).toEqual(
        put(changeIsFetching(`${path.store}.${path.property}`, true))
      );
    });

    it("should clear old state", result => {
      expect(result).toEqual(
        put(updateValue(`${path.store}.${path.property}`, {clear: true}))
      );
    });

    it("should stop execution", result => {
      expect(result).toBeUndefined();
    });
  });

  describe("fetchErrorSaga", () => {
    const path = {
      store: "root",
      clearState: true,
      property: "test",
    };
    const error = {error: true, message: "this is an error"};
    const it = sagaHelper(sagas.fetchErrorSaga(path, error));

    it("should change `isFetching` property", result => {
      expect(result).toEqual(
        put(changeIsFetching(`${path.store}.${path.property}`, false))
      );
    });

    it("should clear old state", result => {
      expect(result).toEqual(
        put(updateValue(`${path.store}.${path.property}`, {clear: true}))
      );
    });

    it("should set error state", result => {
      expect(result).toEqual(
        put(setFetchError(`${path.store}.${path.property}`, error))
      );
    });

    it("should stop execution", result => {
      expect(result).toBeUndefined();
    });
  });

  describe("fetchSuccessSaga", () => {
    const path = {
      store: "root",
      clearState: true,
      property: "test",
    };
    const value = {data: "this is some real nice data"} as const;
    const it = sagaHelper(sagas.fetchSuccessSaga(path, value));

    it("should change `isFetching` property", result => {
      expect(result).toEqual(
        put(changeIsFetching(`${path.store}.${path.property}`, false))
      );
    });

    it("should replace old state", result => {
      expect(result).toEqual(
        put(updateValue(`${path.store}.${path.property}`, {clear: true, value}))
      );
    });

    it("should stop execution", result => {
      expect(result).toBeUndefined();
    });
  });
});
