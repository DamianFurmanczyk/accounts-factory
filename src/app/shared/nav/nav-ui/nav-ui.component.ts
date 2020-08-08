import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-nav-ui',
  templateUrl: './nav-ui.component.html',
  styleUrls: ['./nav-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUiComponent implements OnInit {
  @Output() currencyChange: EventEmitter<string> = new EventEmitter();
  @Input() currency;
  @Input() homepageStyles;

  @Input() set currencySetHandler(excludeCurr) {
    console.log('to rem after resolvers or smth')
    console.log(excludeCurr)
    if(!excludeCurr) {
      return;
    }
    if(!this.hasCurrencyBeenSetBasedOnIpFlag) {
      this.currencyOptions = [...this.currencyOptions, excludeCurr];
      this.initialCurrencyBasedOnIp = excludeCurr;
      this.hasCurrencyBeenSetBasedOnIpFlag = true;
    }

    this.activeCurrency = excludeCurr;
    this.currencyOptionsToDisplay = this.currencyOptions.filter(el => el != excludeCurr);
    if(this.initialCurrencyOptions.includes(excludeCurr) && this.initialCurrencyOptions.includes(this.initialCurrencyBasedOnIp)) {
      this.currencyOptionsToDisplay = this.initialCurrencyOptions;
    }
  }

  hasCurrencyBeenSetBasedOnIpFlag = false;

  initialCurrencyBasedOnIp: string;
  activeCurrency = '';

  initialCurrencyOptions = [
    'EUR',
    'USD',
    'GBP'
  ];
  currencyOptions = this.initialCurrencyOptions;
  currencyOptionsToDisplay: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
