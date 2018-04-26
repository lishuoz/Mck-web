import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { NgSelectModule } from '@ng-select/ng-select';

import { UploadComponent }    from '../upload.component';
import { UploadImagesComponent }  from '../upload-images/upload-images.component';

import { UploadService } from './upload.service';

import { UploadRoutingModule } from './upload-routing.module';
import { AuthGuard } from '../../auth/shared/auth-guard.service';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
	url: "http://localhost:8000/api/upload-image",
	acceptedFiles: "image/*",
	dictRemoveFile: "删除文件",
	dictDefaultMessage: '',
	dictMaxFilesExceeded: "上传文件超过最大限制",
  maxFilesize: 5, // MB
  addRemoveLinks: true,
  thumbnailWidth: 250,
  thumbnailHeight: 250,

};

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
	UploadImagesComponent
	],
	providers: [
	UploadService,
	AuthGuard,
	{
		provide: DROPZONE_CONFIG,
		useValue: DEFAULT_DROPZONE_CONFIG,
	}
	],
})

export class UploadModule {}
