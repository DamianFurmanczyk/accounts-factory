import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CheckoutPresenter } from './checkout-ui.presenter';
import { StateService } from './../../../core/services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-ui',
  templateUrl: './checkout-ui.component.html',
  styleUrls: ['./checkout-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckoutPresenter]
})
export class CheckoutUiComponent implements OnInit, OnDestroy {
  @Input() cartTotalPrice: number;
  @Input() companyDataLoadError;
  @Input() companyData;
  @Input() currency: string;
  @Input() vat: number;
  @Input() set countries(countries: {} | null) {
    console.log(countries)
    this.countriesObj = countries;
    if(!countries) return;
    this.countriesArr = Object.keys(countries).map(key => {
      return {name: countries[key], key}
    });
    console.log(countries)
    console.log(this.countriesArr)
  };
  @Input() usersCountry: string;
  @Input() selectedCountryCode: string;

  @Output() getVat = new EventEmitter();

  sub: Subscription;

  countriesObj = {};

  formError = '';

  paymentMethod = '';

  countriesArr: {}[] = [];

  constructor(public presenter: CheckoutPresenter, private stateS: StateService) {
    this.sub = this.presenter.form.valueChanges.subscribe(v => {
      console.log(v);
      this.stateS.state.checkoutFormState = v;
      this.stateS.state.checkoutFormState = {...this.stateS.state.checkoutFormState, valid: this.presenter.form.valid};
    });
  }

  setPaymentMethod(v: string) {
    this.paymentMethod = v;
    this.stateS.state.checkoutFormState = {...this.stateS.state.checkoutFormState, paymentMethod: this.paymentMethod};
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
