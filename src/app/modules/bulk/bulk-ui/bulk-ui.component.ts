import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';

@Component({
  selector: 'app-bulk-ui',
  templateUrl: './bulk-ui.component.html',
  styleUrls: ['./bulk-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUiComponent implements OnInit {
  @Input() regionIdToNameMap = {};
  @Input() set accounts(accounts: account[]) {
    console.log(accounts);
    this.groupAccountsByRegion(accounts);
  }

  accountsGrouped;

  cons(accounts) {
    console.log(accounts)
  }

  groupAccountsByRegion(accounts: account[]) {
    let accArr = [];

    console.log(accounts);

    accounts.forEach(
      el => {
        let groupToAddTo = accArr.find(accArrEl => el.region_id == accArrEl.region_id);
        if(groupToAddTo) {
          groupToAddTo.count++;
          groupToAddTo.accounts[el.name] = +groupToAddTo.accounts[el.name] ? groupToAddTo.accounts[el.name] + 1 : 1;
        }
        else {
          accArr.push({region_id: el.region_id, count: 1, accounts: {[el.name]: 1}});
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
