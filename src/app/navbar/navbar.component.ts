import { Component, OnInit } from '@angular/core';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginComponent } from '../auth/login/login.component';

import { User } 			from '../model/user';

import { AuthService }		from '../auth/shared/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	constructor(
		public authService: AuthService,

		) {
	}

	ngOnInit(){
	}

}
