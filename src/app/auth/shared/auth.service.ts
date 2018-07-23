import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../model/user';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { catchError, map, tap } from 'rxjs/operators';
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
	private oauthUrl = environment.baseUrl + "/oauth/token";
	private userUrl = environment.baseUrl + "/api/user";
	redirectUrl: string;
	isLoggedIn: boolean = false;
	private _user: User;
	private accessToken = JSON.parse(localStorage.getItem('accessToken'));

	constructor(
		private http: HttpClient,
	) {
		console.log('auth service init')
		this.getToken();
		console.log('should be logged in', this.isLoggedIn)
	}

	getToken() {
		if (this.accessToken) {
			this.getUser().subscribe(
				user => {
					this.isLoggedIn = true;
					this._user = user
					console.log('check where', this.isLoggedIn)
				},
				error => {
					localStorage.clear()
				}
			)

		}
	}

	checkLoggedIn(): Observable<boolean>{
		console.log('auth servie', this.isLoggedIn)
		return Observable.of(this.isLoggedIn);
	}

	get user(): User {
		return this._user;
	}

	set user(user: User) {
		this._user = user;
	}

	login(loginForm): Observable<any> {
		localStorage.clear();
		const url = environment.baseUrl + "/api/login";
		let postData = {
			email: loginForm.get('email').value,
			password: loginForm.get('password').value,
		}
		return this.http.post(url, JSON.stringify(postData), httpOptions)
			.pipe(
				tap(
					res => {
						this.isLoggedIn = true
						this._user = res.user
						localStorage.setItem('accessToken', JSON.stringify(res.token));
					}
				)
			);
	}

	logout(): any {
		const url = environment.baseUrl + "/api/logout"
		let postData = {
			id: this.user.id
		}
		this._user = null;
		this.isLoggedIn = false;
		localStorage.removeItem('accessToken');
		this.http.post(url, JSON.stringify(postData), httpOptions).subscribe(
			res => console.log(res)
		)
	}

	getUser(): Observable<User> {
		if (localStorage.getItem('accessToken') !== null) {
			const httpOptions = {
				headers: new HttpHeaders({
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
				})
			};
			return this.http.get<User>(this.userUrl, httpOptions);
		}
		return Observable.of(null);
	}

	register(registerForm): Observable<any> {
		localStorage.clear();
		const registerUrl = environment.baseUrl + "/api/register";
		return this.http.post(registerUrl, JSON.stringify(registerForm.value), httpOptions)
		.pipe(
			tap(
				res => {
					this.isLoggedIn = true
					this._user = res.user
					localStorage.setItem('accessToken', JSON.stringify(res.token));
				}
			)
		);
	}

	// saveProfile(form): Observable<any>{
	// 	const profileUrl = environment.baseUrl+"/api/users/edit";
	// 	return this.http.post(profileUrl, JSON.stringify(form.value), httpOptions);
	// }

	// verifyAccount(token){
	// 	const url = environment.baseUrl+"/api/users/verify";
	// 	let postData = {
	// 		token: token,
	// 	}
	// 	return this.http.post(url, JSON.stringify(postData), httpOptions);
	// }

}
