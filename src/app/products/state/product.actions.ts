import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction("[Product] Toggle product code");

export const setCurrentProduct = createAction(
  "[Product] Set Current product",
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction(
  "[Product] Clear Current product"
);

export const InitializeCurrentProduct = createAction(
  "[Product] Initialize Current product"
);

export const loadProducts = createAction("[Product] Load");

export const loadProductsSuccess = createAction(
  "[Product] Load Success",
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  "[Product] Load Fail",
  props<{ error: string }>()
);
