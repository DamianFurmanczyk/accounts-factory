import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { region } from './../../../core/models/regions.interface';
import { account } from 'src/app/core/models/accounts.interface';

@Component({
  selector: 'app-homepage-ui',
  templateUrl: './homepage-ui.component.html',
  styleUrls: ['./homepage-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageUiComponent implements OnInit {
  @Input() regions: region[] | null;
  @Input() accounts: account[] | null;

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeOrderQuantity: EventEmitter<{account: account, quantity: number}> = new EventEmitter();

  @Output() onRegionSelected: EventEmitter<string> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

}
