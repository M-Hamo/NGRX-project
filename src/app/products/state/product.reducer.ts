import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import { Product } from "../product";

import * as AppState from "../../app.state";

import * as ProductsActions from "./product.actions";

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductsCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductsCode: false,
  currentProductId: null,
  products: [],
  error: null,
};

// create selector
const getProductFeatureState = createFeatureSelector<ProductState>("products");

// now cat create any selector for any ProductState property
export const getShowProductCode = createSelector(
  getProductFeatureState,
  // state function is a projector function
  (state) => state.showProductsCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId): Product => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: "new",
        productCode: null,
        description: "",
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const productReducer = createReducer<ProductState>(
  initialState, //Initial State for showProductCode
  on(ProductsActions.toggleProductCode, (state): ProductState => {
    // this [(createAction("[Product] Toggle product code")] will show on developer tools
    // console.log(JSON.stringify(state));
    return {
      ...state,
      showProductsCode: !state.showProductsCode,
    };
  }),
  on(ProductsActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductsActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductsActions.InitializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductsActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: null,
    };
  }),
  on(ProductsActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  })
);
