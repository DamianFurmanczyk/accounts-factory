import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CheckoutPresenter } from './checkout-ui.presenter';
import { FormGroup } from '@angular/forms';
import { DbService } from './../../../core/services/db.service';
import { cartState } from './../../../core/models/cart.interface';

@Component({
  selector: 'app-checkout-ui',
  templateUrl: './checkout-ui.component.html',
  styleUrls: ['./checkout-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckoutPresenter]
})
export class CheckoutUiComponent implements OnInit {
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
  @Input() cart: cartState;
  @Input() bulkCart: cartState;

  @Output() getVat = new EventEmitter();

  countriesObj = {};

  formError = '';

  paymentMethod = '';

  countriesArr: {}[] = [];

  form: FormGroup;

  onNipChange(value: number) {
  }

  constructor(public presenter: CheckoutPresenter, private dbS: DbService) {
    this.form = this.presenter.form;
  }

  submitPayment() {
    if(this.form.invalid) return this.formError = "Form fields are not filled in correctly";

    console.log(JSON.stringify(this.cart));
    this.dbS.payment(JSON.stringify(this.cart.accounts), this.paymentMethod, 
    this.presenter.controls.email.value, this.form.controls.fullname.value, this.cart.orderPrice).subscribe(console.log);
  }

  ngOnInit() {
  }

}
