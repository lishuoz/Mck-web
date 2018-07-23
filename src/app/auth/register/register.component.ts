import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
	EmailValidator,
	AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	test = environment.baseUrl;
	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private router: Router,
	) {
		this.createForm();
	}

	createForm() {
		this.registerForm = this.fb.group({
			name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
		},
			{
				validator: this.confirmed
			}
		);
	}

	confirmed(c: AbstractControl): { invalid: boolean } {
		if (c.get('password').value !== c.get('password_confirmation').value) {
			return { invalid: true };
		}
	}

	register() {
		this.authService.register(this.registerForm).subscribe(
			() => this.router.navigate(['/dashboard'])
		)
	}

	ngOnInit() {
		console.log(this.registerForm)
	}

}
