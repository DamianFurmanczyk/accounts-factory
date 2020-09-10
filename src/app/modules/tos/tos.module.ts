import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TosComponent } from './tos/tos.component';
import { TosRoutingModule } from './tos.routing';

@NgModule({
  declarations: [TosComponent],
  imports: [
    CommonModule,
    TosRoutingModule
  ]
})
export class TosModule { }
