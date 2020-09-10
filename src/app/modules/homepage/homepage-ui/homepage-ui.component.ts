import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { region } from './../../../core/models/regions.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';

@Component({
  selector: 'app-homepage-ui',
  templateUrl: './homepage-ui.component.html',
  styleUrls: ['./homepage-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageUiComponent implements OnInit {
  @Input() regions: region[] | null;
  @Input() set accounts(accounts: account[] | null) {
    if(!accounts) return;
    const tempAccount = accounts[0];
    
    let newAccounts = [...accounts];
    newAccounts[0] = accounts[accounts.length - 1];
    newAccounts[accounts.length - 1] = tempAccount;
    console.log( newAccounts)
    console.log( accounts);

    this.accountsToDisplay = newAccounts;
  }
  @Input() currency: string | null;
  @Input() currencyExchangeRate: number | null;

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeAccountQuantity: EventEmitter<{account: account, quantity: number}> = new EventEmitter();
  @Output() onRegionSelected: EventEmitter<string> = new EventEmitter();

  accountsToDisplay: account[] | null = null;

  currencyMap = CountryToCurrencyAbbrevMap;
  
  constructor() { }

  ngOnInit() {
  }

}
