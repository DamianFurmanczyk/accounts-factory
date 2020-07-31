import { Injectable } from '@angular/core';

import { DbService } from './db.service';

import { initalState } from '../dataNmappers/initialState';
// state musi nie byc modyfikowany - klonowany i nowy

import * as clone from 'clone-deep';
import { BehaviorSubject } from 'rxjs';

import { first } from 'rxjs/operators';

import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state = {
    regions: null,
    usersCountry: null,
    currency: null,
    region: 'EUNE',
    accounts: null,
    cart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    }
  }

  regions$: BehaviorSubject<null | region[]> = new BehaviorSubject(this.state.regions);
  accounts$: BehaviorSubject<any> = new BehaviorSubject(this.state.accounts);
  currency$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.currency);
  usersCountry$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.usersCountry);
  cart$: BehaviorSubject<any> = new BehaviorSubject(this.state.cart);

  constructor(private dbS: DbService) {
    console.log(clone({ asd: '123' }))
    this.loadDbRegionsToState();
    this.loadDbCurrencyAndUsersCountryToState();
    this.loadDbAccountsToState();
  }

  siema() {
    console.log('siema')
  }

  loadDbRegionsToState() {
    this.dbS.getRegions().pipe(
      first()
    ).subscribe(res => {
      this.state = {...this.state, regions: res};
      console.log(this.state)
      this.regions$.next(res);
    });
  }

  updateAccountsBasedOnRegion(regionSelected: string) {
    this.state.region = regionSelected;
    this.loadDbAccountsToState();
  }

  loadDbAccountsToState() {
    this.dbS.getAccounts(this.state.region).pipe(
      first()
    ).subscribe(res => {
      let currIndex = 0;
      const resFormatted = res.acc.map(acc => {
        const count = res.count[currIndex++]
        return {...acc, count, selQuantity: count > 0? 1 : 0}
      })
      this.state = {...this.state, accounts: resFormatted};
      console.log(this.state)
      console.log(res.acc)
      this.accounts$.next(resFormatted);
    });
  }

  loadDbCurrencyAndUsersCountryToState() {
    this.dbS.getCurrencyAndUsersCountry().pipe(
      first()
    ).subscribe(res => {
      console.log(res);
      this.currency$.next(res[0][0]);
      this.usersCountry$.next(res[1][0]);

      this.state = {...this.state, currency: res[0][0], usersCountry: res[1][0]};
      console.log(this.state)
    });
  }

}
