import sagaHelper from "redux-saga-testing";

import reducer, {initialState} from "./index";
// sagas
import * as sagas from "./sagas";
// actions
import * as actions from "./actions";

describe("> repos slice", () => {
  it("should update `name` property", () => {
    const newState = reducer(
      initialState,
      actions.changeOrganizationName("facebook")
    );
    expect(newState.name).toBe("facebook");
  });

  describe("should fetch repos", () => {
    const clearState = false;
    const it = sagaHelper(sagas.reposFetchStart(clearState));

    it("should set `isFetching` property", ({payload: {action}}) => {
      const newState = reducer(initialState, action as any);
      expect(newState.repos.isFetching).toBe(true);
    });

    if (clearState) {
      it("should clear state", ({payload: {action}}) => {
        const newState = reducer(initialState, action as any);
        expect(newState.repos.value).toBeUndefined();
      });
    }

    it("should stop", result => {
      expect(result).toBeUndefined();
    });
  });

  describe("should update repos", () => {
    const clearState = false;
    const state: typeof initialState = {
      name: "facebook",
      repos: {
        isFetching: true,
        value: {
          1: {
            id: 1,
            name: "test",
            private: false,
            html_url: "",
            language: "js",
            full_name: "facebook/test",
            description: "this is a description",
            stargazers_count: 5,
          },
        },
      },
    };
    const repos: any[] = [
      {
        id: 2,
        name: "new",
        private: false,
        html_url: "",
        language: "typescript",
        full_name: "facebook/new",
        description: "there should be a description",
        stargazers_count: 3,
      },
    ];
    const it = sagaHelper(sagas.reposFetchSuccess(repos, clearState));

    it("should unset `isFetching` property", ({payload: {action}}) => {
      const newState = reducer(state, action as any);
      expect(newState.repos.isFetching).toBe(false);
    });

    if (clearState) {
      it("should replace state", ({payload: {action}}) => {
        const newState = reducer(state, action as any);
        expect(newState.repos.value).toEqual(repos);
      });
    } else {
      it("should update state", ({payload: {action}}) => {
        const newState = reducer(state, action as any);
        expect(newState.repos.value).toEqual({
          ...state.repos.value,
          ...repos.reduce((v, r) => ({...v, [r.id]: r}), {}),
        });
      });
    }

    it("should stop", result => {
      expect(result).toBeUndefined();
    });
  });

  describe("should handle fetch error", () => {
    const clearState = false;
    const error = {message: "hello world", documentation_url: ""};
    const it = sagaHelper(sagas.reposFetchError(error));

    it("should unset `isFetching` property", ({payload: {action}}) => {
      const newState = reducer(initialState, action as any);
      expect(newState.repos.isFetching).toBe(false);
    });

    if (clearState) {
      it("should clear state", ({payload: {action}}) => {
        const newState = reducer(initialState, action as any);
        expect(newState.repos.value).toBeUndefined();
      });
    }

    it("should set error state", ({payload: {action}}) => {
      const newState = reducer(initialState, action as any);
      expect(newState.repos.fetchError).toEqual(error);
    });

    it("should stop", result => {
      expect(result).toBeUndefined();
    });
  });
});
