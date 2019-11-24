import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { StoreModule, ActionReducerMap, } from '@ngrx/store';

import { ProductActionUnion, ProductActionTypes } from './product.actions';
import { Product } from './product';
import { AppState } from './app-state';

const productsReducer = (state: Array<Product> = [], action: ProductActionUnion) => {
  switch (action.type) {
    case ProductActionTypes.Create:
      return [...state, { ...action.payload }];
    case ProductActionTypes.Update:
      return state.map(p => {
        if (p.id === action.payload.id) {
          return { ...p, ...action.payload };
        } else {
          return p;
        }
      });
    case ProductActionTypes.Delete:
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
};

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
