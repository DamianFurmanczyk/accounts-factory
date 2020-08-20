import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutUiComponent } from './checkout-ui/checkout-ui.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartModule } from './../../shared/cart/cart.module';

import { CountrySelectComponent } from './../../shared/country-select/country-select.component';

@NgModule({
  declarations: [CheckoutUiComponent, CheckoutComponent, CountrySelectComponent],
  imports: [
  CommonModule,
    CheckoutRoutingModule,
    CartModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
