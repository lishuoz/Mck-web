import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Product } from '../../model/product';

import { ProductService } from '../../products/shared/product.service';
import { UploadService } from '../shared/upload.service';
@Component({
	selector: 'app-upload-product-images',
	templateUrl: './upload-product-images.component.html',
	styleUrls: ['./upload-product-images.component.css']
})
export class UploadProductImagesComponent implements OnInit {
	product$: Observable<Product>;
	formData = new FormData();
	isLoading: boolean = false;
	private singleConfig = {
		maxFiles: 1,
		maxFilesize: 5, // MB
		acceptedFiles: "image/*",
	}

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private uploadService: UploadService,
		private router: Router,
		) {
	}

	onFrontUploadSuccess($event){
		this.formData.append('frontImage', $event[0], $event[0].name);
	}

	onFrontRemovedFile($event){
		this.formData.delete('frontImage');
	}

	onBackUploadSuccess($event){
		this.formData.append('backImage', $event[0], $event[0].name);
	}

	onBackRemovedFile($event){
		this.formData.delete('backImage');
	}

	isValid(){
		return this.formData.has('frontImage') && this.formData.has('backImage')
	}

	uploadProductImages(){
		this.isLoading = true;
		this.formData.append('id', this.route.snapshot.params.id);
		this.uploadService.uploadProductImages(this.formData).subscribe(
			product => {
				if(product.level.id == 1 || product.level.id == 6 || product.level.id == 8){
					this.router.navigate(['upload/'+product.id+'/additional-images']);
				}else{
					this.router.navigate(['upload/'+product.id+'/other-images']);
				}
				console.log(product);
			},
			);
	}
	
	ngOnInit() {
		this.product$ = this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.productService.getProduct(+params.get('id'))
			);
	}

}
