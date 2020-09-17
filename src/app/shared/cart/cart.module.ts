import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartUiComponent } from './cart-ui/cart-ui.component';
import { RouterModule } from '@angular/router';

import { QuantityBtnsModule } from '../quantity-btns/quantity-btns.module';
import { PipesModule } from './../../core/pipes/pipes.module';

@NgModule({
  declarations: [CartComponent, CartUiComponent],
  imports: [
    CommonModule,
    RouterModule,
    QuantityBtnsModule,
    PipesModule
  ],
  exports: [CartComponent]
})
export class CartModule {}
