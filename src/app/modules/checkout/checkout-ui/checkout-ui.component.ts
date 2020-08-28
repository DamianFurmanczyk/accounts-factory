import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CheckoutPresenter } from './checkout-ui.pesenter';

@Component({
  selector: 'app-checkout-ui',
  templateUrl: './checkout-ui.component.html',
  styleUrls: ['./checkout-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckoutPresenter]
})
export class CheckoutUiComponent implements OnInit {
  @Input() cartTotalPrice: number;
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

  @Output() getVat = new EventEmitter();

  countriesObj = {};

  countriesArr: {}[] = [];

  constructor(public presenter: CheckoutPresenter) { } 

  ngOnInit() {
  }

}
