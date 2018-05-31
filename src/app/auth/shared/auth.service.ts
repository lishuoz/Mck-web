import { Injectable } 				from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';

import { User } 					from '../../model/user';

import { Observable } 				from 'rxjs/Observable';
import { catchError, map, tap } 	from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { retry } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json' 
	})
};

@Injectable()
export class AuthService {
	private oauthUrl = environment.baseUrl+"/oauth/token";
	private userUrl = environment.baseUrl+"/api/user";
	isLoggedIn = false;
	redirectUrl: string;
	environmentName = environment.baseUrl;
	user;
	constructor(
		private http: HttpClient,
		) {
		this.isLoggedIn = !(this.getUser() == Observable.of(false));
	}

	logout(): void {
		localStorage.removeItem('accessToken');
		this.isLoggedIn = false;
	}

	getAccessToken(loginForm): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			})
		};
		let postData = {
			grant_type: "password",
			client_id: 2,
			client_secret: environment.client_secret,
			username: loginForm.get('email').value,
			password: loginForm.get('password').value,
			scope: ""
		}
		return this.http.post(this.oauthUrl, JSON.stringify(postData), httpOptions);
	}

	getUser(): Observable<any>{
		if(localStorage.getItem('accessToken') !== null){
			const httpOptions = {
				headers: new HttpHeaders({
					'Accept': 'application/json',
					'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
				})
			};
			return this.http.get(this.userUrl, httpOptions);
		}
		return Observable.of(false);
	}

	get(): Observable<User>{
		if(localStorage.getItem('accessToken') !== null){
			const httpOptions = {
				headers: new HttpHeaders({
					'Accept': 'application/json',
					'Authorization': 'Bearer '+ localStorage.getItem('accessToken'),
				})
			};
			return this.http.get<User>(this.userUrl, httpOptions);
		}
		return Observable.of(null);
	}

	register(registerForm): Observable<any>{
		const registerUrl = environment.baseUrl+"/api/register";
		return this.http.post(registerUrl, JSON.stringify(registerForm.value), httpOptions);
	}

	saveProfile(form): Observable<any>{
		const profileUrl = environment.baseUrl+"/api/users/edit";
		return this.http.post(profileUrl, JSON.stringify(form.value), httpOptions);
	}

	verifyAccount(token){
		const url = environment.baseUrl+"/api/users/verify";
		let postData = {
			token: token,
		}
		return this.http.post(url, JSON.stringify(postData), httpOptions);
	}

}
