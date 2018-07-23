import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } 						from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators} 		from '@angular/forms';
import { Subscription }											from 'rxjs/Subscription';

import { ProductService }	from '../../shared/product.service';

import { Product }			from '../../../model/product';
@Component({
	selector: 'app-preview',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
	private sub: Subscription;
	thumbImage: string;
	fullImage: string;
	product: Product;
	private productId: number;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService,
		) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(
			params => {
				this.productId = +params['id'];
				this.productService.getProduct(this.productId).subscribe(
					product => {
						console.log(product)
						this.product = product;
						this.thumbImage = product.front_image.medium_path;
						this.fullImage = product.front_image.large_path;
					},
					error => console.log(error)
					);
			});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	onApply(): void{
		this.productService.updateProductStatus(this.productId).subscribe(
			response => {
				this.router.navigate(['/dashboard']);
			},
			error => console.log(error)
			);
	}

	changeMainImage(image){
		this.thumbImage = image.medium_path;
		this.fullImage = image.large_path;
	}
}
