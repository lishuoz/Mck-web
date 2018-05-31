import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';

import { Product } from '../../model/product';

import { ProductService } from '../../products/shared/product.service';
import { UploadService } from '../shared/upload.service';

import { DeactivateModalComponent } from '../../shared/deactivate-modal/deactivate-modal.component';


@Component({
	selector: 'app-upload-additional-images',
	templateUrl: './upload-additional-images.component.html',
	styleUrls: ['./upload-additional-images.component.css']
})
export class UploadAdditionalImagesComponent implements OnInit {
	product$: Observable<Product>;
	formData = new FormData();
	isLoading: boolean = false;
	levelImages: any = [];
	loaImages: any = [];

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

	onLevelUploadSuccess($event){
		let file: File = $event[0];
		this.levelImages.push(file);
	}

	onLevelRemovedFile($event){
		this.levelImages.splice(this.levelImages.indexOf($event), 1);
	}

	onLoaUploadSuccess($event){
		let file: File = $event[0];
		this.loaImages.push(file);
	}

	onLoaRemovedFile($event){
		this.loaImages.splice(this.loaImages.indexOf($event), 1);
	}

	isValid(){
		return this.levelImages.length || this.loaImages.length;
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

	uploadAdditionalImages(){
		this.isLoading = true;
		this.formData.append('id', this.route.snapshot.params.id);
		for(var i=0; i<this.levelImages.length; i++){
			this.formData.append('levelImages[]', this.levelImages[i], this.levelImages[i].name);
		}
		for(var i=0; i<this.loaImages.length; i++){
			this.formData.append('loaImages[]', this.loaImages[i], this.loaImages[i].name);
		}
		this.uploadService.uploadAdditionalImages(this.formData).subscribe(
			product => {
				this.router.navigate(['upload/'+product.id+'/other-images']);
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
