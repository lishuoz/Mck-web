// import { Injectable } 			from '@angular/core';
// import { Observable } 			from "rxjs/Observable";
// import { BehaviorSubject } 		from "rxjs/BehaviorSubject";

// import { User } 				from '../../model/user';
// import { AuthService }			from './auth.service';

// @Injectable()
// export class AuthStore {
// 	private _user: BehaviorSubject<User> = new BehaviorSubject(null);
// 	isLoggedIn: boolean;

// 	constructor(
// 		private authService: AuthService
// 		){
// 		this.loadInititalData();
// 	}

// 	get user(){
// 		return this._user.asObservable();
// 	}

// 	// isLoggedIn(): boolean{
// 	// 	let user: User = this._user.getValue();
// 	// 	if(!user){
// 	// 		return this.test = false;
// 	// 	}
// 	// 	return this.test = true;
// 	// }

// 	// loadInititalData(){
// 	// 	let user: User = this._user.getValue();
// 	// 	if(!user){
// 	// 		this.authService.get().subscribe(
// 	// 			response => {
// 	// 				this._user.next(response);
// 	// 				this.isLoggedIn = true;
// 	// 			},
// 	// 			error => console.log('authstore error', error),
// 	// 			)
// 	// 	}
// 	// }

// }