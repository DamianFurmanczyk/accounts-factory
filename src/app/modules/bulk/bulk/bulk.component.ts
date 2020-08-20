import { Component, OnInit } from '@angular/core';
import { StateService } from './../../../core/services/state.service';

@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.scss']
})
export class BulkComponent implements OnInit {

  constructor(public stateS: StateService) { }

  ngOnInit() {
  }

}
