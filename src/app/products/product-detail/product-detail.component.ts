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
	product$: Observable<Product>;
	mainImage: string;
	mainImageWidth: number = 400;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
		) { }

	ngOnInit() {
		this.product$ = this.route.paramMap
		.switchMap(
			(params: ParamMap) => 
			this.productService.getProduct(+params.get('id')),
			);
		this.product$.subscribe(
			product => {
				this.mainImage = product.product_image.front_path;
			}
			);

	}

	changeMainImage(imagePath){
		// console.log('image', image);
		this.product$.subscribe(
			product => {
				// console.log(imagePath);
				this.mainImage = imagePath;
			}
			);
		// this.mainImageWidth = 50;
	}

	gotoProducts(){
		this.router.navigate(['/products']);
	}

}
