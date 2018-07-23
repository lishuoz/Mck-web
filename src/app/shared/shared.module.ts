import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
	FormsModule,
	ReactiveFormsModule
} from '@angular/forms';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { environment } from '../../environments/environment';
import { ProductTradeMethodPipe } from './pipes/product-trade-method.pipe';
import { ProductStatusPipe } from './pipes/product-status.pipe';
import { ProductSaleStatusPipe } from './pipes/product-sale-status.pipe';
import { ProductQuotedMethodPipe } from './pipes/product-quoted-method';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
	url: environment.baseUrl + "/api/upload-image",
	acceptedFiles: "image/*",
	dictRemoveFile: "删除文件",
	dictDefaultMessage: '',
	dictMaxFilesExceeded: "上传文件超过最大限制",
	maxFilesize: 5, // MB
	addRemoveLinks: true,
};

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		ProductTradeMethodPipe,
		ProductStatusPipe,
		ProductSaleStatusPipe,
		ProductQuotedMethodPipe
	],
	exports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		ProductTradeMethodPipe,
		ProductStatusPipe,
		ProductSaleStatusPipe,
		ProductQuotedMethodPipe
	],
	providers: [
		{
			provide: DROPZONE_CONFIG,
			useValue: DEFAULT_DROPZONE_CONFIG,
		}
	]
})

export class SharedModule { }
