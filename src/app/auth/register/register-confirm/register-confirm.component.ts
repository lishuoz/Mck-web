import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map }                from 'rxjs/operators';
import { AuthService }			from '../../shared/auth.service';

@Component({
	selector: 'app-register-confirm',
	templateUrl: './register-confirm.component.html',
	styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {
	private token;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		) { }

	ngOnInit() {
		this.route.queryParamMap
		.subscribe(
			params => {
				if(params.get('token')){
					this.authService.verifyAccount(params.get('token')).subscribe(
						response => this.router.navigate(['dashboard']),
						);
				}
			}
			);
	}

}
