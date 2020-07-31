import { Component, OnInit } from '@angular/core';
import { CartStateService } from './../../core/services/cart.service';
import { StateService } from './../../core/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cartS: CartStateService, public stateS: StateService) { }

  ngOnInit() {}

}
