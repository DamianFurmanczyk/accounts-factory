import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';

import { cartState } from './../../../core/models/cart.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';
import { DbService } from './../../../core/services/db.service';
import { StateService } from './../../../core/services/state.service';
import { Subject } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-ui',
  templateUrl: './cart-ui.component.html',
  styleUrls: ['./cart-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartUiComponent implements OnInit, OnDestroy {
  @Input() regionIdToNameMap;
  @Input() set contentType(contentType: string) {
    this.contentType2 = contentType;
    if (this.contentType2 == 'checkout') {
      this.cart = this.stateS.appropriateCartToShow == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
    } else {
      this.cart = this.contentType2 == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
    }

    if (contentType == 'bulk' || this.stateS.appropriateCartToShow == "bulk") this.bulkActiveFlag = true;
  };
  @Input() cartTotalPrice: number;
  @Input() buttonDisabled: boolean;
  @Input() currencyExchangeRate: number;
  @Input() currency: string;
  @Input() mediumHideBreakdownFlag: boolean;
  @Input() vat: number;
  @Input() checkoutFormStateErrorMsg = '';
  @Input() set checkoutFormState(formState) {
    if (formState == null) return;
    if (formState.paymentMethod == "crypto") this.fee = this.cartTotalPrice * .1;
    if (formState.paymentMethod == "paypal") this.fee = this.cartTotalPrice * .029 + .35 * this.currencyExchangeRate;
    if (formState.paymentMethod == "stripe") this.fee = this.cartTotalPrice * .029 + .3 * this.currencyExchangeRate;

  }

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeCartAccountQuantity: EventEmitter<{ account: account, quantity: number }> = new EventEmitter();
  @Output() setAppropriateCartToShow: EventEmitter<void> = new EventEmitter();

  fee = 0;

  bulkActiveFlag: boolean;

  contentType2 = '';
  cartActiveStyles = false;
  currencyMap = CountryToCurrencyAbbrevMap;
  cart: cartState;
  set setCartsEmptyFlag({ a, b }) {
    this.cartsEmptyFlags = [a, b];
    if (!this.cartsEmptyFlags.includes(true)) this.showCartsToggle = true;
  };
  showCartsToggle = false;
  cartsEmptyFlags = [true, true];
  unsubOnDestruction = new Subject();

  constructor(private dbS: DbService, public stateS: StateService) {

  }

  ngOnInit() {
    this.stateS.bulkCart$.pipe(
      takeUntil(
        this.unsubOnDestruction
      )
    ).subscribe(
      res => {
        console.log(res.accounts.reduce((prev, curr) => curr.selQuantity + prev, 0));
        (res.accounts.length > 0 && res.accounts.reduce((prev, curr) => curr.selQuantity + prev, 0) > 9) ? this.setCartsEmptyFlag = { a: this.cartsEmptyFlags[0], b: false } : this.setCartsEmptyFlag = { a: this.cartsEmptyFlags[0], b: true };
      }
    );

    this.stateS.cart$.pipe(
      takeUntil(
        this.unsubOnDestruction
      )
    ).subscribe(
      res => {
        res.accounts.length > 0 ? this.setCartsEmptyFlag = { a: false, b: this.cartsEmptyFlags[1] } : this.setCartsEmptyFlag = { a: true, b: this.cartsEmptyFlags[1] };
      }
    );
  }

  ngOnDestroy() {
    this.unsubOnDestruction.next();
    this.unsubOnDestruction.complete();
  }

  swapCarts() {
    // if (JSON.stringify(this.cart) == JSON.stringify(this.stateS.state.cart)) {
      this.bulkActiveFlag = !this.bulkActiveFlag;
      console.log(this.bulkActiveFlag)

    if (this.bulkActiveFlag) {
      console.log('bulk')
      return this.stateS.bulkCart$.pipe(
        takeUntil(this.unsubOnDestruction),
        map(res => this.cart = res)
      ).subscribe(res => {
        this.cart = res;
      });
    }
    this.stateS.cart$.pipe(
      takeUntil(this.unsubOnDestruction),
      map(res => this.cart = res)
    ).subscribe(res => {
      this.cart = res;
    });
  }

  submitPayment() {
    const jsonCart = JSON.stringify(this.stateS.state.cart.accounts.map(el => {
      return { ...el, description: null };
    }));
    console.log(this.stateS.state.checkoutFormState)
    // this.dbS.payment(jsonCart, this.stateS.state.checkoutFormState);
  }

}
