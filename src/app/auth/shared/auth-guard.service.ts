import { Injectable }     		from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
}                           	from '@angular/router';

import { User }					from '../../model/user';

import { AuthService } 			from './auth.service';
// import { AuthStore } 			from './auth.store';

@Injectable()
export class AuthGuard implements CanActivate {
	user: User;
	constructor(
		private authService: AuthService,
		private router: Router,
		// private authStore: AuthStore,
		){
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;
		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean{
		if(this.authService.isLoggedIn){
			return true;
		}
		
		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(['/login']);
		return false;
	}

}