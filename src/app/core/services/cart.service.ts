import { Injectable } from '@angular/core';
import { StateService } from './state.service';

import { account } from 'src/app/core/models/accounts.interface';

@Injectable({
  providedIn: 'root'
})

export class CartStateService {
    constructor(private stateS: StateService) {}

    changeOrderQuantity(acc: account, orderQty: number) {
        console.log(acc);
        // this.stateS.state.cart.accounts.push({...acc, orderQty});
      // this.stateS.cart$.next({...this.stateS.state.cart});
    }

    addToCart(acc: account) {
      console.log('add')
      this.stateS.state.cart.accounts.push({...acc});
      console.log(this.stateS.state.cart)
      this.stateS.cart$.next({...this.stateS.state.cart});
    }

    removeFromCart(acc2rem: account) {
        this.stateS.state.cart.accounts = this.stateS.state.cart.accounts.filter(acc => acc != acc2rem);
        this.stateS.cart$.next({...this.stateS.state.cart});
    }

    evaluateCartOrderPrice() {

    }
}
