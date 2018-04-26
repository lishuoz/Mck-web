import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/shared/auth-guard.service';

import { UploadComponent }    from '../upload.component';
import { UploadImagesComponent }  from '../upload-images/upload-images.component';

const uploadRoutes: Routes = [
{ path: 'upload',  component: UploadComponent, canActivate: [AuthGuard] },
{ path: 'upload/:id/images', component: UploadImagesComponent}
];

@NgModule({
	imports: [
	RouterModule.forChild(uploadRoutes)
	],
	exports: [
	RouterModule
	]
})
export class UploadRoutingModule { }