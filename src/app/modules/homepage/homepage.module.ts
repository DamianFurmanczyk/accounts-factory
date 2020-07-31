import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HomepageUiComponent } from './homepage-ui/homepage-ui.component';

import { FooterModule } from './../../shared/footer/footer.module';
import { CartModule } from './../../shared/cart/cart.module';
import { NavModule } from './../../shared/nav/nav.module';

@NgModule({
  declarations: [HomepageComponent, HomepageUiComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FooterModule,
    CartModule,
    NavModule
  ]
})
export class HomepageModule { }
