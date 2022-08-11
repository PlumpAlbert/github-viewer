import {call, put, takeEvery, all, fork} from "@redux-saga/core/effects";
import {getOrganizationRepos} from "../../services/getOrganizationRepos";
import * as actionCreators from "../actions";
import {ActionTypes} from "../actions";

function* onFetchRepos(...params: Parameters<typeof getOrganizationRepos>) {
  try {
    yield put(actionCreators.fetchRepos());
    const repos = yield call(getOrganizationRepos, ...params);
    yield put(actionCreators.fetchReposSuccess(repos));
  } catch (error: any) {
    yield put(actionCreators.fetchReposError(error.message));
  }
}

function* watchFetchRepos() {
  yield takeEvery(ActionTypes.FETCH_REPOS, onFetchRepos);
}

export default function* () {
  yield all([fork(watchFetchRepos)]);
}
