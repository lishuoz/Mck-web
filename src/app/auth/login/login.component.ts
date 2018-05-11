import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

import { catchError, map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private router: Router,
		) {
		this.createForm();
	}

	createForm() {
		this.loginForm = this.fb.group ({
			email: '',
			password: '',
		});
	}

	login(){
		this.authService.getAccessToken(this.loginForm).subscribe(
			response => {
				localStorage.setItem('accessToken', response.access_token);
				this.authService.isLoggedIn = true;
				this.router.navigate(['/dashboard']);
			},
			error => {
				console.log(error);
			}
			);
	}

	logout(){
		this.authService.logout();
		this.router.navigate(['/']);
	}

	onSubmit(){
		this.authService.getAccessToken(this.loginForm)
		.subscribe(
			response => {
				localStorage.setItem('accessToken', response.access_token);
			},
			error => console.log('Error ', error),
			);
	}

	ngOnInit() {
		console.log('loggedIn?', this.authService.isLoggedIn);
	}

}
