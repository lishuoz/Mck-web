import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from '../../model/product';

import { ProductService } from '../shared/product.service';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	product: Product;
	thumbImage: string;
	fullImage: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
		) { }

	ngOnInit() {
		// this.route.paramMap
		// .switchMap(
		// 	(params: ParamMap) => 
		// 	this.productService.getProduct(+params.get('id')),
		// 	);

		let id = this.route.snapshot.paramMap.get('id');
		this.productService.getProduct(+id).subscribe(
			product => {
				this.product = product;
				this.thumbImage = product.front_image.medium_path;
				this.fullImage = product.front_image.large_path;
			}
			);
		// console.log(this.product);
		
		// this.product$.subscribe(
		// 	product => {
		// 		this.mainImage = product.product_image.front_path;
		// 	}
		// 	);

	}

	changeMainImage(image){
		console.log()
		// console.log('image', image);
		// this.product$.subscribe(
		// 	product => {
		// 		// console.log(imagePath);
		// 		this.mainImage = imagePath;
		// 	}
		// 	);
		this.thumbImage = image.medium_path;
		this.fullImage = image.large_path;

		// this.mainImageWidth = 50;
	}

	gotoProducts(){
		this.router.navigate(['/products']);
	}

}
