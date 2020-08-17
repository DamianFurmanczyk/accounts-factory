import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutUiComponent } from './checkout-ui/checkout-ui.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CountryPickerModule } from 'ngx-country-picker';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartModule } from './../../shared/cart/cart.module';

@NgModule({
  declarations: [CheckoutUiComponent, CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CartModule,
    FormsModule,
    ReactiveFormsModule,
    CountryPickerModule.forRoot()
  ]
})
export class CheckoutModule { }
