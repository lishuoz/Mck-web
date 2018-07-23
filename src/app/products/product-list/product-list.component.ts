import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../model/product';

import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
	products: Product[];
	
	constructor(
		private productService: ProductService
		) { }

	ngOnInit() {
		this.getProducts();
	}

	getProducts(){
		this.productService.getProducts().subscribe(
			products => {
				// console.log(products);
				this.products = products;
			},
			error => console.log(error)
		)
	}

}
