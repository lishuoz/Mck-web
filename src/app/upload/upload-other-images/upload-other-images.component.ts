import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Product } from '../../model/product';

import { ProductService } from '../../products/shared/product.service';
import { UploadService } from '../shared/upload.service';

import { DeactivateModalComponent } from '../../shared/deactivate-modal/deactivate-modal.component';

@Component({
	selector: 'app-upload-other-images',
	templateUrl: './upload-other-images.component.html',
	styleUrls: ['./upload-other-images.component.css']
})
export class UploadOtherImagesComponent implements OnInit {
	product$: Observable<Product>;
	formData = new FormData();
	isLoading: boolean = false;
	otherImages: any = [];

	private multiConfig = {
		uploadMultiple: true,
		maxFiles: 5,
		maxFilesize: 5, // MB
	}

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private uploadService: UploadService,
		private router: Router,
		) {
	}

	onOtherUploadSuccess($event){
		let file: File = $event[0];
		this.otherImages.push(file);
	}

	onOtherRemovedFile($event){
		this.otherImages.splice(this.otherImages.indexOf($event), 1);
	}

	isValid(){
		return this.otherImages.length;
	}

	uploadOtherImages(){
		this.isLoading = true;
		this.formData.append('id', this.route.snapshot.params.id);
		for(var i=0; i<this.otherImages.length; i++){
			this.formData.append('otherImages[]', this.otherImages[i], this.otherImages[i].name);
		}
		this.uploadService.uploadOtherImages(this.formData).subscribe(
			product => {
				this.router.navigate(['dashboard']);
				console.log(product);
			},
			);
	}

	canDeactivate() {
		if(!this.isLoading){
			var doCancel = window.confirm('是否放弃上传？点击“是”将删除之前上传的内容');
			if(doCancel){
				this.productService.deleteProduct(+this.route.snapshot.params.id).subscribe();	
			}
			return doCancel;
		}
		return true;
	}
	
	ngOnInit() {
		this.product$ = this.route.paramMap
		.switchMap((params: ParamMap) =>
			this.productService.getProduct(+params.get('id'))
			);
	}

}
