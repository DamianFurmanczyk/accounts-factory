import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { StateService } from './../../../core/services/state.service';

@Injectable()

export class CheckoutPresenter {
  form: FormGroup;
  nipInputStatus = '';
  nipInputStatusText = '*NOT NEEDED';
  get controls() { return this.form.controls}

  constructor(private formBuilder: FormBuilder, private stateS: StateService) {
    this.form = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      nip: ['', Validators.required]
    });

    const presenter = this;

    this.form.controls.nip.valueChanges.subscribe(val => this.handleNipInput(val, presenter));
  }

    handleNipInput(val: string, presenter) {
      console.log(val);
      console.log(presenter);
      if(val.length == 0) {
        presenter.nipInputStatus = '';
        return presenter.nipInputStatusText = '*NOT NEEDED';
      }
      if(val.length < 10) {
        presenter.nipInputStatusText = 'Too short';
        return presenter.nipInputStatus = 'Error';
      }
      presenter.nipInputStatus = '';
      presenter.nipInputStatusText = 'Checking company information...';
      presenter.stateS.loadCompanyData(presenter.stateS.state.selectedCountryCode, val).subscribe(res => {

        if (presenter.stateS.state.companyData) {
        presenter.nipInputStatusText = 'Valid';
        presenter.nipInputStatus = 'Success'; 
        }
        if (presenter.stateS.state.companyDataLoadError) {
          presenter.nipInputStatusText = 'Invalid';
          presenter.nipInputStatus = 'Error'; 
        }
      });
    }

    onStarClick(i: number) {
    }

    getReviewToAdd() {

    }

    submitAddReviewForm(e: Event) {
      e.preventDefault();
      this.form.reset();
    }
    
}
