import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { accountsDataResponse } from '../models/accounts.interface';

@Injectable({
	providedIn: 'root'
})

export class DbService {
	constructor(private http: HttpClient) { }

	apiUrl = 'https://api.abcleague.webup-dev.pl/';

	getCurrencyAndUsersCountry() {
		return this.http.get<currencyOrCountry[]>(this.apiUrl + 'currency');
	}

	verifyOrder(id: string) {
		return this.http.get(this.apiUrl + `verify/${id}`);
	}

	getExchangeRateToDollar(currency: string) {
		return this.http.get(this.apiUrl + `convert/1/USD/${currency}`);
	}

	getCoupons() {
		return this.http.get(this.apiUrl + 'coupon')
	}

	// unikaj circular dep, rob parametry zamiast injectowac i odbierac ze state'a rzeczy subskrypcja

	getAccounts(regionName: string) {
	  return this.http.get<accountsDataResponse>(this.apiUrl + 'accounts/regionname/' + regionName);
	}

	getRegions() {
		return this.http.get<region[]>(this.apiUrl + 'regions');
	}

	// initiatePaypalPayment(price: number | string, currency: string, quantity: number, description: string,) {
	// 	return fetch(
	// 		`https://api.abcleague.webup-dev.pl/pay_paypal?region=${this.selectedRegion.name}&description=${description}&price=${price}&currency=${currency}&quantity=${quantity}`,
	// 		{ method: "post" })
	// 		.then(res => res.json());
	// }
}
