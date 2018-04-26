import { Component } from '@angular/core';
import { AuthService} from './auth/shared/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';
	constructor( private authService: AuthService ){
		this.authService.getUser().subscribe(
			response => {
				if(response){
					return this.authService.isLoggedIn = true;
				}
				return this.authService.logout();
			},
			error => {console.log('errorapp', error)}
			);
	}
}
