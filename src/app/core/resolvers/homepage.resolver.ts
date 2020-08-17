import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { forkJoin, Observable, of } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class HomepageResolver implements Resolve<Observable<any>> {
  constructor(private stateS: StateService) {}

  resolve() {
      if(this.stateS.resolversRun) return of(null);
      this.stateS.resolversRun = true;
      
        return forkJoin(
          this.stateS.loadDbAccountsToState(), 
          this.stateS.loadDbCurrencyAndUsersCountryToState(), 
          this.stateS.loadDbRegionsToState()
        );
    }
}