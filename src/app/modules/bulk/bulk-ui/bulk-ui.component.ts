import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';
@Component({
  selector: 'app-bulk-ui',
  templateUrl: './bulk-ui.component.html',
  styleUrls: ['./bulk-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUiComponent implements OnInit {
  @Output() addToCart = new EventEmitter();

  @Input() currency;
  @Input() currencyExchangeRate;
  @Input() regionIdToNameMap = {};
  @Input() set accounts(accounts: account[]) {
    console.log(accounts);
    this.groupAccountsByRegion(accounts);
  }

  currencyMap = CountryToCurrencyAbbrevMap;

  accountsGrouped;

  mapNameToDust = {
    'Basic': '40k',
    'Standard': '50k',
    'Premium': '60k',
    'Capsules': 'Caps'
  };

  groupAccountsByRegion(accounts: account[]) {
    let accArr = [];
    const omitValues = ['Epic', 'Legendary'];

    console.log(accounts);
  
    accounts.forEach(
      accounts => {
        if(omitValues.includes(accounts.name)) return;
        const appropArr = accArr.find(el => el.regionId == accounts.region_id);
        if(appropArr) {
          appropArr.accounts.push(accounts);
        } else {
          accArr.push({regionId: accounts.region_id, accounts: [accounts]});
        }
      }
    );

    console.log(accArr);

    this.accountsGrouped = accArr;
  }

  constructor() { }

  ngOnInit() {
  }

}
