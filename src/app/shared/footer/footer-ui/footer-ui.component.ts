import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer-ui',
  templateUrl: './footer-ui.component.html',
  styleUrls: ['./footer-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterUiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
