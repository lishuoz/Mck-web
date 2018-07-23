import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	@Input() title: string;

	constructor(
		public authService: AuthService,
	) {	}

	ngOnInit() {

	}

}
