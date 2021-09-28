import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from "../state/product.reducer";

import * as ProductsActions from "../state/product.actions";

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  errorMessage$: Observable<string> = this._store.select(getError);
  // Declarative abroach
  displayCode$: Observable<boolean> = this._store.select(getShowProductCode);

  products$: Observable<Product[]> = this._store.select(getProducts);


  selectedProduct$: Observable<Product> = this._store.select(getCurrentProduct);

  constructor(
    private _store: Store<State>
  ) {}

  ngOnInit(): void {
    this._store.dispatch(ProductsActions.loadProducts());
  }

  // "[Product] Cash Products"
  checkChanged(): void {
    this._store.dispatch(ProductsActions.toggleProductCode());
  }

  newProduct(): void {
    this._store.dispatch(ProductsActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this._store.dispatch(
      ProductsActions.setCurrentProduct({ currentProductId: product.id })
    );
  }
}
