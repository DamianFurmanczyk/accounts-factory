import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  elo = ['RU', 'OCE', 'JP', 'EUNE', 'EUW', 'NA', 'LAS', 'BR', 'TR'];
  siemka = [1,2,3,4,5];
}
