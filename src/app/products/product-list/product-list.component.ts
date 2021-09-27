import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subscription } from "rxjs";

import { Product } from "../product";
import { ProductService } from "../product.service";
import {
  getCurrentProduct,
  getShowProductCode,
  State,
} from "../state/product.reducer";

import * as ProductsActions from "../state/product.actions";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  pageTitle = "Products";
  errorMessage: string;
  // Declarative abroach
  displayCode$: Observable<boolean> = this._store.select(getShowProductCode);

  products: Product[];

  // getCurrentProduct

  selectedProduct$: Observable<Product> = this._store.select(getCurrentProduct);

  constructor(
    private productService: ProductService,
    private _store: Store<State>
  ) {}

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });
  }

  // "[Product] Cash Products"
  checkChanged(): void {
    this._store.dispatch(ProductsActions.toggleProductCode());
  }

  newProduct(): void {
    this._store.dispatch(ProductsActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this._store.dispatch(ProductsActions.setCurrentProduct({ product }));

    // this.productService.changeSelectedProduct(product);
  }
}
