import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import * as AppState from "../app.state";

export interface State extends AppState.State {
  users: UserState;
}

interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: false,
};

const getUsersFeatureState = createFeatureSelector<UserState>("users");

export const getMaskUserName = createSelector(
  getUsersFeatureState,
  (state) => state.maskUserName
);

export const userReducer = createReducer(
  initialState,
  on(createAction("[User] MaskUserName"), (state) => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
