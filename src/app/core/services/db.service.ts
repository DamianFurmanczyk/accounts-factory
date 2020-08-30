import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { accountsDataResponse } from '../models/accounts.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { map } from 'rxjs/operators';

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

	verifyCompany(countryCode: string, id: string) {
		return this.http.get(this.apiUrl + `checkVat/${countryCode}/${id}`);
		// 7290014875
	}

	getCountries() {
		return this.http.get('https://restcountries.eu/rest/v2/all').pipe(
			map((res: any[]) => {

				let countriesObj = {};

				res.forEach(el => {
					countriesObj[el.alpha2Code] = el.name;
				});

				return countriesObj;
			})
		);
	}

	getExchangeRateToDollar(currency: string) {
		return this.http.get(this.apiUrl + `convert/1/USD/${currency}`);
	}

	getCoupons() {
		return this.http.get(this.apiUrl + 'coupon')
	}

	getAccounts(regionName: string) {
		return this.http.get<accountsDataResponse>(this.apiUrl + 'accounts/regionname/' + regionName);
	  }

	  getAllRegionsAccounts() {
		return this.http.get<account[]>(this.apiUrl + 'accounts');
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
