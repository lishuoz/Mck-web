import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../model/product';

import { ProductService } from '../../products/shared/product.service';

import { AuthService } from '../shared/auth.service';

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
		this.productService.getUserProducts(this.authService.user.id).subscribe(
			products => this.products = products
		)
	}

	delete(product: Product): void {
		this.products = this.products.filter(p => p !== product);
		this.productService.deleteProduct(product).subscribe();
	}


	checkCompletion(product: Product): boolean {
		// console.log(product);
		if (product.sale_status.status != 'complete') {
			return false;
		}
		if (product.level.id == 1 || product.level.id == 6 || product.level.id == 8) {
			if (product.loas.length) {
				return (product.front_image && product.back_image && product.level_images && product.loa_images);
			} else {
				return (product.front_image && product.back_image && product.level_images);
			}
		} else {
			if (product.loas.length) {
				return (product.front_image && product.back_image && product.loa_images);
			} else {
				return (product.front_image && product.back_image);
			}
		}
	}
}
