import { Injectable } 				from '@angular/core';
import { HttpClient, HttpHeaders } 	from '@angular/common/http';

import { User } 					from '../../model/user';

import { Observable } 				from 'rxjs/Observable';
import { catchError, map, tap } 	from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map'

// import { User } from '../../model/user'

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json' 
	})
};

@Injectable()
export class AuthService {
	private oauthUrl = "http://localhost:8000/oauth/token";
	private userUrl = "http://localhost:8000/api/user";
	isLoggedIn = false;
	redirectUrl: string;

	constructor(
		private http: HttpClient,
		) {}

	// isLoggedIn(): any{
	// 	if( localStorage.getItem('accessToken') ){
	// 		return true;
	// 	}else{
	// 		return false;
	// 	}
	// }

	login(loginForm): Observable<boolean> {
		return this.getAccessToken(loginForm).map(
			response => {
				localStorage.setItem('accessToken', response.access_token);
				this.isLoggedIn = true;
				return true;
			},
			error => {
				return false
			}
			);
		// return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
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
			client_secret: "87hqJqTYfJb6j3zLt79KkgtxoJ9kGhSPuCzRFpsI",
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

	register(registerForm): Observable<any>{
		const registerUrl = "http://localhost:8000/api/register";
		return this.http.post(registerUrl, JSON.stringify(registerForm.value), httpOptions);
	}
}
