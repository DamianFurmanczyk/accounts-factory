import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
      nip: ['']
    });

    const presenter = this;

    this.form.controls.nip.valueChanges.subscribe(val => this.handleNipInput(val, presenter));
  }

    handleNipInput(v: string, presenter) {
      const vData = [v.substr(0, 2), v.substr(2)],
      vatValue = vData[1].trim(),
      countryCodeGiven = vData[0].trim();

      console.log(vData)

      console.log(vatValue)

      console.log(vatValue);
      console.log(presenter);
      if(vatValue.length == 0) {
        presenter.nipInputStatus = '';
        return presenter.nipInputStatusText = '*NOT NEEDED';
      }
      if(vatValue.length < 8) {
        presenter.nipInputStatusText = 'Too short';
        return presenter.nipInputStatus = 'Error';
      }
      
      presenter.nipInputStatus = '';
      presenter.nipInputStatusText = 'Checking company information...';
      presenter.stateS.loadCompanyData(countryCodeGiven, vatValue).subscribe(res => {

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
    
}
