import {call} from "@redux-saga/core/effects";
import sagaHelper from "redux-saga-testing";
// store imports
import repoReducer, {initialState} from ".";
import {fetchRepos} from "./sagas.ts";
// api
import {getOrganizationRepos} from "../api/getOrganizationRepos";

describe("repository reducer", () => {
  let state = initialState;

  test("fetchRepos", () => {
    const it = sagaHelper(fetchRepos());

    it("should fetch repositories", value => {
      expect(value).toBe(
        call(getOrganizationRepos, {
          name: "facebook",
        })
      );
    });

  });
});
