import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../shared/product.service';

import { Product } from '../../../model/product';

import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-upload-images',
	templateUrl: './upload-images.component.html',
	styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
	private baseUrl: string = environment.baseUrl + '/api/';
	private levelMaxFiles: number = 5;
	private loaMaxFiles: number = 3;
	private otherMaxFiles: number = 10;
	private showLevel: boolean = false;
	private showLoa: boolean = false;
	private frontConfig = {
		maxFiles: 1,
		maxFilesize: 5,
		acceptedFiles: "image/*",
		url: '',
	}

	private backConfig = {
		maxFiles: 1,
		maxFilesize: 5,
		acceptedFiles: "image/*",
		url: '',
	}

	private levelConfig = {
		maxFiles: 0,
		maxFilesize: 5,
		acceptedFiles: "image/*",
		url: '',
		uploadMultiple: true,
		autoReset: 3000,
	}

	private loaConfig = {
		maxFiles: 0,
		maxFilesize: 5,
		acceptedFiles: "image/*",
		url: '',
		uploadMultiple: true,
		autoReset: 3000,
	}

	private otherConfig = {
		maxFiles: 0,
		maxFilesize: 5,
		acceptedFiles: "image/*",
		url: '',
		uploadMultiple: true,
		autoReset: 3000,
	}

	private sub: Subscription;
	productId: number;
	product: Product;
	isFrontDeleting: boolean = false;
	isBackDeleting: boolean = false;
	deletingLevel: string;
	deletingLoa: string;
	deletingOther: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService,
	) {
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(
			params => {
				this.productId = +params['id'];
				this.frontConfig.url = this.baseUrl + 'front-image/' + this.productId
				this.backConfig.url = this.baseUrl + 'back-image/' + this.productId
				this.levelConfig.url = this.baseUrl + 'level-image/' + this.productId
				this.loaConfig.url = this.baseUrl + 'loa-image/' + this.productId
				this.otherConfig.url = this.baseUrl + 'other-image/' + this.productId
				this.getProduct();
			},
			error => console.log(error)
		);
	}

	getProduct() {
		this.productService.getProduct(this.productId).subscribe(
			product => {
				this.product = product;
				this.levelConfig.maxFiles = this.levelMaxFiles - product.level_images.length;
				this.loaConfig.maxFiles = this.loaMaxFiles - product.loa_images.length;
				this.otherConfig.maxFiles = this.otherMaxFiles - product.other_images.length;
				if (product) {
					if (product.level.name.includes('图片匹配')) {
						this.showLevel = true
					}
					if (product.loas.length) {
						this.showLoa = true;
					}
				}

			},
			error => console.log(error)
		)
	}

	deleteFrontImage() {
		this.isFrontDeleting = true;
		this.productService.deleteFrontImage(this.productId).subscribe(
			product => {
				this.product = product;
				this.isFrontDeleting = false;
			},
			error => {
				this.isFrontDeleting = false;
				console.log(error);
			});
	}

	deleteBackImage() {
		this.isBackDeleting = true;
		this.productService.deleteBackImage(this.productId).subscribe(
			product => {
				this.product = product;
				this.isBackDeleting = false;
			},
			error => {
				this.isBackDeleting = false;
				console.log(error);
			});
	}

	deleteLevelImage(fileName: string) {
		this.deletingLevel = fileName;
		this.productService.deleteLevelImage(this.productId, fileName).subscribe(
			product => {
				this.product = product;
				this.deletingLevel = '';
				this.levelConfig.maxFiles = this.levelMaxFiles - product.level_images.length;
			},
			error => {
				this.deletingLevel = '';
				console.log(error);
			});
	}

	deleteLoaImage(fileName: string) {
		this.deletingLoa = fileName;
		this.productService.deleteLoaImage(this.productId, fileName).subscribe(
			product => {
				this.product = product;
				this.deletingLoa = '';
				this.loaConfig.maxFiles = this.loaMaxFiles - product.loa_images.length;
			},
			error => {
				this.deletingLoa = '';
				console.log(error);
			});
	}

	deleteOtherImage(fileName: string) {
		this.deletingOther = fileName;
		this.productService.deleteOtherImage(this.productId, fileName).subscribe(
			product => {
				this.product = product;
				this.deletingOther = '';
				this.otherConfig.maxFiles = this.otherMaxFiles - product.other_images.length;
			},
			error => {
				this.deletingOther = '';
				console.log(error);
			});
	}

	isValid() {
		if (this.showLevel) {
			return (!this.product.front_image || !this.product.back_image || this.levelConfig.maxFiles == this.levelMaxFiles
				|| this.loaConfig.maxFiles == this.loaMaxFiles);
		}
		return (!this.product.front_image || !this.product.back_image || this.loaConfig.maxFiles == this.loaMaxFiles);
	}

	isEdit() {
		if (this.showLevel) {
			return (this.product.front_image || this.product.back_image || this.levelConfig.maxFiles != this.levelMaxFiles || this.loaConfig.maxFiles != this.loaMaxFiles || this.otherConfig.maxFiles != this.otherMaxFiles)
		}
		return (this.product.front_image || this.product.back_image || this.loaConfig.maxFiles != this.loaMaxFiles || this.otherConfig.maxFiles != this.otherMaxFiles)
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
