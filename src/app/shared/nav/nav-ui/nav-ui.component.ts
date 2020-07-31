import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-ui',
  templateUrl: './nav-ui.component.html',
  styleUrls: ['./nav-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
