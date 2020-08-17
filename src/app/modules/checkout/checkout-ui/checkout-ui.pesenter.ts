import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable()

export class CheckoutPresenter {
  checkoutForm: FormGroup;
  get controls() { return this.checkoutForm.controls}

    checkoutPresenterState = {
      vat: null
    }

    constructor(private formBuilder: FormBuilder) {
      this.checkoutForm = this.formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', Validators.required],
        country: ['', Validators.required]
      });
    }

    onStarClick(i: number) {
    }

    getReviewToAdd() {

    }

    submitAddReviewForm(e: Event) {
      e.preventDefault();
      this.checkoutForm.reset();
    }
    
}
