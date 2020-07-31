import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';

import { cartState } from './../../../core/models/cart.interface';

@Component({
  selector: 'app-cart-ui',
  templateUrl: './cart-ui.component.html',
  styleUrls: ['./cart-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartUiComponent implements OnInit {
  @Input() cart: cartState;

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeOrderQuantity: EventEmitter<{account: account, quantity: number}> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
