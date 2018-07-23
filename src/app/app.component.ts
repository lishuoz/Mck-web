import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/shared/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Demo';
	constructor(
		private authService: AuthService
	) {
		// console.log('should be first')
		// console.log(this.authService.isLoggedIn);
	}


}
