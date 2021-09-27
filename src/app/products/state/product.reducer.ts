import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
  { showProductsCode: false }, //Initial State for showProductCode
  on(createAction("[Product] Toggle product code"), (state) => {
    // this [(createAction("[Product] Toggle product code")] will show on developer tools
    // console.log(JSON.stringify(state));
    return {
      ...state,
      showProductsCode: !state.showProductsCode,
    };
  })
);
