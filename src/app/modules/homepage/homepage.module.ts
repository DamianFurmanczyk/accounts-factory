import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageUiComponent } from './homepage-ui/homepage-ui.component';

import { FooterModule } from './../../shared/footer/footer.module';
import { CartModule } from './../../shared/cart/cart.module';
import { NavModule } from './../../shared/nav/nav.module';

import { QuantityBtnsModule } from '../../shared/quantity-btns/quantity-btns.module';
import { PipesModule } from './../../core/pipes/pipes.module';
@NgModule({
  declarations: [HomepageComponent, HomepageUiComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FooterModule,
    QuantityBtnsModule,
    PipesModule,
    CartModule,
    NavModule
  ]
})
export class HomepageModule { }
