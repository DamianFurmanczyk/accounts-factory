import { Injectable } from '@angular/core';
import { StateService } from './state.service';

import { account } from 'src/app/core/models/accounts.interface';

import * as clone from 'clone-deep';
import { cartState } from './../models/cart.interface';
@Injectable({
  providedIn: 'root'
})

export class CartStateService {
  constructor(private stateS: StateService) {
    this.stateS.cart$.subscribe(cart => {
      console.log(cart);
      console.log('eval cart');
      this.evaluateCartOrderPrice(cart);
    })
  }

  changeOrderQuantity(e: {acc: account, quantityAdded: number}) {    
    let targetAccInStateWithIndex: {acc: account, i: number};
    this.stateS.state.cart.accounts.find((loopAccount, i) => {
      if (loopAccount.id == e.acc.id) {
        targetAccInStateWithIndex = {acc: loopAccount, i};
        return true;
      }
    });
    e.acc.selQuantity
    
    const selTargetAccQuantity = +this.stateS.state.cart.accounts[targetAccInStateWithIndex.i].selQuantity;
    let newQ = +selTargetAccQuantity + +e.quantityAdded;

    if (newQ < 1) return;

    if(newQ > targetAccInStateWithIndex.acc.count) {
      newQ = targetAccInStateWithIndex.acc.count
    }

    this.stateS.state.cart.accounts[targetAccInStateWithIndex.i] = {
      ...e.acc,
      selQuantity: newQ
    }

    this.stateS.cart$.next({...this.stateS.state.cart});
  }

  addToCart(acc: {count: number, name: string, selQuantity, region_id}) {
    console.log(acc);
    let accInCartStateWithIndex: {acc: account, i: number};

    const currentCount = this.stateS.state.cart.accounts[acc.region_id] ? 
    this.stateS.state.cart.accounts[acc.region_id + '-' + acc.name] ? this.stateS.state.cart.accounts[acc.region_id + '-' +acc.name] : 0 
    : 0,
    newCount = +currentCount + +acc.selQuantity;

    console.log(currentCount)
    console.log(acc.selQuantity)
    console.log('-')
    console.log(newCount)

    console.log(this.stateS.state.cart.accounts[acc.region_id])
    console.log(!!this.stateS.state.cart.accounts[acc.region_id])

    console.log(acc.region_id);

    this.stateS.state.cart.accounts[acc.region_id] = this.stateS.state.cart.accounts[acc.region_id] || {};

    this.stateS.state.cart.accounts = {...this.stateS.state.cart.accounts, 
      [acc.region_id + '-' + acc.name]: newCount > acc.count  ? acc.count : newCount
    };

    console.log(this.stateS.state.cart.accounts);
    this.stateS.cart$.next({ ...this.stateS.state.cart });
  }

  removeFromCart(acc2rem: account) {
    this.stateS.state.cart.accounts = this.stateS.state.cart.accounts.filter(acc => acc != acc2rem);
    this.stateS.cart$.next({ ...this.stateS.state.cart });
  }

  evaluateCartOrderPrice(cart: cartState) {
    let newTotal = 0;
    cart.accounts.forEach(acc => newTotal += acc.selQuantity * (+acc.price_usd * this.stateS.state.currencyExchangeRateToDollar));
    this.stateS.state.cart.orderPrice = newTotal;
    this.stateS.cartTotalPrice$.next(newTotal);
  }
}
