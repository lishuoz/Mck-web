import { Component, OnInit } 	from '@angular/core';
import { Observable } 			from 'rxjs/Observable';

import { Product } 				from '../../model/product';
import { User }					from '../../model/user';

import { ProductService } 		from '../../products/shared/product.service';

import { AuthService }			from '../shared/auth.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	user: User;
	products: Product[];
	constructor(
		private productService: ProductService,
		private authService: AuthService,
		// private messageService: MessageService,
		) {
	}

	ngOnInit() {
		this.authService.getUser().subscribe(
			user => {
				this.user = user;
				this.productService.getUserProducts(user.id)
				.subscribe(
					response => {
						this.products = response
					},
					error => console.log(error),
					)
			}
			);
	}

	delete(product){
		this.products = this.products.filter(p => p !== product);
		this.productService.deleteProduct(product).subscribe();
	}

	

}
