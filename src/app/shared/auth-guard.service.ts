import { Injectable } from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
} from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../auth/shared/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
	user: User;
	constructor(
		private authService: AuthService,
		private router: Router,
	) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		let url: string = state.url;
		return this.authService.getUser().map(
			user => {
				if(user){
					return true
				}
				this.router.navigate(['login'])
				return false
			},
			error => {
				this.router.navigate(['login'])
				return false;
			}
		)

	}

}