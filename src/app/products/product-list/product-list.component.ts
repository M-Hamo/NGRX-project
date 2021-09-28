import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Product } from "../product";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = "Products";
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  @Input() displayCode: boolean;
  @Input() errorMessage: string;
  @Output() _productSelected = new EventEmitter();
  @Output() _checkChanged = new EventEmitter();
  @Output() _newProduct = new EventEmitter();

  productSelected(prod: Product): void {
    this._productSelected.emit(prod);
  }
  checkChanged(): void {
    this._checkChanged.emit();
  }
  newProduct(): void {
    this._newProduct.emit();
  }
}
