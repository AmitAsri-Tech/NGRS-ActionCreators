import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from './product';
import { AppState } from './app-state';
import { CreateProductAction, UpdateProductAction, DeleteProductAction } from './product.actions';


const productsSelector = (state) => state.products;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products$;
  newProduct: string;
  id = 1;
  selectedProduct;
 
  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(productsSelector);
  }

  select(product: Product) {
    this.selectedProduct = { ...product};
  }

  create() {
    const product = {} as Product;
    product.id = this.id++;
    product.name = this.newProduct;
    this.store.dispatch(new CreateProductAction(product));
    this.newProduct = '';
  }

  update() {
    this.store.dispatch(new UpdateProductAction(this.selectedProduct));
    this.selectedProduct = null;
  }

  delete(product: Product) {
    this.store.dispatch(new DeleteProductAction(product.id));
  }
}
