import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = "Products";
  errorMessage: string;
  // Declarative abroach
  displayCode$: Observable<boolean> = this._store.select("products").pipe(
    filter((products) => !!products),
    map((products: any) => products.showProductsCode)
  );

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  constructor(
    private productService: ProductService,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (currentProduct) => (this.selectedProduct = currentProduct)
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => (this.products = products),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(): void {
    this._store.dispatch({
      type: "[Product] Toggle product code",
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
