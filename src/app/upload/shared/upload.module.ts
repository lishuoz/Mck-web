import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { NgSelectModule } from '@ng-select/ng-select';

import { UploadComponent }    from '../upload.component';
import { UploadProductImagesComponent } from '../upload-product-images/upload-product-images.component';
import { UploadOtherImagesComponent } from '../upload-other-images/upload-other-images.component';
import { UploadAdditionalImagesComponent } from '../upload-additional-images/upload-additional-images.component';
import { DeactivateModalComponent }			from '../../shared/deactivate-modal/deactivate-modal.component';
import { ProductEditComponent }				from '../product-edit/product-edit.component';

import { UploadService } from './upload.service';

import { UploadRoutingModule } from './upload-routing.module';
import { AuthGuard } from '../../auth/shared/auth-guard.service';
import { CanDeactivateGuard } from '../../shared/can-deactivate-guard.service';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { environment } from '../../../environments/environment';

// const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
// 	url: environment.baseUrl+"/api/upload-image",
// 	acceptedFiles: "image/*",
// 	dictRemoveFile: "删除文件",
// 	dictDefaultMessage: '',
// 	dictMaxFilesExceeded: "上传文件超过最大限制",
//   maxFilesize: 5, // MB
//   addRemoveLinks: true,
//   thumbnailWidth: 250,
//   thumbnailHeight: 250,
// };

@NgModule({
	imports: [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	UploadRoutingModule,
	NgSelectModule,
	DropzoneModule,
	],
	declarations: [
	UploadComponent,
	UploadProductImagesComponent,
	UploadOtherImagesComponent,
	UploadAdditionalImagesComponent,
	DeactivateModalComponent,
	ProductEditComponent
	],
	providers: [
	UploadService,
	AuthGuard,
	CanDeactivateGuard,
	// {
	// 	// provide: DROPZONE_CONFIG,
	// 	// useValue: DEFAULT_DROPZONE_CONFIG,
	// }
	],
})

export class UploadModule {}
