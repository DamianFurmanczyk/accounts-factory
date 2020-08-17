import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CheckoutPresenter } from './checkout-ui.pesenter';
import { ICountry } from './country.interface';

@Component({
  selector: 'app-checkout-ui',
  templateUrl: './checkout-ui.component.html',
  styleUrls: ['./checkout-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CheckoutPresenter]
})
export class CheckoutUiComponent implements OnInit {
  public countries: ICountry[] = [];

  constructor(public presenter: CheckoutPresenter) { }

  ngOnInit() {
  }

}
