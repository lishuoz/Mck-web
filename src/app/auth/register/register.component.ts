import { Component, OnInit } from '@angular/core';
import { 
	FormControl, 
	FormGroup, 
	FormBuilder, 
	Validators, 
	EmailValidator,
	AbstractControl
} from '@angular/forms';

import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		) {
		this.createForm();
	}

	createForm() {
		this.registerForm = this.fb.group ({
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
			return {invalid: true};
		}
	}


	register(){
		console.log('clicked');
		this.authService.register(this.registerForm).subscribe(
			response => console.log(response),
			error => console.log('错误', error.error.errors.email)
			);
	}

	ngOnInit() {
		console.log(this.registerForm)
	}

}
