import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
		this.loginForm = this.fb.group({
			email: '',
			password: '',
		});
	}

	login() {
		this.authService.login(this.loginForm).subscribe(
			() => this.router.navigate(['/dashboard'])
		)
	}

	ngOnInit() {
	}

}
