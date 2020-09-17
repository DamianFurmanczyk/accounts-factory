import { Injectable } from '@angular/core';

import { DbService } from './db.service';

import * as clone from 'clone-deep';
import { BehaviorSubject } from 'rxjs';

import { first, tap, exhaustMap } from 'rxjs/operators';

import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { cartState } from './../models/cart.interface';
import { vatRates } from './data/vat';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state = {
    regions: null,
    usersCountry: null,
    currency: null,
    countries: null,
    region: 'EUNE',
    selectedCountryCode: null,
    accounts: null,
    vatRate: null,
    allRegionsAccounts: null,
    currencyExchangeRateToDollar: null,
    companyData: null,
    companyDataLoadError: null,
    cart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    },
    bulkCart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    },
    bulkCartEnoughItemsToPurchase: null,
    checkoutFormState: null,
    checkoutFormStateErrorMsg: null
  }

  resolversRun = false;

  appropriateCartToShow: 'bulk' | 'main' | '' = '';

  regionIdToRegionNameMap = {};

  bulkCartEnoughItemsToPurchase$: BehaviorSubject<null | boolean> = new BehaviorSubject(this.state.bulkCartEnoughItemsToPurchase);
  regions$: BehaviorSubject<null | region[]> = new BehaviorSubject(this.state.regions);
  companyData$: BehaviorSubject<any> = new BehaviorSubject(this.state.companyData);
  companyDataLoadError$: BehaviorSubject<any> = new BehaviorSubject(this.state.companyDataLoadError);
  vatRate$: BehaviorSubject<null | number> = new BehaviorSubject(this.state.vatRate);
  countries$: BehaviorSubject<null | any[]> = new BehaviorSubject(this.state.countries);
  accounts$: BehaviorSubject<any | null> = new BehaviorSubject(this.state.accounts);
  allRegionsAccounts$: BehaviorSubject<account[] | null> = new BehaviorSubject(this.state.allRegionsAccounts);
  currency$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.currency);
  usersCountry$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.usersCountry);
  cart$: BehaviorSubject<cartState> = new BehaviorSubject(this.state.cart);
  bulkCart$: BehaviorSubject<cartState> = new BehaviorSubject(this.state.bulkCart);
  selectedCountryCode$: BehaviorSubject<string | null> = new BehaviorSubject(this.state.selectedCountryCode);
  cartTotalPrice$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);
  bulkCartTotalPrice$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.bulkCart.orderPrice);
  currencyExchangeRateToDollar$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);
  checkoutFormStateErrorMsg$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.checkoutFormStateErrorMsg);

  constructor(private dbS: DbService) {
    // console.log(clone({ asd: '123' }));
    // this.loadDbRegionsToState();
    // this.loadDbCurrencyAndUsersCountryToState();
    // this.loadDbAccountsToState();
  }

  onCheckoutFormStateChange(state: any, invalid: boolean, paymentMethodNotChosen: boolean) {
    this.state.checkoutFormState = state;
    this.state.checkoutFormStateErrorMsg = state;
    if(paymentMethodNotChosen) {
      this.state.checkoutFormStateErrorMsg = 'Select payment method';
      this.state.checkoutFormState = {...state, paymentMethod: this.state.checkoutFormStateErrorMsg};
      this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
      return;
    }

    if(invalid) {
      this.state.checkoutFormStateErrorMsg = 'Fill in the form';
      this.state.checkoutFormState = {...state, paymentMethod: this.state.checkoutFormStateErrorMsg};
      this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
      return;
    }
    
    this.state.checkoutFormStateErrorMsg = '';
    this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
  }

  loadVatRate(countryCode: string) {
    this.state.selectedCountryCode = countryCode;
    this.selectedCountryCode$.next(countryCode);

    const vatRecord = vatRates.rates.find(el => el.code == countryCode),
    vat = vatRecord ? vatRecord.periods[0].rates.standard : 0;

    console.log(vat)

    this.vatRate$.next(<number>vat);

    this.state = { ...this.state, vatRate: vat };
  }

  loadCompanyData(countryCode: string, id: string) {
    return this.dbS.verifyCompany(countryCode, id).pipe(
      first(),
      tap(
        (res: {valid: string, countryCode: string}) => {
          console.log(res);

          const valid = res.countryCode != 'PL' && res.valid == 'true';

          valid && this.vatRate$.next(<number>0);
          !valid && this.companyDataLoadError$.next(new HttpErrorResponse({}));
          this.companyData$.next(valid);

          this.state = { ...this.state, vatRate: valid ? 0 : this.state.vatRate, companyDataLoadError: valid ? null:  new HttpErrorResponse({}), companyData: valid ? res: null };
        }
      )
    );
  }

  laodAllRegionsAccounts() {
    return this.dbS.getAllRegionsAccounts().pipe(
      first(),
      tap((res) => {
        console.log(res);
        this.allRegionsAccounts$.next(<account[]>res);

        this.state = { ...this.state, allRegionsAccounts: res };
        console.log(this.state)
      })
    );
  }

  laodCountries() {
    return this.dbS.getCountries().pipe(
      first(),
      tap((res: any) => {
        // // console.log(res);
        this.countries$.next(res);

        this.state = { ...this.state, countries: res };
      })
    );
  }

  loadDbCurrencyAndUsersCountryToState() {
    return this.dbS.getCurrencyAndUsersCountry().pipe(
      first(),
      tap(res => {
        // // console.log(res);
        const currency = res[0][0],
          usersCountry = res[2][0];
        this.currency$.next(currency);
        this.usersCountry$.next(usersCountry);

        // console.log(res);

        this.loadCurrencyExchangeRateToDollar(currency);

        this.state = { ...this.state, currency, usersCountry };
        // console.log(this.state)
        this.loadVatRate(usersCountry);
      })
    );
  }

  loadCurrencyExchangeRateToDollar(currencyName: string) {
    this.dbS.getExchangeRateToDollar(currencyName).pipe(
      first()
    ).subscribe(res => {
      // console.log(res)

      this.state = { ...this.state, currencyExchangeRateToDollar: res, currency: currencyName };
      this.currencyExchangeRateToDollar$.next(<number>res);
      this.currency$.next(currencyName);
      // console.log(this.state)
    });
  }

  changeCurrency(currencyName: string) {
    this.loadCurrencyExchangeRateToDollar(currencyName);
  }

  changeAccountSelectedQuantity(e: { acc: account, quantityAdded: number }) {
    let targetAccInStateWithIndex: { acc: account, i: number };
    this.state.accounts.find((loopAccount, i) => {
      if (loopAccount.id == e.acc.id) {
        targetAccInStateWithIndex = { acc: loopAccount, i };
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
      tap((res: region[]) => {
        res.forEach(
          el => this.regionIdToRegionNameMap[el.id] = el.name
        );

        this.state = { ...this.state, regions: res };
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
          return { ...acc, count, selQuantity: count > 0 ? 1 : 0 }
        })
        this.state = { ...this.state, accounts: resFormatted };
        this.accounts$.next(resFormatted);
      })
    );
  }

}
