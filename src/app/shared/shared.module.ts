import { NgModule }       			from '@angular/core';
import { CommonModule }   			from '@angular/common';
import { 
	FormsModule,
	ReactiveFormsModule
}    								from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { SharedService } from './shared.service';
import { environment }		from '../../environments/environment';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
	url: environment.baseUrl+"/api/upload-image",
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
	declarations: [],
	exports: [
	CommonModule,
	FormsModule,
	ReactiveFormsModule,
	NgSelectModule
	],
	providers: [
	SharedService,
	{
		provide: DROPZONE_CONFIG,
		useValue: DEFAULT_DROPZONE_CONFIG,
	}
	]
})

export class SharedModule {}
