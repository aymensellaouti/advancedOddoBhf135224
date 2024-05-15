import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, takeWhile, scan } from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  setting: Settings = { limit: 12, skip: 0 };
  settings$ = new BehaviorSubject<Settings>(this.setting);
  productService = inject(ProductService);
  products$: Observable<Product[]> = this.settings$.pipe(
    // setings de l'api
    concatMap((setting) => this.productService.getProducts(setting)),
    // ProductApiRespons
    map((productApiResponse) => productApiResponse.products),
    // [Produits]
    takeWhile((products) => !!products.length),
    scan((oldProducts, newProducts) => [...oldProducts, ...newProducts])
  );
  constructor() {}

  moreProducts() {
    this.setting.skip += this.setting.limit;
    this.settings$.next(this.setting);
  }
}
