import { createAction, createReducer, on } from "@ngrx/store";

// Home work reducer
export const userReducer = createReducer(
  { maskUserName: false },
  on(createAction("[User] MaskUserName"), (state) => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
