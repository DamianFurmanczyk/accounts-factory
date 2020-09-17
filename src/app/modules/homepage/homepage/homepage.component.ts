import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from './../../../core/services/state.service';
import { CartStateService } from './../../../core/services/cart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {

  constructor(public stateS: StateService, public cartS: CartStateService) { }

  ngOnInit() {}

}
