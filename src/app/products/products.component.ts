import { Product } from '../model/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './shared/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	products: Product[];

	constructor(private productService: ProductService) { }

	getProducts(): void {
		this.productService.getProducts()
		.subscribe(products => this.products = products);
	}

	ngOnInit() {
		this.getProducts();
	}

}
