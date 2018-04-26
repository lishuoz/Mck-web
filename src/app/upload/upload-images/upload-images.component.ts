import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Product } from '../../model/product';

import { ProductService } from '../../products/shared/product.service';
import { UploadService } from '../shared/upload.service';

@Component({
	selector: 'app-upload-images',
	templateUrl: './upload-images.component.html',
	styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
	id: string;
	product$: Observable<Product>;
	formData = new FormData();
	matchImages = [];
	loaImages = [];
	otherImages=[];
	frontImage;
	backImage;
	private step: number = 1;

	private singleConfig = {
		maxFiles: 1,
		maxFilesize: 5, // MB
		acceptedFiles: "image/*",
	}

	private multiConfig = {
		uploadMultiple: true,
		maxFiles: 5,
		maxFilesize: 5, // MB
	}

	// private config = {
	// 	url: "http://localhost:8000/api/upload-image",
	// 	acceptedFiles: "image/*",
	// 	uploadMultiple: true,
	// 	paramName: "images",
	// 	addRemoveLinks: true,
	// 	maxFilesize: 1, // MB
	// 	dictRemoveFile: "删除文件",
	// 	dictMaxFilesExceeded: "上传文件超过最大限制",
	// }
	
	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private uploadService: UploadService,
		private router: Router,
		) {
	}

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.product$ = this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.productService.getProduct(+params.get('id'))
			);
	}

	onFrontUploadSuccess($event){
		this.frontImage = $event[0];
		// let file: File = $event[0];
		// this.formData.append('frontImage', file, file.name);
	}

	onFrontRemovedFile($event){
		this.formData.delete('frontImage');
	}

	onBackUploadSuccess($event){
		this.backImage = $event[0];
		// this.formData.append('backImage', file, file.name);
	}

	onBackRemovedFile($event){
		this.formData.delete('backImage');
	}

	onLevelUploadSuccess($event){
		let file: File = $event[0];
		this.matchImages.push(file);
	}

	onLevelRemovedFile($event){
		this.matchImages.splice(this.matchImages.indexOf($event), 1);
	}

	onLoaUploadSuccess($event){
		let file: File = $event[0];
		this.loaImages.push(file);
	}

	onLoaRemovedFile($event){
		this.loaImages.splice(this.loaImages.indexOf($event), 1);
	}

	onOtherUploadSuccess($event){
		let file: File = $event[0];
		this.otherImages.push(file);
	}

	onOtherRemovedFile($event){
		this.otherImages.splice(this.otherImages.indexOf($event), 1);
	}

	changeStep(step){
		this.step = step;
		this.formData.append('frontImage', this.frontImage, this.frontImage.name);
		this.formData.append('backImage', this.backImage, this.backImage.name);	
		for(var i=0; i<this.matchImages.length; i++){
			this.formData.append('matchImages[]', this.matchImages[i], this.matchImages[i].name);
		}
		for(var i=0; i<this.loaImages.length; i++){
			this.formData.append('loaImages[]', this.loaImages[i], this.loaImages[i].name);
		}


	}
	
	onSubmit(){
		this.formData.append('id', this.id);
		console.log(this.loaImages.length);

		for(var i=0; i<this.otherImages.length; i++){
			this.formData.append('otherImages[]', this.otherImages[i], this.otherImages[i].name);
		}
		this.uploadService.addImages(this.formData).subscribe(
			response => {
				console.log('您的图片已经上传成功，请等待审核结果');
				this.router.navigate(['/']);
			}
			);
	}


}
