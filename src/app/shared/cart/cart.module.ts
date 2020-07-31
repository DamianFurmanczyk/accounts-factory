import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartUiComponent } from './cart-ui/cart-ui.component';

@NgModule({
  declarations: [CartComponent, CartUiComponent],
  imports: [
    CommonModule
  ],
  exports: [CartComponent, CartUiComponent]
})
export class CartModule {}
