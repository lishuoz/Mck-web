import { Component, OnInit } 	from '@angular/core';
import { Observable } 			from 'rxjs/Observable';

import { Product } 				from '../../model/product';

import { ProductService } 		from '../../products/shared/product.service';

import { AuthService }			from '../shared/auth.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	products: Product[];

	constructor(
		private productService: ProductService,
		private authService: AuthService,
		) { }

	ngOnInit() {
		this.authService.getUser().subscribe(
			user => this.productService.getUserProducts(user.id)
			.subscribe(
				response => {
					// console.log('mypro', response);
					this.products = response
				},
				error => console.log(error),
				)
			);
	}

}
