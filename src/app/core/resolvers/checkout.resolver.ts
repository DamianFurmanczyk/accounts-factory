import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class CheckoutResolver implements Resolve<Observable<any>> {
  constructor(private stateS: StateService) {}

  resolve() {
      if(this.stateS.resolversRun) return of(null);
      this.stateS.resolversRun = true;
      this.stateS.loadDbAccountsToState().subscribe();
      this.stateS.loadDbCurrencyAndUsersCountryToState().subscribe();
      this.stateS.loadDbRegionsToState().subscribe();

      return of(null);
    }
}