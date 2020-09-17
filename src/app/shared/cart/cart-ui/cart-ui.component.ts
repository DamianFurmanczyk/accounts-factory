import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';

import { cartState } from './../../../core/models/cart.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';
import { DbService } from './../../../core/services/db.service';
import { StateService } from './../../../core/services/state.service';

@Component({
  selector: 'app-cart-ui',
  templateUrl: './cart-ui.component.html',
  styleUrls: ['./cart-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartUiComponent implements OnInit {
  @Input() regionIdToNameMap;
  @Input() set contentType(contentType: string) {
    this.contentType2 = contentType;
    if(this.contentType2 == 'checkout') {
      this.cart = this.stateS.appropriateCartToShow == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
    } else {
      this.cart = this.contentType2 == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
    }
  };
  @Input() cartTotalPrice: number;
  @Input() buttonDisabled: boolean;
  @Input() currencyExchangeRate: number;
  @Input() currency: string;
  @Input() mediumHideBreakdownFlag: boolean;
  @Input() vat: number;
  @Input() checkoutFormStateErrorMsg = '';

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeCartAccountQuantity: EventEmitter<{account: account, quantity: number}> = new EventEmitter();
  @Output() setAppropriateCartToShow: EventEmitter<void> = new EventEmitter();

  contentType2 = '';
  cartActiveStyles = false;
  currencyMap = CountryToCurrencyAbbrevMap;
  cart: cartState;

  constructor(private dbS: DbService, public stateS: StateService) { }

  ngOnInit() {}

  submitPayment() {
    const jsonCart = JSON.stringify(this.stateS.state.cart.accounts.map(el => {
      return {...el, description: null};
    }));
    console.log(this.stateS.state.checkoutFormState)
    // this.dbS.payment(jsonCart, this.stateS.state.checkoutFormState);
  }

}
