import { Injectable } from '@angular/core';

import { DbService } from './db.service';

import * as clone from 'clone-deep';
import { BehaviorSubject } from 'rxjs';

import { first, tap } from 'rxjs/operators';

import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { cartState } from './../models/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // should have used entities/objects instead of arrays
  state = {
    regions: null,
    usersCountry: null,
    currency: null,
    region: 'EUNE',
    accounts: null,
    allRegionsAccounts: null,
    currencyExchangeRateToDollar: null,
    cart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    }
  }

  resolversRun = false;

  regions$: BehaviorSubject<null | region[]> = new BehaviorSubject(this.state.regions);
  accounts$: BehaviorSubject<account[] | null> = new BehaviorSubject(this.state.accounts);
  allRegionsAccounts$: BehaviorSubject<account[] | null> = new BehaviorSubject(this.state.allRegionsAccounts);
  currency$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.currency);
  usersCountry$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.usersCountry);
  cart$: BehaviorSubject<cartState> = new BehaviorSubject(this.state.cart);
  cartTotalPrice$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);
  currencyExchangeRateToDollar$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);

  constructor(private dbS: DbService) {
    console.log(clone({ asd: '123' }))
    this.laodAllRegionsAccounts();
    // this.loadDbRegionsToState();
    // this.loadDbCurrencyAndUsersCountryToState();
    // this.loadDbAccountsToState();
  }

  laodAllRegionsAccounts() {
    return this.dbS.getAllRegionsAccounts().pipe(
      first(),
      tap((res) => {
        console.log(res);
        this.allRegionsAccounts$.next(<account[]>res);
  
        this.state = {...this.state, allRegionsAccounts: res};
        console.log(this.state)
      })
    ).subscribe();
  }

  loadDbCurrencyAndUsersCountryToState() {
    return this.dbS.getCurrencyAndUsersCountry().pipe(
      first(),
      tap(res => {
        console.log(res);
        const currency = res[0][0],
        usersCountry = res[1][0];
        this.currency$.next(currency);
        this.usersCountry$.next(usersCountry);
  
        this.loadCurrencyExchangeRateToDollar(currency);
  
        this.state = {...this.state, currency, usersCountry};
        console.log(this.state)
      })
    );
  }

  loadCurrencyExchangeRateToDollar(currencyName: string) {
    this.dbS.getExchangeRateToDollar(currencyName).pipe(
      first()
    ).subscribe(res => {
      console.log(res)

      this.state = {...this.state, currencyExchangeRateToDollar: res,  currency: currencyName};
      this.currencyExchangeRateToDollar$.next(<number>res);
      this.currency$.next(currencyName);
      console.log(this.state)
    });
  }

  changeCurrency(currencyName: string) {
    this.loadCurrencyExchangeRateToDollar(currencyName);
  }

  changeAccountSelectedQuantity(e: {acc: account, quantityAdded: number}) {
    let targetAccInStateWithIndex: {acc: account, i: number};
    this.state.accounts.find((loopAccount, i) => {
      if (loopAccount.id == e.acc.id) {
        targetAccInStateWithIndex = {acc: loopAccount, i};
        return true;
      }
    });
    
    const selTargetAccQuantity = +this.state.accounts[targetAccInStateWithIndex.i].selQuantity, 
    newQ = +selTargetAccQuantity + +e.quantityAdded;

    if (newQ < 1 || newQ > targetAccInStateWithIndex.acc.count) return;

    this.state.accounts[targetAccInStateWithIndex.i] = {
      ...e.acc,
      selQuantity: newQ
    }
  }

  loadDbRegionsToState() {
    return this.dbS.getRegions().pipe(
      first(),
      tap(res => {
        this.state = {...this.state, regions: res};
        this.regions$.next(res);
      })
    );
  }

  updateAccountsBasedOnRegion(regionSelected: string) {
    this.state.region = regionSelected;
    this.loadDbAccountsToState().subscribe();
  }

  loadDbAccountsToState() {
    return this.dbS.getAccounts(this.state.region).pipe(
      first(),
      tap(res => {
        let currIndex = 0;
        const resFormatted = res.acc.map(acc => {
          const count = res.count[currIndex++]
          return {...acc, count, selQuantity: count > 0? 1 : 0}
        })
        this.state = {...this.state, accounts: resFormatted};
        this.accounts$.next(resFormatted);
      })
    );
  }

}
