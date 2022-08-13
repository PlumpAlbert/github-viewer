import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import organizationReducer from "../features/landing/store/slices/repos";
import createSagaMiddleware from "@redux-saga/core";
// sagas
import reposSaga from "features/landing/store/slices/repos/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    organization: organizationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(reposSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
